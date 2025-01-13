import { useEffect, useState } from 'react'

import { gql, useQuery } from '@apollo/client'

import Button from '../components/Button'
import Body from '../components/exercise/Body'
import { CompletedExercisesMock } from '../components/exercise/CompletedExercisesMock'
import ExerciseList from '../components/exercise/ExerciseList'
import Header from '../components/header/Header'
import HeaderButtons from '../components/header/HeaderButtons'
import Heading from '../components/header/Heading'
import Cardio from '../components/svgs/Cardio'
import Stretch from '../components/svgs/Stretch'

const Exercise = () => {
  const QUERY = gql`
    query ShortcutCategories {
      shortcutCategories {
        _id
        title
        shortcuts {
          _id
          title
          image
          action
        }
      }
      headers {
        title
        url
      }
    }
  `

  const { data, loading, error } = useQuery(QUERY)
  const [headers, setHeaders] = useState([])

  useEffect(() => {
    if (data) {
      setHeaders(data?.headers)
    }
  }, [data])

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
      <Header isMain={false} headers={headers} />
      <Heading title='Ejercicio' />
      <HeaderButtons />
      <div className='mx-auto flex flex-wrap justify-start px-8 pb-16 xl:max-w-screen-content'>
        <aside className='w-full pb-8 md:w-1/3'>
          <div className='relative rounded-md border-1 border-secondaryLighter px-12 py-4 shadow-md xl:px-24 xl:py-9'>
            <Body
              color='var(--value1)'
              completedExercises={CompletedExercisesMock}
            />
            <div className='absolute bottom-0 right-0 flex gap-3 p-4'>
              <Stretch width='.7rem' color='var(--value1)' />
              <Cardio width='1rem' color='var(--value1)' />
            </div>
          </div>
          <div className='mt-4 grid grid-cols-2 grid-rows-2 gap-4'>
            <Button
              text='Esta semana'
              onMouseClick={() => changeWeek('at')}
              small
              outline
              classes='justify-self-end'
              disabled
            />
            <Button
              text='Semana pasada'
              onMouseClick={() => changeWeek('last')}
              small
              outline
            />
            <Button
              text='Este mes'
              onMouseClick={() => changeMonth('at')}
              small
              outline
              classes='justify-self-end'
            />
            <Button
              text='Mes pasado'
              onMouseClick={() => changeMonth('last')}
              small
              outline
            />
          </div>
        </aside>
        <main className='w-full pb-8 md:w-2/3 md:pl-10 xl:pl-36'>
          <ExerciseList completedExercises={CompletedExercisesMock} />
        </main>
      </div>
    </>
  )
}

export default Exercise
