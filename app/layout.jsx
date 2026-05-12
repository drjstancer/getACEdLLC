import './globals.css'

export const metadata = {
  title: {
    default: 'get ACEd, LLC | Dr. Joel Stancer',
    template: '%s | get ACEd, LLC',
  },
  description:
    'Transformational educational leadership rooted in mentorship, institutional strategy, pathway development, culture, and community-centered excellence.',
  metadataBase: new URL('https://www.getacedllc.com'),
  openGraph: {
    title: 'get ACEd, LLC | Dr. Joel Stancer',
    description:
      'Transformational educational leadership rooted in mentorship, institutional strategy, pathway development, culture, and community-centered excellence.',
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
      'Transformational educational leadership rooted in mentorship, institutional strategy, pathway development, culture, and community-centered excellence.',
    images: ['/hero-drj.png'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
