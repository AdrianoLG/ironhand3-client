import { HoverCard } from 'radix-ui'

import { Button } from '../../components/atoms'
import { difInDays } from '../../utils/differenceInDays'
import { iCompletedExercise } from '../../utils/types'

const ExerciseList = ({
  completedExercises
}: {
  completedExercises: iCompletedExercise[]
}) => {
  if (completedExercises.length === 0) {
    return (
      <div>
        <p>No hay ejercicios en este periodo ☹️</p>
      </div>
    )
  }

  const reducedCompletedExercises = completedExercises.reduce(
    (acc, curr) => {
      if (curr.date) {
        const difference = difInDays(curr.date)
        if (!acc[difference]) {
          acc[difference] = []
        }

        acc[difference].push(curr)
      }
      return acc
    },
    {} as Record<string, iCompletedExercise[]>
  )

  const removeCompletedExercise = (id: string) => {
    // TODO
    console.log(`Removing completed exercise with id: ${id}`)
  }

  const updateCompletedExercise = (id: string) => {
    // TODO
    console.log(`Updating completed exercise with id: ${id}`)
  }

  return Object.entries(reducedCompletedExercises).map(
    ([difference, exercises]) => {
      return (
        <div className='mb-4' key={difference}>
          <h3 className='mb-2 text-sm font-semibold'>{difference}</h3>
          <div className='flex flex-wrap gap-2'>
            {exercises.map(completedExercise => (
              <HoverCard.Root key={completedExercise._id}>
                <HoverCard.Trigger>
                  <div className='flex w-fit rounded-md border-1 border-secondaryLighter px-2'>
                    {completedExercise.repetitions && (
                      <p className='flex items-center border-r-1 border-secondaryLighter pr-1 text-sm'>
                        {completedExercise.repetitions}
                      </p>
                    )}
                    {completedExercise.time && (
                      <p className='flex flex-col items-center justify-center gap-0 border-r-1 border-secondaryLighter pr-1 leading-none'>
                        <span className='m-0 text-sm'>
                          {completedExercise.time}
                        </span>
                        <span className='relative -top-[1px] m-0 text-3xs'>
                          min
                        </span>
                      </p>
                    )}
                    <p className='flex items-center px-1 py-0.5'>
                      {completedExercise.exercise.name}
                    </p>
                  </div>
                </HoverCard.Trigger>
                <HoverCard.Content
                  align='center'
                  className='data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade z-50 w-[300px] overflow-clip rounded-md border-1 border-secondaryLighter bg-primary shadow-md data-[state=open]:transition-all'
                >
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
                  <div className='mb-4 flex justify-center gap-2'>
                    <Button
                      text='Borrar'
                      onMouseClick={() => {
                        removeCompletedExercise(completedExercise._id)
                      }}
                      xsmall
                      outline
                      isFit
                    />
                    <Button
                      text='Actualizar'
                      onMouseClick={() => {
                        updateCompletedExercise(completedExercise._id)
                      }}
                      xsmall
                      outline
                      isFit
                      secondary
                    />
                  </div>
                  <HoverCard.Arrow />
                </HoverCard.Content>
              </HoverCard.Root>
            ))}
          </div>
        </div>
      )
    }
  )
}

export default ExerciseList
