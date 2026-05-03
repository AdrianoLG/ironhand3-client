import { useMemo, useState } from 'react';

import { Button } from '../../../components/atoms';
import { useDeleteExpense } from '../hooks/useDeleteExpense';
import { useMonthBudgetSorting } from '../hooks/useMonthBudgetSorting';
import { MonthBudgetProps } from '../types/monthBudget';
import { iTransactions } from '../types/types';
import { buildMonthTransactions } from '../utils/monthBudget';
import { getSelectedPeriod } from '../utils/transactionMonth';
import MonthBudgetDialogs from './monthBudget/MonthBudgetDialogs';
import MonthBudgetTable from './monthBudget/MonthBudgetTable';

const MonthBudget = ({
  transactions,
  monthOffset,
  monthLabel
}: MonthBudgetProps) => {
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] =
    useState<iTransactions | null>(null)

  const { month: selectedMonth, year: selectedYear } =
    getSelectedPeriod(monthOffset)

  const monthTransactions = useMemo(() => {
    return buildMonthTransactions({
      transactions,
      selectedMonth,
      selectedYear,
      monthOffset
    })
  }, [selectedMonth, selectedYear, monthOffset, transactions])

  const {
    displayList,
    orderByType,
    orderByTitle,
    orderByExpected,
    orderByReal
  } = useMonthBudgetSorting(monthTransactions)

  const {
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    handleDeleteClick,
    handleDeleteExpense
  } = useDeleteExpense(transactions)

  const handleAddExpense = () => {
    setEditingTransaction(null)
    setIsExpenseDialogOpen(true)
  }

  const handleEditExpense = (transaction: iTransactions) => {
    setEditingTransaction(transaction)
    setIsExpenseDialogOpen(true)
  }

  return (
    <div className='month-budget col-span-3'>
      <h2 className='mb-4 text-xl font-semibold'>
        Presupuesto de {monthLabel}
      </h2>
      <MonthBudgetTable
        transactions={displayList}
        onOrderByType={orderByType}
        onOrderByTitle={orderByTitle}
        onOrderByExpected={orderByExpected}
        onOrderByReal={orderByReal}
        onEditExpense={handleEditExpense}
        onDeleteExpense={handleDeleteClick}
      />
      <div className='my-4'>
        <Button
          text='Añadir gasto'
          small
          isFit
          onMouseClick={handleAddExpense}
        />
      </div>

      <MonthBudgetDialogs
        monthOffset={monthOffset}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        transactions={transactions}
        editingTransaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
        isExpenseDialogOpen={isExpenseDialogOpen}
        setIsExpenseDialogOpen={setIsExpenseDialogOpen}
        isDeleteAlertOpen={isDeleteAlertOpen}
        setIsDeleteAlertOpen={setIsDeleteAlertOpen}
        onDeleteExpense={handleDeleteExpense}
      />
    </div>
  )
}

export default MonthBudget
