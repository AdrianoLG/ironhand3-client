import { MonthBudgetTotals } from '../types/monthBudget';
import { iTransactions } from '../types/types';
import { getSubscriptionsForMonth } from './subscription';

export const buildMonthTransactions = ({
  transactions,
  selectedMonth,
  selectedYear,
  monthOffset
}: {
  transactions?: iTransactions[]
  selectedMonth: number
  selectedYear: number
  monthOffset: number
}) => {
  const allTransactions = transactions ?? []
  const explicit = allTransactions.filter(
    transaction =>
      transaction.month === selectedMonth && transaction.year === selectedYear
  )
  const recurring = getSubscriptionsForMonth(allTransactions, monthOffset)

  const explicitIds = new Set(explicit.map(transaction => transaction._id))
  const explicitSubscriptionIds = new Set(
    explicit
      .map(transaction => transaction.subscription?._id)
      .filter((id): id is string => Boolean(id))
  )

  const recurringOnly = recurring.filter(transaction => {
    if (explicitIds.has(transaction._id)) return false

    const subscriptionId = transaction.subscription?._id
    if (!subscriptionId) return true

    return !explicitSubscriptionIds.has(subscriptionId)
  })

  return [...explicit, ...recurringOnly]
}

export const getMonthBudgetTotals = (
  transactions: iTransactions[]
): MonthBudgetTotals => {
  return {
    expectedTotal: transactions
      .map(transaction => transaction.expectedAmount)
      .reduce((accumulator, amount) => accumulator + amount, 0),
    realTotal: transactions
      .map(transaction => transaction.realAmount || 0)
      .reduce((accumulator, amount) => accumulator + amount, 0)
  }
}
