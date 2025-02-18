import { useEffect, useRef, useState } from 'react'

import Card from '../../components/atoms/Card'
import PopupLayout from '../../components/layouts/PopupLayout'
import ShortcutsLayout from '../../components/layouts/ShortcutsLayout'
import { iShortcut } from '../../utils/types'
import HomePopupForms from './HomePopupForms'

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
      <PopupLayout activeCard={activeCard} dialogRef={dialogRef}>
        {activeCard !== null ? (
          <HomePopupForms
            cardAction={activeCard.action}
            closeModal={closeModal}
            setActiveCard={setActiveCard}
          />
        ) : null}
      </PopupLayout>
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
