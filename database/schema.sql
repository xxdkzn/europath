-- ══════════════════════════════════════════════
-- БАЗА ДАННЫХ EUROPATH
-- ══════════════════════════════════════════════
-- Что это такое?
-- Это SQL-скрипт который создаёт все таблицы в Supabase.
-- Запустить один раз в Supabase → SQL Editor → New query
-- ══════════════════════════════════════════════

-- ── ТАБЛИЦА: Профили пользователей ─────────────
-- (Расширяет стандартную auth.users из Supabase)
CREATE TABLE public.profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username    TEXT UNIQUE NOT NULL,         -- Имя пользователя (уникальное)
  avatar_url  TEXT,                         -- Ссылка на фото профиля
  country     TEXT,                         -- Страна проживания (Германия, Чехия...)
  bio         TEXT,                         -- Коротко о себе
  rep         INT DEFAULT 0,               -- Репутация (растёт с лайками)
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── ТАБЛИЦА: Категории форума ───────────────────
CREATE TABLE public.categories (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,         -- URL-имя: "housing", "work", "visa"
  name        TEXT NOT NULL,               -- Отображаемое имя на русском
  description TEXT,                        -- Краткое описание категории
  icon        TEXT,                        -- Иконка (emoji или название)
  color       TEXT,                        -- Цвет категории (hex)
  post_count  INT DEFAULT 0,              -- Счётчик тем (обновляется автоматически)
  sort_order  INT DEFAULT 0               -- Порядок отображения
);

-- ── ТАБЛИЦА: Темы (топики) форума ──────────────
CREATE TABLE public.threads (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,               -- Заголовок темы
  body        TEXT NOT NULL,               -- Текст первого поста
  category_id INT REFERENCES categories(id),
  author_id   UUID REFERENCES profiles(id),
  is_pinned   BOOL DEFAULT FALSE,          -- Закреплённая тема
  is_locked   BOOL DEFAULT FALSE,          -- Закрытая (нельзя отвечать)
  view_count  INT DEFAULT 0,
  reply_count INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()    -- Время последнего ответа
);

-- ── ТАБЛИЦА: Ответы в темах ─────────────────────
CREATE TABLE public.replies (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  body        TEXT NOT NULL,
  thread_id   UUID REFERENCES threads(id) ON DELETE CASCADE,
  author_id   UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── ТАБЛИЦА: Лайки ──────────────────────────────
CREATE TABLE public.likes (
  id          SERIAL PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id),
  thread_id   UUID REFERENCES threads(id) ON DELETE CASCADE,
  UNIQUE(user_id, thread_id)               -- Один лайк на тему от одного пользователя
);

-- ════════════════════════════════════════════════
-- НАЧАЛЬНЫЕ ДАННЫЕ: Категории форума
-- ════════════════════════════════════════════════
INSERT INTO categories (slug, name, description, icon, color, sort_order) VALUES
  ('housing',  'Жильё и аренда',       'Поиск квартиры, аренда, покупка жилья в ЕС',         '🏠', '#378ADD', 1),
  ('work',     'Работа и карьера',     'Трудоустройство, Blue Card, зарплаты',                '💼', '#1D9E75', 2),
  ('visa',     'Визы и документы',     'ВНЖ, визы, апостили и юридические вопросы',           '📋', '#D85A30', 3),
  ('bank',     'Банки и финансы',      'Счета, переводы, налоги, крипта для мигрантов',       '🏦', '#BA7517', 4),
  ('health',   'Здоровье',             'Страховки, медицина в странах ЕС',                    '🏥', '#993556', 5),
  ('life',     'Жизнь в стране',       'Повседневная жизнь, образование, адаптация',          '🌍', '#534AB7', 6),
  ('general',  'Общение',              'Знакомства, истории переезда и общие темы',            '💬', '#888780', 7);

-- ════════════════════════════════════════════════
-- БЕЗОПАСНОСТЬ: Кто что может делать
-- ════════════════════════════════════════════════
ALTER TABLE profiles   ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads    ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies    ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes      ENABLE ROW LEVEL SECURITY;

-- Читать профили могут все
CREATE POLICY "Профили видны всем" ON profiles FOR SELECT USING (true);
-- Изменять профиль может только его владелец
CREATE POLICY "Редактировать свой профиль" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Темы видны всем, создавать могут только авторизованные
CREATE POLICY "Темы видны всем" ON threads FOR SELECT USING (true);
CREATE POLICY "Создавать темы" ON threads FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Редактировать свои темы" ON threads FOR UPDATE USING (auth.uid() = author_id);

-- То же для ответов
CREATE POLICY "Ответы видны всем" ON replies FOR SELECT USING (true);
CREATE POLICY "Создавать ответы" ON replies FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Лайки
CREATE POLICY "Лайки видны всем" ON likes FOR SELECT USING (true);
CREATE POLICY "Ставить лайки" ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Убирать свои лайки" ON likes FOR DELETE USING (auth.uid() = user_id);
