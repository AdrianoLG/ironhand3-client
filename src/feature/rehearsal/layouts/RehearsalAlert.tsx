import { useMutation } from '@apollo/client'

import { AlertDialog } from '../../../components/organisms/dialogs'
import { REMOVE_SHEET } from '../gql/rehearsalMutations'
import { REHEARSAL_INFO, SELECT_SHEETS } from '../gql/rehearsalQueries'

const RehearsalAlert = ({
  showAlert,
  setShowAlert
}: {
  showAlert: {
    visible: boolean
    id: string | null
  }
  setShowAlert: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      id: string | null
    }>
  >
}) => {
  const [deleteSheet] = useMutation(REMOVE_SHEET, {
    refetchQueries: [{ query: REHEARSAL_INFO }, { query: SELECT_SHEETS }]
  })

  return (
    <AlertDialog
      isOpen={showAlert.visible}
      onOpenChange={open => {
        if (!open) setShowAlert({ visible: false, id: null })
      }}
      title='¿Estás seguro de que quieres eliminar la partitura?'
      description='Esta acción no se puede deshacer. La partitura se eliminará permanentemente.'
      confirmText='Sí, eliminar partitura'
      onConfirm={() => {
        setShowAlert({ visible: false, id: null })
        deleteSheet({
          variables: { removeSheetId: showAlert.id }
        })
      }}
    />
  )
}
export default RehearsalAlert
