import {
    FieldErrors, SubmitHandler, UseFormClearErrors, UseFormHandleSubmit, UseFormRegister,
    UseFormSetValue
} from 'react-hook-form';

import { iExpenseFormInput, iTransactionCategoryOption, iTransactions } from './types';

export type ExpenseFormContainerProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  monthOffset: number
  transactionData?: iTransactions
  allTransactions?: iTransactions[]
  onSuccess?: () => void
}

export type MonthPeriod = {
  month: number
  year: number
}

export type ExpenseValidationError = {
  field: keyof iExpenseFormInput
  message: string
}

export type MutationRunner = (options: {
  variables: Record<string, unknown>
}) => Promise<{ data?: Record<string, unknown> }>

export type ExpenseMutationRunners = {
  createTransaction: MutationRunner
  updateTransaction: MutationRunner
  removeTransaction: MutationRunner
  createSubscription: MutationRunner
  updateSubscription: MutationRunner
  removeSubscription: MutationRunner
}

export type PrepareLoanResult = {
  monthlyLoanExpectedAmount: number | null
  targetMonthRange: MonthPeriod[]
}

export type ExpenseFormProps = {
  handleSubmit: UseFormHandleSubmit<iExpenseFormInput>
  onSubmit: SubmitHandler<iExpenseFormInput>
  register: UseFormRegister<iExpenseFormInput>
  errors: FieldErrors<iExpenseFormInput>
  setValue: UseFormSetValue<iExpenseFormInput>
  clearErrors: UseFormClearErrors<iExpenseFormInput>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isEdit?: boolean
  categoryOptions: iTransactionCategoryOption[]
  isSubscriptionEnabled: boolean
  isLoan: boolean
  defaultValues: iExpenseFormInput
}
