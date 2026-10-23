import { Dispatch, SetStateAction, useState } from 'react';

import { useMutation } from '@apollo/client';

import { REMOVE_NOTE, UPDATE_NOTE } from '../gql/noteMutations';
import { NOTE_INFO } from '../gql/noteQueries';
import { useNoteForm } from '../hooks/useNoteForm';
import { buildCreateNoteInput } from '../utils/noteForm';
import NoteCard from './NoteCard';
import NoteDetailModal from './NoteDetailModal';
import NoteEditModal from './NoteEditModal';

import type { NoteListItem } from '../types/types'

interface NotesGridProps {
  notes: NoteListItem[]
  noteCategories: string[]
}

const NotesGrid = ({ notes, noteCategories }: NotesGridProps) => {
  const [removeNote, { loading: isRemovingNote }] = useMutation(REMOVE_NOTE, {
    refetchQueries: [{ query: NOTE_INFO }]
  })
  const [updateNote, { loading: isUpdatingNote }] = useMutation(UPDATE_NOTE, {
    refetchQueries: [{ query: NOTE_INFO }],
    awaitRefetchQueries: true
  })

  const [selectedNote, setSelectedNote] = useState<NoteListItem | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const detailImages = selectedNote?.images ?? []

  const handleDetailsOpen: Dispatch<SetStateAction<boolean>> = value => {
    setIsDetailsOpen(prev => {
      const next = typeof value === 'function' ? value(prev) : value
      if (!next) {
        setIsImageGalleryOpen(false)
      }
      return next
    })
  }

  const resolveImageSrc = (image: string) => {
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image
    }

    return `${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/${image}`
  }

  const changeDetailImage = (direction: number) => {
    if (!detailImages.length) return

    setActiveImageIndex(current => {
      const total = detailImages.length
      return (current + direction + total) % total
    })
  }

  const editFormProps = useNoteForm({
    noteCategories,
    isSubmitting: isUpdatingNote,
    mode: 'edit',
    initialNote: selectedNote,
    onSubmitNote: async formData => {
      if (!selectedNote) return

      const { data } = await updateNote({
        variables: {
          updateNoteInput: {
            _id: selectedNote._id,
            ...buildCreateNoteInput(formData)
          }
        }
      })

      if (data?.updateNote) {
        setSelectedNote(data.updateNote)
      }
    },
    onSubmitSuccess: () => {
      setIsEditOpen(false)
      setIsDetailsOpen(false)
    }
  })

  const handleDeleteNote = async () => {
    if (!selectedNote) return

    await removeNote({
      variables: {
        id: selectedNote._id
      }
    })

    setIsDetailsOpen(false)
    setSelectedNote(null)
  }

  if (!notes.length) {
    return (
      <section className='xl:max-w-screen-content mx-auto px-4 pb-8 sm:px-8 lg:px-12'>
        <p className='text-secondaryLight text-sm'>No hay notas todavía.</p>
      </section>
    )
  }

  return (
    <section className='xl:max-w-screen-content mx-auto px-4 pb-8 sm:px-8 lg:px-12'>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {notes.map(note => (
          <NoteCard
            key={note._id}
            note={note}
            onOpen={selectedNote => {
              setSelectedNote(selectedNote)
              setActiveImageIndex(0)
              setIsImageGalleryOpen(false)
              setIsDetailsOpen(true)
            }}
          />
        ))}
      </div>
      <NoteDetailModal
        note={selectedNote}
        isOpen={isDetailsOpen}
        isRemovingNote={isRemovingNote}
        images={detailImages}
        activeImageIndex={activeImageIndex}
        isImageGalleryOpen={isImageGalleryOpen}
        onClose={handleDetailsOpen}
        onOpenGallery={index => {
          setActiveImageIndex(index)
          setIsImageGalleryOpen(true)
        }}
        onChangeImage={direction => {
          changeDetailImage(direction)
        }}
        onToggleGallery={setIsImageGalleryOpen}
        onDelete={() => {
          void handleDeleteNote()
        }}
        onEdit={() => {
          setIsDetailsOpen(false)
          setIsEditOpen(true)
        }}
        resolveImageSrc={resolveImageSrc}
      />
      <NoteEditModal
        note={selectedNote}
        isOpen={isEditOpen}
        onClose={setIsEditOpen}
        formProps={editFormProps}
      />
    </section>
  )
}

export default NotesGrid
