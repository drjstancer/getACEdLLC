import crypto from 'crypto'
import { resend } from '../../../lib/resend'

export const runtime = 'nodejs'

const SPREADSHEET_ID =
  process.env.FAMILY_GATHERING_SPREADSHEET_ID ||
  '1ty6RjSSfDrrgswdhnGO5cbmhzcybKZ32hV-YmhH6Kyg'

const PAYMENT_INSTRUCTIONS = {
  Cash: 'Hand-deliver payment to Anita Prude.',
  'Money Order':
    'Hand-deliver or mail payment to Anita Prude at 1106 11th Ave NW, Aliceville, AL 35442.',
  CashApp: 'Send payment to $AnitaPrude.',
  PayPal:
    'A PayPal invoice from get ACEd, LLC will be sent to the primary registrant by email. Payment is due October 15, 2026.',
}

function attendeePrice(age) {
  return Number(age) >= 12 ? 50 : 25
}

function cleanString(value) {
  return String(value || '').trim()
}

function splitName(fullName) {
  const parts = cleanString(fullName).split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return { givenName: 'Family', surname: 'Registrant' }
  }

  if (parts.length === 1) {
    return { givenName: parts[0], surname: 'Registrant' }
  }

  return {
    givenName: parts[0],
    surname: parts.slice(1).join(' '),
  }
}

function base64Url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function signJwt(unsignedToken, privateKey) {
  return crypto
    .createSign('RSA-SHA256')
    .update(unsignedToken)
    .sign(privateKey, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

async function getGoogleAccessToken() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!serviceAccountEmail || !privateKey) {
    throw new Error('Google Sheets credentials are not configured.')
  }

  const issuedAt = Math.floor(Date.now() / 1000)
  const expiresAt = issuedAt + 3600

  const header = {
    alg: 'RS256',
    typ: 'JWT',
  }

  const payload = {
    iss: serviceAccountEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: expiresAt,
    iat: issuedAt,
  }

  const unsignedToken = `${base64Url(JSON.stringify(header))}.${base64Url(
    JSON.stringify(payload)
  )}`

  const assertion = `${unsignedToken}.${signJwt(unsignedToken, privateKey)}`

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error_description || 'Unable to authenticate Google.')
  }

  return data.access_token
}

async function appendRows({ accessToken, range, rows }) {
  const encodedRange = encodeURIComponent(range)
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodedRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: rows,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.error?.message || `Unable to append rows to ${range}.`
    )
  }

  return data
}

function getPayPalBaseUrl() {
  return process.env.PAYPAL_BASE_URL || 'https://api-m.paypal.com'
}

async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('PayPal API credentials are not configured.')
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64'
  )

  const response = await fetch(`${getPayPalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error_description || 'Unable to authenticate PayPal.')
  }

  return data.access_token
}

async function createAndSendPayPalInvoice({
  registrationId,
  primary,
  totalCost,
  attendeeCount,
}) {
  const accessToken = await getPayPalAccessToken()
  const { givenName, surname } = splitName(primary.fullName)
  const today = new Date().toISOString().slice(0, 10)

  const invoiceResponse = await fetch(
    `${getPayPalBaseUrl()}/v2/invoicing/invoices`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        detail: {
          invoice_number: registrationId,
          invoice_date: today,
          currency_code: 'USD',
          note:
            'The Family Gathering 2026 registration. Includes registration, food, and t-shirt.',
          payment_term: {
            term_type: 'DUE_ON_DATE',
            due_date: '2026-10-15',
          },
        },
        invoicer: {
          name: {
            given_name: 'get ACEd',
            surname: 'LLC',
          },
        },
        primary_recipients: [
          {
            billing_info: {
              email_address: primary.email,
              name: {
                given_name: givenName,
                surname,
              },
            },
          },
        ],
        items: [
          {
            name: 'The Family Gathering 2026 Registration',
            description: `${attendeeCount} registrant${
              attendeeCount === 1 ? '' : 's'
            } for Thanksgiving Day, Thursday, November 26, 2026.`,
            quantity: '1',
            unit_amount: {
              currency_code: 'USD',
              value: totalCost.toFixed(2),
            },
          },
        ],
        configuration: {
          tax_calculated_after_discount: true,
          tax_inclusive: false,
          allow_tip: false,
        },
      }),
    }
  )

  const invoiceData = await invoiceResponse.json()

  if (!invoiceResponse.ok) {
    throw new Error(
      invoiceData.message || invoiceData.error || 'Unable to create invoice.'
    )
  }

  const invoiceId = invoiceData.id

  const sendResponse = await fetch(
    `${getPayPalBaseUrl()}/v2/invoicing/invoices/${invoiceId}/send`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        send_to_invoicer: true,
        send_to_recipient: true,
        subject: 'The Family Gathering 2026 Registration Invoice',
        note:
          'Thank you for registering for The Family Gathering. Payment is due October 15, 2026.',
      }),
    }
  )

  if (!sendResponse.ok) {
    const sendData = await sendResponse.json()
    throw new Error(
      sendData.message || sendData.error || 'Invoice created but not sent.'
    )
  }

  const invoiceUrl =
    invoiceData.href ||
    invoiceData.links?.find((link) => link.rel === 'self')?.href ||
    null

  return {
    invoiceId,
    invoiceUrl,
  }
}

function normalizeAttendees(primary, additionalRegistrants) {
  const primaryAttendee = {
    type: 'Primary',
    fullName: cleanString(primary.fullName),
    age: Number(primary.age),
    tShirtSize: cleanString(primary.tShirtSize),
    contactName: cleanString(primary.fullName),
    contactEmail: cleanString(primary.email),
    contactPhone: cleanString(primary.phone),
  }

  const additional = additionalRegistrants.map((registrant) => ({
    type: 'Additional',
    fullName: cleanString(registrant.fullName),
    age: Number(registrant.age),
    tShirtSize: cleanString(registrant.tShirtSize),
    contactName: registrant.contactDifferent
      ? cleanString(registrant.contactName)
      : cleanString(primary.fullName),
    contactEmail: registrant.contactDifferent
      ? cleanString(registrant.contactEmail)
      : cleanString(primary.email),
    contactPhone: registrant.contactDifferent
      ? cleanString(registrant.contactPhone)
      : cleanString(primary.phone),
  }))

  return [primaryAttendee, ...additional]
}

function validatePayload({ primary, additionalRegistrants, paymentMethod }) {
  if (!primary) {
    return 'Primary registrant information is required.'
  }

  if (
    !cleanString(primary.fullName) ||
    !cleanString(primary.email) ||
    !cleanString(primary.phone) ||
    !cleanString(primary.tShirtSize) ||
    primary.age === ''
  ) {
    return 'Missing required primary registrant fields.'
  }

  if (!PAYMENT_INSTRUCTIONS[paymentMethod]) {
    return 'Please select a valid payment method.'
  }

  const allRegistrants = normalizeAttendees(primary, additionalRegistrants)

  const invalidRegistrant = allRegistrants.find((registrant) => {
    return (
      !registrant.fullName ||
      !registrant.tShirtSize ||
      Number.isNaN(registrant.age) ||
      registrant.age < 0 ||
      registrant.age > 120 ||
      !registrant.contactName ||
      !registrant.contactEmail ||
      !registrant.contactPhone
    )
  })

  if (invalidRegistrant) {
    return 'Please check each registrant name, age, contact information, and t-shirt size.'
  }

  return ''
}

async function sendEmails({
  primary,
  attendees,
  registrationId,
  totalCost,
  paymentMethod,
  paymentInstructions,
  paypalInvoiceUrl,
}) {
  if (!process.env.RESEND_API_KEY) {
    return
  }

  const adminEmail = process.env.FAMILY_GATHERING_ADMIN_EMAIL || process.env.CONTACT_EMAIL

  const attendeeListHtml = attendees
    .map(
      (attendee, index) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${index + 1}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${attendee.fullName}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${attendee.age}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${attendee.tShirtSize}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${attendeePrice(
            attendee.age
          )}</td>
        </tr>
      `
    )
    .join('')

  if (adminEmail) {
    await resend.emails.send({
      from: 'get ACEd, LLC <booking@getacedllc.com>',
      to: adminEmail,
      reply_to: primary.email,
      subject: `New Family Gathering Registration: ${primary.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111111;">
          <h2>New Family Gathering Registration</h2>
          <p><strong>Registration ID:</strong> ${registrationId}</p>
          <p><strong>Primary Registrant:</strong> ${primary.fullName}</p>
          <p><strong>Email:</strong> ${primary.email}</p>
          <p><strong>Phone:</strong> ${primary.phone}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
          <p><strong>Total:</strong> $${totalCost}</p>

          <h3>Registrants</h3>
          <table style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr>
                <th align="left" style="padding: 8px; border-bottom: 2px solid #111;">#</th>
                <th align="left" style="padding: 8px; border-bottom: 2px solid #111;">Name</th>
                <th align="left" style="padding: 8px; border-bottom: 2px solid #111;">Age</th>
                <th align="left" style="padding: 8px; border-bottom: 2px solid #111;">T-Shirt</th>
                <th align="left" style="padding: 8px; border-bottom: 2px solid #111;">Price</th>
              </tr>
            </thead>
            <tbody>${attendeeListHtml}</tbody>
          </table>
        </div>
      `,
    })
  }

  await resend.emails.send({
    from: 'get ACEd, LLC <booking@getacedllc.com>',
    to: primary.email,
    subject: 'The Family Gathering Registration Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #111111; max-width: 680px; margin: 0 auto;">
        <h2>The Family Gathering Registration Confirmation</h2>

        <p>Thank you, ${primary.fullName}. Your family registration has been received.</p>

        <p><strong>Registration ID:</strong> ${registrationId}</p>
        <p><strong>Total:</strong> $${totalCost}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>

        <div style="margin: 24px 0; padding: 20px; background: #f5f2eb; border-left: 4px solid #C8A96B;">
          <p><strong>Payment Instructions:</strong></p>
          <p>${paymentInstructions}</p>
          ${
            paypalInvoiceUrl
              ? `<p><a href="${paypalInvoiceUrl}">View PayPal invoice</a></p>`
              : ''
          }
        </div>

        <p>
          Event Date: Thursday, November 26, 2026<br />
          Location: National Guard Armory, Aliceville, Alabama
        </p>
      </div>
    `,
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const primary = body.primary || {}
    const additionalRegistrants = Array.isArray(body.additionalRegistrants)
      ? body.additionalRegistrants
      : []
    const paymentMethod = body.paymentMethod

    const validationError = validatePayload({
      primary,
      additionalRegistrants,
      paymentMethod,
    })

    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 })
    }

    const attendees = normalizeAttendees(primary, additionalRegistrants)
    const attendeeCount = attendees.length
    const adultCount = attendees.filter((attendee) => attendee.age >= 12).length
    const childCount = attendees.filter((attendee) => attendee.age < 12).length
    const totalCost = attendees.reduce(
      (sum, attendee) => sum + attendeePrice(attendee.age),
      0
    )

    const submittedAt = new Date().toISOString()
    const registrationId = `TFG-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 7)
      .toUpperCase()}`

    let paymentInstructions = PAYMENT_INSTRUCTIONS[paymentMethod]
    let paypalInvoiceId = ''
    let paypalInvoiceUrl = ''
    let warning = ''

    if (paymentMethod === 'PayPal') {
      try {
        const invoice = await createAndSendPayPalInvoice({
          registrationId,
          primary,
          totalCost,
          attendeeCount,
        })

        paypalInvoiceId = invoice.invoiceId
        paypalInvoiceUrl = invoice.invoiceUrl || ''
      } catch (invoiceError) {
        console.error('PayPal invoice error:', invoiceError)
        warning =
          'The registration was submitted, but the PayPal invoice could not be created automatically. get ACEd, LLC will need to send the invoice manually.'
      }
    }

    const accessToken = await getGoogleAccessToken()

    await appendRows({
      accessToken,
      range: 'Primary Registrations!A:Q',
      rows: [
        [
          submittedAt,
          registrationId,
          primary.fullName,
          primary.age,
          primary.email,
          primary.phone,
          primary.address || '',
          primary.tShirtSize,
          attendeeCount,
          adultCount,
          childCount,
          totalCost,
          paymentMethod,
          paymentMethod === 'PayPal' && paypalInvoiceId
            ? 'Invoice Sent'
            : 'Payment Pending',
          paypalInvoiceId,
          paypalInvoiceUrl,
          warning,
        ],
      ],
    })

    await appendRows({
      accessToken,
      range: 'Attendees!A:K',
      rows: attendees.map((attendee, index) => [
        submittedAt,
        registrationId,
        index + 1,
        attendee.type,
        attendee.fullName,
        attendee.age,
        attendeePrice(attendee.age),
        attendee.tShirtSize,
        attendee.contactName,
        attendee.contactEmail,
        attendee.contactPhone,
      ]),
    })

    await appendRows({
      accessToken,
      range: 'Payment Summary!A:H',
      rows: [
        [
          submittedAt,
          registrationId,
          primary.fullName,
          primary.email,
          totalCost,
          paymentMethod,
          paymentMethod === 'PayPal' && paypalInvoiceId
            ? 'Invoice Sent'
            : 'Payment Pending',
          paymentInstructions,
        ],
      ],
    })

    await sendEmails({
      primary,
      attendees,
      registrationId,
      totalCost,
      paymentMethod,
      paymentInstructions,
      paypalInvoiceUrl,
    })

    return Response.json({
      success: true,
      registrationId,
      primaryName: primary.fullName,
      attendeeCount,
      adultCount,
      childCount,
      totalCost,
      paymentMethod,
      paymentInstructions,
      paypalInvoiceId,
      paypalInvoiceUrl,
      warning,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error:
          'Something went wrong submitting the registration. Please try again or contact the organizer.',
      },
      { status: 500 }
    )
  }
}
