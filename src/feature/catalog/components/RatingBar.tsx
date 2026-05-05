import { Progress } from 'radix-ui'

import { getRatingProgress } from '../utils/catalogMedia'

type RatingBarProps = {
  rating: number
}

const RatingBar = ({ rating }: RatingBarProps) => {
  const progress = getRatingProgress(rating)

  return (
    <div className='text-xs'>
      <p>
        <span className='font-semibold'>Valoración</span>: {rating + 1}/10
      </p>
      <Progress.Root
        className='bg-secondaryLightest relative h-2 w-full overflow-hidden rounded-full'
        style={{ transform: 'translateZ(0)' }}
        max={100}
        value={progress}
      >
        <Progress.Indicator
          className='ease-[cubic-bezier(0.65, 0, 0.35, 1)] bg-secondary size-full transition-transform duration-660'
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  )
}

export default RatingBar
