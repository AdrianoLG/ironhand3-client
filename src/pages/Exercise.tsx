import { useState } from 'react'

import { Button } from '../components/atoms'
import Heading from '../components/molecules/Heading'
import { Dialog } from '../components/organisms/dialogs'
import Cardio from '../feature/exercise/assets/svgs/Cardio'
import Stretch from '../feature/exercise/assets/svgs/Stretch'
import Body from '../feature/exercise/components/Body'
import ExerciseFilterButtons from '../feature/exercise/components/ExerciseFilterButtons'
import ExerciseHeaderButtons from '../feature/exercise/components/ExerciseHeaderButtons'
import ExerciseList from '../feature/exercise/components/ExerciseList'
import ExerciseForm from '../feature/exercise/forms/ExerciseForm'
import { useFilterCompletedExercises } from '../feature/exercise/hooks/useFilterCompletedExercises'
import { iExercise } from '../feature/exercise/types/exercises'
import Header from '../layouts/header/Header'

const Exercise = () => {
  const { completedExercises, filterDate, activeButton, data, loading, error } =
    useFilterCompletedExercises()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<iExercise | null>(
    null
  )

  if (loading) return 'Cargando...'
  if (error) return <pre>{error.message}</pre>

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
                    xsmall
                    isFit
                  />
                  <Button
                    text='Borrar'
                    onMouseClick={() => {
                      console.log('Remove exercise')
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
        </main>
      </div>
    </>
  )
}

export default Exercise
