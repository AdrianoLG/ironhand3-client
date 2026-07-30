import { Button } from '../../../components/atoms'
import { Dialog } from '../../../components/organisms/dialogs'
import { mediaDialogContent } from '../utils/wysiwyg'

import type { Dispatch, SetStateAction, KeyboardEventHandler } from 'react'
import type { MediaDialogType } from '../types/wysiwyg'

interface MediaDialogProps {
  isOpen: boolean
  type: MediaDialogType
  value: string
  setValue: Dispatch<SetStateAction<string>>
  onClose: () => void
  onSubmit: () => void
  onKeyDownCapture: KeyboardEventHandler<HTMLDivElement>
}

const MediaDialog = ({
  isOpen,
  type,
  value,
  setValue,
  onClose,
  onSubmit,
  onKeyDownCapture
}: MediaDialogProps) => (
  <Dialog
    buttonText={mediaDialogContent[type].buttonText}
    title={mediaDialogContent[type].title}
    description={mediaDialogContent[type].description}
    image='notes-bg'
    hideImage
    isOpen={isOpen}
    setIsOpen={open => {
      if (!open) onClose()
    }}
    hideTrigger
    child={
      <div
        className='flex flex-col gap-3 px-8 pb-6'
        onKeyDownCapture={onKeyDownCapture}
      >
        <input
          type='url'
          autoFocus
          value={value}
          placeholder={mediaDialogContent[type].placeholder}
          className='bg-secondaryLightest hover:bg-primary text-secondaryLight border-secondaryLighter focus:ring-secondaryLighter block w-full rounded-md border-1 p-2 text-sm leading-none focus:ring-1 focus:outline-none'
          onChange={event => setValue(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault()
              onSubmit()
            }
          }}
        />
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
            text={mediaDialogContent[type].buttonText}
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

export default MediaDialog
