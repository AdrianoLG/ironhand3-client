import { renderLatexToHTML } from '@yoopta/math'

import { Button } from '../../../components/atoms'
import { Dialog } from '../../../components/organisms/dialogs'

import type { Dispatch, SetStateAction } from 'react'

interface MathDialogProps {
  isOpen: boolean
  value: string
  setValue: Dispatch<SetStateAction<string>>
  onClose: () => void
  onSubmit: () => void
}

const MathDialog = ({
  isOpen,
  value,
  setValue,
  onClose,
  onSubmit
}: MathDialogProps) => (
  <Dialog
    buttonText='Insertar fórmula'
    title='Escribir fórmula'
    description='Escribe una expresión en LaTeX y visualízala antes de insertarla en la nota.'
    image='notes-bg'
    hideImage
    isOpen={isOpen}
    setIsOpen={open => {
      if (!open) onClose()
    }}
    hideTrigger
    child={
      <div className='flex flex-col gap-3 px-8 pb-6'>
        <label className='text-secondary text-sm font-medium'>
          Expresión LaTeX
        </label>
        <textarea
          autoFocus
          rows={4}
          value={value}
          placeholder='Ej: x^2 + y^2'
          className='bg-secondaryLightest hover:bg-primary text-secondaryLight border-secondaryLighter focus:ring-secondaryLighter block w-full rounded-md border-1 p-2 text-sm leading-none focus:ring-1 focus:outline-none'
          onChange={event => setValue(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              onSubmit()
            }
          }}
        />
        <div className='border-secondary/20 bg-primary/30 rounded-md border p-3'>
          <p className='text-secondaryLight mb-2 text-xs tracking-wide uppercase'>
            Vista previa
          </p>
          <div
            className='text-secondary min-h-12 text-lg'
            dangerouslySetInnerHTML={{
              __html: renderLatexToHTML(value.trim() || 'x', false)
            }}
          />
        </div>
        <div className='flex justify-end gap-2'>
          <Button
            text='Cancelar'
            xsmall
            outline
            isFit
            type='button'
            onMouseClick={onClose}
          />
          <Button
            text='Insertar fórmula'
            xsmall
            isFit
            type='button'
            onMouseClick={() => onSubmit()}
          />
        </div>
      </div>
    }
  />
)

export default MathDialog
