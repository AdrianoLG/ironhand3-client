import { difInDays } from '../../utils/differenceInDays'
import { iCompletedExercises } from '../../utils/types'

const ExerciseList = ({
  completedExercises
}: {
  completedExercises: iCompletedExercises[]
}) => {
  const completedExercisesCards = completedExercises.map(
    (completedExercise: iCompletedExercises) => {
      return (
        <div key={completedExercise._id} className='mb-4'>
          <h3 className='mb-2 text-sm font-semibold'>
            {difInDays(completedExercise.date)}
          </h3>
          <div className='flex flex-wrap gap-2'>
            <div className='flex w-fit rounded-md border-1 border-secondaryLighter px-2'>
              {completedExercise.repetitions && (
                <p className='flex items-center border-r-1 border-secondaryLighter pr-1 text-sm'>
                  {completedExercise.repetitions}
                </p>
              )}
              {completedExercise.time && (
                <p className='flex flex-col items-center justify-center gap-0 border-r-1 border-secondaryLighter pr-1 leading-none'>
                  <span className='m-0 text-sm'>{completedExercise.time}</span>
                  <span className='relative -top-[1px] m-0 text-3xs'>min</span>
                </p>
              )}
              <p className='flex items-center px-1 py-0.5'>
                {completedExercise.exercise.name}
              </p>
            </div>
          </div>
        </div>
      )
    }
  )
  return completedExercisesCards
}

export default ExerciseList
