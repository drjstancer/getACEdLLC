import { randomUUID } from 'crypto'
import { resend } from '../../../lib/resend'

export const runtime = 'nodejs'

const BASE_ADULT_PRICE = 50
const BASE_CHILD_PRICE = 25
const DIGITAL_ADULT_PRICE = 52
const DIGITAL_CHILD_PRICE = 26.5
const SQUARE_TEST_AMOUNT = 1

const PAYMENT_INSTRUCTIONS = {
  Cash: 'Hand-deliver payment to Anita Prude.',
  'Money Order':
    'Hand-deliver or mail payment to Anita Prude at 1106 11th Ave NW, Aliceville, AL 35442.',
  CashApp: 'Send payment to $AnitaPrude.',
  Square: 'Paid online through Square.',
}

function cleanString(value) {
  return String(value || '').trim()
}

function isDigitalPayment(method) {
  return method === 'CashApp' || method === 'Square'
}

function attendeePrice(age, paymentMethod = '') {
  const parsedAge = Number(age)
  if (Number.isNaN(parsedAge) || parsedAge < 0) return 0

  const adultPrice = isDigitalPayment(paymentMethod) ? DIGITAL_ADULT_PRICE : BASE_ADULT_PRICE
  const childPrice = isDigitalPayment(paymentMethod) ? DIGITAL_CHILD_PRICE : BASE_CHILD_PRICE

  return parsedAge >= 12 ? adultPrice : childPrice
}

function baseAttendeePrice(age) {
  const parsedAge = Number(age)
  if (Number.isNaN(parsedAge) || parsedAge < 0) return 0
  return parsedAge >= 12 ? BASE_ADULT_PRICE : BASE_CHILD_PRICE
}

function formatMoney(value) {
  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Number(value) % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
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
  if (!primary) return 'Primary registrant information is required.'

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
  if (!text) return {}

  try {
    return JSON.parse(text)
  } catch (error) {
    return {}
  }
}

async function createSquarePayment({ sourceId, registrationId, primary, amountToCharge, squarePaymentType, paymentTest }) {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN
  const locationId = process.env.SQUARE_LOCATION_ID

  if (!accessToken || !locationId) throw new Error('Square payments are not configured.')

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
        amount: Math.round(Number(amountToCharge) * 100),
        currency: 'USD',
      },
      autocomplete: true,
      location_id: locationId,
      reference_id: registrationId,
      buyer_email_address: cleanString(primary.email),
      note: `${paymentTest ? 'TEST - ' : ''}The Family Gathering 2026 registration ${registrationId}${
        squarePaymentType ? ` (${squarePaymentType})` : ''
      }`,
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
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ secret, registration, attendees }),
  })

  const text = await response.text()
  let data = {}

  try {
    data = text ? JSON.parse(text) : {}
  } catch (error) {
    const snippet = text.slice(0, 180).replace(/\s+/g, ' ').trim()
    console.error('Apps Script non-JSON response:', {
      status: response.status,
      contentType: response.headers.get('content-type'),
      snippet,
    })
    throw new Error('Apps Script did not return JSON. Check the Web App deployment and /exec URL.')
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.error || 'Unable to save the registration to Google Sheets.')
  }

  return data
}

async function sendEmails({
  primary,
  attendees,
  registrationId,
  totalCost,
  baseTotalCost,
  paymentMethod,
  paymentInstructions,
  squarePaymentId,
  squareReceiptUrl,
  warning,
  paymentTest,
}) {
  if (!process.env.RESEND_API_KEY) return

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
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formatMoney(attendee.price)}</td>
        </tr>
      `
    )
    .join('')

  const paymentLabel = paymentMethod === 'Square' ? 'Pay Online' : paymentMethod

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #111111; max-width: 760px; margin: 0 auto;">
      <h2>${paymentTest ? 'Square Test Payment Confirmation' : 'The Family Gathering Registration Confirmation'}</h2>
      <p>Thank you, ${primary.fullName}. ${paymentTest ? 'Your Square test payment has been received.' : 'Your family registration has been received.'}</p>
      <p><strong>Registration ID:</strong> ${registrationId}</p>
      <p><strong>Total:</strong> ${formatMoney(totalCost)}</p>
      ${baseTotalCost !== totalCost ? `<p><strong>Base registration value:</strong> ${formatMoney(baseTotalCost)}</p>` : ''}
      <p><strong>Payment Method:</strong> ${paymentLabel}</p>
      ${squarePaymentId ? `<p><strong>Square Payment ID:</strong> ${squarePaymentId}</p>` : ''}
      <div style="margin: 24px 0; padding: 20px; background: #f5f2eb; border-left: 4px solid #C8A96B;">
        <p><strong>Payment Instructions:</strong></p>
        <p>${paymentInstructions}</p>
        ${squareReceiptUrl ? `<p><a href="${squareReceiptUrl}">View Square receipt</a></p>` : ''}
        ${warning ? `<p style="color: #92400e;"><strong>Note:</strong> ${warning}</p>` : ''}
      </div>
      <h3>Registrants</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th align="left" style="padding: 8px; border-bottom: 2px solid #111;">#</th>
            <th align="left" style="padding: 8px; border-bottom: 2px solid #111;">Name</th>
            <th align="left" style="padding: 8px; border-bottom: 2px solid #111;">Age</th>
            <th align="left" style="padding: 8px; border-bottom: 2px solid #111;">T-Shirt</th>
            <th align="left" style="padding: 8px; border-bottom: 2px solid #111;">Amount</th>
          </tr>
        </thead>
        <tbody>${attendeeListHtml}</tbody>
      </table>
      <p style="margin-top: 24px;">
        Event Date: Thursday, November 26, 2026<br />
        Location: National Guard Armory, Aliceville, Alabama
      </p>
    </div>
  `

  if (adminEmail) {
    await resend.emails.send({
      from: 'get ACEd, LLC <booking@getacedllc.com>',
      to: adminEmail,
      reply_to: primary.email,
      subject: `${paymentTest ? 'TEST - ' : ''}New Family Gathering Registration: ${primary.fullName}`,
      html: htmlBody,
    })
  }

  await resend.emails.send({
    from: 'get ACEd, LLC <booking@getacedllc.com>',
    to: primary.email,
    subject: `${paymentTest ? 'TEST - ' : ''}The Family Gathering Registration Confirmation`,
    html: htmlBody,
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const primary = body.primary || {}
    const additionalRegistrants = Array.isArray(body.additionalRegistrants) ? body.additionalRegistrants : []
    const paymentMethod = body.paymentMethod
    const squareSourceId = body.squareSourceId
    const squarePaymentType = cleanString(body.squarePaymentType) || 'Square'
    const paymentTest = paymentMethod === 'Square' && body.paymentTest === true

    const validationError = validatePayload({ primary, additionalRegistrants, paymentMethod, squareSourceId })
    if (validationError) return Response.json({ error: validationError }, { status: 400 })

    const attendees = normalizeAttendees(primary, additionalRegistrants)
    const attendeeCount = attendees.length
    const baseTotalCost = attendees.reduce((sum, attendee) => sum + baseAttendeePrice(attendee.age), 0)
    const calculatedTotalCost = attendees.reduce(
      (sum, attendee) => sum + attendeePrice(attendee.age, paymentMethod),
      0
    )
    const totalCost = paymentTest ? SQUARE_TEST_AMOUNT : calculatedTotalCost
    const submittedAt = new Date().toISOString()
    const registrationIdPrefix = paymentTest ? 'TFG-TEST' : 'TFG'
    const registrationId = `${registrationIdPrefix}-${submittedAt.slice(0, 10).replace(/-/g, '')}-${randomUUID()
      .slice(0, 8)
      .toUpperCase()}`

    let paymentStatus = 'Payment Pending'
    let paymentInstructions = PAYMENT_INSTRUCTIONS[paymentMethod]
    let squarePaymentId = ''
    let squareReceiptUrl = ''
    let warning = ''

    if (paymentMethod === 'CashApp') {
      paymentInstructions = `Send ${formatMoney(totalCost)} to $AnitaPrude.`
    }

    if (paymentMethod === 'Square') {
      const squarePayment = await createSquarePayment({
        sourceId: cleanString(squareSourceId),
        registrationId,
        primary,
        amountToCharge: totalCost,
        squarePaymentType,
        paymentTest,
      })

      squarePaymentId = squarePayment.id || ''
      squareReceiptUrl = squarePayment.receipt_url || ''
      paymentStatus =
        squarePayment.status === 'COMPLETED'
          ? paymentTest
            ? 'Paid - Square Test'
            : 'Paid'
          : `Square ${squarePayment.status || 'Payment Submitted'}`
      paymentInstructions = paymentTest
        ? 'Square test payment received. This was a $1.00 test charge and is not a live family registration payment.'
        : paymentStatus === 'Paid'
          ? 'Your online payment has been received through Square.'
          : 'Your online payment was submitted through Square. Please contact the organizer if you have questions.'
      warning = paymentTest
        ? `This was a $1.00 Square test payment. The actual calculated registration total would have been ${formatMoney(calculatedTotalCost)}.`
        : ''
    }

    const attendeesForSheet = attendees.map((attendee) => ({
      ...attendee,
      price: paymentTest ? baseAttendeePrice(attendee.age) : attendeePrice(attendee.age, paymentMethod),
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
      notes:
        baseTotalCost !== totalCost
          ? `Base registration total: ${formatMoney(baseTotalCost)} | Digital/payment total: ${formatMoney(totalCost)}${
              squarePaymentId ? ` | Square payment ID: ${squarePaymentId}` : ''
            }${squareReceiptUrl ? ` | Receipt: ${squareReceiptUrl}` : ''}`
          : squarePaymentId
            ? `Square ${squarePaymentType} payment ID: ${squarePaymentId}${squareReceiptUrl ? ` | Receipt: ${squareReceiptUrl}` : ''}`
            : warning,
      source: paymentTest ? 'get ACEd website - Square test' : 'get ACEd website',
    }

    await saveRegistrationToAppsScript({ registration, attendees: attendeesForSheet })

    await sendEmails({
      primary,
      attendees: attendeesForSheet,
      registrationId,
      totalCost,
      baseTotalCost,
      paymentMethod,
      paymentInstructions,
      squarePaymentId,
      squareReceiptUrl,
      warning,
      paymentTest,
    })

    return Response.json({
      success: true,
      registrationId,
      primaryName: cleanString(primary.fullName),
      attendeeCount,
      totalCost,
      baseTotalCost,
      chargedAmount: totalCost,
      paymentMethod,
      paymentInstructions,
      squarePaymentId,
      squareReceiptUrl,
      warning,
      paymentTest,
    })
  } catch (error) {
    console.error(error)
    return Response.json(
      { error: error.message || 'Something went wrong while submitting the registration.' },
      { status: 500 }
    )
  }
}
