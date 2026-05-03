import { useQuery } from '@apollo/client'

import { BUDGET_INFO } from '../gql/budgetQueries'
import { iBudgetInfo } from '../types/types'

export const useFilterBudget = () => {
  /*
   * GQL
   */
  const { data, loading, error } = useQuery<iBudgetInfo>(BUDGET_INFO)

  return { data, loading, error }
}
export default useFilterBudget
