import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import type { Transaction } from '../types/transaction'
import { loadTransactions, saveTransactions } from '../utils/storage'

interface TransactionsContextValue {
  transactions: Transaction[]
  addTransaction: (tx: Omit<Transaction, 'id'>) => void
  removeTransaction: (id: string) => void
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null)

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadTransactions(),
  )

  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  const addTransaction = useCallback((tx: Omit<Transaction, 'id'>) => {
    setTransactions((prev) => [...prev, { ...tx, id: crypto.randomUUID() }])
  }, [])

  const removeTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <TransactionsContext
      value={{ transactions, addTransaction, removeTransaction }}
    >
      {children}
    </TransactionsContext>
  )
}

export function useTransactions(): TransactionsContextValue {
  const ctx = useContext(TransactionsContext)
  if (!ctx) {
    throw new Error('useTransactions must be used within a TransactionsProvider')
  }
  return ctx
}
