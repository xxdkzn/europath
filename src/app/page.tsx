import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import UserMenu from '@/components/UserMenu'

const CATEGORIES = [
  { slug: 'housing', name: 'Жильё и аренда',   desc: 'Квартиры, комнаты, покупка недвижимости', icon: '🏠', count: 234 },
  { slug: 'work',    name: 'Работа и карьера',  desc: 'Трудоустройство, Blue Card, зарплаты',    icon: '💼', count: 187 },
  { slug: 'visa',    name: 'Визы и документы',  desc: 'ВНЖ, апостили, юридические вопросы',      icon: '📋', count: 312 },
  { slug: 'bank',    name: 'Банки и финансы',   desc: 'Счета, налоги, крипта для мигрантов',     icon: '🏦', count: 156 },
  { slug: 'health',  name: 'Здоровье',          desc: 'Страховки и медицина в странах ЕС',       icon: '🏥', count: 98  },
  { slug: 'life',    name: 'Жизнь в стране',    desc: 'Адаптация, образование, повседневность',  icon: '🌍', count: 421 },
  { slug: 'general', name: 'Общение',           desc: 'Знакомства, истории и советы',            icon: '💬', count: 543 },
]

const STATS = [
  { n: '12 400+', l: 'Участников' },
  { n: '1 900+',  l: 'Тем' },
  { n: '18',      l: 'Стран ЕС' },
  { n: '47',      l: 'Онлайн' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>

      {/* Навигация */}
      <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg" style={{ color: 'var(--text)' }}>
            <span className="text-blue-600">🗺</span> EuroPath
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full font-normal">beta</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/forum" className="text-sm px-3 py-1.5" style={{ color: 'var(--text-muted)' }}>Форум</Link>
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </nav>

      {/* Баннер */}
      <div className="bg-amber-50 dark:bg-amber-950 border-b border-amber-200 dark:border-amber-800">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            ❤️ EuroPath создан одним человеком для нашего сообщества
          </p>
          <Link href="/support" className="text-xs font-medium text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 px-3 py-1 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors">
            Поддержать
          </Link>
        </div>
      </div>

      {/* Герой */}
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-sm px-4 py-1.5 rounded-full mb-6 border border-blue-200 dark:border-blue-800">
          🇪🇺 Сообщество в 18 странах Европы
        </div>
        <h1 className="text-5xl font-semibold mb-5 leading-tight" style={{ color: 'var(--text)' }}>
          Переезд в Европу —<br />с теми кто уже там
        </h1>
        <p className="text-xl mb-10 max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
          Реальный опыт и поддержка русскоязычного сообщества. Без воды — только практика.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/forum" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-medium text-base transition-colors shadow-sm">
            Открыть форум
          </Link>
          <Link href="/support" className="px-8 py-3.5 rounded-xl font-medium text-base transition-colors border" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', backgroundColor: 'var(--bg-card)' }}>
            Поддержать проект
          </Link>
        </div>
      </section>

      {/* Статистика */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.l} className="rounded-2xl border p-6 text-center" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="text-3xl font-semibold text-blue-600 mb-1">{s.n}</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Категории */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text)' }}>Разделы форума</h2>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/forum/${cat.slug}`}
              className="group rounded-2xl border p-5 transition-all hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-medium" style={{ color: 'var(--text)' }}>{cat.name}</span>
                </div>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full" style={{ color: 'var(--text-muted)' }}>
                  {cat.count}
                </span>
              </div>
              <p className="text-sm ml-11" style={{ color: 'var(--text-muted)' }}>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}