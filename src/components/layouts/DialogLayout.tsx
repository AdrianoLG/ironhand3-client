import { Dialog } from 'radix-ui'

import { Cross2Icon } from '@radix-ui/react-icons'

import Button from '../Button'

const DialogLayout = ({
  buttonText,
  title,
  description,
  child,
  secondary,
  image
}: {
  buttonText: string
  title: string
  description: string
  child: React.ReactNode
  secondary?: boolean
  image: string
}) => (
  <Dialog.Root>
    <Dialog.Trigger
      className={`${secondary ? 'bg-accent text-secondary' : 'bg-secondary text-accent'} w-full rounded-md border-1 border-secondary bg-accent px-4 py-1 text-lg hover:border-secondary hover:bg-primary hover:text-secondary`}
    >
      {buttonText}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className='data-[state=open]:animate-overlayShow fixed inset-0 bg-transparent70B'>
        <Dialog.Content className='data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-primary py-4 shadow-[var(--shadow-6)] focus:outline-none'>
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
          <Dialog.Close asChild>
            <button
              className='absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full bg-primary text-secondary hover:bg-secondaryLight focus:outline-none focus:ring-1 focus:ring-secondaryLighter'
              aria-label='Close'
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
)

export default DialogLayout
