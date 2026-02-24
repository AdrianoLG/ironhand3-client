import DOMPurify from 'dompurify'

import { iPlant } from '../types/garden'
import { formatDateShort } from '../utils/formatDate'
import { formatDeathCause } from '../utils/formatDeathCause'
import { ALLOWED_ATTR, ALLOWED_TAGS, decodeHtml } from '../utils/paintHTML'

const SpecieInfo = ({ plant }: { plant: iPlant }) => {
  const category =
    plant.specie.category.charAt(0).toUpperCase() +
    plant.specie.category.slice(1).toLowerCase()
  return (
    <div className='text-secondary py-2 text-xs'>
      <h3 className='mb-2 text-center text-2xl'> {plant.name}</h3>
      <p>
        <span className='font-bold'>Plantada</span>:{' '}
        {formatDateShort(plant.planted)}
      </p>
      {plant.inBloom?.length !== 0 && (
        <>
          <p>
            <span className='font-bold'>En floración</span>:
          </p>
          <ul>
            {plant.inBloom?.map((harvest, index) => (
              <li key={index} className='ml-6 list-disc'>
                {formatDateShort(harvest)}
              </li>
            ))}
          </ul>
        </>
      )}
      {plant.harvested?.length !== 0 && (
        <>
          <p>
            <span className='font-bold'>Cosechas</span>:
          </p>
          <ul>
            {plant.harvested?.map((harvest, index) => (
              <li key={index} className='ml-6 list-disc'>
                {formatDateShort(harvest)}
              </li>
            ))}
          </ul>
        </>
      )}
      {plant.death && (
        <p>
          <span className='font-bold'>Muerte</span>:{' '}
          {formatDeathCause(plant.death.cause)} (
          {formatDateShort(plant.death.date)})
        </p>
      )}
      <div className='border-secondaryLight mt-2 border-t-1'>
        <div className='flex items-center px-2'>
          <img
            className='block w-full max-w-24'
            src={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/plant/specie/${plant.specie.image}`}
            alt={plant.specie.name}
          />
          <div className='text-sm'>
            <p>
              <span className='font-bold'>Nombre</span>: {plant.specie.name}
            </p>
            <p>
              <span className='font-bold'>Categoría</span>: {category}
            </p>
          </div>
        </div>

        {plant.specie.comments && (
          <div className='mb-6 px-2'>
            <div
              className='text-2xs max-w-none'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(decodeHtml(plant.specie.comments), {
                  ALLOWED_TAGS,
                  ALLOWED_ATTR
                })
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SpecieInfo
