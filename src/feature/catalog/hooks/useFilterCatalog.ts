import { useQuery } from '@apollo/client'

import { CATALOG_INFO } from '../gql/catalogQueries'
import { iCatalogInfo } from '../types/types'

export const useFilterCatalog = () => {
  /*
   * GQL
   */
  const { data, loading, error } = useQuery<iCatalogInfo>(CATALOG_INFO)

  return { data, loading, error }
}
export default useFilterCatalog
