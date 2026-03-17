import { iCrop } from '../types/garden'
import CropGallery from './CropGallery'
import CropHeader from './CropHeader'
import CropTooltip from './CropTooltip'

const CropList = ({ crops }: { crops: iCrop[] }) => {
  return (
    <div className='flex flex-col gap-4'>
      {crops.map(crop => (
        <div
          key={crop._id}
          className='border-secondaryLight flex flex-col gap-2 rounded-md border-1 p-4'
        >
          <CropHeader crop={crop} />
          <div className='relative'>
            <img
              src={
                crop.cropContainer.img
                  ? `${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/garden/container/${crop.cropContainer.img}`
                  : '/placeholder.png'
              }
              alt={crop.cropContainer.name}
              className='my-2 block w-full'
            />
            <p className='bg-secondaryLight absolute right-2 bottom-2 rounded p-1 text-white'>
              {crop.cropContainer.capacity} l.
            </p>
          </div>
          <div>
            <p className='text-secondary mb-2 text-sm font-semibold'>Plantas</p>
            <div className='grid grid-cols-2 gap-1'>
              <CropTooltip crop={crop} />
            </div>
          </div>
          <p className='text-lg'>{crop.comments}</p>
          <CropGallery crop={crop} />
        </div>
      ))}
    </div>
  )
}
export default CropList
