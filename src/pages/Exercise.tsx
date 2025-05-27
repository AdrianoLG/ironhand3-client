import { useState } from 'react'

import ErrorMessage from '../components/molecules/ErrorMessage'
import Heading from '../components/molecules/Heading'
import Spinner from '../components/molecules/Spinner'
import ExerciseHeaderButtons from '../feature/exercise/components/ExerciseHeaderButtons'
import { useFilterCompletedExercises } from '../feature/exercise/hooks/useFilterCompletedExercises'
import { iExercise } from '../feature/exercise/types/exercises'
import ExerciseAlert from '../layouts/body/ExerciseAlert'
import ExerciseAside from '../layouts/body/ExerciseAside'
import ExerciseDialog from '../layouts/body/ExerciseDialog'
import ExerciseMain from '../layouts/body/ExerciseMain'
import LRLayout from '../layouts/body/LRLayout'
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
      <LRLayout>
        <ExerciseAside
          data={data}
          completedExercises={completedExercises}
          filterDate={filterDate}
          activeButton={activeButton}
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
