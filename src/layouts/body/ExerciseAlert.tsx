import { AlertDialog } from 'radix-ui'

import { useMutation } from '@apollo/client'

import IconWarn from '../../assets/svgs/IconWarn'
import { Button } from '../../components/atoms'
import { REMOVE_EXERCISE } from '../../feature/exercise/gql/exerciseMutations'
import {
  EXERCISES_INFO,
  SELECT_EXERCISES
} from '../../feature/exercise/gql/exerciseQueries'

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
    <AlertDialog.Root open={showAlert.visible}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className='fixed inset-0 bg-transparent70B'
          onClick={() => setShowAlert({ visible: false, id: null })}
        />
        <AlertDialog.Content className='fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-primary focus:outline-none'>
          <div className='relative px-8 pb-8 pt-12'>
            <IconWarn
              color='var(--warn)'
              classes='bg-primary rounded-full w-12 absolute -top-6 left-1/2 -translate-x-1/2'
            />
            <AlertDialog.Title className='mb-2 text-center text-lg font-semibold text-warn'>
              ¿Estás seguro de que quieres eliminar el ejercicio?
            </AlertDialog.Title>
            <AlertDialog.Description className='mb-8 text-center text-sm'>
              Esta acción no se puede deshacer. El ejercicio y los ejercicios
              completados asociados se eliminarán permanentemente.
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
export default ExerciseAlert
