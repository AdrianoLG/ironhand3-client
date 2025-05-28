import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'

import { Button } from '../../../components/atoms'

const ExerciseFilterButtons = ({
  filterDate,
  activeButton,
  setCustomDate,
  customDate
}: {
  filterDate: (period: string) => void
  activeButton: string
  setCustomDate: React.Dispatch<React.SetStateAction<DateValueType>>
  customDate: DateValueType
}) => {
  return (
    <>
      <Button
        text='Esta semana'
        onMouseClick={() => filterDate('weekAt')}
        small
        outline
        classes='justify-self-end'
        disabled={activeButton === 'weekAt'}
      />
      <Button
        text='Semana pasada'
        onMouseClick={() => filterDate('pastWeek')}
        small
        outline
        disabled={activeButton === 'pastWeek'}
      />
      <Button
        text='Este mes'
        onMouseClick={() => filterDate('monthAt')}
        small
        outline
        classes='justify-self-end'
        disabled={activeButton === 'monthAt'}
      />
      <Button
        text='Mes pasado'
        onMouseClick={() => filterDate('pastMonth')}
        small
        outline
        disabled={activeButton === 'pastMonth'}
      />
      <Button
        text='Ver todos'
        onMouseClick={() => filterDate('all')}
        small
        outline
        classes='col-span-2'
        disabled={activeButton === 'all'}
      />
      <div className='col-span-2 mt-2 w-full border-t-1 border-secondaryLighter bg-primary pt-6 text-reg text-secondary hover:border-secondary hover:bg-primary hover:text-secondary hover:shadow-md focus:outline-none focus:ring-1 focus:ring-secondaryLighter focus-visible:outline-none'>
        <Datepicker
          displayFormat='DD/MM/YYYY'
          separator=' - '
          primaryColor={'neutral'}
          value={customDate}
          onChange={newDateValue => {
            setCustomDate(newDateValue)
          }}
          useRange={false}
          inputClassName={`rounded-md border-1 focus-visible:outline-none relative transition-all duration-300 px-4 py-1 w-full border-secondary rounded-lg ${activeButton === 'custom' ? 'text-secondaryLighter' : 'text-secondary'} text-reg placeholder-secondary bg-white focus:ring disabled:opacity-40`}
          placeholder='Personalizar periodo'
        />
      </div>
    </>
  )
}
export default ExerciseFilterButtons
