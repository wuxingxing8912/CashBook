import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { useTransactions } from '../hooks/useTransactions'

export default function StatsPage() {
  const { transactions } = useTransactions()
  const [month, setMonth] = useState(() => format(new Date(), 'yyyy-MM'))

  const stats = useMemo(() => {
    const list = transactions.filter((t) => t.date.startsWith(month))
    const income = list
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    const expense = list
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    return { income, expense, balance: income - expense }
  }, [transactions, month])

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">月度统计</h1>

      <label className="mb-4 block">
        <span className="text-sm text-gray-600">选择月份</span>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-200 p-2"
        />
      </label>

      <div className="space-y-3">
        <div className="rounded-lg border border-gray-100 p-3">
          <div className="text-sm text-gray-500">收入</div>
          <div className="text-lg font-semibold text-green-600">
            {stats.income}
          </div>
        </div>
        <div className="rounded-lg border border-gray-100 p-3">
          <div className="text-sm text-gray-500">支出</div>
          <div className="text-lg font-semibold text-red-600">
            {stats.expense}
          </div>
        </div>
        <div className="rounded-lg border border-gray-100 p-3">
          <div className="text-sm text-gray-500">结余</div>
          <div className="text-lg font-semibold">{stats.balance}</div>
        </div>
      </div>
    </div>
  )
}
