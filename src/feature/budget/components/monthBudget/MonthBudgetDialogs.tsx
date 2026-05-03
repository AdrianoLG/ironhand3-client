import { AlertDialog, Dialog } from '../../../../components/organisms/dialogs';
import ExpenseFormContainer from '../../forms/ExpenseFormContainer.tsx';
import { MonthBudgetDialogsProps } from '../../types/monthBudget';

const MonthBudgetDialogs = ({
  monthOffset,
  selectedMonth,
  selectedYear,
  transactions,
  editingTransaction,
  setEditingTransaction,
  isExpenseDialogOpen,
  setIsExpenseDialogOpen,
  isDeleteAlertOpen,
  setIsDeleteAlertOpen,
  onDeleteExpense
}: MonthBudgetDialogsProps) => {
  return (
    <>
      <Dialog
        buttonText=''
        title={editingTransaction ? 'Editar gasto' : 'Añadir gasto'}
        description={
          editingTransaction
            ? 'Actualiza los datos del gasto'
            : 'Introduce los datos del nuevo gasto'
        }
        image='budget-bg'
        child={
          <ExpenseFormContainer
            key={
              editingTransaction?._id || `new-${selectedYear}-${selectedMonth}`
            }
            setIsOpen={setIsExpenseDialogOpen}
            monthOffset={monthOffset}
            transactionData={editingTransaction || undefined}
            allTransactions={transactions}
            onSuccess={() => setEditingTransaction(null)}
          />
        }
        isOpen={isExpenseDialogOpen}
        setIsOpen={setIsExpenseDialogOpen}
        hideTrigger
      />

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        title='¿Quieres eliminar este gasto?'
        description='Esta acción no se puede deshacer y se eliminará de tu presupuesto.'
        confirmText='Sí, eliminar gasto'
        onConfirm={onDeleteExpense}
        layout='compact'
      />
    </>
  )
}

export default MonthBudgetDialogs
