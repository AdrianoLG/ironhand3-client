import { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'

import { FormInputFile } from '../../../components/organisms/forms'
import { UPDATE_CROP } from '../gql/gardenMutations'
import { GARDEN_INFO, SELECT_GARDEN_FORM_DATA } from '../gql/gardenQueries'
import { iCrop } from '../types/garden'

const CropGalleryManager = ({ crop }: { crop: iCrop }) => {
  const [gallery, setGallery] = useState<string[]>(crop.gallery || [])
  const [showUploader, setShowUploader] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const [updateCrop] = useMutation(UPDATE_CROP, {
    refetchQueries: [{ query: GARDEN_INFO }, { query: SELECT_GARDEN_FORM_DATA }]
  })

  useEffect(() => {
    setGallery(crop.gallery || [])
  }, [crop._id, crop.gallery])

  const saveGallery = async (nextGallery: string[]) => {
    await updateCrop({
      variables: {
        updateCropInput: {
          _id: crop._id,
          gallery: nextGallery
        }
      }
    })
    setGallery(nextGallery)
  }

  const removeImage = async (indexToRemove: number) => {
    const nextGallery = gallery.filter((_, index) => index !== indexToRemove)
    await saveGallery(nextGallery)
  }

  const addImage = async (uploadedPath: string) => {
    const filename = uploadedPath.split('/').pop() || uploadedPath
    const nextGallery = [...gallery, filename]
    await saveGallery(nextGallery)
    setShowUploader(false)
  }

  return (
    <div className='my-7 flex w-full flex-col gap-4 px-8'>
      <label className='border-secondaryLighter text-secondaryLighter text-2xs mb-2 block w-full border-b-1 uppercase'>
        Galería del cultivo
      </label>

      <div className='flex flex-wrap gap-2'>
        {gallery.map((image, index) => (
          <div key={`${image}-${index}`} className='relative h-24 w-24'>
            <img
              src={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/garden/gallery/${image}`}
              alt={`Galería ${index + 1}`}
              className='h-24 w-24 rounded object-cover'
            />
            <button
              type='button'
              className='bg-secondary text-accent absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs leading-none hover:cursor-pointer'
              onClick={() => removeImage(index)}
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type='button'
          className='border-secondaryLighter bg-secondaryLightest text-secondary hover:bg-primary flex h-24 w-24 items-center justify-center rounded border-1 text-3xl leading-none hover:cursor-pointer'
          onClick={() => setShowUploader(prev => !prev)}
        >
          +
        </button>
      </div>

      {showUploader && (
        <FormInputFile
          label='Añadir imagen a galería'
          sublabel='Se generará miniatura 500x500'
          type='file'
          error={uploadError}
          required
          onUpload={addImage}
          acceptedTypes='image/avif'
          maxSize={0.2}
          createThumbnail
          setError={setUploadError}
          path='garden/gallery'
        />
      )}
    </div>
  )
}

export default CropGalleryManager
