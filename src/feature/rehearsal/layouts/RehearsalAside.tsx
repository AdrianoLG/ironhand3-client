import { DateValueType } from 'react-tailwindcss-datepicker'

import Band from '../components/Band'
import RehearsalFilterButtons from '../components/RehearsalFilterButtons'
import { iCompletedRehearsal, iRehearsalInfo } from '../types/rehearsals'

const RehearsalAside = ({
  data,
  completedRehearsals,
  filterDate,
  activeButton,
  setCustomDate,
  customDate
}: {
  data: iRehearsalInfo | undefined
  completedRehearsals: iCompletedRehearsal[] | undefined
  filterDate: (period: string) => void
  activeButton: string
  setCustomDate: React.Dispatch<React.SetStateAction<DateValueType>>
  customDate: DateValueType
}) => (
  <aside className='w-full pb-8 md:w-1/3'>
    {data?.rehearsals && (
      <div className='border-secondaryLighter relative rounded-md border-1 py-4 shadow-md'>
        <Band completedRehearsals={completedRehearsals || []} />
      </div>
    )}
    <div className='mt-4 flex grid-rows-4 flex-col gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4'>
      <RehearsalFilterButtons
        filterDate={filterDate}
        activeButton={activeButton}
        setCustomDate={setCustomDate}
        customDate={customDate}
      />
    </div>
  </aside>
)

export default RehearsalAside
