import { useState } from 'react'

import { Button } from '../../../components/atoms'
import { Dialog } from '../../../components/organisms/dialogs'
import { FormSelect } from '../../../components/organisms/forms'
import { iSelectOptions } from '../../../components/organisms/forms/types'
import CountryQuickAddForm from './CountryQuickAddForm'

interface CountryFieldWithDialogProps {
  options: iSelectOptions[]
  onChange: (value: string) => void
  dialogImage: string
}

const CountryFieldWithDialog = ({
  options,
  onChange,
  dialogImage
}: CountryFieldWithDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col gap-2'>
      <FormSelect
        tag='country'
        selectName='País'
        placeholder='Selecciona un país'
        options={options}
        onChange={onChange}
      />
      <Button
        text='Añadir país'
        xsmall
        isFit
        outline
        type='button'
        onMouseClick={() => setIsOpen(true)}
      />
      <Dialog
        buttonText='Añadir país'
        title='Añadir país'
        description='Introduce los datos del país'
        image={dialogImage}
        child={<CountryQuickAddForm setIsOpen={setIsOpen} />}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        hideTrigger
      />
    </div>
  )
}

export default CountryFieldWithDialog
