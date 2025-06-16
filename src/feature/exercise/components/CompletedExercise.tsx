import { useState } from 'react';

import { useMutation } from '@apollo/client';

import { Dialog } from '../../../components/organisms/dialogs';
import CompleteExerciseFormContainer from '../forms/CompleteExerciseFormContainer';
import { REMOVE_COMPLETE_EXERCISE } from '../gql/exerciseMutations';
import { EXERCISES_INFO, SELECT_EXERCISES } from '../gql/exerciseQueries';
import { iCompletedExercise } from '../types/exercises';
import ExerciseHoverCard from './ExerciseHoverCard';

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
        className='relative'
        onMouseEnter={() => {
          setShowHoverCard(true)
        }}
        onMouseLeave={() => {
          setShowHoverCard(false)
        }}
      >
        <div className='border-secondaryLighter flex w-fit rounded-md border-1 px-2'>
          {completedExercise.repetitions && (
            <p className='border-secondaryLighter flex items-center border-r-1 pr-1 text-sm'>
              {completedExercise.repetitions}
            </p>
          )}
          {completedExercise.time && (
            <p className='border-secondaryLighter relative flex flex-col items-center justify-center gap-0 border-r-1 pr-1 leading-none'>
              <span className='m-0 text-sm'>{completedExercise.time}</span>
              <span className='text-5xs absolute bottom-[0.1rem] m-0'>min</span>
            </p>
          )}
          <p className='flex items-center px-1 py-0.5'>
            {completedExercise.exercise.name}
          </p>
        </div>
        <ExerciseHoverCard
          showHoverCard={showHoverCard}
          completedExercise={completedExercise}
          setShowDialog={setShowDialog}
          setShowHoverCard={setShowHoverCard}
          removeCompletedExercise={removeCompletedExercise}
        />
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
