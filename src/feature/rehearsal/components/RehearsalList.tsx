import Emptylist from '../../../components/molecules/EmptyList'
import { difInDays } from '../../../utils/differenceInDays'
import { iCompletedRehearsal } from '../types/rehearsals'
import CompletedRehearsal from './CompletedRehearsal'

const RehearsalsList = ({
  completedRehearsals
}: {
  completedRehearsals: iCompletedRehearsal[]
}) => {
  /*
   * There are no completed rehearsals
   */
  if (completedRehearsals.length === 0) {
    return (
      <Emptylist
        message={
          'No hay ensayos completados en este periodo ☹️. \n¡Ponte a ello! 💪'
        }
        secondary
      />
    )
  }

  /*
   * If completed rehearsals are not empty, reduce them by date
   * and group them by the difference in days from today
   */
  const reducedCompletedRehearsals = completedRehearsals.reduce(
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
    {} as Record<string, iCompletedRehearsal[]>
  )

  /*
   * Map through the reduced completed rehearsals and return a list of
   * completed rehearsals grouped by the difference in days
   */
  return Object.entries(reducedCompletedRehearsals).map(
    ([difference, rehearsals]) => {
      return (
        <div className='text-text mb-4' key={difference}>
          <h3 className='mb-2 text-sm font-semibold'>{difference}</h3>
          <div className='flex flex-wrap gap-2'>
            {rehearsals.map(completedRehearsal => {
              return (
                <CompletedRehearsal
                  completedRehearsal={completedRehearsal}
                  key={completedRehearsal._id}
                />
              )
            })}
          </div>
        </div>
      )
    }
  )
}

export default RehearsalsList
