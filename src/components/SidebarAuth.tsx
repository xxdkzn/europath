'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function SidebarAuth() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
      setLoading(false)
    })
  }, [])

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) return (
    <div className="rounded-2xl border p-5 animate-pulse" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', height: '140px' }} />
  )

  if (email) return (
    <div className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
          {email.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-sm truncate" style={{ color: 'var(--text)' }}>{email.split('@')[0]}</p>
          <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{email}</p>
        </div>
      </div>
      <Link href="/forum/new" className="block text-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition-colors mb-2">
        + Новая тема
      </Link>
      <button onClick={logout} className="w-full text-center text-sm py-2.5 rounded-xl border transition-colors hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 hover:border-red-200" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
        Выйти
      </button>
    </div>
  )

  return (
    <div className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Присоединяйся</h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
        Создай аккаунт чтобы задавать вопросы и делиться опытом
      </p>
      <Link href="/auth/register" className="block text-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition-colors mb-2">
        Создать аккаунт
      </Link>
      <Link href="/auth/login" className="block text-center text-sm py-2.5 rounded-xl border transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
        Войти
      </Link>
    </div>
  )
}