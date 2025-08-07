import '../../../styles.css'
import '../../../assets/styles/radix.css'

import { Dialog } from 'radix-ui'

import { useReactiveVar } from '@apollo/client'
import { Cross2Icon } from '@radix-ui/react-icons'

import { mode } from '../../../main'
import { iDialog } from './types'

const DialogLayout = ({
  buttonText,
  title,
  description,
  child,
  secondary,
  image,
  xsmall,
  isFit,
  isOpen,
  setIsOpen
}: iDialog) => {
  const isDarkMode = useReactiveVar(mode)
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger
        className={`${secondary ? 'bg-accent text-secondary' : 'bg-secondary text-accent'} ${isFit ? 'w-fit' : 'w-full'} ${xsmall ? 'px-4 py-1 text-xs' : 'px-4 py-1 text-lg'} border-secondary bg-accent hover:border-secondary hover:bg-primary hover:text-secondary focus:ring-accent rounded-md border-1 px-4 py-1 hover:shadow-md focus:ring-4 focus:outline-none`}
        onClick={() => {
          if (setIsOpen) setIsOpen(true)
        }}
      >
        {buttonText}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`${isDarkMode === 'dark' ? 'LightOverlay' : 'DarkOverlay'} data-[state=open]:animate-overlayShow bg-transparent70B fixed inset-0`}
          onClick={() => {
            if (setIsOpen) setIsOpen(false)
          }}
        />
        <Dialog.Content
          className={`${isDarkMode === 'dark' ? 'DarkContent' : 'LightContent'} data-[state=open]:animate-contentShow bg-primary fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-x-hidden overflow-y-auto rounded-md py-4 shadow-[var(--shadow-6)] focus:outline-none`}
        >
          <Dialog.Title className='px-8 text-3xl leading-none'>
            {title}
          </Dialog.Title>
          <Dialog.Description className='mt-2 mb-4 px-8 text-lg leading-none'>
            {description}
          </Dialog.Description>
          <img
            src={`./src/assets/img/${image}.avif`}
            className='w-full'
            alt=''
          />
          {child}
          <button
            className='bg-primary text-secondary hover:border-secondaryLight focus:ring-secondaryLighter absolute top-2.5 right-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full hover:border-1 hover:shadow-md focus:ring-1 focus:outline-none'
            aria-label='Close'
            onClick={() => {
              if (setIsOpen) setIsOpen(false)
            }}
          >
            <Cross2Icon />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DialogLayout
