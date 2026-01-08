import { AlertDialog } from 'radix-ui'

import { useMutation } from '@apollo/client'

import IconWarn from '../../../assets/svgs/IconWarn'
import { Button } from '../../../components/atoms'
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
    <AlertDialog.Root open={showAlert.visible}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className='bg-transparent70B fixed inset-0'
          onClick={() => setShowAlert({ visible: false, id: null })}
        />
        <AlertDialog.Content className='bg-warn fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md focus:outline-none'>
          <div className='relative px-8 pt-12 pb-8'>
            <IconWarn
              color='var(--warn)'
              classes='bg-primary rounded-full w-12 absolute -top-6 left-1/2 -translate-x-1/2'
            />
            <AlertDialog.Title className='text-warn mb-2 text-center text-lg font-semibold'>
              ¿Estás seguro de que quieres eliminar la tarea de limpieza?
            </AlertDialog.Title>
            <AlertDialog.Description className='mb-8 text-center text-sm'>
              Esta acción no se puede deshacer. La tarea de limpieza y las
              tareas completadas asociadas se eliminarán permanentemente.
            </AlertDialog.Description>
            <div className='flex justify-center gap-4'>
              <AlertDialog.Cancel asChild>
                <Button
                  text='Cancelar'
                  secondary
                  isFit
                  small
                  onMouseClick={() =>
                    setShowAlert({
                      ...showAlert,
                      visible: false,
                      id: null
                    })
                  }
                />
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button
                  text='Sí, eliminar ejercicio'
                  isFit
                  small
                  onMouseClick={() => {
                    setShowAlert({ visible: false, id: null })
                    deleteExercise({
                      variables: { removeExerciseId: showAlert.id }
                    })
                  }}
                />
              </AlertDialog.Action>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
export default CleaningAlert
