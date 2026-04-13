import { useState } from 'react'

import { iCrop } from '../types/garden'
import CropHeader from './CropHeader'
import CropListDetail from './CropListDetail'

const CropList = ({ crops }: { crops: iCrop[] }) => {
  const [expandedCrops, setExpandedCrops] = useState<string[]>([])

  const toggleCropDetail = (cropId: string) => {
    setExpandedCrops(prev =>
      prev.includes(cropId)
        ? prev.filter(id => id !== cropId)
        : [...prev, cropId]
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      {crops.map(crop => (
        <div
          key={crop._id}
          className='border-secondaryLight flex flex-col gap-2 rounded-md border-1 p-4'
          onClick={() => toggleCropDetail(crop._id)}
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
          {expandedCrops.includes(crop._id) && (
            <div onClick={e => e.stopPropagation()}>
              <CropListDetail crop={crop} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
export default CropList
