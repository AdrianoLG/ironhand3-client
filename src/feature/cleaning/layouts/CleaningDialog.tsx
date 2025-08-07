import { Dialog } from '../../../components/organisms/dialogs'
import CleaningTaskFormContainer from '../forms/CleaningTaskFormContainer'
import { iCleaningTask } from '../types/cleaningTasks'

const CleaningDialog = ({
  showDialog,
  selectedCleaningTask,
  setShowDialog
}: {
  showDialog: boolean
  selectedCleaningTask: iCleaningTask | null
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
          <CleaningTaskFormContainer
            cleaningTask={selectedCleaningTask}
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
export default CleaningDialog
