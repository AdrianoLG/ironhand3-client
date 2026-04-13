import { useState } from 'react'

import { Dialog } from '../../../components/organisms/dialogs'
import CleaningTaskFormContainer from '../forms/CleaningTaskFormContainer'
import CompleteCleaningTaskFormContainer from '../forms/CompleteCleaningTaskFormContainer'

const CleaningHeaderButtons = () => {
  const [cleaningFormIsOpen, setCleaningFormIsOpen] = useState(false)
  const [completeCleaningFormIsOpen, setCompleteCleaningFormIsOpen] =
    useState(false)

  return (
    <>
      <nav className='xl:max-w-screen-content mx-auto flex flex-wrap justify-start gap-2 px-12 pb-16'>
        <div>
          <Dialog
            buttonText='Completar tarea'
            title='Completar tarea de limpieza'
            description='Introduce los datos de la tarea completada'
            image='cleaning-bg'
            child={
              <CompleteCleaningTaskFormContainer
                setIsOpen={setCompleteCleaningFormIsOpen}
              />
            }
            isOpen={completeCleaningFormIsOpen}
            setIsOpen={setCompleteCleaningFormIsOpen}
            secondary
          />
        </div>
        <div>
          <Dialog
            buttonText='Añadir tarea'
            title='Añadir tarea de limpieza'
            description='Completa los datos de la nueva tarea'
            image='cleaning-bg'
            child={
              <CleaningTaskFormContainer setIsOpen={setCleaningFormIsOpen} />
            }
            isOpen={cleaningFormIsOpen}
            setIsOpen={setCleaningFormIsOpen}
          />
        </div>
      </nav>
    </>
  )
}

export default CleaningHeaderButtons
