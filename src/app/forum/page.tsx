import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import UserMenu from '@/components/UserMenu'

const CATEGORIES = [
  { slug: 'housing', name: 'Жильё и аренда',   desc: 'Квартиры, комнаты, покупка',    icon: '🏠', count: 234 },
  { slug: 'work',    name: 'Работа и карьера',  desc: 'Трудоустройство, Blue Card',    icon: '💼', count: 187 },
  { slug: 'visa',    name: 'Визы и документы',  desc: 'ВНЖ, апостили, юридическое',   icon: '📋', count: 312 },
  { slug: 'bank',    name: 'Банки и финансы',   desc: 'Счета, налоги, крипта',         icon: '🏦', count: 156 },
  { slug: 'health',  name: 'Здоровье',          desc: 'Страховки, медицина',           icon: '🏥', count: 98  },
  { slug: 'life',    name: 'Жизнь в стране',    desc: 'Адаптация, образование',        icon: '🌍', count: 421 },
  { slug: 'general', name: 'Общение',           desc: 'Знакомства и истории',          icon: '💬', count: 543 },
]

const RECENT = [
  { id: '1', title: 'Снял квартиру в Берлине без Schufa — делюсь опытом', cat: 'housing', catName: 'Жильё',  author: 'МК', time: '2 ч назад',  replies: 34, hot: true  },
  { id: '2', title: 'ВНЖ в Чехии через бизнес — полный процесс 2025',     cat: 'visa',    catName: 'Визы',   author: 'АС', time: '3 ч назад',  replies: 56, hot: true  },
  { id: '3', title: 'Реальные зарплаты в Германии 2025 по профессиям',     cat: 'work',    catName: 'Работа', author: 'НЖ', time: '5 ч назад',  replies: 92, hot: true  },
  { id: '4', title: 'Wise vs Revolut vs N26 — честное сравнение',          cat: 'bank',    catName: 'Банки',  author: 'ВН', time: '8 ч назад',  replies: 78, hot: false },
  { id: '5', title: 'Как найти жильё в Праге за 2 недели',                 cat: 'housing', catName: 'Жильё',  author: 'АП', time: '1 д назад',  replies: 21, hot: false },
  { id: '6', title: 'Blue Card EU — что это и как получить',               cat: 'work',    catName: 'Работа', author: 'ИМ', time: '2 д назад',  replies: 28, hot: false },
]

const CAT_COLORS: Record<string, string> = {
  housing: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
  work:    'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
  visa:    'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
  bank:    'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
  health:  'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300',
  life:    'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
  general: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
}

export default function ForumPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>

      {/* Навигация */}
      <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg" style={{ color: 'var(--text)' }}>
            <span className="text-blue-600">🗺</span> EuroPath
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-[1fr_300px] gap-8">

          {/* Основной контент */}
          <div>
            {/* Заголовок + кнопка */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>Форум</h1>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Реальный опыт переезда в Европу</p>
              </div>
              <Link href="/auth/register" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                + Новая тема
              </Link>
            </div>

            {/* Категории */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <Link key={cat.slug} href={`/forum/${cat.slug}`}
                  className="flex items-center gap-3 p-3 rounded-xl border transition-all hover:border-blue-300 dark:hover:border-blue-700"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <span className="text-xl">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{cat.name}</div>
                    <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{cat.desc}</div>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-muted)' }}>
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>

            {/* Последние темы */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Последние обсуждения</h2>
              <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-muted)' }}>
                Все активные
              </span>
            </div>

            <div className="space-y-2">
              {RECENT.map((t) => (
                <Link key={t.id} href={`/forum/thread/${t.id}`}
                  className="flex items-start gap-3 p-4 rounded-xl border transition-all hover:border-blue-300 dark:hover:border-blue-700 block"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  {/* Аватар */}
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {t.author}
                  </div>
                  {/* Контент */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text)' }}>{t.title}</p>
                      {t.hot && (
                        <span className="flex-shrink-0 text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-full font-medium">
                          🔥
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${CAT_COLORS[t.cat]}`}>{t.catName}</span>
                      <span>{t.time}</span>
                      <span>💬 {t.replies} ответов</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Сайдбар */}
          <div className="space-y-4">

            {/* Вступить */}
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

            {/* Статистика */}
            <div className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>Статистика</h3>
              <div className="space-y-3">
                {[
                  { l: 'Участников', v: '12 400', icon: '👥' },
                  { l: 'Тем на форуме', v: '1 951', icon: '💬' },
                  { l: 'Стран ЕС', v: '18', icon: '🇪🇺' },
                  { l: 'Онлайн сейчас', v: '47', icon: '🟢' },
                ].map(({ l, v, icon }) => (
                  <div key={l} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{icon} {l}</span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Поддержать */}
            <div className="rounded-2xl border border-amber-200 dark:border-amber-800 p-5 bg-amber-50 dark:bg-amber-950">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-1">❤️ Поддержите EuroPath</p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mb-3">
                Проект создан одним человеком. Ваша поддержка помогает развиваться.
              </p>
              <Link href="/support" className="block text-center text-xs font-medium text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 bg-white dark:bg-transparent py-2 rounded-xl hover:bg-amber-50 transition-colors">
                Поддержать проект
              </Link>
            </div>

            {/* Telegram */}
            <div className="rounded-2xl border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>📱 Telegram канал</p>
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>Новости и советы прямо в мессенджер</p>
              <a href="https://t.me/euro_path" target="_blank"
                className="block text-center text-xs font-medium py-2 rounded-xl border transition-colors hover:bg-blue-50 dark:hover:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                Подписаться
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}