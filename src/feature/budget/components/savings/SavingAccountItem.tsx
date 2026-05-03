import { Button } from '../../../../components/atoms';
import { iGoals, iSavings } from '../../types/types';
import { formatBudgetAmount } from '../../utils/amountFormat';
import { sortGoals } from '../../utils/savings';
import SavingGoalItem from './SavingGoalItem';

type SavingAccountItemProps = {
  saving: iSavings
  onEdit: (saving: iSavings) => void
  onCompleteGoal: (goal: iGoals) => void
}

const SavingAccountItem = ({
  saving,
  onEdit,
  onCompleteGoal
}: SavingAccountItemProps) => {
  return (
    <div>
      <div className='mb-4 flex items-center justify-between gap-2 text-lg'>
        <p className='flex justify-between gap-3'>
          <span>{saving.name}</span>
          <span>{formatBudgetAmount(saving.balance)} €</span>
        </p>
      </div>

      {saving.goals && saving.goals.length > 0 && (
        <div>
          {sortGoals(saving.goals).map(goal => (
            <SavingGoalItem
              key={goal._id}
              goal={goal}
              balance={saving.balance}
              onClick={onCompleteGoal}
            />
          ))}
        </div>
      )}

      <Button
        text='Editar'
        xsmall
        isFit
        outline
        onMouseClick={() => onEdit(saving)}
        classes='mt-4'
      />
    </div>
  )
}

export default SavingAccountItem
