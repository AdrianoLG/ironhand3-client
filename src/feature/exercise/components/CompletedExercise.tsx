import { HoverCard } from 'radix-ui'
import { useState } from 'react'

import { useMutation } from '@apollo/client'

import { Button } from '../../../components/atoms'
import { Dialog } from '../../../components/organisms/dialogs'
import CompleteExerciseFormContainer from '../forms/CompleteExerciseFormContainer'
import { REMOVE_COMPLETE_EXERCISE } from '../gql/exerciseMutations'
import { EXERCISES_INFO, SELECT_EXERCISES } from '../gql/exerciseQueries'
import { iCompletedExercise } from '../types/exercises'
import CompletedExerciseInfo from './CompletedExerciseInfo'

const CompletedExercise = ({
  completedExercise
}: {
  completedExercise: iCompletedExercise
}) => {
  /*
   * GQL
   */
  const [deleteCompletedExercise] = useMutation(REMOVE_COMPLETE_EXERCISE, {
    refetchQueries: [{ query: EXERCISES_INFO }, { query: SELECT_EXERCISES }]
  })
  const removeCompletedExercise = (id: string) => {
    deleteCompletedExercise({
      variables: { removeCompletedExerciseId: id }
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
        key={completedExercise._id}
        onMouseEnter={() => setShowHoverCard(true)}
        onMouseLeave={() => setShowHoverCard(false)}
      >
        <HoverCard.Root open={showHoverCard}>
          <HoverCard.Trigger tabIndex={0}>
            <div className='flex w-fit rounded-md border-1 border-secondaryLighter px-2'>
              {completedExercise.repetitions && (
                <p className='flex items-center border-r-1 border-secondaryLighter pr-1 text-sm'>
                  {completedExercise.repetitions}
                </p>
              )}
              {completedExercise.time && (
                <p className='flex flex-col items-center justify-center gap-0 border-r-1 border-secondaryLighter pr-1 leading-none'>
                  <span className='m-0 text-sm'>{completedExercise.time}</span>
                  <span className='relative -top-[1px] m-0 text-3xs'>min</span>
                </p>
              )}
              <p className='flex items-center px-1 py-0.5'>
                {completedExercise.exercise.name}
              </p>
            </div>
          </HoverCard.Trigger>
          <HoverCard.Content
            alignOffset={-40}
            align='center'
            className='data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade z-50 w-[300px] overflow-clip rounded-md border-1 border-secondaryLighter bg-primary shadow-md data-[state=open]:transition-all'
          >
            <CompletedExerciseInfo completedExercise={completedExercise} />
            <div className='mb-4 flex justify-center gap-2'>
              <Button
                text='Actualizar'
                onMouseClick={() => {
                  setShowDialog(true)
                  setShowHoverCard(false)
                }}
                xsmall
                isFit
              />
              <Button
                text='Borrar'
                onMouseClick={() => {
                  removeCompletedExercise(completedExercise._id)
                }}
                xsmall
                isFit
                outline
                secondary
              />
            </div>
            <div className='absolute bottom-0 h-2 w-full translate-y-full bg-transparent'></div>
            <div className='absolute top-0 h-2 w-full -translate-y-full bg-transparent'></div>
            <HoverCard.Arrow></HoverCard.Arrow>
          </HoverCard.Content>
        </HoverCard.Root>
      </div>
      {showDialog && (
        <Dialog
          buttonText='Actualizar'
          title='Modificar ejercicio completado'
          description='Modifica los datos del ejercicio completado'
          image='exercise-bg'
          child={
            <CompleteExerciseFormContainer
              completedExerciseData={completedExercise}
              setIsOpen={() => setShowDialog(false)}
            />
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

export default CompletedExercise
