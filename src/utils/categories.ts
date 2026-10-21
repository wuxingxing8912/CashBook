import type { TransactionType } from '../types/transaction'

export const INCOME_CATEGORIES = ['工资', '奖金', '投资', '其他收入']
export const EXPENSE_CATEGORIES = [
  '餐饮',
  '交通',
  '购物',
  '居住',
  '娱乐',
  '医疗',
  '其他支出',
]

export const CATEGORY_MAP: Record<TransactionType, string[]> = {
  income: INCOME_CATEGORIES,
  expense: EXPENSE_CATEGORIES,
}
