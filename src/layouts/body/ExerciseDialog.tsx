import { Dialog } from '../../components/organisms/dialogs'
import ExerciseFormContainer from '../../feature/exercise/forms/ExerciseFormContainer'
import { iExercise } from '../../feature/exercise/types/exercises'

const ExerciseDialog = ({
  showDialog,
  selectedExercise,
  setShowDialog
}: {
  showDialog: boolean
  selectedExercise: iExercise | null
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    showDialog && (
      <Dialog
        buttonText='Actualizar'
        title='Modificar ejercicio'
        description='Modifica los datos del ejercicio'
        image='exercise-bg'
        child={
          <ExerciseFormContainer
            exercise={selectedExercise}
            setIsOpen={setShowDialog}
          />
        }
        secondary
        xsmall
        isFit
        isOpen={showDialog}
        setIsOpen={setShowDialog}
      />
    )
  )
}
export default ExerciseDialog
