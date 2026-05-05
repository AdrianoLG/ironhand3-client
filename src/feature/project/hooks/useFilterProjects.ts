import { useQuery } from '@apollo/client'

import { PROJECT_INFO } from '../gql/projectQueries'
import { iProjectInfo } from '../types/types'

export const useFilterProjects = () => {
  /*
   * GQL
   */
  const { data, loading, error } = useQuery<iProjectInfo>(PROJECT_INFO)

  return { data, loading, error }
}
export default useFilterProjects
