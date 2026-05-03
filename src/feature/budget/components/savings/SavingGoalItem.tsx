import { Progress } from 'radix-ui';

import { iGoals } from '../../types/types';
import { formatBudgetAmount } from '../../utils/amountFormat';
import { getGoalProgress } from '../../utils/savings';

type SavingGoalItemProps = {
  goal: iGoals
  balance: number
  onClick: (goal: iGoals) => void
}

const SavingGoalItem = ({ goal, balance, onClick }: SavingGoalItemProps) => {
  const progress = getGoalProgress(balance, goal.targetAmount)

  return (
    <div className='mb-2 cursor-pointer' onClick={() => onClick(goal)}>
      <p className='flex justify-between'>
        <span className={goal.isCompleted ? 'text-gray-500 line-through' : ''}>
          {goal.title}
        </span>
        <span>{formatBudgetAmount(goal.targetAmount)} €</span>
      </p>
      <Progress.Root
        className='bg-secondaryLightest relative h-2 w-full overflow-hidden rounded-full'
        style={{ transform: 'translateZ(0)' }}
        max={100}
        value={progress}
      >
        <Progress.Indicator
          className='ease-[cubic-bezier(0.65, 0, 0.35, 1)] bg-secondary size-full transition-transform duration-660'
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  )
}

export default SavingGoalItem
