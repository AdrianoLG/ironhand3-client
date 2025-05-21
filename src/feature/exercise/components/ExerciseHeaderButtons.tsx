import { useState } from 'react'

import { Dialog } from '../../../components/organisms/dialogs'
import CompleteExerciseFormContainer from '../forms/CompleteExerciseFormContainer'
import ExerciseForm from '../forms/ExerciseForm'

const ExerciseHeaderButtons = () => {
  const [exerciseFormIsOpen, setExerciseFormIsOpen] = useState(false)
  const [completeExerciseFormIsOpen, setCompleteExerciseFormIsOpen] =
    useState(false)

  return (
    <>
      <nav className='mx-auto flex flex-wrap justify-start gap-2 px-8 pb-16 xl:max-w-screen-content'>
        <div>
          <Dialog
            buttonText='Completar ejercicio'
            title='Completar ejercicio'
            description='Introduce los datos del ejercicio completado'
            image='exercise-bg'
            child={<CompleteExerciseFormContainer />}
            isOpen={completeExerciseFormIsOpen}
            setIsOpen={setCompleteExerciseFormIsOpen}
          />
        </div>
        <div>
          <Dialog
            buttonText='Añadir ejercicio'
            title='Añadir ejercicio'
            description='Completa los datos del nuevo ejercicio'
            image='exercise-bg'
            child={<ExerciseForm setIsOpen={setExerciseFormIsOpen} />}
            secondary
            isOpen={exerciseFormIsOpen}
            setIsOpen={setExerciseFormIsOpen}
          />
        </div>
      </nav>
    </>
  )
}

export default ExerciseHeaderButtons
