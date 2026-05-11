import './globals.css'

export const metadata = {
  title: 'get ACEd, LLC | Dr. Joel Stancer',
  description:
    'Transformational educational consulting rooted in leadership, mentorship, culture, and community.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
