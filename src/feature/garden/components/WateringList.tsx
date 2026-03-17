import Emptylist from '../../../components/molecules/EmptyList'
import { difInDays } from '../../../utils/differenceInDays'
import { iCrop } from '../types/garden'
import CompletedWaterings from './CompletedWatering'

const WateringList = ({ crops }: { crops: iCrop[] }) => {
  /*
   * There are no completed waterings
   */
  const waterings = crops.reduce(
    (acc, curr) => {
      return [...acc, ...curr.waterings]
    },
    [] as iCrop['waterings']
  )

  const sortedWaterings = [...waterings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  if (waterings.length === 0) {
    return (
      <Emptylist
        message={
          'No hay riegos completados en este periodo ☹️. \n¡Ponte a ello! 💪'
        }
        secondary
      />
    )
  }

  /*
   * If completed waterings are not empty, reduce them by date
   * and group them by the difference in days from today
   */
  const reducedWaterings = sortedWaterings.reduce(
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
    {} as Record<string, iCrop['waterings'][number][]>
  )

  /*
   * Map through the reduced waterings and return a list of
   * waterings grouped by the difference in days
   */
  const wateringCropNames = new Map<string, string>()
  Object.entries(reducedWaterings).forEach(([, watering]) => {
    watering.forEach(wateringItem => {
      const cropName =
        crops.find(crop => crop.waterings.some(w => w._id === wateringItem._id))
          ?.cropContainer?.name || ''
      wateringCropNames.set(wateringItem._id, cropName)
    })
  })

  return Object.entries(reducedWaterings).map(([difference, watering]) => {
    return (
      <div className='text-text mb-4' key={difference}>
        <h3 className='mb-2 text-sm font-semibold'>{difference}</h3>
        <div className='flex flex-wrap gap-2'>
          {watering.map(wateringItem => {
            return (
              <CompletedWaterings
                completedWatering={wateringItem}
                cropName={wateringCropNames.get(wateringItem._id) || ''}
                key={wateringItem._id}
              />
            )
          })}
        </div>
      </div>
    )
  })
}

export default WateringList
