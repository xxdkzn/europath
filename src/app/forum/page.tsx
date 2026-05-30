// src/app/forum/page.tsx
// ─────────────────────────────────────────────
// Страница: europath.app/forum
// Показывает все категории + последние темы
// ─────────────────────────────────────────────

import Link from 'next/link'

const CATEGORIES = [
  { slug: 'housing',  name: 'Жильё и аренда',    count: 234, icon: '🏠', color: 'bg-blue-50 text-blue-700' },
  { slug: 'work',     name: 'Работа и карьера',   count: 187, icon: '💼', color: 'bg-green-50 text-green-700' },
  { slug: 'visa',     name: 'Визы и документы',   count: 312, icon: '📋', color: 'bg-orange-50 text-orange-700' },
  { slug: 'bank',     name: 'Банки и финансы',    count: 156, icon: '🏦', color: 'bg-amber-50 text-amber-700' },
  { slug: 'health',   name: 'Здоровье',           count: 98,  icon: '🏥', color: 'bg-pink-50 text-pink-700' },
  { slug: 'life',     name: 'Жизнь в стране',     count: 421, icon: '🌍', color: 'bg-purple-50 text-purple-700' },
  { slug: 'general',  name: 'Общение',            count: 543, icon: '💬', color: 'bg-slate-50 text-slate-700' },
]

// Заглушка для последних тем (потом заменим на реальные из Supabase)
const RECENT = [
  { id: '1', title: 'Снял квартиру в Берлине без Schufa — делюсь опытом', category: 'Жильё', author: 'МК', time: '2 ч назад', replies: 34 },
  { id: '2', title: 'ВНЖ в Чехии через бизнес — полный процесс 2025',      category: 'Визы',  author: 'АС', time: '3 ч назад', replies: 56 },
  { id: '3', title: 'Реальные зарплаты в Германии 2025 по профессиям',      category: 'Работа',author: 'НЖ', time: '5 ч назад', replies: 92 },
  { id: '4', title: 'Wise vs Revolut vs N26 — честное сравнение',           category: 'Банки', author: 'ВН', time: '8 ч назад', replies: 78 },
]

export default function ForumPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Навигация */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-slate-900">🗺 EuroPath</Link>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg">Войти</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-[1fr_280px] gap-6">

          {/* ── ОСНОВНОЙ КОНТЕНТ ── */}
          <div>
            {/* Категории */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-slate-900">Разделы форума</h1>
              <Link href="/forum/new" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                + Новая тема
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.slug}
                  href={`/forum/${cat.slug}`}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span className="font-medium text-slate-800 text-sm">{cat.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${cat.color}`}>{cat.count}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Последние темы */}
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Последние обсуждения</h2>
            <div className="space-y-3">
              {RECENT.map(t => (
                <Link
                  key={t.id}
                  href={`/forum/thread/${t.id}`}
                  className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 hover:border-slate-300 transition-all block"
                >
                  {/* Аватар автора */}
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {t.author}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-sm truncate">{t.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{t.category} · {t.time} · {t.replies} ответов</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── БОКОВАЯ ПАНЕЛЬ ── */}
          <div className="space-y-4">
            {/* Статистика */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-medium text-slate-900 mb-3">Статистика</h3>
              <div className="space-y-2">
                {[
                  ['Участников', '12,400'],
                  ['Тем', '1,951'],
                  ['Ответов', '28,340'],
                  ['Онлайн сейчас', '47'],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-sm">
                    <span className="text-slate-500">{l}</span>
                    <span className="font-medium text-slate-900">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Поддержка */}
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
              <p className="text-sm font-medium text-amber-900 mb-1">❤️ Поддержите EuroPath</p>
              <p className="text-xs text-amber-700 mb-3">Помогите нам развиваться и помогать другим</p>
              <Link href="/support" className="block text-center text-sm font-medium text-amber-800 border border-amber-300 bg-white py-2 rounded-lg hover:bg-amber-50">
                Поддержать проект
              </Link>
            </div>

            {/* Telegram */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
              <p className="text-sm font-medium text-blue-900 mb-1">📱 Telegram канал</p>
              <p className="text-xs text-blue-700 mb-3">Новости и советы прямо в мессенджер</p>
              <a href="https://t.me/твой_канал" target="_blank" className="block text-center text-sm font-medium text-blue-800 border border-blue-300 bg-white py-2 rounded-lg hover:bg-blue-50">
                Подписаться
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
