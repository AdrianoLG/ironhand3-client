import { iTransactions } from '../types/types';
import { getSubscriptionsForMonth } from '../utils/subscription';

const SubscriptionList = ({
  transactions,
  monthOffset
}: {
  transactions?: iTransactions[]
  monthOffset: number
}) => {
  const allTransactions = transactions ?? []

  const subscriptionsInCurrentMonth = getSubscriptionsForMonth(
    allTransactions,
    monthOffset
  )

  const monthlySubscriptions = subscriptionsInCurrentMonth
    .filter(t => t.subscription?.frequency?.toLowerCase() === 'monthly')
    .sort(
      (a, b) =>
        (a.subscription?.dayOfMonth ?? 0) - (b.subscription?.dayOfMonth ?? 0)
    )

  const bimonthlySubscriptions = subscriptionsInCurrentMonth
    .filter(t => t.subscription?.frequency?.toLowerCase() === 'bimonthly')
    .sort(
      (a, b) =>
        (a.subscription?.dayOfMonth ?? 0) - (b.subscription?.dayOfMonth ?? 0)
    )

  const yearlySubscriptions = subscriptionsInCurrentMonth
    .filter(t => t.subscription?.frequency?.toLowerCase() === 'annually')
    .sort(
      (a, b) =>
        (a.subscription?.dayOfMonth ?? 0) - (b.subscription?.dayOfMonth ?? 0)
    )

  const renderSubscription = (transaction: iTransactions) => (
    <div
      key={transaction._id}
      className='border-secondaryLighter flex w-fit rounded-md border-1 px-2'
    >
      <p className='border-secondaryLighter relative flex flex-col items-center justify-center gap-0 border-r-1 pr-2 leading-none'>
        <span className='m-0 p-0 text-xs leading-3'>Día</span>
        <span className='m-0 p-0 text-xs leading-3'>
          {transaction.subscription?.dayOfMonth}
        </span>
      </p>
      <p className='flex items-center px-1 py-0.5'>{transaction.title}</p>
    </div>
  )

  return (
    <div className='recurrings'>
      <h2 className='mb-4 text-xl font-semibold'>Recurrentes</h2>
      <div className='flex flex-col gap-3'>
        {monthlySubscriptions.length > 0 && (
          <div>
            <h3 className='mb-2 text-sm font-semibold'>Mensuales</h3>
            <div className='flex flex-wrap gap-2'>
              {monthlySubscriptions.map(renderSubscription)}
            </div>
          </div>
        )}
        {bimonthlySubscriptions.length > 0 && (
          <div>
            <h3 className='mb-2 text-sm font-semibold'>Bimensuales</h3>
            <div className='flex flex-wrap gap-2'>
              {bimonthlySubscriptions.map(renderSubscription)}
            </div>
          </div>
        )}
        {yearlySubscriptions.length > 0 && (
          <div>
            <h3 className='mb-2 text-sm font-semibold'>Anuales</h3>
            <div className='flex flex-wrap gap-2'>
              {yearlySubscriptions.map(renderSubscription)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default SubscriptionList
