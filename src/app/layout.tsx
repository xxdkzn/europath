// src/app/layout.tsx
// ─────────────────────────────────────────────
// Что это такое?
// Это "скелет" всего сайта. Всё что здесь написано —
// присутствует на КАЖДОЙ странице (шапка, подвал и т.д.)
// ─────────────────────────────────────────────

import type { Metadata } from 'next'
import './globals.css'

// Мета-данные — то что видно в Google и в заголовке вкладки браузера
export const metadata: Metadata = {
  title: 'EuroPath — Форум русскоязычных в Европе',
  description: 'Всё о переезде в Европу: жильё, работа, визы, банки и жизнь за рубежом. Реальный опыт русскоязычного сообщества.',
  keywords: 'переезд в европу, русские в германии, релокация, ВНЖ, работа в европе',
  openGraph: {
    title: 'EuroPath',
    description: 'Форум русскоязычных в Европе',
    type: 'website',
  },
}

export default function RootLayout({
  children, // children = содержимое каждой страницы
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        {/* Здесь будут шапка и подвал, которые мы создадим позже */}
        {children}
      </body>
    </html>
  )
}
