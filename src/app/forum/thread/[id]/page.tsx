'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import UserMenu from '@/components/UserMenu'

type Thread = { id: string; title: string; body: string; category: string; author_email: string; created_at: string; view_count: number }
type Reply  = { id: string; body: string; author_email: string; created_at: string }

const CAT_NAMES: Record<string, string> = {
  housing:'Жильё и аренда', work:'Работа и карьера', visa:'Визы и документы',
  bank:'Банки и финансы', health:'Здоровье', life:'Жизнь в стране', general:'Общение',
}

export default function ThreadPage() {
  const params = useParams()
  const id = params.id as string
  const [thread, setThread] = useState<Thread | null>(null)
  const [replies, setReplies] = useState<Reply[]>([])
  const [replyText, setReplyText] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    Promise.all([
      supabase.from('threads').select('*').eq('id', id).single(),
      supabase.from('replies').select('*').eq('thread_id', id).order('created_at'),
    ]).then(([{ data: t }, { data: r }]) => {
      setThread(t)
      setReplies(r || [])
      setLoading(false)
      if (t) supabase.from('threads').update({ view_count: (t.view_count || 0) + 1 }).eq('id', id).then(() => {})
    })
  }, [id])

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim() || !user) return
    setSending(true)

    const supabase = createClient()
    const { data } = await supabase
      .from('replies')
      .insert({ body: replyText.trim(), thread_id: id, author_id: user.id, author_email: user.email })
      .select().single()

    if (data) {
      setReplies(prev => [...prev, data])
      setReplyText('')
    }
    setSending(false)
  }

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime()
    const h = Math.floor(diff / 3600000)
    const d = Math.floor(diff / 86400000)
    if (h < 1) return 'только что'
    if (h < 24) return `${h} ч назад`
    return `${d} д назад`
  }

  if (loading) return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Загружаем тему...</div>
    </main>
  )

  if (!thread) return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="text-center">
        <p className="mb-3" style={{ color: 'var(--text)' }}>Тема не найдена</p>
        <Link href="/forum" className="text-blue-600 text-sm">← На форум</Link>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm min-w-0">
            <Link href="/" className="font-semibold text-lg flex-shrink-0" style={{ color: 'var(--text)' }}>
              <span className="text-blue-600">🗺</span>
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <Link href="/forum" style={{ color: 'var(--text-muted)' }}>Форум</Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <Link href={`/forum/${thread.category}`} style={{ color: 'var(--text-muted)' }}>
              {CAT_NAMES[thread.category] || thread.category}
            </Link>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Заголовок */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Link href={`/forum/${thread.category}`}
              className="text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium">
              {CAT_NAMES[thread.category]}
            </Link>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>👁 {thread.view_count}</span>
          </div>
          <h1 className="text-2xl font-semibold leading-snug" style={{ color: 'var(--text)' }}>
            {thread.title}
          </h1>
        </div>

        {/* Основной пост */}
        <div className="rounded-2xl border p-6 mb-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
              {thread.author_email?.slice(0,2).toUpperCase() || 'АН'}
            </div>
            <div>
              <p className="font-medium text-sm" style={{ color: 'var(--text)' }}>
                {thread.author_email?.split('@')[0] || 'Аноним'}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{timeAgo(thread.created_at)}</p>
            </div>
          </div>
          <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text)' }}>
            {thread.body}
          </div>
        </div>

        {/* Ответы */}
        {replies.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
              {replies.length} {replies.length === 1 ? 'ответ' : 'ответа'}
            </p>
            <div className="space-y-3">
              {replies.map((reply, i) => (
                <div key={reply.id} className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-semibold text-xs flex-shrink-0">
                      {reply.author_email?.slice(0,2).toUpperCase() || 'АН'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                          {reply.author_email?.split('@')[0] || 'Аноним'}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{timeAgo(reply.created_at)}</span>
                        <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>#{i + 1}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{reply.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Форма ответа */}
        <div className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>Написать ответ</h3>
          {!user ? (
            <div className="text-center py-4">
              <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>Войди чтобы ответить</p>
              <Link href="/auth/login" className="text-sm bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                Войти
              </Link>
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
              <div className="flex justify-end">
                <button type="submit" disabled={sending || !replyText.trim()}
                  className="text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white px-5 py-2 rounded-xl font-medium transition-colors">
                  {sending ? 'Отправляем...' : 'Отправить'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </main>
  )
}