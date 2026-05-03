import { iTransactions } from '../../types/types';
import { formatBudgetAmount } from '../../utils/amountFormat';
import { getMonthBudgetTotals } from '../../utils/monthBudget';
import MonthBudgetRow from './MonthBudgetRow';

type MonthBudgetTableProps = {
  transactions: iTransactions[]
  onOrderByType: () => void
  onOrderByTitle: () => void
  onOrderByExpected: () => void
  onOrderByReal: () => void
  onEditExpense: (transaction: iTransactions) => void
  onDeleteExpense: (transaction: iTransactions) => void
}

const MonthBudgetTable = ({
  transactions,
  onOrderByType,
  onOrderByTitle,
  onOrderByExpected,
  onOrderByReal,
  onEditExpense,
  onDeleteExpense
}: MonthBudgetTableProps) => {
  const totals = getMonthBudgetTotals(transactions)

  return (
    <div className='border-secondary flex flex-col overflow-hidden rounded-md border-1'>
      <div className='bg-secondary text-primary grid grid-cols-6 px-4 py-1'>
        <p className='cursor-pointer' onClick={onOrderByType}>
          Tipo
        </p>
        <p className='col-span-2 cursor-pointer' onClick={onOrderByTitle}>
          Concepto
        </p>
        <p className='cursor-pointer' onClick={onOrderByExpected}>
          Estimado
        </p>
        <p className='cursor-pointer' onClick={onOrderByReal}>
          Real
        </p>
        <p></p>
      </div>

      {transactions.map(transaction => (
        <MonthBudgetRow
          key={transaction._id}
          transaction={transaction}
          onEdit={onEditExpense}
          onDelete={onDeleteExpense}
        />
      ))}

      {transactions.length === 0 && (
        <p className='p-4 text-center text-sm text-gray-500'>
          No hay transacciones para este mes.
        </p>
      )}

      <div className='bg-secondaryLight text-primary grid grid-cols-6 px-2 py-1'>
        <p className='col-span-3'></p>
        <p className='font-semibold'>
          {formatBudgetAmount(totals.expectedTotal)} €
        </p>
        <p className='font-semibold'>
          {formatBudgetAmount(totals.realTotal)} €
        </p>
        <p className='col-span-2'></p>
      </div>
    </div>
  )
}

export default MonthBudgetTable
