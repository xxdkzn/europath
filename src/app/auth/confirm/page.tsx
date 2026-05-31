'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function ConfirmPage() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const code = params.get('code')
    if (!code) { router.push('/auth/login'); return }

    const supabase = createClient()
    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) router.push('/auth/login')
      else router.push('/forum')
    })
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="text-center">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Подтверждаем аккаунт...</p>
      </div>
    </main>
  )
}