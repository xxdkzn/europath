import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import UserMenu from '@/components/UserMenu'

const CATEGORIES: Record<string, { name: string; desc: string; icon: string }> = {
  housing: { name: 'Жильё и аренда',   desc: 'Квартиры, комнаты, покупка недвижимости в ЕС', icon: '🏠' },
  work:    { name: 'Работа и карьера',  desc: 'Трудоустройство, Blue Card, зарплаты',         icon: '💼' },
  visa:    { name: 'Визы и документы',  desc: 'ВНЖ, апостили, юридические вопросы',           icon: '📋' },
  bank:    { name: 'Банки и финансы',   desc: 'Счета, налоги, крипта для мигрантов',          icon: '🏦' },
  health:  { name: 'Здоровье',          desc: 'Страховки и медицина в странах ЕС',            icon: '🏥' },
  life:    { name: 'Жизнь в стране',    desc: 'Адаптация, образование, повседневность',       icon: '🌍' },
  general: { name: 'Общение',           desc: 'Знакомства, истории и советы',                 icon: '💬' },
}

const MOCK_THREADS = [
  { id: '1', title: 'Снял квартиру в Берлине без Schufa — делюсь опытом', author: 'МК', time: '2 ч назад',  replies: 34, views: 1240, hot: true  },
  { id: '2', title: 'Как найти жильё в Праге за 2 недели: реальный опыт',  author: 'АП', time: '5 ч назад',  replies: 21, views: 876,  hot: false },
  { id: '3', title: 'Варшава vs Краков — где дешевле и лучше жить?',       author: 'ЕТ', time: '1 д назад',  replies: 67, views: 2100, hot: true  },
  { id: '4', title: 'Депозит при аренде — как вернуть в Германии?',        author: 'ДЛ', time: '2 д назад',  replies: 15, views: 543,  hot: false },
  { id: '5', title: 'Районы Берлина для русскоязычных — личный опыт',      author: 'СМ', time: '3 д назад',  replies: 44, views: 1890, hot: false },
]

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = CATEGORIES[params.category]

  if (!cat) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="text-center">
          <p className="text-lg font-medium mb-2" style={{ color: 'var(--text)' }}>Категория не найдена</p>
          <Link href="/forum" className="text-blue-600 text-sm hover:underline">← Вернуться на форум</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-semibold text-lg" style={{ color: 'var(--text)' }}>
              <span className="text-blue-600">🗺</span> EuroPath
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <Link href="/forum" className="text-sm" style={{ color: 'var(--text-muted)' }}>Форум</Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span className="text-sm" style={{ color: 'var(--text)' }}>{cat.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Заголовок категории */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{cat.icon}</div>
            <div>
              <h1 className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>{cat.name}</h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{cat.desc}</p>
            </div>
          </div>
          <Link href="/auth/register" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex-shrink-0">
            + Новая тема
          </Link>
        </div>

        {/* Список тем */}
        <div className="space-y-2">
          {MOCK_THREADS.map((thread) => (
            <Link key={thread.id} href={`/forum/thread/${thread.id}`}
              className="flex items-start gap-4 p-4 rounded-xl border transition-all hover:border-blue-300 dark:hover:border-blue-700 block"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                {thread.author}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-1.5">
                  <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text)' }}>{thread.title}</p>
                  {thread.hot && <span className="flex-shrink-0 text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-full">🔥</span>}
                </div>
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span>{thread.time}</span>
                  <span>💬 {thread.replies} ответов</span>
                  <span>👁 {thread.views} просмотров</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}