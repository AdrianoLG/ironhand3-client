import { useState } from 'react'

import { FormInputFile } from '../../../components/organisms/forms'

const RecipeGalleryManager = ({
  gallery,
  onChange
}: {
  gallery: string[]
  onChange: (gallery: string[]) => void
}) => {
  const [showUploader, setShowUploader] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const removeImage = (indexToRemove: number) => {
    onChange(gallery.filter((_, index) => index !== indexToRemove))
  }

  const addImage = (uploadedPath: string) => {
    const filename = uploadedPath.split('/').pop() || uploadedPath
    onChange([...gallery, filename])
    setShowUploader(false)
    setUploadError('')
  }

  return (
    <div className='col-span-2 flex flex-col gap-4'>
      <label className='border-secondaryLighter text-secondaryLighter text-2xs mb-2 block w-full border-b-1 uppercase'>
        Galería de la receta
      </label>

      <div className='flex flex-wrap gap-2'>
        {gallery.map((image, index) => (
          <div key={`${image}-${index}`} className='relative h-24 w-24'>
            <img
              src={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/nutrition/recipes/${image}`}
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
          path='nutrition/recipes'
        />
      )}
    </div>
  )
}

export default RecipeGalleryManager
