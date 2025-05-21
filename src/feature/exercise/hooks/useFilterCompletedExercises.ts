import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'

import { EXERCISES_INFO } from '../gql/exerciseQueries'
import { iCompletedExercise, iExercisesInfo } from '../types/exercises'

export const useFilterCompletedExercises = () => {
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

  return { completedExercises, filterDate, activeButton, data, loading, error }
}
