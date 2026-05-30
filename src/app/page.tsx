// src/app/page.tsx
// ─────────────────────────────────────────────
// Что это: Главная страница сайта (europath.app/)
// Это первое что видит пользователь
// ─────────────────────────────────────────────

import Link from 'next/link'
import { createClient } from '@/lib/supabase'

// Категории форума с иконками и цветами
const CATEGORIES = [
  { slug: 'housing',  name: 'Жильё и аренда',    desc: 'Квартиры, комнаты, покупка',     color: '#378ADD', icon: '🏠' },
  { slug: 'work',     name: 'Работа и карьера',   desc: 'Трудоустройство, Blue Card',     color: '#1D9E75', icon: '💼' },
  { slug: 'visa',     name: 'Визы и документы',   desc: 'ВНЖ, апостили, юридическое',    color: '#D85A30', icon: '📋' },
  { slug: 'bank',     name: 'Банки и финансы',    desc: 'Счета, налоги, крипта',          color: '#BA7517', icon: '🏦' },
  { slug: 'health',   name: 'Здоровье',           desc: 'Страховки, медицина',            color: '#993556', icon: '🏥' },
  { slug: 'life',     name: 'Жизнь в стране',     desc: 'Адаптация, образование',         color: '#534AB7', icon: '🌍' },
  { slug: 'general',  name: 'Общение',            desc: 'Знакомства и истории',           color: '#888780', icon: '💬' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* ── НАВИГАЦИЯ ── */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            🗺 EuroPath
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-normal">beta</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/forum" className="text-sm text-slate-600 hover:text-slate-900">Форум</Link>
            <Link href="/auth/login" className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700">
              Войти
            </Link>
          </div>
        </div>
      </nav>

      {/* ── БАННЕР ПОДДЕРЖКИ ── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <p className="text-sm text-amber-800">
            ❤️ EuroPath создан одним человеком для нашего сообщества — поддержи проект
          </p>
          <Link href="/support" className="text-sm font-medium text-amber-700 border border-amber-300 px-3 py-1 rounded-lg hover:bg-amber-100">
            Поддержать
          </Link>
        </div>
      </div>

      {/* ── ГЕРОЙ-СЕКЦИЯ ── */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-semibold text-slate-900 mb-4">
          Переезд в Европу —<br />с теми кто уже там
        </h1>
        <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
          Реальные советы, опыт и поддержка русскоязычного сообщества в 18 странах ЕС
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/forum" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700">
            Открыть форум
          </Link>
          <Link href="/auth/register" className="border border-slate-200 bg-white text-slate-700 px-6 py-3 rounded-xl font-medium hover:border-slate-300">
            Создать аккаунт
          </Link>
        </div>
      </section>

      {/* ── СТАТИСТИКА ── */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-4 gap-4">
          {[
            { n: '12,400+', l: 'Участников' },
            { n: '1,900+',  l: 'Тем на форуме' },
            { n: '18',      l: 'Стран ЕС' },
            { n: '47',      l: 'Онлайн сейчас' },
          ].map(s => (
            <div key={s.l} className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
              <div className="text-2xl font-semibold text-slate-900">{s.n}</div>
              <div className="text-sm text-slate-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── КАТЕГОРИИ ── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-semibold text-slate-900 mb-5">Разделы форума</h2>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/forum/${cat.slug}`}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-medium text-slate-900">{cat.name}</span>
              </div>
              <p className="text-sm text-slate-500">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}
