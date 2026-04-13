import { Dialog, VisuallyHidden } from 'radix-ui'
import { useState } from 'react'

import Arrow from '../../../assets/svgs/Arrow'
import { iCrop } from '../types/garden'

const CropGallery = ({ crop }: { crop: iCrop }) => {
  const [activeGallery, setActiveGallery] = useState<{
    cropId: string
    imageIndex: number
  } | null>(null)

  const openGallery = (cropId: string, imageIndex: number) => {
    setActiveGallery({ cropId, imageIndex })
  }

  const changeGalleryImage = (
    cropId: string,
    galleryLength: number,
    direction: number
  ) => {
    setActiveGallery(current => {
      if (!current || current.cropId !== cropId || galleryLength === 0) {
        return current
      }

      const nextImageIndex =
        (current.imageIndex + direction + galleryLength) % galleryLength

      return { ...current, imageIndex: nextImageIndex }
    })
  }

  return (
    <>
      {crop.gallery && crop.gallery.length > 0 && (
        <div className='mt-2 flex gap-2 overflow-x-auto'>
          {crop.gallery.map((image, index) => {
            const smImage = image.replace(/(\.\w+)$/, '-sm$1')

            return (
              <button
                key={index}
                type='button'
                onClick={() => openGallery(crop._id, index)}
                className='hover:cursor-pointer hover:opacity-90'
              >
                <img
                  src={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/garden/gallery/${smImage}`}
                  alt={`Gallery image ${index + 1}`}
                  className='h-24 w-24 object-cover'
                  onError={e => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = `${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/garden/gallery/${image}`
                  }}
                />
              </button>
            )
          })}

          <Dialog.Root
            open={activeGallery?.cropId === crop._id}
            onOpenChange={open => {
              if (!open && activeGallery?.cropId === crop._id) {
                setActiveGallery(null)
              }
            }}
          >
            <Dialog.Portal>
              <Dialog.Overlay className='data-[state=open]:animate-overlayShow bg-transparent70B fixed inset-0 z-40' />
              <Dialog.Content
                className='fixed top-1/2 left-1/2 z-50 h-auto max-h-[95vh] w-full max-w-[95dvw] -translate-x-1/2 -translate-y-1/2 border-none outline-none sm:w-auto sm:max-w-[80dvw]'
                onKeyDown={e => {
                  if (e.key === 'ArrowRight') {
                    changeGalleryImage(crop._id, crop.gallery.length, 1)
                  } else if (e.key === 'ArrowLeft') {
                    changeGalleryImage(crop._id, crop.gallery.length, -1)
                  }
                }}
                onTouchStart={e => {
                  const touchStartX = e.touches[0].clientX
                  const handleTouchMove = (e: TouchEvent) => {
                    const touchEndX = e.touches[0].clientX
                    const deltaX = touchEndX - touchStartX
                    if (deltaX > 50) {
                      changeGalleryImage(crop._id, crop.gallery.length, -1)
                      document.removeEventListener('touchmove', handleTouchMove)
                    } else if (deltaX < -50) {
                      changeGalleryImage(crop._id, crop.gallery.length, 1)
                      document.removeEventListener('touchmove', handleTouchMove)
                    }
                  }
                  document.addEventListener('touchmove', handleTouchMove)
                  document.addEventListener('touchend', () => {
                    document.removeEventListener('touchmove', handleTouchMove)
                  })
                }}
              >
                <VisuallyHidden.Root asChild>
                  <Dialog.Title>Crop image</Dialog.Title>
                </VisuallyHidden.Root>
                <VisuallyHidden.Root asChild>
                  <Dialog.Description>
                    Image {(activeGallery?.imageIndex ?? 0) + 1}
                  </Dialog.Description>
                </VisuallyHidden.Root>
                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    onClick={() =>
                      changeGalleryImage(crop._id, crop.gallery.length, -1)
                    }
                    className='hidden sm:block'
                  >
                    <Arrow
                      strokeColor='white'
                      inverted
                      classes='bg-black w-10 p-2'
                    />
                  </button>
                  <img
                    src={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/garden/gallery/${crop.gallery[activeGallery?.imageIndex ?? 0]}`}
                    alt={`Image ${(activeGallery?.imageIndex ?? 0) + 1}`}
                    className='max-h-[95vh] w-full max-w-full object-contain sm:w-auto'
                  />
                  <button
                    type='button'
                    onClick={() =>
                      changeGalleryImage(crop._id, crop.gallery.length, 1)
                    }
                    className='hidden sm:block'
                  >
                    <Arrow strokeColor='white' classes='bg-black w-10 p-2' />
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      )}
    </>
  )
}

export default CropGallery
