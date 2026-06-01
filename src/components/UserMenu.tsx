'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function UserMenu() {
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

  if (loading) return null

  if (!email) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth/login" className="text-sm px-3 py-1.5 rounded-lg border transition-colors" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
          Войти
        </Link>
        <Link href="/auth/register" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors">
          Регистрация
        </Link>
      </div>
    )
  }

  const initials = email.slice(0, 2).toUpperCase()

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
          {initials}
        </div>
        <span className="text-sm hidden md:block" style={{ color: 'var(--text-muted)' }}>
          {email.split('@')[0]}
        </span>
      </div>
      <button onClick={logout} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 hover:border-red-200" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
        Выйти
      </button>
    </div>
  )
}