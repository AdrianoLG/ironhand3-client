import { Button } from '../../../components/atoms'
import { iCompletedCleaningTask } from '../types/cleaningTasks'
import CompletedCleaningTaskInfo from './CompletedCleaningTaskInfo'

const CleaningHoverCard = ({
  showHoverCard,
  completedCleaningTask,
  setShowDialog,
  setShowHoverCard,
  removeCompletedCleaningTask
}: {
  showHoverCard: boolean
  completedCleaningTask: iCompletedCleaningTask
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
  setShowHoverCard: React.Dispatch<React.SetStateAction<boolean>>
  removeCompletedCleaningTask: (id: string) => void
}) => {
  return (
    <div
      className={`${showHoverCard ? 'absolute' : 'hidden'} left-1/2 z-10 w-56 -translate-x-1/2 pt-1 transition-all duration-200 ease-out`}
    >
      <div className='border-b-secondaryLight absolute top-0 bottom-4 left-1/2 z-20 h-0 w-0 border-r-4 border-b-4 border-l-4 border-r-transparent border-l-transparent'></div>
      <div className='bg-primary border-secondaryLight overflow-clip rounded-md border-1 shadow-md'>
        <CompletedCleaningTaskInfo
          completedCleaningTask={completedCleaningTask}
        />
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
              removeCompletedCleaningTask(completedCleaningTask._id)
            }}
            xsmall
            isFit
            outline
            secondary
          />
        </div>
        <div className='absolute bottom-0 h-2 w-full translate-y-full bg-transparent'></div>
        <div className='absolute top-0 h-2 w-full -translate-y-full bg-transparent'></div>
      </div>
    </div>
  )
}

export default CleaningHoverCard
