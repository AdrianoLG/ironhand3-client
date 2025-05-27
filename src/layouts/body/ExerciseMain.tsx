import { Button } from '../../components/atoms'
import Emptylist from '../../components/molecules/EmptyList'
import ExerciseList from '../../feature/exercise/components/ExerciseList'
import {
  iCompletedExercise,
  iExercise
} from '../../feature/exercise/types/exercises'

const ExerciseMain = ({
  completedExercises,
  data,
  setShowDialog,
  setSelectedExercise,
  removeExercise
}: {
  completedExercises: iCompletedExercise[]
  data: { exercises: iExercise[] } | undefined
  setShowDialog: (show: boolean) => void
  setSelectedExercise: (exercise: iExercise | null) => void
  removeExercise: (id: string) => void
}) => (
  <main className='w-full pb-8 md:w-2/3 md:pl-10 xl:pl-36'>
    {completedExercises && (
      <ExerciseList completedExercises={completedExercises} />
    )}
    {!data && (
      <Emptylist
        message={'No hay ejercicios creados aún.☹️\n¡Crea uno nuevo! 💪'}
      />
    )}
    {data && (
      <div className='my-12 grid grid-cols-4 gap-4'>
        {data.exercises.map((exercise: iExercise) => (
          <div
            key={exercise._id}
            className='group relative flex h-24 items-end justify-center overflow-hidden rounded-md border-1 border-secondaryLighter'
          >
            <div
              className='h-full w-full bg-cover bg-center brightness-[40%] group-hover:brightness-100'
              style={{
                backgroundImage: `url(${exercise.img})`
              }}
            ></div>
            <h2 className='text-md absolute bottom-1 left-0 w-full text-center font-semibold text-secondaryLightest opacity-100 transition-all duration-200 ease-out group-hover:opacity-0'>
              {exercise.name}
            </h2>
            <div className='absolute bottom-1 left-0 flex w-full justify-center gap-2 opacity-0 transition-all duration-100 ease-out group-hover:opacity-100'>
              <Button
                text='Actualizar'
                onMouseClick={() => {
                  setShowDialog(true)
                  setSelectedExercise(exercise)
                }}
                type='submit'
                xsmall
                isFit
              />
              <Button
                text='Borrar'
                onMouseClick={() => {
                  removeExercise(exercise._id)
                }}
                xsmall
                outline
                isFit
                secondary
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </main>
)
export default ExerciseMain
