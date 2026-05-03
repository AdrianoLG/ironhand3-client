import { iTransactions } from '../types/types'
import { getTransactionCategoryInfo } from './transactionCategoryInfo'

export type SortDirection = 'asc' | 'desc'

export function sortByType(
  transactions: iTransactions[],
  direction: SortDirection
): iTransactions[] {
  return [...transactions].sort((a, b) => {
    const aLabel = getTransactionCategoryInfo(a.category).labelEs
    const bLabel = getTransactionCategoryInfo(b.category).labelEs
    const cmp = aLabel.localeCompare(bLabel, 'es')
    return direction === 'asc' ? cmp : -cmp
  })
}

export function sortByTitle(
  transactions: iTransactions[],
  direction: SortDirection
): iTransactions[] {
  return [...transactions].sort((a, b) => {
    const cmp = a.title.localeCompare(b.title)
    return direction === 'asc' ? cmp : -cmp
  })
}

export function sortByExpected(
  transactions: iTransactions[],
  direction: SortDirection
): iTransactions[] {
  return [...transactions].sort((a, b) => {
    const cmp = a.expectedAmount - b.expectedAmount
    return direction === 'asc' ? cmp : -cmp
  })
}

export function sortByReal(
  transactions: iTransactions[],
  direction: SortDirection
): iTransactions[] {
  return [...transactions].sort((a, b) => {
    const aVal = a.realAmount ?? 0
    const bVal = b.realAmount ?? 0
    const cmp = aVal - bVal
    return direction === 'asc' ? cmp : -cmp
  })
}
