import { iTransactions } from '../types/types'

export const getSelectedPeriod = (monthOffset = 0) => {
  const today = new Date()
  const date = new Date(today.getFullYear(), today.getMonth() - monthOffset, 1)

  return {
    month: date.getMonth(),
    year: date.getFullYear()
  }
}

export const getMonthLabel = (monthOffset = 0) => {
  const { month, year } = getSelectedPeriod(monthOffset)
  const date = new Date(year, month, 1)

  return new Intl.DateTimeFormat('es-ES', {
    month: 'long',
    year: 'numeric'
  }).format(date)
}

export const getMaxMonthOffset = (transactions: iTransactions[]) => {
  if (transactions.length === 0) return 0

  const oldest = transactions.reduce((oldestTransaction, transaction) => {
    if (!oldestTransaction) return transaction

    if (transaction.year < oldestTransaction.year) return transaction
    if (
      transaction.year === oldestTransaction.year &&
      transaction.month < oldestTransaction.month
    ) {
      return transaction
    }

    return oldestTransaction
  }, transactions[0])

  const today = new Date()

  return Math.max(
    0,
    (today.getFullYear() - oldest.year) * 12 + (today.getMonth() - oldest.month)
  )
}

export const getPreviousMonthOffset = (current: number, max: number) =>
  Math.min(current + 1, max)

export const getNextMonthOffset = (current: number) => current - 1
