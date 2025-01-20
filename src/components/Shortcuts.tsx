import { useEffect, useRef, useState } from 'react'

import { iShortcut } from '../utils/types'
import Button from './Button'
import Card from './Card'
import ShortcutsLayout from './ShortcutsLayout'
import CloseButton from './svgs/CloseButton'

const Shortcuts = ({
  title,
  shortcuts
}: {
  title: string
  shortcuts: iShortcut[]
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [activeCard, setActiveCard] = useState<iShortcut | null>(null)
  const handleDialog = (shortcut: iShortcut) =>
    activeCard ? setActiveCard(null) : setActiveCard(shortcut)

  useEffect(() => {
    if (!activeCard) return

    dialogRef.current?.showModal()
    document.body.style.overflow = 'hidden'
    const dialog = dialogRef.current
    dialog?.addEventListener('close', closeModal)
    dialog?.addEventListener('click', function (event) {
      const rect = dialog.getBoundingClientRect()
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      if (!isInDialog) {
        dialog.close()
      }
    })

    return () => {
      dialog?.removeEventListener('close', closeModal)
      dialog?.removeEventListener('click', closeModal)
    }
  }, [activeCard])

  const closeModal = () => {
    dialogRef.current?.close()
    setActiveCard(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      <dialog
        ref={dialogRef}
        className='backdrop:bg-transparent70B rounded-lg bg-secondaryLighter'
      >
        {activeCard && (
          <div className='max-h-[90vh] max-w-[90vw]'>
            <p className='px-4'>{activeCard.title}</p>
            {activeCard.subtitle && (
              <p className='px-4'>{activeCard.subtitle}</p>
            )}
            <img
              src={`./src/assets/img/${activeCard.image}.jpg`}
              className='w-full'
              alt=''
            />
            <form action=''>
              <label htmlFor='distance'>Distancia</label>
              <input type='number' name='distance' id='distance' />
              <label htmlFor='time'>Tiempo</label>
              <input type='number' name='time' id='time' />
              <div className='flex'>
                <Button
                  text='Cancelar'
                  onMouseClick={() => closeModal()}
                  small={true}
                  secondary={true}
                />
                <Button
                  text='Guardar'
                  onMouseClick={() => console.log('submit')}
                  small={true}
                  type='submit'
                />
              </div>
            </form>
            <p className='px-4'>{activeCard.action}</p>
            <button className='absolute right-4 top-4' onClick={closeModal}>
              <CloseButton />
            </button>
          </div>
        )}
      </dialog>
      <ShortcutsLayout title={title}>
        {shortcuts.map((shortcut: iShortcut) => (
          <Card
            key={shortcut._id}
            imageSrc={`./src/assets/img/${shortcut.image}`}
            type='jpg'
            imageAlt={shortcut.title}
            title={shortcut.title}
            onClick={() => handleDialog(shortcut)}
          />
        ))}
      </ShortcutsLayout>
    </>
  )
}

export default Shortcuts
