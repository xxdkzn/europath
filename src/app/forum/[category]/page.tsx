'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import UserMenu from '@/components/UserMenu'

const CATEGORIES: Record<string, { name: string; desc: string; icon: string }> = {
  housing: { name: 'Жильё и аренда',   desc: 'Квартиры, комнаты, покупка недвижимости', icon: '🏠' },
  work:    { name: 'Работа и карьера',  desc: 'Трудоустройство, Blue Card, зарплаты',    icon: '💼' },
  visa:    { name: 'Визы и документы',  desc: 'ВНЖ, апостили, юридические вопросы',      icon: '📋' },
  bank:    { name: 'Банки и финансы',   desc: 'Счета, налоги, крипта для мигрантов',     icon: '🏦' },
  health:  { name: 'Здоровье',          desc: 'Страховки и медицина в странах ЕС',       icon: '🏥' },
  life:    { name: 'Жизнь в стране',    desc: 'Адаптация, образование, повседневность',  icon: '🌍' },
  general: { name: 'Общение',           desc: 'Знакомства, истории и советы',            icon: '💬' },
}

type Thread = {
  id: string
  title: string
  author_email: string
  created_at: string
  view_count: number
  reply_count?: number
}

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const cat = CATEGORIES[category]
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('threads')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setThreads(data || [])
        setLoading(false)
      })
  }, [category])

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime()
    const h = Math.floor(diff / 3600000)
    const d = Math.floor(diff / 86400000)
    if (h < 1) return 'только что'
    if (h < 24) return `${h} ч назад`
    return `${d} д назад`
  }

  if (!cat) return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="text-center">
        <p className="mb-2" style={{ color: 'var(--text)' }}>Категория не найдена</p>
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
              <span className="text-blue-600">🗺</span> EuroPath
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <Link href="/forum" style={{ color: 'var(--text-muted)' }}>Форум</Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text)' }}>{cat.name}</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{cat.icon}</span>
            <div>
              <h1 className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>{cat.name}</h1>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{cat.desc}</p>
            </div>
          </div>
          <Link href={`/forum/new?category=${category}`}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex-shrink-0">
            + Новая тема
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-20 rounded-xl border animate-pulse" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }} />
            ))}
          </div>
        ) : threads.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">💬</div>
            <p className="font-medium mb-2" style={{ color: 'var(--text)' }}>Пока нет тем</p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Будь первым кто начнёт обсуждение!</p>
            <Link href={`/forum/new?category=${category}`}
              className="text-sm bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Создать первую тему
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {threads.map((thread) => (
              <Link key={thread.id} href={`/forum/thread/${thread.id}`}
                className="flex items-start gap-4 p-4 rounded-xl border transition-all hover:border-blue-300 dark:hover:border-blue-700 block"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {thread.author_email?.slice(0,2).toUpperCase() || 'АН'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>{thread.title}</p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>{thread.author_email?.split('@')[0] || 'Аноним'}</span>
                    <span>{timeAgo(thread.created_at)}</span>
                    <span>👁 {thread.view_count}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}