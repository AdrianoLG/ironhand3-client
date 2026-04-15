import { useQuery } from '@apollo/client'

import { NUTRITION_INFO } from '../gql/nutritionQueries'
import { iNutritionInfo } from '../types/nutrition'

export const useFilterCompletedDiets = () => {
  const { data, loading, error } = useQuery<iNutritionInfo>(NUTRITION_INFO)

  return {
    data,
    loading,
    error
  }
}
