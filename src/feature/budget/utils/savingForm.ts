import { SavingFormInput } from '../forms/SavingForm';
import { MutationRunner } from '../types/expenseForm';
import { iSavings } from '../types/types';

export type SavingFormContainerProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  savingData?: iSavings
  onSuccess?: () => void
}

export type SavingMutationRunners = {
  createGoal: MutationRunner
  updateGoal: MutationRunner
  createSaving: MutationRunner
  updateSaving: MutationRunner
}

export const buildSavingInitialValues = (
  savingData?: iSavings
): SavingFormInput => ({
  name: savingData?.name || '',
  balance: savingData?.balance ?? 0,
  goals:
    savingData?.goals && savingData.goals.length > 0
      ? savingData.goals.map(goal => ({
          _id: goal._id,
          title: goal.title,
          targetAmount: goal.targetAmount
        }))
      : [{ title: '', targetAmount: 0 }]
})

export const saveSavingFormData = async ({
  formData,
  savingData,
  mutations
}: {
  formData: SavingFormInput
  savingData?: iSavings
  mutations: SavingMutationRunners
}) => {
  const normalizedGoals = formData.goals
    .map(goal => ({ ...goal, title: goal.title?.trim() ?? '' }))
    .filter(goal => goal.title.length > 0)

  const goalIds: string[] = []

  for (const goal of normalizedGoals) {
    if (goal._id) {
      await mutations.updateGoal({
        variables: {
          updateGoalInput: {
            _id: goal._id,
            title: goal.title,
            targetAmount: goal.targetAmount
          }
        }
      })
      goalIds.push(goal._id)
      continue
    }

    const created = await mutations.createGoal({
      variables: {
        createGoalInput: { title: goal.title, targetAmount: goal.targetAmount }
      }
    })

    const id = (created.data?.['createGoal'] as { _id?: string } | undefined)
      ?._id
    if (id) goalIds.push(id)
  }

  if (savingData?._id) {
    await mutations.updateSaving({
      variables: {
        updateSavingInput: {
          _id: savingData._id,
          name: formData.name,
          balance: formData.balance,
          goals: goalIds
        }
      }
    })
  } else {
    await mutations.createSaving({
      variables: {
        createSavingInput: {
          name: formData.name,
          balance: formData.balance,
          goals: goalIds
        }
      }
    })
  }
}
