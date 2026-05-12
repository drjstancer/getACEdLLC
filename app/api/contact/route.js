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

    // Future Resend Integration
    // await resend.emails.send({
    //   from: 'inquiries@getacedllc.com',
    //   to: 'hello@getacedllc.com',
    //   subject: `New ${inquiryType || 'Institutional'} Inquiry`,
    //   html: `...`,
    // })

    return Response.json({
      success: true,
      message:
        'Thank you for your inquiry. Your partnership request has been received and will be reviewed thoughtfully.',
    })
  } catch (error) {
    return Response.json(
      {
        error: 'Something went wrong processing the inquiry.',
      },
      { status: 500 }
    )
  }
}
