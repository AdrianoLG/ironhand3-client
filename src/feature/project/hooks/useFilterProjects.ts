import { useQuery } from '@apollo/client';

import { PROJECTS_INFO } from '../gql/projectQueries';
import { iProjectInfo } from '../types/types';

export const useFilterProjects = () => {
  /*
   * GQL
   */
  const { data, loading, error, refetch } =
    useQuery<iProjectInfo>(PROJECTS_INFO)

  return { data, loading, error, refetch }
}
export default useFilterProjects
