import { ExpenseValidationError, PrepareLoanResult } from '../types/expenseForm';
import { iExpenseFormInput, iTransactions } from '../types/types';
import {
    getMonthlyLoanExpectedAmount, getMonthRangeInclusive, getMonthsBetweenInclusive,
    normalizeCategory, normalizeFrequency, toDateInputValue
} from './expenseFormHelpers';

export const buildExpenseInitialValues = (
  transactionData?: iTransactions
): iExpenseFormInput => {
  return {
    title: transactionData?.title || '',
    category: normalizeCategory(transactionData?.category),
    expectedAmount:
      transactionData?.subscription?.isLoan &&
      typeof transactionData.subscription.amount === 'number'
        ? transactionData.subscription.amount
        : transactionData?.expectedAmount || 0,
    realAmount: transactionData?.realAmount,
    isPaid: transactionData?.isPaid || false,
    isRecurring: Boolean(transactionData?.subscription),
    isLoan: transactionData?.subscription?.isLoan || false,
    frequency: normalizeFrequency(transactionData?.subscription?.frequency),
    dayOfMonth: transactionData?.subscription?.dayOfMonth,
    startDate: toDateInputValue(transactionData?.subscription?.startDate),
    endDate: toDateInputValue(transactionData?.subscription?.endDate),
    isActive: transactionData?.subscription?.isActive ?? true
  }
}

export const validateExpenseFormData = (
  formData: iExpenseFormInput,
  isSubscriptionEnabled: boolean
): ExpenseValidationError | null => {
  if (!formData.category) {
    return {
      field: 'category',
      message: 'Tipo requerido'
    }
  }

  if (!isSubscriptionEnabled) return null

  if (!formData.frequency) {
    return {
      field: 'frequency',
      message: 'Frecuencia requerida'
    }
  }

  if (!formData.dayOfMonth) {
    return {
      field: 'dayOfMonth',
      message: 'Dia del mes requerido'
    }
  }

  if (!formData.startDate) {
    return {
      field: 'startDate',
      message: 'Fecha de inicio requerida'
    }
  }

  if (formData.isLoan && !formData.endDate) {
    return {
      field: 'endDate',
      message: 'Fecha de fin requerida para prestamo'
    }
  }

  if (formData.isLoan && formData.startDate && formData.endDate) {
    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    const months = getMonthsBetweenInclusive(startDate, endDate)

    if (months <= 0) {
      return {
        field: 'endDate',
        message: 'La fecha de fin debe ser igual o posterior al inicio'
      }
    }
  }

  return null
}

export const prepareLoanDistribution = (
  formData: iExpenseFormInput,
  isSubscriptionEnabled: boolean
): PrepareLoanResult => {
  if (
    !isSubscriptionEnabled ||
    !formData.isLoan ||
    !formData.startDate ||
    !formData.endDate
  ) {
    return {
      monthlyLoanExpectedAmount: null,
      targetMonthRange: []
    }
  }

  const loanStartDate = new Date(formData.startDate)
  const loanEndDate = new Date(formData.endDate)

  return {
    monthlyLoanExpectedAmount: getMonthlyLoanExpectedAmount(
      formData.expectedAmount,
      loanStartDate,
      loanEndDate
    ),
    targetMonthRange: getMonthRangeInclusive(loanStartDate, loanEndDate)
  }
}
