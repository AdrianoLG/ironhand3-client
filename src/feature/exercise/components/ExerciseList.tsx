import Emptylist from '../../../components/molecules/EmptyList'
import { difInDays } from '../../../utils/differenceInDays'
import { iCompletedExercise } from '../types/exercises'
import CompletedExercise from './CompletedExercise'

const ExerciseList = ({
  completedExercises
}: {
  completedExercises: iCompletedExercise[]
}) => {
  /*
   * There are no completed exercises
   */
  if (completedExercises.length === 0) {
    return (
      <Emptylist
        message={
          'No hay ejercicios completados en este periodo ☹️. \n¡Ponte a ello! 💪'
        }
        secondary
      />
    )
  }

  /*
   * If completed exercises are not empty, reduce them by date
   * and group them by the difference in days from today
   */
  const reducedCompletedExercises = completedExercises.reduce(
    (acc, curr) => {
      if (curr.date) {
        const difference = difInDays(curr.date)
        if (!acc[difference]) {
          acc[difference] = []
        }

        acc[difference].push(curr)
      }
      return acc
    },
    {} as Record<string, iCompletedExercise[]>
  )

  /*
   * Map through the reduced completed exercises and return a list of
   * completed exercises grouped by the difference in days
   */
  return Object.entries(reducedCompletedExercises).map(
    ([difference, exercises]) => {
      return (
        <div className='mb-4' key={difference}>
          <h3 className='mb-2 text-sm font-semibold'>{difference}</h3>
          <div className='flex flex-wrap gap-2'>
            {exercises.map(completedExercise => {
              return (
                <CompletedExercise
                  completedExercise={completedExercise}
                  key={completedExercise._id}
                />
              )
            })}
          </div>
        </div>
      )
    }
  )
}

export default ExerciseList
