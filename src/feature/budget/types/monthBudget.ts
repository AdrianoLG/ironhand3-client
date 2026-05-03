import { SortDirection } from '../utils/transactionOrder';
import { iTransactions } from './types';

export type SortKey = 'type' | 'title' | 'expected' | 'real' | null

export type MonthBudgetProps = {
  transactions?: iTransactions[]
  monthOffset: number
  monthLabel: string
}

export type MonthBudgetTotals = {
  expectedTotal: number
  realTotal: number
}

export type MonthBudgetSortingResult = {
  sortKey: SortKey
  sortDirection: SortDirection
  displayList: iTransactions[]
  orderByType: () => void
  orderByTitle: () => void
  orderByExpected: () => void
  orderByReal: () => void
}

export type MonthBudgetDialogsProps = {
  monthOffset: number
  selectedMonth: number
  selectedYear: number
  transactions?: iTransactions[]
  editingTransaction: iTransactions | null
  setEditingTransaction: React.Dispatch<
    React.SetStateAction<iTransactions | null>
  >
  isExpenseDialogOpen: boolean
  setIsExpenseDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  isDeleteAlertOpen: boolean
  setIsDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
  onDeleteExpense: () => Promise<void>
}
