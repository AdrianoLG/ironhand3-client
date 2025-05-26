import { iCompletedExercise } from '../types/exercises'

const CompletedExerciseInfo = ({
  completedExercise
}: {
  completedExercise: iCompletedExercise
}) => (
  <div className='flex flex-col'>
    <div className='relative'>
      <img
        className='absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 transform rounded-full border-1 border-secondary bg-secondaryLightest p-1'
        src={`./src/assets/img/svg/${completedExercise.exercise.type}.svg`}
        alt={completedExercise.exercise.type}
      />
      <img
        className='w-full'
        src={completedExercise.exercise.img}
        alt={completedExercise.exercise.name}
      />
    </div>
    <div className='p-4'>
      <p className='mb-3 text-center'>
        <span className='border-b-2 border-secondaryLighter'>
          {completedExercise.exercise.name}
        </span>
      </p>
      {completedExercise.time && (
        <p className='text-center text-xs'>
          Tiempo: {completedExercise.time} minutos
        </p>
      )}
      {completedExercise.repetitions && (
        <p className='text-center text-xs'>
          Repeticiones: {completedExercise.repetitions}
        </p>
      )}
      {completedExercise.weight && (
        <p className='text-center text-xs'>
          Peso: {completedExercise.weight} kilos
        </p>
      )}
      {completedExercise.ppm_min && (
        <p className='text-center text-xs'>
          PPM mínimas: {completedExercise.ppm_min}
        </p>
      )}
      {completedExercise.ppm_max && (
        <p className='text-center text-xs'>
          PPM máximas: {completedExercise.ppm_max}
        </p>
      )}
    </div>
  </div>
)

export default CompletedExerciseInfo
