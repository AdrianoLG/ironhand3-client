import { iShortcut } from '../../../types/types';

const PopupLayout = ({
  activeCard,
  dialogRef,
  children
}: {
  activeCard: iShortcut | null
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>
  children: React.ReactNode
}) => (
  <dialog
    ref={dialogRef}
    className='bg-primary backdrop:bg-transparent70B m-auto w-[90vw] max-w-2xl overflow-visible rounded-lg'
  >
    {activeCard && (
      <div className='max-h-[90vh] max-w-[90vw] pb-7'>
        <div className='py-6'>
          <p className='px-6 text-2xl leading-none sm:px-9 sm:text-3xl'>
            {activeCard.title}
          </p>
          {activeCard.subtitle && (
            <p className='mt-2 px-6 text-base leading-none sm:px-9 sm:text-lg'>
              {activeCard.subtitle}
            </p>
          )}
        </div>
        <img
          src={`./src/assets/img/${activeCard.image}.jpg`}
          className='w-full'
          alt=''
        />
        {children}
      </div>
    )}
  </dialog>
)

export default PopupLayout
