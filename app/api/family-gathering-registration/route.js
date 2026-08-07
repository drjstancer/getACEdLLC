import { randomUUID } from 'crypto'
import { resend } from '../../../lib/resend'

export const runtime = 'nodejs'

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
            'The Family Gathering 2026 registration. Includes registration, food, and t-shirt. Payment is due October 15, 2026.',
          payment_term: {
            term_type: 'DUE_ON_RECEIPT',
          },
        },
        primary_recipients: [
          {
            billing_info: {
              email_address: cleanString(primary.email),
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
            } for Thanksgiving Day, Thursday, November 26, 2026. Payment is due October 15, 2026.`,
            quantity: '1',
            unit_amount: {
              currency_code: 'USD',
              value: totalCost.toFixed(2),
            },
            unit_of_measure: 'QUANTITY',
          },
        ],
      }),
    }
  )

  const invoiceData = await invoiceResponse.json()

  if (!invoiceResponse.ok) {
    throw new Error(
      invoiceData.details?.[0]?.description ||
        invoiceData.message ||
        invoiceData.error ||
        'Unable to create invoice.'
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
      sendData.details?.[0]?.description ||
        sendData.message ||
        sendData.error ||
        'Invoice created but not sent.'
    )
  }

  const invoiceUrl =
    invoiceData.links?.find((link) => link.rel === 'payer-view')?.href ||
    invoiceData.links?.find((link) => link.rel === 'self')?.href ||
    invoiceData.href ||
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

async function saveRegistrationToAppsScript({ registration, attendees }) {
  const appsScriptUrl = process.env.FAMILY_GATHERING_APPS_SCRIPT_URL
  const secret = process.env.FAMILY_GATHERING_FORM_SECRET

  if (!appsScriptUrl || !secret) {
    throw new Error('Family Gathering Apps Script endpoint is not configured.')
  }

  const response = await fetch(appsScriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      secret,
      registration,
      attendees,
    }),
  })

  const text = await response.text()
  let data = {}

  try {
    data = text ? JSON.parse(text) : {}
  } catch (error) {
    const snippet = text
      .slice(0, 180)
      .replace(/\s+/g, ' ')
      .trim()

    console.error('Apps Script non-JSON response:', {
      status: response.status,
      contentType: response.headers.get('content-type'),
      snippet,
    })

    throw new Error(
      'Apps Script did not return JSON. Check that the Web App URL ends in /exec, is deployed, authorized, and set to Anyone access.'
    )
  }

  if (!response.ok || data.success === false) {
    throw new Error(
      data.error || 'Unable to save the registration to Google Sheets.'
    )
  }

  return data
}

async function sendEmails({
  primary,
  attendees,
  registrationId,
  totalCost,
  paymentMethod,
  paymentInstructions,
  paypalInvoiceUrl,
  warning,
}) {
  if (!process.env.RESEND_API_KEY) {
    return
  }

  const adminEmail =
    process.env.FAMILY_GATHERING_ADMIN_EMAIL ||
    process.env.FAMILY_GATHERING_CONTACT_EMAIL

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
          ${
            warning
              ? `<p style="color: #92400e;"><strong>Warning:</strong> ${warning}</p>`
              : ''
          }

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
          ${
            warning
              ? `<p style="color: #92400e;"><strong>Note:</strong> ${warning}</p>`
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
    const totalCost = attendees.reduce(
      (sum, attendee) => sum + attendeePrice(attendee.age),
      0
    )
    const paymentInstructions = PAYMENT_INSTRUCTIONS[paymentMethod]
    const submittedAt = new Date().toISOString()
    const registrationId = `TFG-${submittedAt.slice(0, 10).replace(/-/g, '')}-${randomUUID()
      .slice(0, 8)
      .toUpperCase()}`

    let paypalInvoiceId = ''
    let paypalInvoiceUrl = ''
    let warning = ''
    let paymentStatus = 'Payment Pending'

    if (paymentMethod === 'PayPal') {
      try {
        const invoice = await createAndSendPayPalInvoice({
          registrationId,
          primary,
          totalCost,
          attendeeCount,
        })

        paypalInvoiceId = invoice.invoiceId || ''
        paypalInvoiceUrl = invoice.invoiceUrl || ''
        paymentStatus = 'PayPal Invoice Sent'
      } catch (paypalError) {
        console.error('PayPal invoice error:', paypalError)
        paymentStatus = 'PayPal Invoice Pending Manual Follow-Up'
        warning =
          'Your registration was received, but the PayPal invoice could not be created automatically. A manual invoice will be sent to the email address provided.'
      }
    }

    const attendeesForSheet = attendees.map((attendee) => ({
      ...attendee,
      price: attendeePrice(attendee.age),
    }))

    const registration = {
      submittedAt,
      registrationId,
      primaryFullName: cleanString(primary.fullName),
      primaryAge: Number(primary.age),
      primaryEmail: cleanString(primary.email),
      primaryPhone: cleanString(primary.phone),
      primaryAddress: cleanString(primary.address),
      primaryTShirtSize: cleanString(primary.tShirtSize),
      attendeeCount,
      totalCost,
      paymentMethod,
      paymentStatus,
      paymentInstructions,
      paypalInvoiceId,
      paypalInvoiceUrl,
      notes: warning,
      source: 'get ACEd website',
    }

    await saveRegistrationToAppsScript({
      registration,
      attendees: attendeesForSheet,
    })

    await sendEmails({
      primary,
      attendees,
      registrationId,
      totalCost,
      paymentMethod,
      paymentInstructions,
      paypalInvoiceUrl,
      warning,
    })

    return Response.json({
      success: true,
      registrationId,
      primaryName: cleanString(primary.fullName),
      attendeeCount,
      totalCost,
      paymentMethod,
      paymentInstructions,
      paypalInvoiceUrl,
      warning,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error:
          error.message ||
          'Something went wrong while submitting the registration.',
      },
      { status: 500 }
    )
  }
}
