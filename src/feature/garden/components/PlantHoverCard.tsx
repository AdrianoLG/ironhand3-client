import { Button } from '../../../components/atoms'
import { iPlant } from '../types/garden'
import SpecieInfo from './SpecieInfo'

const PlantHoverCard = ({
  showHoverCard,
  plant,
  setShowDialog,
  setShowHoverCard,
  removePlant
}: {
  showHoverCard: boolean
  plant: iPlant
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
  setShowHoverCard: React.Dispatch<React.SetStateAction<boolean>>
  removePlant: (id: string) => void
}) => {
  return (
    <div
      className={`${showHoverCard ? 'absolute' : 'hidden'} text-secondary left-1/2 z-10 w-96 pt-1 transition-all duration-200 ease-out`}
    >
      <div className='border-r-secondaryLight absolute top-1/2 -left-1 z-20 h-0 w-0 -translate-y-1/2 border-t-4 border-r-4 border-b-4 border-t-transparent border-b-transparent'></div>
      <div className='bg-primary border-secondaryLight overflow-clip rounded-md border-1 px-4 shadow-md'>
        <SpecieInfo plant={plant} />
        <div className='mb-4 flex justify-center gap-2'>
          <Button
            text='Actualizar'
            onMouseClick={() => {
              setShowDialog(true)
              setShowHoverCard(false)
            }}
            xsmall
            isFit
          />
          <Button
            text='Borrar'
            onMouseClick={() => {
              removePlant(plant._id)
            }}
            xsmall
            isFit
            outline
            secondary
          />
        </div>
        <div className='absolute bottom-0 h-2 w-full translate-y-full bg-transparent'></div>
        <div className='absolute top-0 h-2 w-full -translate-y-full bg-transparent'></div>
      </div>
    </div>
  )
}
export default PlantHoverCard
