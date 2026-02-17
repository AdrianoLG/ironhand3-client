import { useState } from 'react'

import { useMutation } from '@apollo/client'

import { Dialog } from '../../../components/organisms/dialogs'
// import RehearsalHoverCard from './RehearsalHoverCard';
import { REMOVE_REHEARSAL } from '../gql/rehearsalMutations'
import { REHEARSAL_INFO, SELECT_REHEARSALS } from '../gql/rehearsalQueries'
import { iCompletedRehearsal } from '../types/rehearsals'
import RehearsalHoverCard from './RehearsalHoverCard'

const CompletedRehearsal = ({
  completedRehearsal
}: {
  completedRehearsal: iCompletedRehearsal
}) => {
  /*
   * GQL
   */
  const [deleteCompletedRehearsal] = useMutation(REMOVE_REHEARSAL, {
    refetchQueries: [{ query: REHEARSAL_INFO }, { query: SELECT_REHEARSALS }]
  })
  const removeCompletedRehearsal = (id: string) => {
    deleteCompletedRehearsal({
      variables: { removeCompletedRehearsalId: id }
    })
    setShowDialog(false)
  }

  /*
   * State
   */
  const [showDialog, setShowDialog] = useState(false)
  const [showHoverCard, setShowHoverCard] = useState(false)

  return (
    <>
      <div
        key={completedRehearsal._id}
        className='relative'
        onMouseEnter={() => {
          setShowHoverCard(true)
        }}
        onMouseLeave={() => {
          setShowHoverCard(false)
        }}
      >
        <div className='border-secondaryLighter flex w-fit rounded-md border-1 px-2'>
          {completedRehearsal.instrument && (
            <p className='border-secondaryLighter relative flex flex-col items-center justify-center gap-0 border-r-1 pr-2 leading-none'>
              <span className='m-0 text-sm'>
                {completedRehearsal.sheets.reduce(
                  (acc, sheet) => acc + sheet.duration,
                  0
                )}
              </span>
              <span className='text-5xs absolute bottom-[0.1rem] m-0'>min</span>
            </p>
          )}
          <p className='flex items-center px-1 py-0.5'>
            {completedRehearsal.instrument.name}
          </p>
        </div>
        <RehearsalHoverCard
          showHoverCard={showHoverCard}
          completedRehearsal={completedRehearsal}
          setShowDialog={setShowDialog}
          setShowHoverCard={setShowHoverCard}
          removeCompletedRehearsal={removeCompletedRehearsal}
        />
      </div>
      {showDialog && (
        <Dialog
          buttonText='Actualizar'
          title='Modificar tarea completada'
          description='Modifica los datos de la tarea completada'
          image='rehearsaltask-bg'
          child={
            <></>
            // <CompleteRehearsalFormContainer
            //   completedRehearsalData={completedRehearsal}
            //   setIsOpen={() => setShowDialog(false)}
            // />
          }
          secondary
          xsmall
          isFit
          isOpen={showDialog}
          setIsOpen={setShowDialog}
        />
      )}
    </>
  )
}

export default CompletedRehearsal
