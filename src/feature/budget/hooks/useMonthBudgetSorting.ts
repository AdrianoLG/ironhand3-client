import { useMemo, useState } from 'react';

import { MonthBudgetSortingResult, SortKey } from '../types/monthBudget';
import { iTransactions } from '../types/types';
import {
    sortByExpected, sortByReal, sortByTitle, sortByType, SortDirection
} from '../utils/transactionOrder';

export const useMonthBudgetSorting = (
  transactions: iTransactions[]
): MonthBudgetSortingResult => {
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const handleSort = (key: SortKey) => {
    const newDirection =
      sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc'

    setSortKey(key)
    setSortDirection(newDirection)
  }

  const orderByType = () => handleSort('type')
  const orderByTitle = () => handleSort('title')
  const orderByExpected = () => handleSort('expected')
  const orderByReal = () => handleSort('real')

  const displayList = useMemo(() => {
    if (sortKey === 'type') return sortByType(transactions, sortDirection)
    if (sortKey === 'title') return sortByTitle(transactions, sortDirection)
    if (sortKey === 'expected') {
      return sortByExpected(transactions, sortDirection)
    }
    if (sortKey === 'real') return sortByReal(transactions, sortDirection)

    return transactions
  }, [transactions, sortDirection, sortKey])

  return {
    sortKey,
    sortDirection,
    displayList,
    orderByType,
    orderByTitle,
    orderByExpected,
    orderByReal
  }
}
