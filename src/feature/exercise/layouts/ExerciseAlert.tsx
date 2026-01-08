import { AlertDialog } from 'radix-ui'

import { useMutation } from '@apollo/client'

import IconWarn from '../../../assets/svgs/IconWarn'
import { Button } from '../../../components/atoms'
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
    <AlertDialog.Root open={showAlert.visible}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className='bg-transparent70B fixed inset-0'
          onClick={() => setShowAlert({ visible: false, id: null })}
        />
        <AlertDialog.Content className='fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md border-4 border-[#f2b885] bg-[#f5e6d9] focus:outline-none'>
          <div className='relative px-8 pt-12 pb-8'>
            <IconWarn
              color='#f26d3d'
              classes='bg-[#fff] rounded-full w-12 absolute -top-6 left-1/2 -translate-x-1/2'
            />
            <AlertDialog.Title className='text-warn mb-2 text-center text-lg font-semibold'>
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
