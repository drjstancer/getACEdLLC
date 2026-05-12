import { resend } from '../../../lib/resend'

export async function POST(request) {
  try {
    const body = await request.json()

    const {
      name,
      organization,
      email,
      goals,
      inquiryType,
    } = body

    if (!name || !email || !goals) {
      return Response.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    const inquiryPayload = {
      name,
      organization,
      email,
      goals,
      inquiryType,
      submittedAt: new Date().toISOString(),
    }

    console.log('Institutional Inquiry Received:', inquiryPayload)

    await resend.emails.send({
      from: 'get ACEd, LLC <booking@getacedllc.com>',
      to: process.env.CONTACT_EMAIL,
      reply_to: email,
      subject: `New ${inquiryType || 'Institutional'} Inquiry`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111111;">
          <h2>New Institutional Inquiry</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Organization:</strong> ${organization || 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>

          <div style="margin-top: 24px; padding: 20px; background: #f5f2eb; border-left: 4px solid #C8A96B;">
            ${goals}
          </div>
        </div>
      `,
    })

    await resend.emails.send({
      from: 'get ACEd, LLC <booking@getacedllc.com>',
      to: email,
      subject: 'Your Inquiry Has Been Received',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #111111; max-width: 640px; margin: 0 auto;">
          <h2 style="margin-bottom: 24px;">Thank You for Reaching Out</h2>

          <p>
            Thank you for contacting get ACEd, LLC.
          </p>

          <p>
            Your inquiry has been received and will be reviewed thoughtfully.
            We appreciate your interest in transformational educational leadership,
            institutional strategy, mentorship, and community-centered excellence.
          </p>

          <p>
            A response will follow as soon as possible.
          </p>

          <p style="margin-top: 40px;">
            Dr. Joel Stancer<br />
            get ACEd, LLC
          </p>
        </div>
      `,
    })

    return Response.json({
      success: true,
      message:
        'Thank you for your inquiry. Your partnership request has been received and a confirmation email has been sent.',
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error: 'Something went wrong processing the inquiry.',
      },
      { status: 500 }
    )
  }
}
