import { iGoals, iSavings } from '../types/types';

export const getGoalProgress = (balance: number, targetAmount: number) => {
  if (targetAmount <= 0) return 0
  return Math.min(Math.max((balance / targetAmount) * 100, 0), 100)
}

export const sortGoals = (goals: iGoals[]) =>
  [...goals].sort((a, b) => {
    const aCompleted = Boolean(a.isCompleted)
    const bCompleted = Boolean(b.isCompleted)
    if (aCompleted !== bCompleted)
      return Number(aCompleted) - Number(bCompleted)
    return a.title.localeCompare(b.title, 'es')
  })

export type SavingAccountItemProps = {
  saving: iSavings
  onEdit: (saving: iSavings) => void
  onCompleteGoal: (goal: iGoals) => void
}
