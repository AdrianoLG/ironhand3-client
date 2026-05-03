import { useState } from 'react'

import ErrorMessage from '../components/molecules/ErrorMessage'
import Heading from '../components/molecules/Heading'
import Spinner from '../components/molecules/Spinner'
import BudgetMonthNavigation from '../feature/budget/components/BudgetMonthNavigation'
import MonthBudget from '../feature/budget/components/MonthBudget'
import Savings from '../feature/budget/components/Savings'
import SubscriptionList from '../feature/budget/components/SubscriptionList'
import useFilterBudget from '../feature/budget/hooks/useFilterBudget'
import { getMaxMonthOffset as getSubscriptionMaxMonthOffset } from '../feature/budget/utils/subscription'
import {
  getMaxMonthOffset as getTransactionMaxMonthOffset,
  getMonthLabel,
  getNextMonthOffset,
  getPreviousMonthOffset
} from '../feature/budget/utils/transactionMonth'
import FifthsLayout from '../layouts/body/FifthsLayout'
import Header from '../layouts/header/Header'

const Budget = () => {
  const { data, loading, error } = useFilterBudget()
  const [monthOffset, setMonthOffset] = useState(0)

  const transactions = data?.transactions ?? []
  const subscriptionTransactions = transactions.filter(
    transaction => transaction.subscription !== null
  )
  const maxMonthOffset = Math.max(
    getTransactionMaxMonthOffset(transactions),
    getSubscriptionMaxMonthOffset(subscriptionTransactions)
  )
  const monthLabel = getMonthLabel(monthOffset)

  if (loading)
    return (
      <Spinner classes='my-7 flex w-full justify-center px-8' widthInRem={2} />
    )

  if (error)
    return (
      <ErrorMessage
        message={'No conectado a la base de datos'}
        errorMessage={error.message}
        containerClasses='my-7 flex w-full justify-center px-8 text-secondary'
      />
    )

  return (
    <>
      <Header isMain={false} headers={data?.headers} />
      <Heading title='Presupuestos' />
      <BudgetMonthNavigation
        monthLabel={monthLabel}
        monthOffset={monthOffset}
        maxMonthOffset={maxMonthOffset}
        onPreviousMonth={() =>
          setMonthOffset(current =>
            getPreviousMonthOffset(current, maxMonthOffset)
          )
        }
        onNextMonth={() =>
          setMonthOffset(current => getNextMonthOffset(current))
        }
      />
      <FifthsLayout>
        <SubscriptionList
          transactions={subscriptionTransactions}
          monthOffset={monthOffset}
        />
        <MonthBudget
          transactions={transactions}
          monthOffset={monthOffset}
          monthLabel={monthLabel}
        />
        <Savings savings={data?.savings} />
      </FifthsLayout>
    </>
  )
}

export default Budget
