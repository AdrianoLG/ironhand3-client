export interface iBudgetInfo {
  headers: {
    title: string
    url: string
  }[]
  transactions: iTransactions[]
  savings: iSavings[]
}

export type TransactionCategory =
  | 'HOUSE'
  | 'WORK'
  | 'FOOD'
  | 'VICE'
  | 'SHOP'
  | 'CAR'
  | 'OTHER'
  | 'HEALTH'
  | 'MOTORCYCLE'
  | 'TRAVEL'
  | 'MUSIC'
  | 'EDUCATION'

export type SubscriptionFrequency = 'MONTHLY' | 'BIMONTHLY' | 'ANNUALLY'

export interface iTransactionCategoryOption {
  value: TransactionCategory
  name: string
  icon: string
}

export interface iTransactions {
  _id: string
  title: string
  category: TransactionCategory | string
  type: 'INCOME' | 'EXPENSE' | string
  month: number
  year: number
  expectedAmount: number
  realAmount?: number | null
  isPaid: boolean
  subscription?: iSubscription
}

export interface iSubscription {
  _id: string
  frequency: SubscriptionFrequency | string
  isLoan: boolean
  dayOfMonth: number
  startDate: Date
  endDate: Date
  amount: number
  isActive: boolean
}

export interface iExpenseFormInput {
  title: string
  category: TransactionCategory | ''
  expectedAmount: number
  realAmount?: number | null
  isPaid: boolean
  isRecurring: boolean
  isLoan: boolean
  frequency: SubscriptionFrequency | ''
  dayOfMonth?: number
  startDate: string
  endDate?: string
  isActive: boolean
}

export interface iSavings {
  _id: string
  name: string
  balance: number
  goals?: iGoals[]
}

export interface iGoals {
  _id: string
  title: string
  targetAmount: number
  isCompleted?: boolean
  completedAt?: Date | string | null
}
