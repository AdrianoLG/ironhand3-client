import { Dialog as RadixDialog, VisuallyHidden } from 'radix-ui'

import { Button } from '../../../components/atoms'
import { Dialog as AppDialog } from '../../../components/organisms/dialogs'
import { NOTE_FORM_TEXT } from '../utils/noteFormMessages'
import NoteContentPreview from './NoteContentPreview'

import type { Dispatch, SetStateAction } from 'react'
import type { NoteListItem } from '../types/types'

interface NoteDetailModalProps {
  note: NoteListItem | null
  isOpen: boolean
  isRemovingNote: boolean
  images: string[]
  activeImageIndex: number
  isImageGalleryOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  onOpenGallery: (index: number) => void
  onChangeImage: (direction: number) => void
  onToggleGallery: (open: boolean) => void
  onDelete: () => void
  onEdit: () => void
  resolveImageSrc: (image: string) => string
}

const NoteDetailModal = ({
  note,
  isOpen,
  isRemovingNote,
  images,
  activeImageIndex,
  isImageGalleryOpen,
  onClose,
  onOpenGallery,
  onChangeImage,
  onToggleGallery,
  onDelete,
  onEdit,
  resolveImageSrc
}: NoteDetailModalProps) => {
  if (!note) return null

  return (
    <AppDialog
      buttonText='Detalle nota'
      title=''
      description=''
      image='notes-bg'
      hideImage
      hideHeader
      hideTrigger
      isOpen={isOpen}
      setIsOpen={onClose}
      contentClasses='notes-popup-enter'
      child={
        <section className='flex flex-col gap-2 px-8 pb-8'>
          <h3 className='text-secondary text-center text-xl leading-tight font-semibold'>
            {note.title}
          </h3>
          <p className='text-secondaryLight text-center text-sm'>
            {note.category || '-'}
          </p>
          <div className='mt-1 flex flex-wrap justify-center gap-1'>
            {(note.tags ?? []).length > 0 ? (
              (note.tags ?? []).map(tag => (
                <span
                  key={`${note._id}-popup-${tag}`}
                  className='bg-warn text-accent rounded px-1 text-[10px]'
                >
                  #{tag}
                </span>
              ))
            ) : (
              <span className='text-secondaryLight text-[10px]'>
                {NOTE_FORM_TEXT.tagsLabel.toLowerCase()}: -
              </span>
            )}
          </div>
          {images.length > 0 && (
            <div className='mt-3 flex flex-col gap-2'>
              <div className='flex gap-2 overflow-x-auto pb-1'>
                {images.map((image, index) => (
                  <button
                    key={`${note._id}-image-${image}-${index}`}
                    type='button'
                    className={`rounded border p-0.5 ${index === activeImageIndex ? 'border-secondary' : 'border-secondaryLighter'}`}
                    onClick={() => onOpenGallery(index)}
                    aria-label={`Ver imagen ${index + 1}`}
                    title={`Ver imagen ${index + 1}`}
                  >
                    <img
                      src={resolveImageSrc(image)}
                      alt={`Miniatura ${index + 1}`}
                      className='h-14 w-14 rounded object-cover'
                    />
                  </button>
                ))}
              </div>
              <RadixDialog.Root
                open={isImageGalleryOpen}
                onOpenChange={onToggleGallery}
              >
                <RadixDialog.Portal>
                  <RadixDialog.Overlay className='data-[state=open]:animate-overlayShow bg-transparent70B fixed inset-0 z-70' />
                  <RadixDialog.Content
                    className='fixed top-1/2 left-1/2 z-80 w-full max-w-[90vw] -translate-x-1/2 -translate-y-1/2 outline-none'
                    onKeyDown={event => {
                      if (images.length <= 1) return

                      if (event.key === 'ArrowLeft') {
                        event.preventDefault()
                        onChangeImage(-1)
                      }

                      if (event.key === 'ArrowRight') {
                        event.preventDefault()
                        onChangeImage(1)
                      }
                    }}
                  >
                    <VisuallyHidden.Root asChild>
                      <RadixDialog.Title>
                        {' '}
                        Carrusel de imágenes de nota{' '}
                      </RadixDialog.Title>
                    </VisuallyHidden.Root>
                    <VisuallyHidden.Root asChild>
                      <RadixDialog.Description>
                        Imagen {activeImageIndex + 1} de {images.length}
                      </RadixDialog.Description>
                    </VisuallyHidden.Root>
                    <div className='bg-secondaryLightest border-secondaryLighter relative rounded-md border p-3'>
                      <img
                        src={resolveImageSrc(
                          images[Math.min(activeImageIndex, images.length - 1)]
                        )}
                        alt={`Carrusel nota ${activeImageIndex + 1}`}
                        className='max-h-[85vh] w-full rounded object-contain'
                      />
                      {images.length > 1 && (
                        <>
                          <button
                            type='button'
                            className='bg-primary/80 text-secondary hover:bg-primary border-secondaryLighter absolute top-1/2 left-2 -translate-y-1/2 rounded border px-3 py-1 text-sm'
                            onClick={() => onChangeImage(-1)}
                            aria-label='Imagen anterior'
                            title='Imagen anterior'
                          >
                            {'<'}
                          </button>
                          <button
                            type='button'
                            className='bg-primary/80 text-secondary hover:bg-primary border-secondaryLighter absolute top-1/2 right-2 -translate-y-1/2 rounded border px-3 py-1 text-sm'
                            onClick={() => onChangeImage(1)}
                            aria-label='Imagen siguiente'
                            title='Imagen siguiente'
                          >
                            {'>'}
                          </button>
                        </>
                      )}
                    </div>
                  </RadixDialog.Content>
                </RadixDialog.Portal>
              </RadixDialog.Root>
            </div>
          )}
          <div className='mt-2'>
            <NoteContentPreview content={note.content} />
          </div>
          <div className='mt-3 flex justify-end gap-2'>
            <Button
              text={NOTE_FORM_TEXT.deleteButton}
              outline
              isFit
              xsmall
              disabled={isRemovingNote}
              onMouseClick={() => onDelete()}
            />
            <Button
              text={NOTE_FORM_TEXT.editButton}
              isFit
              xsmall
              onMouseClick={() => onEdit()}
            />
          </div>
        </section>
      }
    />
  )
}

export default NoteDetailModal
