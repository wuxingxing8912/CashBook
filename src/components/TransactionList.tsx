import type { Transaction } from '../types/transaction'

interface Props {
  transactions: Transaction[]
  onDelete: (id: string) => void
}

export default function TransactionList({ transactions, onDelete }: Props) {
  return (
    <ul className="space-y-2">
      {transactions.map((t) => (
        <li
          key={t.id}
          className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
        >
          <div className="min-w-0">
            <div className="font-medium">{t.category}</div>
            <div className="truncate text-sm text-gray-500">
              {t.date}
              {t.note ? ` · ${t.note}` : ''}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}
            >
              {t.type === 'income' ? '+' : '-'}
              {t.amount}
            </span>
            <button
              type="button"
              onClick={() => onDelete(t.id)}
              className="text-sm text-gray-400"
            >
              删除
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
