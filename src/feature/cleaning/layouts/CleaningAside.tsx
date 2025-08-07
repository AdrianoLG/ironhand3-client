import { DateValueType } from 'react-tailwindcss-datepicker';

import House from '../assets/svgs/HouseFigure';
import CleaningFilterButtons from '../components/CleaningFilterButtons';
import { iCleaningInfo } from '../types/cleaningTasks';

const CleaningAside = ({
  data,
  completedCleaningTasks,
  filterDate,
  activeButton,
  setCustomDate,
  customDate
}: {
  data: iCleaningInfo | undefined
  completedCleaningTasks: iCleaningInfo['completedCleaningTasks']
  filterDate: (period: string) => void
  activeButton: string
  setCustomDate: React.Dispatch<React.SetStateAction<DateValueType>>
  customDate: DateValueType
}) => (
  <aside className='w-full pb-8 md:w-1/3'>
    {data?.completedCleaningTasks && (
      <div className='border-secondaryLighter relative rounded-md border-1 px-12 py-4 shadow-md xl:px-24 xl:py-9'>
        <House
          color='var(--value1)'
          completedCleaningTasks={completedCleaningTasks}
        />
      </div>
    )}
    <div className='mt-4 flex grid-rows-4 flex-col gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4'>
      <CleaningFilterButtons
        filterDate={filterDate}
        activeButton={activeButton}
        setCustomDate={setCustomDate}
        customDate={customDate}
      />
    </div>
  </aside>
)

export default CleaningAside
