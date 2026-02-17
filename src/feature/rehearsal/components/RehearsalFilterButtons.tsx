import { es } from 'date-fns/locale'
import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { DateRangeType, DateValueType } from 'react-tailwindcss-datepicker'

import { Button } from '../../../components/atoms'
import { FormInput } from '../../../components/organisms/forms'

const RehearsalFilterButtons = ({
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
  registerLocale('es-ES', es)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: null,
    endDate: null
  })
  const formatDate = (date: DateRangeType) => {
    if (!date.startDate || !date.endDate) {
      return 'Selecciona un periodo'
    }
    const start = date.startDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    const end = date.endDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    return `${start} - ${end}`
  }
  const resetDate = () => {
    setShowDatePicker(false)
    setDateRange({ startDate: null, endDate: null })
  }
  return (
    <>
      <Button
        text='Esta semana'
        onMouseClick={() => {
          filterDate('weekAt')
          resetDate()
        }}
        small
        outline
        classes='justify-self-end'
        disabled={activeButton === 'weekAt'}
      />
      <Button
        text='Semana pasada'
        onMouseClick={() => {
          filterDate('pastWeek')
          resetDate()
        }}
        small
        outline
        disabled={activeButton === 'pastWeek'}
      />
      <Button
        text='Este mes'
        onMouseClick={() => {
          filterDate('monthAt')
          resetDate()
        }}
        small
        outline
        classes='justify-self-end'
        disabled={activeButton === 'monthAt'}
      />
      <Button
        text='Mes pasado'
        onMouseClick={() => {
          filterDate('pastMonth')
          resetDate()
        }}
        small
        outline
        disabled={activeButton === 'pastMonth'}
      />
      <Button
        text='Ver todos'
        onMouseClick={() => {
          filterDate('all')
          resetDate()
        }}
        small
        outline
        classes='col-span-2'
        disabled={activeButton === 'all'}
      />
      <div
        tabIndex={0}
        className='group relative col-span-2 select-none focus:outline-none'
        onClick={() => setShowDatePicker(!showDatePicker)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            setShowDatePicker(!showDatePicker)
          }
        }}
      >
        <div className='absolute top-0 left-0 h-full w-full bg-transparent'></div>
        <FormInput
          label=''
          value={`${formatDate(dateRange)}`}
          inputClasses={`${activeButton === 'custom' ? 'opacity-60' : ''} bg-primary text-secondary border-secondary text-reg text-center group-hover:shadow-md group-hover:cursor-pointer group-focus:shadow-md group-focus:ring-secondaryLighter group-focus:ring-1 group-focus:outline-none select-none`}
          readOnly
        />
      </div>
      <div className={`${showDatePicker ? 'block' : 'hidden'} col-span-2`}>
        <DatePicker
          selected={customDate?.startDate}
          onChange={newDateValue => {
            const [startDate, endDate] = newDateValue || []
            setDateRange({
              startDate: startDate || null,
              endDate: endDate || null
            })
            const date: DateRangeType = {
              startDate: startDate || null,
              endDate: endDate || null
            }
            setCustomDate(date)
            if (startDate && endDate) {
              filterDate('custom')
            }
          }}
          startDate={customDate?.startDate}
          endDate={customDate?.endDate}
          selectsRange
          inline
          locale={'es-ES'}
        />
      </div>
    </>
  )
}
export default RehearsalFilterButtons
