'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import { Suspense } from 'react'

const CATEGORIES = [
  { slug: 'housing', name: 'Жильё и аренда',  icon: '🏠' },
  { slug: 'work',    name: 'Работа и карьера', icon: '💼' },
  { slug: 'visa',    name: 'Визы и документы', icon: '📋' },
  { slug: 'bank',    name: 'Банки и финансы',  icon: '🏦' },
  { slug: 'health',  name: 'Здоровье',         icon: '🏥' },
  { slug: 'life',    name: 'Жизнь в стране',   icon: '🌍' },
  { slug: 'general', name: 'Общение',          icon: '💬' },
]

function NewThreadForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState(params.get('category') || 'general')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/auth/login')
      else setUser(data.user)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data, error } = await supabase
      .from('threads')
      .insert({
        title: title.trim(),
        body: body.trim(),
        category,
        author_id: user.id,
        author_email: user.email,
      })
      .select()
      .single()

    if (error) {
      setError('Ошибка при создании темы. Попробуй ещё раз.')
      setLoading(false)
    } else {
      router.push(`/forum/thread/${data.id}`)
    }
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="font-semibold text-lg" style={{ color: 'var(--text)' }}>
              <span className="text-blue-600">🗺</span> EuroPath
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <Link href="/forum" style={{ color: 'var(--text-muted)' }}>Форум</Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text)' }}>Новая тема</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text)' }}>Создать тему</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>Категория</label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat.slug} type="button" onClick={() => setCategory(cat.slug)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-sm text-left transition-all ${
                    category === cat.slug
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                      : ''
                  }`}
                  style={category !== cat.slug ? { borderColor: 'var(--border)', color: 'var(--text)', backgroundColor: 'var(--bg-card)' } : {}}>
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>Заголовок</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Кратко и понятно опиши тему"
              maxLength={150}
              required
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-blue-500 transition-colors"
              style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
            />
            <p className="text-xs mt-1 text-right" style={{ color: 'var(--text-muted)' }}>{title.length}/150</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>Текст</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Опиши ситуацию подробно. Чем больше деталей — тем лучше ответы."
              rows={8}
              required
              className="w-full px-4 py-3 rounded-xl border text-sm resize-none outline-none focus:border-blue-500 transition-colors"
              style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link href="/forum" className="text-sm" style={{ color: 'var(--text-muted)' }}>
              ← Отмена
            </Link>
            <button
              type="submit"
              disabled={loading || !title.trim() || !body.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              {loading ? 'Публикуем...' : 'Опубликовать тему'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default function NewPage() {
  return (
    <Suspense fallback={<div />}>
      <NewThreadForm />
    </Suspense>
  )
}