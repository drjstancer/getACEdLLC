import './globals.css'
import { Analytics } from '@vercel/analytics/next'

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
        url: '/og-getaced-v2.png',
        width: 1200,
        height: 630,
        alt: 'GETACEDLLC.COM | Transformational Educational Leadership',
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
    images: ['/og-getaced-v2.png'],
  },
  icons: {
    icon: '/brand/favicons/getaced-favicon.png',
    shortcut: '/brand/favicons/getaced-favicon.png',
    apple: '/brand/favicons/getaced-favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
