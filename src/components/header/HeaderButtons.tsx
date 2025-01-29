import { useRef, useState } from 'react';

import { iPopupData } from '../../utils/types';
import Button from '../Button';
import CompleteExerciseForm from '../exercise/CompleteExerciseForm';
import ExerciseForm from '../exercise/ExerciseForm';
import PopupLayout2 from '../layouts/PopupLayout2';

const HeaderButtons = () => {
  const [activeForm, setActiveForm] = useState<
    'none' | 'addExercise' | 'completeExercise'
  >('none')
  const [popupData, setPopupData] = useState<iPopupData>({
    title: '',
    subtitle: '',
    image: '',
    action: () => {}
  })
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const closeModal = () => {
    dialogRef.current?.close()
    setActiveForm('none')
    document.body.style.overflow = 'auto'
  }

  const addExercise = () => {
    console.log('add exercise')
  }

  const completeExercise = () => {
    console.log('complete exercise')
  }

  const handleAddExercise = () => {
    setPopupData({
      title: 'Añadir ejercicio',
      subtitle: 'Completa los datos del nuevo ejercicio',
      image: 'exercise',
      action: addExercise
    })
  }

  const handleCompleteExercise = () => {
    setPopupData({
      title: 'Completar ejercicio',
      subtitle: 'Introduce los datos del ejercicio completado',
      image: 'completedExercise',
      action: completeExercise
    })
  }

  const handleButton = (
    activeForm: 'none' | 'addExercise' | 'completeExercise'
  ) => {
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
      if (activeForm === 'addExercise') {
        handleAddExercise()
      } else if (activeForm === 'completeExercise') {
        handleCompleteExercise()
      }
    })

    setActiveForm(activeForm)

    return () => {
      dialog?.removeEventListener('close', closeModal)
      dialog?.removeEventListener('click', closeModal)
    }
  }

  return (
    <>
      <PopupLayout2 dialogRef={dialogRef} popupData={popupData}>
        {activeForm === 'addExercise' ? (
          <ExerciseForm closeModal={closeModal} />
        ) : activeForm === 'completeExercise' ? (
          <CompleteExerciseForm closeModal={closeModal} />
        ) : null}
      </PopupLayout2>
      <nav className='mx-auto flex flex-wrap justify-start gap-2 px-8 pb-16 xl:max-w-screen-content'>
        <div>
          <Button
            text='Completar'
            onMouseClick={() => handleButton('completeExercise')}
            small
          />
        </div>
        <div>
          <Button
            text='Añadir ejercicio'
            onMouseClick={() => handleButton('addExercise')}
            small
            secondary
          />
        </div>
      </nav>
    </>
  )
}

export default HeaderButtons
