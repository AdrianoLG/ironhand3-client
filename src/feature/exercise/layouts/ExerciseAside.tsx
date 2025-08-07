import { DateValueType } from 'react-tailwindcss-datepicker'

import Cardio from '../assets/svgs/Cardio'
import Stretch from '../assets/svgs/Stretch'
import Body from '../components/Body'
import ExerciseFilterButtons from '../components/ExerciseFilterButtons'
import { iExercisesInfo } from '../types/exercises'

const ExerciseAside = ({
  data,
  completedExercises,
  filterDate,
  activeButton,
  setCustomDate,
  customDate
}: {
  data: iExercisesInfo | undefined
  completedExercises: iExercisesInfo['completedExercises']
  filterDate: (period: string) => void
  activeButton: string
  setCustomDate: React.Dispatch<React.SetStateAction<DateValueType>>
  customDate: DateValueType
}) => (
  <aside className='w-full pb-8 md:w-1/3'>
    {data?.completedExercises && (
      <div className='border-secondaryLighter relative rounded-md border-1 px-12 py-4 shadow-md xl:px-24 xl:py-9'>
        <Body color='var(--value1)' completedExercises={completedExercises} />
        <div className='absolute right-0 bottom-0 flex gap-3 p-4'>
          <Stretch width='.7rem' completedExercises={completedExercises} />
          <Cardio width='1rem' completedExercises={completedExercises} />
        </div>
      </div>
    )}
    <div className='mt-4 flex grid-rows-4 flex-col gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4'>
      <ExerciseFilterButtons
        filterDate={filterDate}
        activeButton={activeButton}
        setCustomDate={setCustomDate}
        customDate={customDate}
      />
    </div>
  </aside>
)

export default ExerciseAside
