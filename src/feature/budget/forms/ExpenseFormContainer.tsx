import { SubmitHandler, useForm } from 'react-hook-form';

import { useExpenseMutations } from '../hooks/useExpenseMutations';
import { ExpenseFormContainerProps } from '../types/expenseForm';
import { iExpenseFormInput } from '../types/types';
import {
    buildExpenseInitialValues, prepareLoanDistribution, validateExpenseFormData
} from '../utils/expenseForm';
import {
    saveSingleExpenseTransaction, syncRecurringSubscriptionTransactions, syncSubscription
} from '../utils/subscriptionSync';
import { transactionCategoryOptions } from '../utils/transactionCategoryInfo';
import { getSelectedPeriod } from '../utils/transactionMonth';
import ExpenseForm from './ExpenseForm';

const ExpenseFormContainer = ({
  setIsOpen,
  monthOffset,
  transactionData,
  allTransactions,
  onSuccess
}: ExpenseFormContainerProps) => {
  const isEdit = Boolean(transactionData)
  const { month: selectedMonth, year: selectedYear } =
    getSelectedPeriod(monthOffset)

  const mutations = useExpenseMutations()
  const initialValues: iExpenseFormInput =
    buildExpenseInitialValues(transactionData)

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
    reset
  } = useForm<iExpenseFormInput>({
    defaultValues: initialValues
  })

  const isRecurring = watch('isRecurring')
  const isLoan = watch('isLoan')
  const isSubscriptionEnabled = Boolean(isRecurring || isLoan)

  const onSubmit: SubmitHandler<iExpenseFormInput> = async formData => {
    const validationError = validateExpenseFormData(
      formData,
      isSubscriptionEnabled
    )

    if (validationError) {
      setError(validationError.field, {
        type: 'custom',
        message: validationError.message
      })
      return
    }

    clearErrors()

    let subscriptionId = transactionData?.subscription?._id
    const previousSubscriptionId = transactionData?.subscription?._id
    const { monthlyLoanExpectedAmount, targetMonthRange } =
      prepareLoanDistribution(formData, isSubscriptionEnabled)

    subscriptionId = await syncSubscription({
      isSubscriptionEnabled,
      subscriptionId,
      transactionData,
      allTransactions,
      formData,
      mutations
    })

    const wasRecurringHandled = await syncRecurringSubscriptionTransactions({
      isSubscriptionEnabled,
      subscriptionId,
      allTransactions,
      formData,
      selectedMonth,
      selectedYear,
      monthlyLoanExpectedAmount,
      targetMonthRange,
      mutations
    })

    if (!wasRecurringHandled) {
      await saveSingleExpenseTransaction({
        isEdit,
        transactionData,
        selectedMonth,
        selectedYear,
        formData,
        subscriptionId,
        previousSubscriptionId,
        allTransactions,
        mutations
      })
    }

    setIsOpen(false)
    onSuccess?.()
    reset(initialValues)
  }

  return (
    <ExpenseForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      clearErrors={clearErrors}
      setIsOpen={setIsOpen}
      isEdit={isEdit}
      categoryOptions={transactionCategoryOptions}
      isSubscriptionEnabled={isSubscriptionEnabled}
      isLoan={isLoan}
      defaultValues={initialValues}
    />
  )
}

export default ExpenseFormContainer
