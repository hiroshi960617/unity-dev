import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DEV.CHAIN',
  description: 'Portfolio',
  generator: 'DEV',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
