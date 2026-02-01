import './globals.css'

export const metadata = {
  title: 'Furren - Handpicked Flight Deals Worldwide',
  description: 'Find the best international roundtrip flight deals Worldwide. Save up to 70% on flights to Dubai, London, Bangkok and more.',
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
