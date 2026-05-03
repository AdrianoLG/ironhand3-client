import { useState } from 'react';

import { useMutation } from '@apollo/client';

import { REMOVE_SUBSCRIPTION, REMOVE_TRANSACTION } from '../gql/budgetMutations';
import { BUDGET_INFO } from '../gql/budgetQueries';
import { iTransactions } from '../types/types';

export const useDeleteExpense = (transactions?: iTransactions[]) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] =
    useState<iTransactions | null>(null)

  const [removeTransaction] = useMutation(REMOVE_TRANSACTION, {
    refetchQueries: [{ query: BUDGET_INFO }]
  })
  const [removeSubscription] = useMutation(REMOVE_SUBSCRIPTION)

  const handleDeleteClick = (transaction: iTransactions) => {
    setTransactionToDelete(transaction)
    setIsDeleteAlertOpen(true)
  }

  const handleDeleteExpense = async () => {
    if (!transactionToDelete) return

    if (transactionToDelete.subscription?._id) {
      const relatedTransactions = (transactions ?? []).filter(
        transaction =>
          transaction.subscription?._id ===
          transactionToDelete.subscription?._id
      )

      for (const transaction of relatedTransactions) {
        await removeTransaction({
          variables: {
            id: transaction._id
          }
        })
      }

      await removeSubscription({
        variables: {
          id: transactionToDelete.subscription._id
        }
      })
    } else {
      await removeTransaction({
        variables: {
          id: transactionToDelete._id
        }
      })
    }

    setTransactionToDelete(null)
    setIsDeleteAlertOpen(false)
  }

  return {
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    handleDeleteClick,
    handleDeleteExpense
  }
}
