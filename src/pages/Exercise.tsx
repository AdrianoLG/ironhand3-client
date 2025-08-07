import { useState } from 'react'

import ErrorMessage from '../components/molecules/ErrorMessage'
import Heading from '../components/molecules/Heading'
import ExerciseHeaderButtons from '../feature/exercise/components/ExerciseHeaderButtons'
import { useFilterCompletedExercises } from '../feature/exercise/hooks/useFilterCompletedExercises'
import ExerciseAlert from '../feature/exercise/layouts/ExerciseAlert'
import ExerciseAside from '../feature/exercise/layouts/ExerciseAside'
import ExerciseDialog from '../feature/exercise/layouts/ExerciseDialog'
import ExerciseMain from '../feature/exercise/layouts/ExerciseMain'
import { iExercise } from '../feature/exercise/types/exercises'
import LRLayout from '../layouts/body/LRLayout'
import Header from '../layouts/header/Header'

const Exercise = () => {
  const {
    completedExercises,
    filterDate,
    activeButton,
    data,
    loading,
    error,
    setCustomDate,
    customDate
  } = useFilterCompletedExercises()

  const [showDialog, setShowDialog] = useState(false)
  const [showAlert, setShowAlert] = useState<{
    visible: boolean
    id: string | null
  }>({ visible: false, id: null })
  const [selectedExercise, setSelectedExercise] = useState<iExercise | null>(
    null
  )

  const removeExercise = (id: string) => {
    setShowAlert({ visible: true, id: id })
  }

  if (loading)
    return (
      <>
        <Header isMain={false} headers={[]} />
        <Heading title='...' />
      </>
    )

  if (error)
    return (
      <>
        <ErrorMessage
          message={'No conectado a la base de datos'}
          errorMessage={error.message}
          containerClasses='my-7 flex w-full justify-center px-8 text-secondary'
        />
      </>
    )

  return (
    <>
      <Header isMain={false} headers={data?.headers} />
      <Heading title='Ejercicio' />
      <ExerciseHeaderButtons />
      <LRLayout>
        <ExerciseAside
          data={data}
          completedExercises={completedExercises}
          filterDate={filterDate}
          activeButton={activeButton}
          setCustomDate={setCustomDate}
          customDate={customDate}
        />
        <ExerciseMain
          completedExercises={completedExercises}
          data={data}
          setShowDialog={setShowDialog}
          setSelectedExercise={setSelectedExercise}
          removeExercise={removeExercise}
        />
      </LRLayout>
      <ExerciseDialog
        selectedExercise={selectedExercise}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
      <ExerciseAlert showAlert={showAlert} setShowAlert={setShowAlert} />
    </>
  )
}

export default Exercise
