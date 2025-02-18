import { useQuery } from '@apollo/client'

import Cardio from '../assets/svgs/Cardio'
import Stretch from '../assets/svgs/Stretch'
import Button from '../components/atoms/Button'
import Header from '../components/organisms/header/Header'
import Heading from '../components/organisms/header/Heading'
import Body from '../feature/exercise/Body'
import ExerciseHeaderButtons from '../feature/exercise/ExerciseHeaderButtons'
import ExerciseList from '../feature/exercise/ExerciseList'
import { EXERCISES_INFO } from '../gql/ExerciseQueries'
import { iExercisesInfo } from '../utils/types'

const Exercise = () => {
  const { data, loading, error } = useQuery<iExercisesInfo>(EXERCISES_INFO)

  if (loading) return 'Loading...'
  if (error) return <pre>{error.message}</pre>

  const changeWeek = (weekAt: string) => {
    console.log(weekAt)
  }
  const changeMonth = (monthAt: string) => {
    console.log(monthAt)
  }

  return (
    <>
      <Header isMain={false} headers={data?.headers} />
      <Heading title='Ejercicio' />
      <ExerciseHeaderButtons />
      <div className='mx-auto flex flex-wrap justify-start px-8 pb-16 xl:max-w-screen-content'>
        <aside className='w-full pb-8 md:w-1/3'>
          {data?.completedExercises && (
            <div className='relative rounded-md border-1 border-secondaryLighter px-12 py-4 shadow-md xl:px-24 xl:py-9'>
              <Body
                color='var(--value1)'
                completedExercises={data.completedExercises}
              />
              <div className='absolute bottom-0 right-0 flex gap-3 p-4'>
                <Stretch
                  width='.7rem'
                  completedExercises={data.completedExercises}
                />
                <Cardio width='1rem' color='var(--value1)' />
              </div>
            </div>
          )}
          <div className='mt-4 grid grid-cols-2 grid-rows-2 gap-4'>
            <Button
              text='Esta semana'
              onMouseClick={() => changeWeek('at')}
              small
              outline
              classes='justify-self-end'
              disabled
              isFit
            />
            <Button
              text='Semana pasada'
              onMouseClick={() => changeWeek('last')}
              small
              outline
              isFit
            />
            <Button
              text='Este mes'
              onMouseClick={() => changeMonth('at')}
              small
              outline
              classes='justify-self-end'
              isFit
            />
            <Button
              text='Mes pasado'
              onMouseClick={() => changeMonth('last')}
              small
              outline
              isFit
            />
          </div>
        </aside>
        <main className='w-full pb-8 md:w-2/3 md:pl-10 xl:pl-36'>
          {data?.completedExercises && (
            <ExerciseList completedExercises={data?.completedExercises} />
          )}
        </main>
      </div>
    </>
  )
}

export default Exercise
