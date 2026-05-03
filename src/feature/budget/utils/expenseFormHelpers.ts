import { MonthPeriod } from '../types/expenseForm';
import { iTransactions, SubscriptionFrequency, TransactionCategory } from '../types/types';

const validCategories: TransactionCategory[] = [
  'HOUSE',
  'WORK',
  'FOOD',
  'VICE',
  'SHOP',
  'CAR',
  'OTHER',
  'HEALTH',
  'MOTORCYCLE',
  'TRAVEL',
  'MUSIC',
  'EDUCATION'
]

const validFrequencies: SubscriptionFrequency[] = [
  'MONTHLY',
  'BIMONTHLY',
  'ANNUALLY'
]

export const normalizeCategory = (
  category?: string
): TransactionCategory | '' => {
  const upper = category?.toUpperCase() as TransactionCategory | undefined
  return upper && validCategories.includes(upper) ? upper : ''
}

export const normalizeFrequency = (
  frequency?: string
): SubscriptionFrequency | '' => {
  const upper = frequency?.toUpperCase() as SubscriptionFrequency | undefined
  return upper && validFrequencies.includes(upper) ? upper : ''
}

export const toDateInputValue = (date?: Date | string) => {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 10)
}

export const getMonthKey = (year: number, month: number) => `${year}-${month}`

export const getMonthsBetweenInclusive = (startDate: Date, endDate: Date) => {
  const startMonthIndex = startDate.getFullYear() * 12 + startDate.getMonth()
  const endMonthIndex = endDate.getFullYear() * 12 + endDate.getMonth()

  return endMonthIndex - startMonthIndex + 1
}

export const getMonthlyLoanExpectedAmount = (
  totalAmount: number,
  startDate: Date,
  endDate: Date
) => {
  const months = getMonthsBetweenInclusive(startDate, endDate)
  if (months <= 0) return null

  return Number((totalAmount / months).toFixed(2))
}

export const getMonthRangeInclusive = (startDate: Date, endDate: Date) => {
  const months: MonthPeriod[] = []
  const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1)

  while (cursor <= end) {
    months.push({
      month: cursor.getMonth(),
      year: cursor.getFullYear()
    })

    cursor.setMonth(cursor.getMonth() + 1)
  }

  return months
}

export const getRecurringMonths = (
  startDate: Date,
  frequency: SubscriptionFrequency,
  endDate?: Date
) => {
  const rangeEnd = endDate ?? new Date()
  if (startDate > rangeEnd) return []

  const allMonths = getMonthRangeInclusive(startDate, rangeEnd)
  if (frequency === 'MONTHLY') return allMonths

  if (frequency === 'BIMONTHLY') {
    const startMonthIndex = startDate.getFullYear() * 12 + startDate.getMonth()

    return allMonths.filter(({ month, year }) => {
      const monthIndex = year * 12 + month
      return (monthIndex - startMonthIndex) % 2 === 0
    })
  }

  const annualStartMonth = startDate.getMonth()
  return allMonths.filter(({ month }) => month === annualStartMonth)
}

export const getRelatedTransactions = (
  allTransactions: iTransactions[],
  subscriptionId: string
) =>
  allTransactions.filter(
    transaction => transaction.subscription?._id === subscriptionId
  )
