import { Button } from '../../../components/atoms'
import Emptylist from '../../../components/molecules/EmptyList'
import ExerciseList from '../components/ExerciseList'
import { iCompletedExercise, iExercise } from '../types/exercises'

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
      <div className='my-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {data.exercises.map((exercise: iExercise) => (
          <div
            key={exercise._id}
            className='group/Card border-secondaryLighter relative flex h-24 items-end justify-center overflow-hidden rounded-md border-1'
          >
            <div
              className='group-hover-within/Card:brightness-100 h-full w-full bg-cover bg-center brightness-[40%] group-focus-within/Card:brightness-100 group-hover/Card:brightness-100 group-focus/Card:brightness-100'
              style={{
                backgroundImage: `url(${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/exercise/${exercise.img})`
              }}
            ></div>
            <h2 className='text-md text-secondaryLightest absolute bottom-1 left-0 w-full text-center font-semibold opacity-100 transition-all duration-200 ease-out group-focus-within/Card:opacity-0 group-hover/Card:opacity-0 group-focus/Card:opacity-0'>
              {exercise.name}
            </h2>
            <div className='hover-group-within/Card:opacity-100 absolute bottom-1 left-0 flex w-full justify-center gap-2 opacity-0 transition-all duration-100 ease-out group-focus-within/Card:opacity-100 group-hover/Card:opacity-100 group-focus/Card:opacity-100'>
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
                classes='pointer-events-auto'
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </main>
)
export default ExerciseMain
