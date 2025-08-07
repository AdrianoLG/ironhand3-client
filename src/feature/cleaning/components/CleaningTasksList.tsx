import Emptylist from '../../../components/molecules/EmptyList'
import { difInDays } from '../../../utils/differenceInDays'
import { iCompletedCleaningTask } from '../types/cleaningTasks'
import CompletedCleaningTask from './CompletedCleaningTask'

const CleaningTasksList = ({
  completedCleaningTasks
}: {
  completedCleaningTasks: iCompletedCleaningTask[]
}) => {
  /*
   * There are no completed cleaning tasks
   */
  if (completedCleaningTasks.length === 0) {
    return (
      <Emptylist
        message={
          'No hay tareas completadas en este periodo ☹️. \n¡Ponte a ello! 💪'
        }
        secondary
      />
    )
  }

  /*
   * If completed cleaning tasks are not empty, reduce them by date
   * and group them by the difference in days from today
   */
  const reducedCompletedCleaningTasks = completedCleaningTasks.reduce(
    (acc, curr) => {
      if (curr.completedAt) {
        const difference = difInDays(curr.completedAt)
        if (!acc[difference]) {
          acc[difference] = []
        }

        acc[difference].push(curr)
      }
      return acc
    },
    {} as Record<string, iCompletedCleaningTask[]>
  )

  /*
   * Map through the reduced completed exercises and return a list of
   * completed exercises grouped by the difference in days
   */
  return Object.entries(reducedCompletedCleaningTasks).map(
    ([difference, exercises]) => {
      return (
        <div className='text-text mb-4' key={difference}>
          <h3 className='mb-2 text-sm font-semibold'>{difference}</h3>
          <div className='flex flex-wrap gap-2'>
            {exercises.map(completedCleaningTask => {
              return (
                <CompletedCleaningTask
                  completedCleaningTask={completedCleaningTask}
                  key={completedCleaningTask._id}
                />
              )
            })}
          </div>
        </div>
      )
    }
  )
}

export default CleaningTasksList
