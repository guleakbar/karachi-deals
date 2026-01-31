import './globals.css'

export const metadata = {
  title: 'Karachi Deals - Handpicked Flight Deals from Karachi',
  description: 'Find the best international roundtrip flight deals from Karachi. Save up to 70% on flights to Dubai, London, Bangkok and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
