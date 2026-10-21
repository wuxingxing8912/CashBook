import { useMemo } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import TransactionList from '../components/TransactionList'

export default function HomePage() {
  const { transactions, removeTransaction } = useTransactions()

  const sorted = useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date)),
    [transactions],
  )

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">记账本</h1>
      {sorted.length === 0 ? (
        <p className="text-gray-500">还没有记录，点击底部“记一笔”开始吧。</p>
      ) : (
        <TransactionList transactions={sorted} onDelete={removeTransaction} />
      )}
    </div>
  )
}
