'use client'
import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import UserMenu from '@/components/UserMenu'

const MOCK_THREAD = {
  id: '1',
  title: 'Снял квартиру в Берлине без Schufa — делюсь опытом',
  body: `Привет всем! Хочу поделиться своим опытом поиска квартиры в Берлине без Schufa — знаю что многие с этим сталкиваются.

Приехал 3 месяца назад, Schufa естественно нет. Сначала казалось что это нереально, но нашёл способ.

**Что помогло:**

1. Искал через Wohnungsmarktplatz и eBay Kleinanzeigen, а не только ImmoScout
2. Писал сразу на немецком (использовал DeepL)
3. Предлагал оплатить 3 месяца вперёд — это очень помогает
4. Прикладывал рекомендательное письмо от предыдущего арендодателя

В итоге нашёл за 3 недели двушку в Neukölln за 980€ тёплыми. Хозяин — пожилой немец, согласился без Schufa когда я предложил предоплату.

Если есть вопросы — спрашивайте, расскажу подробнее!`,
  author: { initials: 'МК', name: 'max_berlin', time: '2 ч назад' },
  category: { slug: 'housing', name: 'Жильё и аренда' },
  views: 1240,
  replies: [
    {
      id: 'r1',
      body: 'Спасибо за пост! А какой район посоветуешь для первого переезда? Смотрю на Mitte и Prenzlauer Berg, но там дорого.',
      author: { initials: 'АП', name: 'anna_prague' },
      time: '1 ч назад',
    },
    {
      id: 'r2',
      body: 'Neukölln хороший выбор, там много русскоязычных. Ещё советую смотреть Tempelhof и Wedding — дешевле и транспорт хороший. Mitte нереально дорого для старта.',
      author: { initials: 'МК', name: 'max_berlin' },
      time: '45 мин назад',
    },
    {
      id: 'r3',
      body: 'Подскажи, предоплату за 3 месяца — это помимо депозита или вместо? Хозяева соглашаются заменить депозит на предоплату?',
      author: { initials: 'ДВ', name: 'dima_v' },
      time: '30 мин назад',
    },
  ],
}

export default function ThreadPage() {
  const [replyText, setReplyText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const thread = MOCK_THREAD

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim()) return
    setSubmitted(true)
    setReplyText('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>

      {/* Навигация */}
      <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm min-w-0">
            <Link href="/" className="font-semibold text-lg flex-shrink-0" style={{ color: 'var(--text)' }}>
              <span className="text-blue-600">🗺</span>
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <Link href="/forum" className="flex-shrink-0" style={{ color: 'var(--text-muted)' }}>Форум</Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <Link href={`/forum/${thread.category.slug}`} className="flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
              {thread.category.name}
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span className="truncate" style={{ color: 'var(--text)' }}>{thread.title}</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Заголовок темы */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Link href={`/forum/${thread.category.slug}`}
              className="text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium">
              {thread.category.name}
            </Link>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>👁 {thread.views} просмотров</span>
          </div>
          <h1 className="text-2xl font-semibold leading-snug" style={{ color: 'var(--text)' }}>
            {thread.title}
          </h1>
        </div>

        {/* Первый пост */}
        <div className="rounded-2xl border p-6 mb-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
              {thread.author.initials}
            </div>
            <div>
              <p className="font-medium text-sm" style={{ color: 'var(--text)' }}>{thread.author.name}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{thread.author.time}</p>
            </div>
          </div>
          <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text)' }}>
            {thread.body}
          </div>
          <div className="flex items-center gap-4 mt-5 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <button className="flex items-center gap-1.5 text-sm transition-colors hover:text-blue-600" style={{ color: 'var(--text-muted)' }}>
              👍 Полезно
            </button>
            <button className="flex items-center gap-1.5 text-sm transition-colors hover:text-blue-600" style={{ color: 'var(--text-muted)' }}>
              💬 Ответить
            </button>
          </div>
        </div>

        {/* Ответы */}
        <div className="mb-2">
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
            {thread.replies.length} ответа
          </p>

          <div className="space-y-3">
            {thread.replies.map((reply, i) => (
              <div key={reply.id} className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-semibold text-xs flex-shrink-0">
                    {reply.author.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{reply.author.name}</span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{reply.time}</span>
                      <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>#{i + 1}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{reply.body}</p>
                    <button className="mt-3 text-xs transition-colors hover:text-blue-600" style={{ color: 'var(--text-muted)' }}>
                      👍 Полезно
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Форма ответа */}
        <div className="mt-6 rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>Написать ответ</h3>

          {submitted ? (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm px-4 py-3 rounded-xl">
              ✅ Ответ отправлен! (Подключение к базе данных — следующий шаг)
            </div>
          ) : (
            <form onSubmit={handleReply}>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Поделись опытом или задай вопрос..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border text-sm resize-none outline-none focus:border-blue-500 transition-colors mb-3"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Войди чтобы ответ сохранился в базе данных
                </p>
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white px-5 py-2 rounded-xl font-medium transition-colors"
                >
                  Отправить
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </main>
  )
}