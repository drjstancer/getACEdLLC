import './globals.css'

export const metadata = {
  title: 'get ACEd, LLC | Dr. Joel Stancer',
  description:
    'Transformational educational consulting rooted in leadership, mentorship, culture, and community-centered excellence.',
  metadataBase: new URL('https://www.getacedllc.com'),
  openGraph: {
    title: 'get ACEd, LLC | Dr. Joel Stancer',
    description:
      'Transformational educational consulting rooted in leadership, mentorship, culture, and community-centered excellence.',
    url: 'https://www.getacedllc.com',
    siteName: 'get ACEd, LLC',
    images: [
      {
        url: '/hero-drj.png',
        width: 1200,
        height: 630,
        alt: 'Dr. Joel Stancer | get ACEd, LLC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'get ACEd, LLC | Dr. Joel Stancer',
    description:
      'Transformational educational consulting rooted in leadership, mentorship, culture, and community-centered excellence.',
    images: ['/hero-drj.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
