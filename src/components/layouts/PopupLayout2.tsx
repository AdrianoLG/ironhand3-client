import { iPopupData } from '../../utils/types';

const PopupLayout2 = ({
  dialogRef,
  children,
  popupData
}: {
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>
  children: React.ReactNode
  popupData: iPopupData
}) => (
  <dialog
    ref={dialogRef}
    className='w-[90vw] max-w-2xl overflow-visible rounded-lg bg-primary backdrop:bg-transparent70B'
  >
    <div className='max-h-[90vh] max-w-[90vw]'>
      <div className='py-6'>
        <p className='px-9 text-3xl leading-none'>{popupData.title}</p>
        {popupData.subtitle && (
          <p className='mt-2 px-9 text-lg leading-none'>{popupData.subtitle}</p>
        )}
      </div>
      <img
        src={`./src/assets/img/${popupData.image}.jpg`}
        className='w-full'
        alt=''
      />
      {children}
      <button onClick={popupData.action}>Enviar</button>
    </div>
  </dialog>
)

export default PopupLayout2
