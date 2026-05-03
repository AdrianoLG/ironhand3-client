import { useMutation } from '@apollo/client';

import {
    CREATE_SUBSCRIPTION, CREATE_TRANSACTION, REMOVE_SUBSCRIPTION, REMOVE_TRANSACTION,
    UPDATE_SUBSCRIPTION, UPDATE_TRANSACTION
} from '../gql/budgetMutations';
import { BUDGET_INFO } from '../gql/budgetQueries';
import { ExpenseMutationRunners } from '../types/expenseForm';

export const useExpenseMutations = (): ExpenseMutationRunners => {
  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [{ query: BUDGET_INFO }]
  })
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: [{ query: BUDGET_INFO }]
  })
  const [removeTransaction] = useMutation(REMOVE_TRANSACTION, {
    refetchQueries: [{ query: BUDGET_INFO }]
  })
  const [createSubscription] = useMutation(CREATE_SUBSCRIPTION)
  const [updateSubscription] = useMutation(UPDATE_SUBSCRIPTION)
  const [removeSubscription] = useMutation(REMOVE_SUBSCRIPTION)

  return {
    createTransaction,
    updateTransaction,
    removeTransaction,
    createSubscription,
    updateSubscription,
    removeSubscription
  }
}
