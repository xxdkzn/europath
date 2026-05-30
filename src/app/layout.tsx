import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EuroPath — Форум русскоязычных в Европе',
  description: 'Всё о переезде в Европу: жильё, работа, визы, банки и жизнь за рубежом.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}