import { cleanEmpty } from '../../../utils/cleanEmpty';
import { ExpenseMutationRunners, MonthPeriod } from '../types/expenseForm';
import { iExpenseFormInput, iTransactions } from '../types/types';
import { getMonthKey, getRecurringMonths, getRelatedTransactions } from './expenseFormHelpers';

const buildSubscriptionPayload = (formData: iExpenseFormInput) =>
  cleanEmpty({
    frequency: formData.frequency,
    isLoan: formData.isLoan,
    dayOfMonth: formData.dayOfMonth,
    startDate: new Date(formData.startDate).toISOString(),
    endDate:
      formData.isLoan && formData.endDate
        ? new Date(formData.endDate).toISOString()
        : undefined,
    amount: formData.expectedAmount,
    isActive: formData.isActive
  })

export const syncSubscription = async ({
  isSubscriptionEnabled,
  subscriptionId,
  transactionData,
  allTransactions,
  formData,
  mutations
}: {
  isSubscriptionEnabled: boolean
  subscriptionId?: string
  transactionData?: iTransactions
  allTransactions?: iTransactions[]
  formData: iExpenseFormInput
  mutations: ExpenseMutationRunners
}) => {
  let currentSubscriptionId = subscriptionId

  if (isSubscriptionEnabled) {
    const subscriptionPayload = buildSubscriptionPayload(formData)

    if (currentSubscriptionId) {
      await mutations.updateSubscription({
        variables: {
          updateSubscriptionInput: {
            _id: currentSubscriptionId,
            ...subscriptionPayload
          }
        }
      })
    } else {
      const created = await mutations.createSubscription({
        variables: { createSubscriptionInput: subscriptionPayload }
      })

      currentSubscriptionId = (
        created.data?.['createSubscription'] as { _id?: string } | undefined
      )?._id
    }

    return currentSubscriptionId
  }

  if (currentSubscriptionId) {
    const related = getRelatedTransactions(
      allTransactions ?? [],
      currentSubscriptionId
    )

    for (const transaction of related) {
      if (transaction._id !== transactionData?._id) {
        await mutations.removeTransaction({
          variables: { id: transaction._id }
        })
      }
    }

    await mutations.removeSubscription({
      variables: { id: currentSubscriptionId }
    })
  }

  return undefined
}

export const syncRecurringSubscriptionTransactions = async ({
  isSubscriptionEnabled,
  subscriptionId,
  allTransactions,
  formData,
  selectedMonth,
  selectedYear,
  monthlyLoanExpectedAmount,
  targetMonthRange,
  mutations
}: {
  isSubscriptionEnabled: boolean
  subscriptionId?: string
  allTransactions?: iTransactions[]
  formData: iExpenseFormInput
  selectedMonth: number
  selectedYear: number
  monthlyLoanExpectedAmount: number | null
  targetMonthRange: MonthPeriod[]
  mutations: ExpenseMutationRunners
}) => {
  if (!isSubscriptionEnabled || !subscriptionId) return false

  const selectedKey = getMonthKey(selectedYear, selectedMonth)
  const existingTransactions = getRelatedTransactions(
    allTransactions ?? [],
    subscriptionId
  )

  let finalTargetRange = targetMonthRange

  if (!formData.isLoan && formData.startDate && formData.frequency) {
    finalTargetRange = getRecurringMonths(
      new Date(formData.startDate),
      formData.frequency
    )
  }

  const existingByMonth = new Map(
    existingTransactions.map(t => [getMonthKey(t.year, t.month), t])
  )

  const monthsToKeep = new Set(
    finalTargetRange.map(({ year, month }) => getMonthKey(year, month))
  )

  for (const { year, month } of finalTargetRange) {
    const monthKey = getMonthKey(year, month)
    const existing = existingByMonth.get(monthKey)
    const isSelectedMonth = monthKey === selectedKey

    const payload = cleanEmpty({
      title: formData.title,
      category: formData.category,
      type: 'EXPENSE',
      month,
      year,
      expectedAmount:
        formData.isLoan && monthlyLoanExpectedAmount !== null
          ? monthlyLoanExpectedAmount
          : formData.expectedAmount,
      realAmount: isSelectedMonth ? formData.realAmount : existing?.realAmount,
      isPaid: isSelectedMonth ? formData.isPaid : (existing?.isPaid ?? false),
      subscription: subscriptionId
    })

    if (existing?._id) {
      await mutations.updateTransaction({
        variables: { updateTransactionInput: { _id: existing._id, ...payload } }
      })
      continue
    }

    await mutations.createTransaction({
      variables: { createTransactionInput: payload }
    })
  }

  const toRemove = existingTransactions.filter(
    t => !monthsToKeep.has(getMonthKey(t.year, t.month))
  )

  for (const transaction of toRemove) {
    await mutations.removeTransaction({ variables: { id: transaction._id } })
  }

  return true
}

export const saveSingleExpenseTransaction = async ({
  isEdit,
  transactionData,
  selectedMonth,
  selectedYear,
  formData,
  subscriptionId,
  previousSubscriptionId,
  allTransactions,
  mutations
}: {
  isEdit: boolean
  transactionData?: iTransactions
  selectedMonth: number
  selectedYear: number
  formData: iExpenseFormInput
  subscriptionId?: string
  previousSubscriptionId?: string
  allTransactions?: iTransactions[]
  mutations: ExpenseMutationRunners
}) => {
  const payload = cleanEmpty({
    title: formData.title,
    category: formData.category,
    type: 'EXPENSE',
    month: transactionData?.month ?? selectedMonth,
    year: transactionData?.year ?? selectedYear,
    expectedAmount: formData.expectedAmount,
    realAmount: formData.realAmount,
    isPaid: formData.isPaid,
    subscription: subscriptionId
  })

  if (isEdit && transactionData?._id) {
    await mutations.updateTransaction({
      variables: {
        updateTransactionInput: { _id: transactionData._id, ...payload }
      }
    })
  } else {
    await mutations.createTransaction({
      variables: { createTransactionInput: payload }
    })
  }

  if (!subscriptionId && previousSubscriptionId) {
    const siblings = getRelatedTransactions(
      allTransactions ?? [],
      previousSubscriptionId
    ).filter(t => t._id !== transactionData?._id)

    for (const sibling of siblings) {
      await mutations.removeTransaction({ variables: { id: sibling._id } })
    }
  }
}
