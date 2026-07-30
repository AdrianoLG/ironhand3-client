import { Dialog as AppDialog } from '../../../components/organisms/dialogs'
import NoteForm from '../forms/NoteForm'
import { useNoteForm } from '../hooks/useNoteForm'
import { NOTE_FORM_TEXT } from '../utils/noteFormMessages'

import type { Dispatch, SetStateAction } from 'react'
import type { NoteListItem } from '../types/types'

interface NoteEditModalProps {
  note: NoteListItem | null
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  formProps: ReturnType<typeof useNoteForm>
}

const NoteEditModal = ({
  note,
  isOpen,
  onClose,
  formProps
}: NoteEditModalProps) => {
  if (!note) return null

  return (
    <AppDialog
      buttonText={NOTE_FORM_TEXT.editButton}
      title='Editar nota'
      description='Actualiza los datos de la nota.'
      image='notes-bg'
      hideImage
      hideTrigger
      isOpen={isOpen}
      setIsOpen={onClose}
      child={<NoteForm {...formProps} />}
    />
  )
}

export default NoteEditModal
