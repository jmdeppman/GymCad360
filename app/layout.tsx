import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GymCad 360',
  description: 'Gincana de Saúde Corporativa',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'GymCad 360' },
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  )
}