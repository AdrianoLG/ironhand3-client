import { iCrop } from '../types/garden'

const CropHeader = ({ crop }: { crop: iCrop }) => {
  return (
    <>
      <p className='text-secondary flex items-center justify-between text-sm'>
        <span className='text-xl'>{crop.cropContainer.name}</span>
        <span>
          {new Date(crop.startDate).toLocaleDateString()} -{' '}
          {crop.endDate
            ? new Date(crop.endDate).toLocaleDateString()
            : 'En curso'}
        </span>
      </p>
      <div className='flex gap-2'>
        <p title='Plantas muertas'>
          <span className='font-bold'>💀</span>{' '}
          {crop.plants.filter(plant => plant.death).length}
        </p>
        <p title='Plantas en floración'>
          <span className='font-bold' title='Plantas en floración'>
            🌼
          </span>{' '}
          {crop.plants.filter(plant => plant.inBloom?.length !== 0).length}
        </p>
        <p title='Plantas cosechadas'>
          <span className='font-bold' title='Plantas cosechadas'>
            🍂
          </span>{' '}
          {crop.plants.filter(plant => plant.harvested?.length !== 0).length}
        </p>
        <p title='Riegos'>
          <span className='font-bold' title='Riegos'>
            💧
          </span>{' '}
          {crop.waterings?.length ?? 0}
        </p>
      </div>
    </>
  )
}
export default CropHeader
