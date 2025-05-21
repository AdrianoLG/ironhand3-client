import { Dialog } from 'radix-ui'

import { Cross2Icon } from '@radix-ui/react-icons'

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
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger
        className={`${secondary ? 'bg-accent text-secondary' : 'bg-secondary text-accent'} ${isFit ? 'w-fit' : 'w-full'} ${xsmall ? 'px-4 py-1 text-xs' : 'px-4 py-1 text-lg'} rounded-md border-1 border-secondary bg-accent px-4 py-1 hover:border-secondary hover:bg-primary hover:text-secondary hover:shadow-md`}
        onClick={() => {
          if (setIsOpen) setIsOpen(true)
        }}
      >
        {buttonText}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className='data-[state=open]:animate-overlayShow fixed inset-0 bg-transparent70B'
          onClick={() => {
            if (setIsOpen) setIsOpen(false)
          }}
        />
        <Dialog.Content className='data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden rounded-md bg-primary py-4 shadow-[var(--shadow-6)] focus:outline-none'>
          <Dialog.Title className='px-8 text-3xl leading-none'>
            {title}
          </Dialog.Title>
          <Dialog.Description className='mb-4 mt-2 px-8 text-lg leading-none'>
            {description}
          </Dialog.Description>
          <img
            src={`./src/assets/img/${image}.avif`}
            className='w-full'
            alt=''
          />
          {child}
          <button
            className='absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full bg-primary text-secondary hover:border-1 hover:border-secondaryLight hover:shadow-md focus:outline-none focus:ring-1 focus:ring-secondaryLighter'
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
