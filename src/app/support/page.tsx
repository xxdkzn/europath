// src/app/support/page.tsx
// ─────────────────────────────────────────────
// Страница: europath.app/support
// Страница поддержки основателя
// ─────────────────────────────────────────────

'use client'
import { useState } from 'react'
import Link from 'next/link'

const AMOUNTS = [5, 10, 25, 50, 100, 250]

const METHODS = [
  {
    id: 'usdt',
    name: 'USDT (TRC20)',
    icon: '₮',
    desc: 'Tether — самый популярный стейблкоин',
    address: 'ТВОЙ_USDT_АДРЕС_СЮДА',
    color: 'bg-green-50 border-green-200',
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    icon: '₿',
    desc: 'Самая надёжная криптовалюта',
    address: 'ТВОЙ_BTC_АДРЕС_СЮДА',
    color: 'bg-orange-50 border-orange-200',
  },
  {
    id: 'ton',
    name: 'TON',
    icon: '💎',
    desc: 'Telegram-монета, удобно через Telegram Wallet',
    address: 'ТВОЙ_TON_АДРЕС_СЮДА',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    icon: 'Ξ',
    desc: 'Вторая по капитализации криптовалюта',
    address: 'ТВОЙ_ETH_АДРЕС_СЮДА',
    color: 'bg-purple-50 border-purple-200',
  },
]

export default function SupportPage() {
  const [amount, setAmount] = useState<number>(10)
  const [custom, setCustom] = useState('')
  const [method, setMethod] = useState<string>('usdt')
  const [copied, setCopied] = useState(false)

  const selectedMethod = METHODS.find(m => m.id === method)!

  const copyAddress = async () => {
    await navigator.clipboard.writeText(selectedMethod.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-xl font-semibold text-slate-900">🗺 EuroPath</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-4xl mb-3">❤️</div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">Поддержите EuroPath</h1>
          <p className="text-slate-500 max-w-md mx-auto">
            EuroPath создан одним человеком с нуля. Ваша поддержка помогает платить за сервер, создавать контент и развивать платформу.
          </p>
        </div>

        {/* Выбор суммы */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
          <p className="font-medium text-slate-900 mb-3">Выберите сумму (€)</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {AMOUNTS.map(a => (
              <button
                key={a}
                onClick={() => { setAmount(a); setCustom('') }}
                className={`py-2.5 rounded-xl border font-medium text-sm transition-all ${
                  amount === a && !custom
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                €{a}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Своя сумма"
            value={custom}
            onChange={e => { setCustom(e.target.value); setAmount(Number(e.target.value)) }}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Выбор метода */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
          <p className="font-medium text-slate-900 mb-3">Способ перевода</p>
          <div className="grid grid-cols-2 gap-2">
            {METHODS.map(m => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  method === m.id ? m.color + ' border-2' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-lg font-medium mb-0.5">{m.icon} {m.name}</div>
                <div className="text-xs text-slate-500">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Адрес кошелька */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="font-medium text-slate-900 mb-1">Адрес кошелька — {selectedMethod.name}</p>
          <p className="text-xs text-slate-500 mb-3">
            Отправьте €{custom || amount} в {selectedMethod.name} на этот адрес
          </p>
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-3 border border-slate-200">
            <code className="flex-1 text-xs text-slate-700 break-all font-mono">
              {selectedMethod.address}
            </code>
            <button
              onClick={copyAddress}
              className="flex-shrink-0 text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-slate-300 font-medium"
            >
              {copied ? '✓ Скопировано' : 'Копировать'}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            После перевода напишите нам — мы добавим вас в список благодарностей 🙏
          </p>
        </div>
      </div>
    </main>
  )
}
