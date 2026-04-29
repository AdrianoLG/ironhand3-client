import { Button } from '../../../components/atoms'
import { getWeekTitle } from '../utils/nutrition'

interface WeekPaginationProps {
  weekOffset: number
  maxWeekOffset: number
  weekRangeLabel: string
  onPreviousWeek: () => void
  onNextWeek: () => void
}

const WeekPagination = ({
  weekOffset,
  maxWeekOffset,
  weekRangeLabel,
  onPreviousWeek,
  onNextWeek
}: WeekPaginationProps) => {
  const prevButtonText =
    weekOffset === 0 ? 'Esta semana' : getWeekTitle(weekOffset - 1)
  const nextButtonText = getWeekTitle(weekOffset + 1)

  return (
    <div className='mb-6 flex flex-col items-start justify-between gap-3'>
      <div>
        <p className='text-text text-sm font-semibold'>
          {getWeekTitle(weekOffset)}
        </p>
        <p className='text-secondaryLight text-xs'>{weekRangeLabel}</p>
      </div>

      <div className='flex gap-2'>
        <Button
          text={prevButtonText}
          type='button'
          isFit
          xsmall
          secondary
          outline
          disabled={weekOffset === 0}
          onMouseClick={onNextWeek}
        />
        <Button
          text={nextButtonText}
          type='button'
          isFit
          xsmall
          outline
          disabled={weekOffset >= maxWeekOffset}
          onMouseClick={onPreviousWeek}
        />
      </div>
    </div>
  )
}

export default WeekPagination
