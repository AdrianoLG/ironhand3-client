import { Button } from '../../../components/atoms';
import { iCompletedExercise } from '../types/exercises';
import CompletedExerciseInfo from './CompletedExerciseInfo';

const ExerciseHoverCard = ({
  showHoverCard,
  completedExercise,
  setShowDialog,
  setShowHoverCard,
  removeCompletedExercise
}: {
  showHoverCard: boolean
  completedExercise: iCompletedExercise
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
  setShowHoverCard: React.Dispatch<React.SetStateAction<boolean>>
  removeCompletedExercise: (id: string) => void
}) => {
  return (
    <div
      className={`${showHoverCard ? 'absolute' : 'hidden'} left-1/2 z-10 w-56 -translate-x-1/2 pt-1 shadow-md transition-all duration-200 ease-out`}
    >
      <div className='border-b-secondaryLight absolute top-0 bottom-4 left-1/2 z-20 h-0 w-0 border-r-4 border-b-4 border-l-4 border-r-transparent border-l-transparent'></div>
      <div className='bg-primary border-secondaryLight overflow-clip rounded-md border-1'>
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
      </div>
    </div>
  )
}

export default ExerciseHoverCard
