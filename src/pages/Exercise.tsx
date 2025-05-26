import { AlertDialog } from 'radix-ui'
import { useState } from 'react'

import { useMutation } from '@apollo/client'

import IconWarn from '../assets/svgs/IconWarn'
import { Button } from '../components/atoms'
import ErrorMessage from '../components/molecules/ErrorMessage'
import Heading from '../components/molecules/Heading'
import Spinner from '../components/molecules/Spinner'
import { Dialog } from '../components/organisms/dialogs'
import Cardio from '../feature/exercise/assets/svgs/Cardio'
import Stretch from '../feature/exercise/assets/svgs/Stretch'
import Body from '../feature/exercise/components/Body'
import ExerciseFilterButtons from '../feature/exercise/components/ExerciseFilterButtons'
import ExerciseHeaderButtons from '../feature/exercise/components/ExerciseHeaderButtons'
import ExerciseList from '../feature/exercise/components/ExerciseList'
import ExerciseForm from '../feature/exercise/forms/ExerciseFormContainer'
import { REMOVE_EXERCISE } from '../feature/exercise/gql/exerciseMutations'
import {
  EXERCISES_INFO,
  SELECT_EXERCISES
} from '../feature/exercise/gql/exerciseQueries'
import { useFilterCompletedExercises } from '../feature/exercise/hooks/useFilterCompletedExercises'
import { iExercise } from '../feature/exercise/types/exercises'
import Header from '../layouts/header/Header'

const Exercise = () => {
  const { completedExercises, filterDate, activeButton, data, loading, error } =
    useFilterCompletedExercises()
  const [showDialog, setShowDialog] = useState(false)
  const [showAlert, setShowAlert] = useState<{
    visible: boolean
    id: string | null
  }>({ visible: false, id: null })
  const [selectedExercise, setSelectedExercise] = useState<iExercise | null>(
    null
  )
  const [deleteExercise] = useMutation(REMOVE_EXERCISE, {
    refetchQueries: [{ query: EXERCISES_INFO }, { query: SELECT_EXERCISES }]
  })

  const removeExercise = (id: string) => {
    setShowAlert({ visible: true, id: id })
  }

  if (loading)
    return (
      <Spinner classes='my-7 flex w-full justify-center px-8' widthInRem={2} />
    )

  if (error)
    return (
      <ErrorMessage
        message={error.message}
        containerClasses='my-7 flex w-full justify-center px-8 text-warn'
      />
    )

  return (
    <>
      <Header isMain={false} headers={data?.headers} />
      <Heading title='Ejercicio' />
      <ExerciseHeaderButtons />
      <div className='mx-auto flex flex-wrap justify-start px-8 pb-16 xl:max-w-screen-content'>
        <aside className='w-full pb-8 md:w-1/3'>
          {data?.completedExercises && (
            <div className='relative rounded-md border-1 border-secondaryLighter px-12 py-4 shadow-md xl:px-24 xl:py-9'>
              <Body
                color='var(--value1)'
                completedExercises={completedExercises}
              />
              <div className='absolute bottom-0 right-0 flex gap-3 p-4'>
                <Stretch
                  width='.7rem'
                  completedExercises={completedExercises}
                />
                <Cardio width='1rem' completedExercises={completedExercises} />
              </div>
            </div>
          )}
          <div className='mt-4 flex grid-rows-4 flex-col gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4'>
            <ExerciseFilterButtons
              filterDate={filterDate}
              activeButton={activeButton}
            />
          </div>
        </aside>
        <main className='w-full pb-8 md:w-2/3 md:pl-10 xl:pl-36'>
          {completedExercises && (
            <ExerciseList completedExercises={completedExercises} />
          )}
          <div className='my-12 grid grid-cols-4 gap-4'>
            {data?.exercises.map(exercise => (
              <div
                key={exercise._id}
                className='group relative flex h-24 items-end justify-center overflow-hidden rounded-md border-1 border-secondaryLighter'
              >
                <div
                  className='h-full w-full bg-cover bg-center brightness-[40%] group-hover:brightness-100'
                  style={{
                    backgroundImage: `url(${exercise.img})`
                  }}
                ></div>
                <h2 className='text-md absolute bottom-1 left-0 w-full text-center font-semibold text-secondaryLightest opacity-100 transition-all duration-200 ease-out group-hover:opacity-0'>
                  {exercise.name}
                </h2>
                <div className='absolute bottom-1 left-0 flex w-full justify-center gap-2 opacity-0 transition-all duration-100 ease-out group-hover:opacity-100'>
                  <Button
                    text='Actualizar'
                    onMouseClick={() => {
                      setShowDialog(true)
                      setSelectedExercise(exercise)
                    }}
                    type='submit'
                    xsmall
                    isFit
                  />
                  <Button
                    text='Borrar'
                    onMouseClick={() => {
                      removeExercise(exercise._id)
                    }}
                    xsmall
                    outline
                    isFit
                    secondary
                  />
                </div>
              </div>
            ))}
          </div>
          {showDialog && (
            <Dialog
              buttonText='Actualizar'
              title='Modificar ejercicio'
              description='Modifica los datos del ejercicio'
              image='exercise-bg'
              child={
                <ExerciseForm
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
          )}
          {showAlert.visible && (
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
                      Esta acción no se puede deshacer. El ejercicio y los
                      ejercicios completados asociados se eliminarán
                      permanentemente.
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
          )}
        </main>
      </div>
    </>
  )
}

export default Exercise
