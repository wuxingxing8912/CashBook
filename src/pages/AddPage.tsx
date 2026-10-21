import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTransactions } from '../hooks/useTransactions'
import { CATEGORY_MAP } from '../utils/categories'
import type { TransactionType } from '../types/transaction'

export default function AddPage() {
  const navigate = useNavigate()
  const { addTransaction } = useTransactions()

  const [type, setType] = useState<TransactionType>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORY_MAP.expense[0])
  const [note, setNote] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))

  const handleTypeChange = (next: TransactionType) => {
    setType(next)
    setCategory(CATEGORY_MAP[next][0])
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = Number(amount)
    if (!amount || Number.isNaN(value) || value <= 0) return
    addTransaction({ amount: value, type, category, note, date })
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h1 className="mb-2 text-xl font-bold">记一笔</h1>

      <div className="flex gap-2">
        {(['expense', 'income'] as TransactionType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTypeChange(t)}
            className={`flex-1 rounded-lg border py-2 ${
              type === t ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200'
            }`}
          >
            {t === 'expense' ? '支出' : '收入'}
          </button>
        ))}
      </div>

      <label className="block">
        <span className="text-sm text-gray-600">金额</span>
        <input
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="mt-1 w-full rounded-lg border border-gray-200 p-2"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">分类</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-200 p-2"
        >
          {CATEGORY_MAP[type].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">日期</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-200 p-2"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">备注（可选）</span>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-200 p-2"
        />
      </label>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-2 text-white"
      >
        保存
      </button>
    </form>
  )
}
