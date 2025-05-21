import { Button } from '../../../components/atoms'

const ExerciseFilterButtons = ({
  filterDate,
  activeButton
}: {
  filterDate: (period: string) => void
  activeButton: string
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
    </>
  )
}
export default ExerciseFilterButtons
