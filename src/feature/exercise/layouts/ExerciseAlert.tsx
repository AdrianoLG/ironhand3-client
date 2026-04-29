import { useMutation } from '@apollo/client'

import { AlertDialog } from '../../../components/organisms/dialogs'
import { REMOVE_EXERCISE } from '../gql/exerciseMutations'
import { EXERCISES_INFO, SELECT_EXERCISES } from '../gql/exerciseQueries'

const ExerciseAlert = ({
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
  const [deleteExercise] = useMutation(REMOVE_EXERCISE, {
    refetchQueries: [{ query: EXERCISES_INFO }, { query: SELECT_EXERCISES }]
  })

  return (
    <AlertDialog
      isOpen={showAlert.visible}
      onOpenChange={open => {
        if (!open) setShowAlert({ visible: false, id: null })
      }}
      title='¿Estás seguro de que quieres eliminar el ejercicio?'
      description='Esta acción no se puede deshacer. El ejercicio y los ejercicios completados asociados se eliminarán permanentemente.'
      confirmText='Sí, eliminar ejercicio'
      isDark={true}
      onConfirm={() => {
        setShowAlert({ visible: false, id: null })
        deleteExercise({
          variables: { removeExerciseId: showAlert.id }
        })
      }}
    />
  )
}
export default ExerciseAlert
