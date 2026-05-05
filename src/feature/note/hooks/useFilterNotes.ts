import { useQuery } from '@apollo/client'

import { NOTE_INFO } from '../gql/noteQueries'
import { iNoteInfo } from '../types/types'

export const useFilterNotes = () => {
  /*
   * GQL
   */
  const { data, loading, error } = useQuery<iNoteInfo>(NOTE_INFO)

  return { data, loading, error }
}
export default useFilterNotes
