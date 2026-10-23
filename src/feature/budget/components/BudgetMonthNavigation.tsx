import IconButton from '../../../components/atoms/IconButton';
import nextIcon from '../assets/next.svg';
import prevIcon from '../assets/previous.svg';

interface BudgetMonthNavigationProps {
  monthLabel: string
  monthOffset: number
  maxMonthOffset: number
  onPreviousMonth: () => void
  onNextMonth: () => void
}

const BudgetMonthNavigation = ({
  monthLabel,
  monthOffset,
  maxMonthOffset,
  onPreviousMonth,
  onNextMonth
}: BudgetMonthNavigationProps) => {
  return (
    <div className='xl:max-w-screen-content mx-auto h-full grid-cols-1 justify-start gap-4 px-4 pb-16 sm:px-8 lg:px-12'>
      <div className='mb-4 flex items-center gap-2'>
        <IconButton
          img={prevIcon}
          isFit
          xsmall
          outline
          disabled={monthOffset >= maxMonthOffset}
          onMouseClick={onPreviousMonth}
        />
        <p className='text-sm font-semibold capitalize'>{monthLabel}</p>
        <IconButton
          img={nextIcon}
          isFit
          xsmall
          outline
          onMouseClick={onNextMonth}
        />
      </div>
    </div>
  )
}

export default BudgetMonthNavigation
