import { useState } from 'react'

import { useMutation } from '@apollo/client'

import { Dialog } from '../../../components/organisms/dialogs'
import { REMOVE_COMPLETED_WATERING } from '../gql/gardenMutations'
import { GARDEN_INFO } from '../gql/gardenQueries'
import { iWatering } from '../types/garden'
import WateringHoverCard from './WateringHoverCard'

const CompletedWaterings = ({
  completedWatering,
  cropName
}: {
  completedWatering: iWatering
  cropName: string
}) => {
  /*
   * GQL
   */
  const [deleteCompletedWatering] = useMutation(REMOVE_COMPLETED_WATERING, {
    refetchQueries: [{ query: GARDEN_INFO }]
  })
  const removeCompletedWatering = (id: string) => {
    deleteCompletedWatering({
      variables: { removedCompletedWateringId: id }
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
        key={completedWatering._id}
        className='relative'
        onMouseEnter={() => {
          setShowHoverCard(true)
        }}
        onMouseLeave={() => {
          setShowHoverCard(false)
        }}
      >
        <div className='border-secondaryLighter flex w-fit rounded-md border-1 px-2'>
          <p className='border-secondaryLighter relative flex flex-col items-center justify-center gap-0 border-r-1 pr-2 leading-none'>
            <span className='m-0 text-sm'>{completedWatering.water}</span>
            <span className='text-5xs absolute bottom-[0.1rem] m-0'>
              litros
            </span>
          </p>
          <p className='flex items-center px-1 py-0.5'>{cropName}</p>
        </div>
        <WateringHoverCard
          showHoverCard={showHoverCard}
          completedWatering={completedWatering}
          setShowDialog={setShowDialog}
          setShowHoverCard={setShowHoverCard}
          removeCompletedWatering={removeCompletedWatering}
        />
      </div>
      {showDialog && (
        <Dialog
          buttonText='Actualizar'
          title='Modificar tarea completada'
          description='Modifica los datos de la tarea completada'
          image='wateringtask-bg'
          child={
            <p>Hey</p>
            // <CompleteWateringFormContainer
            //   completedWateringData={completedWatering}
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

export default CompletedWaterings
