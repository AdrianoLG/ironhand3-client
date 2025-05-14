import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'

import Button from '../components/atoms/Button'
import Header from '../components/organisms/header/Header'
import Heading from '../components/organisms/header/Heading'
import Body from '../feature/exercise/Body'
import ExerciseList from '../feature/exercise/ExerciseList'
import ExerciseHeaderButtons from '../feature/exercise/header-buttons/ExerciseHeaderButtons'
import Cardio from '../feature/exercise/svgs/Cardio'
import Stretch from '../feature/exercise/svgs/Stretch'
import { EXERCISES_INFO } from '../gql/exerciseQueries'
import { iCompletedExercise, iExercisesInfo } from '../utils/types'

const Exercise = () => {
  const { data, loading, error } = useQuery<iExercisesInfo>(EXERCISES_INFO)

  const [completedExercises, setCompletedExercises] = useState<
    iCompletedExercise[]
  >([])
  const [activeButton, setActiveButton] = useState('thisWeek')

  const thisWeeksFirstDay = dayjs().startOf('week').add(1, 'day')
  const lastWeeksFirstDay = thisWeeksFirstDay.subtract(7, 'days')
  const thisMonthsFirstDay = dayjs().startOf('month')
  const lastMonthsFirstDay = thisMonthsFirstDay.subtract(1, 'month')

  const completedExercisesThisWeek = data?.completedExercises.filter(
    (exercise: iCompletedExercise) => dayjs(exercise.date) > thisWeeksFirstDay
  )

  const completedExercisesLastWeek = data?.completedExercises.filter(
    (exercise: iCompletedExercise) =>
      dayjs(exercise.date) < thisWeeksFirstDay &&
      dayjs(exercise.date) > lastWeeksFirstDay
  )

  const completedExercisesThisMonth = data?.completedExercises.filter(
    (exercise: iCompletedExercise) => dayjs(exercise.date) > thisMonthsFirstDay
  )

  const completedExercisesLastMonth = data?.completedExercises.filter(
    (exercise: iCompletedExercise) =>
      dayjs(exercise.date) < thisMonthsFirstDay &&
      dayjs(exercise.date) > lastMonthsFirstDay
  )

  useEffect(() => {
    if (data?.completedExercises) {
      setCompletedExercises(completedExercisesThisWeek || [])
      setActiveButton('weekAt')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.completedExercises])

  if (loading) return 'Cargando...'
  if (error) return <pre>{error.message}</pre>

  const filterDate = (period: string) => {
    switch (period) {
      case 'weekAt':
        setCompletedExercises(completedExercisesThisWeek || [])
        setActiveButton('weekAt')
        break
      case 'pastWeek':
        setCompletedExercises(completedExercisesLastWeek || [])
        setActiveButton('pastWeek')
        break
      case 'monthAt':
        setCompletedExercises(completedExercisesThisMonth || [])
        setActiveButton('monthAt')
        break
      case 'pastMonth':
        setCompletedExercises(completedExercisesLastMonth || [])
        setActiveButton('pastMonth')
        break
      case 'all':
        setCompletedExercises(data?.completedExercises || [])
        setActiveButton('all')
        break
      default:
        console.log('Error')
    }
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
                completedExercises={completedExercises}
              />
              <div className='absolute bottom-0 right-0 flex gap-3 p-4'>
                <Stretch
                  width='.7rem'
                  completedExercises={completedExercises}
                />
                <Cardio width='1rem' completedExercises={completedExercises} />
              </div>
            </div>
          )}
          <div className='mt-4 flex grid-rows-4 flex-col gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4'>
            <Button
              text='Esta semana'
              onMouseClick={() => filterDate('weekAt')}
              small
              outline
              classes='justify-self-end'
              disabled={activeButton === 'weekAt'}
            />
            <Button
              text='Semana pasada'
              onMouseClick={() => filterDate('pastWeek')}
              small
              outline
              disabled={activeButton === 'pastWeek'}
            />
            <Button
              text='Este mes'
              onMouseClick={() => filterDate('monthAt')}
              small
              outline
              classes='justify-self-end'
              disabled={activeButton === 'monthAt'}
            />
            <Button
              text='Mes pasado'
              onMouseClick={() => filterDate('pastMonth')}
              small
              outline
              disabled={activeButton === 'pastMonth'}
            />
            <Button
              text='Ver todos'
              onMouseClick={() => filterDate('all')}
              small
              outline
              classes='col-span-2'
              disabled={activeButton === 'all'}
            />
          </div>
        </aside>
        <main className='w-full pb-8 md:w-2/3 md:pl-10 xl:pl-36'>
          {completedExercises && (
            <ExerciseList completedExercises={completedExercises} />
          )}
          {data?.completedExercises && (
            <pre>{JSON.stringify(data?.completedExercises, null, 2)}</pre>
          )}
          <br />
          {data?.exercises && (
            <pre>{JSON.stringify(data.exercises, null, 2)}</pre>
          )}
        </main>
      </div>
    </>
  )
}

export default Exercise
