export async function POST(request) {
  try {
    const body = await request.json()

    const { name, organization, email, goals } = body

    if (!name || !email || !goals) {
      return Response.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    console.log('Institutional Inquiry Received:', {
      name,
      organization,
      email,
      goals,
    })

    return Response.json({
      success: true,
      message:
        'Thank you for your inquiry. We look forward to reviewing your partnership goals.',
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
