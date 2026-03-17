import { iWatering } from '../types/garden'

const CompletedWateringInfo = ({
  completedWatering
}: {
  completedWatering: iWatering
}) => (
  <div className='relative grid grid-cols-2 pt-4 pb-8'>
    {completedWatering.fertilizers.map((fertilizerItem, index) => (
      <div
        key={index}
        className='relative flex flex-col items-center justify-center pb-4'
      >
        <img
          src={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/garden/fertilizers/${fertilizerItem.fertilizer.img}`}
          className='w-full'
          alt={fertilizerItem.fertilizer.name}
          title={fertilizerItem.fertilizer.name}
        />
        <p className='bg-category1 text-primaryInv absolute bottom-2 w-14 transform rounded-2xl p-1 text-center text-xs'>
          {fertilizerItem.qty} ml.
        </p>
      </div>
    ))}
  </div>
)

export default CompletedWateringInfo
