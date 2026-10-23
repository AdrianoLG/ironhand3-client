import { Dialog } from '../../../components/organisms/dialogs';
import NoteForm, { NoteFormProps } from '../forms/NoteForm';

interface NotesHeaderButtonsProps {
  noteFormProps: NoteFormProps
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NotesHeaderButtons = ({
  noteFormProps,
  isOpen,
  setIsOpen
}: NotesHeaderButtonsProps) => {
  return (
    <nav className='xl:max-w-screen-content mx-auto flex flex-wrap justify-start gap-2 px-4 pb-8 sm:px-8 lg:px-12'>
      <Dialog
        buttonText='Añadir nota'
        title='Añadir nota'
        description='Completa los datos de la nueva nota.'
        image='notes-bg'
        child={<NoteForm {...noteFormProps} />}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isFit
      />
    </nav>
  )
}

export default NotesHeaderButtons
