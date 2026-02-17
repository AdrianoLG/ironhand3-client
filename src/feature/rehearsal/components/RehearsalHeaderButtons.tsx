import { useState } from 'react'

import { Dialog } from '../../../components/organisms/dialogs'
import CompleteRehearsalFormContainer from '../forms/CompleteRehearsalFormContainer'
import SheetFormContainer from '../forms/SheetFormContainer'

const RehearsalHeaderButtons = () => {
  const [sheetFormIsOpen, setSheetFormIsOpen] = useState(false)
  const [completeRehearsalFormIsOpen, setCompleteRehearsalFormIsOpen] =
    useState(false)

  return (
    <>
      <nav className='xl:max-w-screen-content mx-auto flex flex-wrap justify-start gap-2 px-8 pb-16'>
        <div>
          <Dialog
            buttonText='Completar ensayo'
            title='Completar ensayo'
            description='Introduce los datos del ensayo completado'
            image='rehearsal-bg'
            child={
              <CompleteRehearsalFormContainer
                setIsOpen={setCompleteRehearsalFormIsOpen}
              />
            }
            isOpen={completeRehearsalFormIsOpen}
            setIsOpen={setCompleteRehearsalFormIsOpen}
          />
        </div>
        <div>
          <Dialog
            buttonText='Añadir partitura'
            title='Añadir partitura'
            description='Completa los datos de la nueva partitura'
            image='rehearsal-bg'
            child={<SheetFormContainer setIsOpen={setSheetFormIsOpen} />}
            secondary
            isOpen={sheetFormIsOpen}
            setIsOpen={setSheetFormIsOpen}
          />
        </div>
      </nav>
    </>
  )
}

export default RehearsalHeaderButtons
