import { iTransactions } from '../types/types';

const getMonthRange = (monthOffset = 0) => {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth() - monthOffset, 1)
  const end = new Date(
    today.getFullYear(),
    today.getMonth() - monthOffset + 1,
    0
  )

  return { start, end }
}

export const getMonthRangeLabel = (monthOffset = 0) => {
  const { start } = getMonthRange(monthOffset)
  return new Intl.DateTimeFormat('es-ES', {
    month: 'long',
    year: 'numeric'
  }).format(start)
}

export const getPreviousMonthOffset = (current: number, max: number) =>
  Math.min(current + 1, max)

export const getNextMonthOffset = (current: number) => Math.max(current - 1, 0)

export const getMaxMonthOffset = (transactions: iTransactions[]) => {
  const subscriptions = transactions.filter(t => t.subscription)
  if (subscriptions.length === 0) return 0

  const oldestStart = subscriptions.reduce((oldest, current) => {
    const currentStart = new Date(current.subscription!.startDate).getTime()
    return currentStart < oldest ? currentStart : oldest
  }, Number.POSITIVE_INFINITY)

  if (!Number.isFinite(oldestStart)) return 0

  const today = new Date()
  const oldestDate = new Date(oldestStart)

  const monthDiff =
    (today.getFullYear() - oldestDate.getFullYear()) * 12 +
    (today.getMonth() - oldestDate.getMonth())

  return Math.max(0, monthDiff)
}

export const getSubscriptionsForMonth = (
  transactions: iTransactions[],
  monthOffset = 0
) => {
  const { start, end } = getMonthRange(monthOffset)
  const targetMonth = start.getMonth()
  const targetYear = start.getFullYear()

  const subscriptionsForMonth = transactions.filter(transaction => {
    const subscription = transaction.subscription
    if (!subscription || !subscription.isActive) return false

    const frequency = subscription.frequency?.toLowerCase()
    const startDate = new Date(subscription.startDate)
    const endDate = subscription.endDate ? new Date(subscription.endDate) : null

    const isActiveInMonth = startDate <= end && (!endDate || endDate >= start)
    if (!isActiveInMonth) return false

    if (frequency === 'monthly') return true
    if (frequency === 'bimonthly') {
      const startMonthIndex =
        startDate.getFullYear() * 12 + startDate.getMonth()
      const targetMonthIndex = start.getFullYear() * 12 + start.getMonth()

      return (targetMonthIndex - startMonthIndex) % 2 === 0
    }
    if (frequency === 'annually')
      return startDate.getMonth() === start.getMonth()

    return false
  })

  const transactionsBySubscription = new Map<string, iTransactions[]>()

  for (const transaction of subscriptionsForMonth) {
    const subscriptionId = transaction.subscription?._id
    if (!subscriptionId) continue

    const current = transactionsBySubscription.get(subscriptionId) ?? []
    current.push(transaction)
    transactionsBySubscription.set(subscriptionId, current)
  }

  return Array.from(transactionsBySubscription.values())
    .map(group => {
      const explicitForMonth = group.find(
        transaction =>
          transaction.month === targetMonth && transaction.year === targetYear
      )

      if (explicitForMonth) return explicitForMonth

      const template = group[0]
      return {
        ...template,
        month: targetMonth,
        year: targetYear,
        realAmount: undefined,
        isPaid: false
      }
    })
    .filter(Boolean)
}
