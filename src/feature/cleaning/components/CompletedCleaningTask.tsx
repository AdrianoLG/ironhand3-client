import { useState } from 'react'

import { useMutation } from '@apollo/client'

import { Dialog } from '../../../components/organisms/dialogs'
import CompleteCleaningTaskFormContainer from '../forms/CompleteCleaningTaskFormContainer'
// import CleaningTaskHoverCard from './CleaningTaskHoverCard';
import { REMOVE_COMPLETED_CLEANING_TASK } from '../gql/cleaningTaskMutations'
import {
  CLEANING_INFO,
  SELECT_CLEANING_TASKS
} from '../gql/cleaningTaskQueries'
import { iCompletedCleaningTask } from '../types/cleaningTasks'
import CleaningHoverCard from './CleaningHoverCard'

const CompletedCleaningTask = ({
  completedCleaningTask
}: {
  completedCleaningTask: iCompletedCleaningTask
}) => {
  /*
   * GQL
   */
  const [deleteCompletedCleaningTask] = useMutation(
    REMOVE_COMPLETED_CLEANING_TASK,
    {
      refetchQueries: [
        { query: CLEANING_INFO },
        { query: SELECT_CLEANING_TASKS }
      ]
    }
  )
  const removeCompletedCleaningTask = (id: string) => {
    deleteCompletedCleaningTask({
      variables: { removeCompletedCleaningTaskId: id }
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
        key={completedCleaningTask._id}
        className='relative'
        onMouseEnter={() => {
          setShowHoverCard(true)
        }}
        onMouseLeave={() => {
          setShowHoverCard(false)
        }}
      >
        <div className='border-secondaryLighter flex w-fit rounded-md border-1 px-2'>
          {completedCleaningTask.cleaningTask && (
            <p className='border-secondaryLighter relative flex flex-col items-center justify-center gap-0 border-r-1 pr-2 leading-none'>
              <span className='m-0 text-sm'>
                {completedCleaningTask.rooms.length}
              </span>
              <span className='text-5xs absolute bottom-[0.1rem] m-0'>hab</span>
            </p>
          )}
          <p className='flex items-center px-1 py-0.5'>
            {completedCleaningTask.cleaningTask.name}
          </p>
        </div>
        <CleaningHoverCard
          showHoverCard={showHoverCard}
          completedCleaningTask={completedCleaningTask}
          setShowDialog={setShowDialog}
          setShowHoverCard={setShowHoverCard}
          removeCompletedCleaningTask={removeCompletedCleaningTask}
        />
      </div>
      {showDialog && (
        <Dialog
          buttonText='Actualizar'
          title='Modificar tarea completada'
          description='Modifica los datos de la tarea completada'
          image='cleaningtask-bg'
          child={
            <CompleteCleaningTaskFormContainer
              completedCleaningTaskData={completedCleaningTask}
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

export default CompletedCleaningTask
