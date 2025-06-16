import { useQuery } from '@apollo/client'

import { CLEANING_INFO } from '../gql/cleaningQueries'
import { iCleaningInfo } from '../types/cleaningTasks'

export const useFilterCleaningTasks = () => {
  /*
   * GQL
   */
  const { data, loading, error } = useQuery<iCleaningInfo>(CLEANING_INFO)

  return {
    data,
    loading,
    error
  }
}
