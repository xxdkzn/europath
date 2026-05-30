// src/lib/supabase.ts
// ─────────────────────────────────────────────
// Что это такое?
// Это "мост" между нашим сайтом и базой данных Supabase.
// Через него мы читаем и записываем данные.
// ─────────────────────────────────────────────

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    // Эти переменные мы зададим в файле .env.local
    // Они хранят секретный адрес нашей базы данных
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
