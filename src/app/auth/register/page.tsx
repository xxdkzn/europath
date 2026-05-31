'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import ThemeToggle from '@/components/ThemeToggle'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 6) {
      setError('Пароль должен быть минимум 6 символов')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      setError(error.message === 'User already registered'
        ? 'Этот email уже зарегистрирован'
        : 'Ошибка регистрации. Попробуй ещё раз.')
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>Проверь почту!</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Мы отправили письмо на <strong>{email}</strong>. Перейди по ссылке чтобы подтвердить аккаунт.
          </p>
          <Link href="/auth/login" className="text-blue-600 hover:underline text-sm font-medium">
            Войти после подтверждения →
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
      <nav className="border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg" style={{ color: 'var(--text)' }}>
            <span className="text-blue-600">🗺</span> EuroPath
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text)' }}>Создать аккаунт</h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Присоединяйся к сообществу EuroPath</p>
          </div>

          <form onSubmit={handleRegister} className="rounded-2xl border p-6 space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            {error && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>Имя пользователя</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="europath_user"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:border-blue-500 transition-colors"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:border-blue-500 transition-colors"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Минимум 6 символов"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none focus:border-blue-500 transition-colors"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              {loading ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
            </button>

            <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
              Регистрируясь, ты соглашаешься с правилами сообщества
            </p>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
            Уже есть аккаунт?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}