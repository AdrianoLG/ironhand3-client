import { useMutation } from '@apollo/client'

import IconWarn from '../../../assets/svgs/IconWarn'
import { Button } from '../../../components/atoms'
import { AlertDialog } from '../../../components/organisms/dialogs'
import { REMOVE_CLEANING_TASK } from '../gql/cleaningTaskMutations'
import {
  CLEANING_INFO,
  SELECT_CLEANING_TASKS
} from '../gql/cleaningTaskQueries'

const CleaningAlert = ({
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
  const [deleteExercise] = useMutation(REMOVE_CLEANING_TASK, {
    refetchQueries: [{ query: CLEANING_INFO }, { query: SELECT_CLEANING_TASKS }]
  })

  return (
    <AlertDialog
      isOpen={showAlert.visible}
      onOpenChange={open => {
        if (!open) setShowAlert({ visible: false, id: null })
      }}
      title='¿Estás seguro de que quieres eliminar la tarea de limpieza?'
      description='Esta acción no se puede deshacer. La tarea de limpieza y las tareas completadas asociadas se eliminarán permanentemente.'
      confirmText='Sí, eliminar ejercicio'
      onConfirm={() => {
        setShowAlert({ visible: false, id: null })
        deleteExercise({
          variables: { removeExerciseId: showAlert.id }
        })
      }}
    />
  )
}
export default CleaningAlert
