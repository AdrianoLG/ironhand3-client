import { DateValueType } from 'react-tailwindcss-datepicker'

import RehearsalFilterButtons from '../components/RehearsalFilterButtons'
import {
  iCompletedRehearsal,
  iRehearsalInfo,
  iSheet
} from '../types/rehearsals'

const RehearsalAside = ({
  data,
  completedRehearsals,
  filterDate,
  activeButton,
  setCustomDate,
  customDate
}: {
  data: iRehearsalInfo | undefined
  completedRehearsals: iRehearsalInfo['completedRehearsals']
  filterDate: (period: string) => void
  activeButton: string
  setCustomDate: React.Dispatch<React.SetStateAction<DateValueType>>
  customDate: DateValueType
}) => (
  <aside className='w-full pb-8 md:w-1/3'>
    {data?.completedRehearsals && (
      <div className='border-secondaryLighter relative rounded-md border-1 px-12 py-4 shadow-md xl:px-24 xl:py-9'>
        <p>AQUÍ INSTRUMENTOS</p>
        {completedRehearsals.map((completedRehearsal: iCompletedRehearsal) => (
          <div key={completedRehearsal._id}>
            <p>{completedRehearsal.instrument.name}</p>
            {completedRehearsal.sheets.map(({ sheet }: { sheet: iSheet }) => (
              <p key={sheet._id}>{sheet.title}</p>
            ))}
          </div>
        ))}
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
