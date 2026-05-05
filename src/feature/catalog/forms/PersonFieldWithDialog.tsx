import { useState } from 'react'

import { Button } from '../../../components/atoms'
import { Dialog } from '../../../components/organisms/dialogs'
import { FormInputAutocompleteMulti } from '../../../components/organisms/forms'
import { iSelectOptions } from '../../../components/organisms/forms/types'
import PersonQuickAddForm from './PersonQuickAddForm'

interface PersonFieldWithDialogProps {
  label: string
  isRequired?: boolean
  options: iSelectOptions[]
  placeholder: string
  onChange: (ids: string[]) => void
  error?: string
  buttonText: string
  role: 'DIRECTOR' | 'ACTOR' | 'WRITER'
  dialogImage: string
}

const PersonFieldWithDialog = ({
  label,
  isRequired,
  options,
  placeholder,
  onChange,
  error,
  buttonText,
  role,
  dialogImage
}: PersonFieldWithDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const personLabel = buttonText.replace('Añadir ', '').toLowerCase()

  return (
    <div className='flex flex-col gap-2'>
      <FormInputAutocompleteMulti
        label={label}
        isRequired={isRequired}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        error={error}
      />
      <Button
        text={buttonText}
        xsmall
        isFit
        outline
        type='button'
        onMouseClick={() => setIsOpen(true)}
      />
      <Dialog
        buttonText={buttonText}
        title={buttonText}
        description={`Introduce los datos del ${personLabel}`}
        image={dialogImage}
        child={<PersonQuickAddForm role={role} setIsOpen={setIsOpen} />}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        hideTrigger
      />
    </div>
  )
}

export default PersonFieldWithDialog
