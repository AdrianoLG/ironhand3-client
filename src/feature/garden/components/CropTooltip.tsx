import { Tooltip } from 'radix-ui'

import { iCrop } from '../types/garden'
import { formatDeathCause } from '../utils/formatDeathCause'

const CropTooltip = ({ crop }: { crop: iCrop }) => {
  return (
    <Tooltip.Provider delayDuration={100}>
      {crop.plants.map(plant => {
        const deathCause = plant.death
          ? formatDeathCause(plant.death.cause)
          : null
        const plantRowClasses = `flex items-center gap-2 text-left ${deathCause ? 'cursor-pointer' : ''}`
        const plantRowContent = (
          <>
            <div
              className={`h-2 w-2 rounded-full ${plant.death ? 'bg-red-500' : 'bg-green-500'}`}
            ></div>
            <span>{plant.name || 'Sin especie'}</span>
          </>
        )

        if (!deathCause) {
          return (
            <div key={plant._id} className={plantRowClasses}>
              {plantRowContent}
            </div>
          )
        }

        return (
          <Tooltip.Root key={plant._id}>
            <Tooltip.Trigger asChild>
              <button
                type='button'
                className={plantRowClasses}
                aria-label={`Ver causa de muerte de ${plant.name || 'la planta'}`}
              >
                {plantRowContent}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side='top'
                className='bg-secondary text-primary relative right-12 max-w-64 rounded-md px-3 py-2 text-sm'
              >
                <Tooltip.Arrow className='relative -top-px' />
                <p>{deathCause}</p>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )
      })}
    </Tooltip.Provider>
  )
}
export default CropTooltip
