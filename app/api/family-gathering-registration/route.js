import { randomUUID } from 'crypto'
import { resend } from '../../../lib/resend'

export const runtime = 'nodejs'

const PAYMENT_INSTRUCTIONS = {
  Cash: 'Hand-deliver payment to Anita Prude.',
  'Money Order':
    'Hand-deliver or mail payment to Anita Prude at 1106 11th Ave NW, Aliceville, AL 35442.',
  CashApp: 'Send payment to $AnitaPrude.',
  Square: 'Paid online by card through Square.',
}

function attendeePrice(age) {
  return Number(age) >= 12 ? 50 : 25
}

function cleanString(value) {
  return String(value || '').trim()
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

function validatePayload({ primary, additionalRegistrants, paymentMethod, squareSourceId }) {
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

  if (paymentMethod === 'Square' && !cleanString(squareSourceId)) {
    return 'Square payment information is required to pay online.'
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

function getSquareBaseUrl() {
  return process.env.SQUARE_ENVIRONMENT === 'sandbox'
    ? 'https://connect.squareupsandbox.com'
    : 'https://connect.squareup.com'
}

async function readJsonResponse(response) {
  const text = await response.text()

  if (!text) {
    return {}
  }

  try {
    return JSON.parse(text)
  } catch (error) {
    return {}
  }
}

async function createSquarePayment({
  sourceId,
  registrationId,
  primary,
  totalCost,
}) {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN
  const locationId = process.env.SQUARE_LOCATION_ID

  if (!accessToken || !locationId) {
    throw new Error('Square payments are not configured.')
  }

  const response = await fetch(`${getSquareBaseUrl()}/v2/payments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Square-Version': '2026-07-15',
    },
    body: JSON.stringify({
      source_id: sourceId,
      idempotency_key: registrationId,
      amount_money: {
        amount: Math.round(Number(totalCost) * 100),
        currency: 'USD',
      },
      autocomplete: true,
      location_id: locationId,
      reference_id: registrationId,
      buyer_email_address: cleanString(primary.email),
      note: `The Family Gathering 2026 registration ${registrationId}`,
    }),
  })

  const data = await readJsonResponse(response)

  if (!response.ok) {
    const errorMessage =
      data.errors
        ?.map((squareError) => squareError.detail || squareError.code)
        .filter(Boolean)
        .join(' ') || 'Square could not process the payment.'

    throw new Error(errorMessage)
  }

  return data.payment || {}
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
  squarePaymentId,
  squareReceiptUrl,
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
          <p><strong>Payment Method:</strong> ${
            paymentMethod === 'Square' ? 'Pay Online' : paymentMethod
          }</p>
          <p><strong>Total:</strong> $${totalCost}</p>
          ${
            squarePaymentId
              ? `<p><strong>Square Payment ID:</strong> ${squarePaymentId}</p>`
              : ''
          }
          ${
            squareReceiptUrl
              ? `<p><a href="${squareReceiptUrl}">View Square receipt</a></p>`
              : ''
          }
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
        <p><strong>Payment Method:</strong> ${
          paymentMethod === 'Square' ? 'Pay Online' : paymentMethod
        }</p>
        ${
          squarePaymentId
            ? `<p><strong>Square Payment ID:</strong> ${squarePaymentId}</p>`
            : ''
        }

        <div style="margin: 24px 0; padding: 20px; background: #f5f2eb; border-left: 4px solid #C8A96B;">
          <p><strong>Payment Instructions:</strong></p>
          <p>${paymentInstructions}</p>
          ${
            squareReceiptUrl
              ? `<p><a href="${squareReceiptUrl}">View Square receipt</a></p>`
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
    const squareSourceId = body.squareSourceId

    const validationError = validatePayload({
      primary,
      additionalRegistrants,
      paymentMethod,
      squareSourceId,
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
    const submittedAt = new Date().toISOString()
    const registrationId = `TFG-${submittedAt.slice(0, 10).replace(/-/g, '')}-${randomUUID()
      .slice(0, 8)
      .toUpperCase()}`

    let paymentStatus = 'Payment Pending'
    let paymentInstructions = PAYMENT_INSTRUCTIONS[paymentMethod]
    let squarePaymentId = ''
    let squareReceiptUrl = ''
    let warning = ''

    if (paymentMethod === 'Square') {
      const squarePayment = await createSquarePayment({
        sourceId: cleanString(squareSourceId),
        registrationId,
        primary,
        totalCost,
      })

      squarePaymentId = squarePayment.id || ''
      squareReceiptUrl = squarePayment.receipt_url || ''
      paymentStatus = squarePayment.status === 'COMPLETED' ? 'Paid' : `Square ${squarePayment.status || 'Payment Submitted'}`
      paymentInstructions =
        paymentStatus === 'Paid'
          ? 'Your online payment has been received through Square.'
          : 'Your online payment was submitted through Square. Please contact the organizer if you have questions.'
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
      paypalInvoiceId: squarePaymentId,
      paypalInvoiceUrl: squareReceiptUrl,
      notes: squarePaymentId
        ? `Square payment ID: ${squarePaymentId}${
            squareReceiptUrl ? ` | Receipt: ${squareReceiptUrl}` : ''
          }`
        : warning,
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
      squarePaymentId,
      squareReceiptUrl,
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
      squarePaymentId,
      squareReceiptUrl,
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
