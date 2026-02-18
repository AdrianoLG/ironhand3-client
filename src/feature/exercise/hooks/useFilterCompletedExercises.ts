import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { DateValueType } from 'react-tailwindcss-datepicker'

import { useQuery } from '@apollo/client'

import { EXERCISES_INFO } from '../gql/exerciseQueries'
import { iCompletedExercise, iExercisesInfo } from '../types/exercises'

export const useFilterCompletedExercises = () => {
  /*
   * GQL
   */
  const { data, loading, error } = useQuery<iExercisesInfo>(EXERCISES_INFO)

  /*
   * State
   */
  const [completedExercises, setCompletedExercises] = useState<
    iCompletedExercise[]
  >([])
  const [activeButton, setActiveButton] = useState('thisWeek')
  const [customDate, setCustomDate] = useState<DateValueType>({
    startDate: null,
    endDate: null
  })

  /*
   * Set custom date when the user selects a date range
   * and filter completed exercises by that range
   */
  useEffect(() => {
    if (customDate?.startDate && customDate.endDate) filterDate('custom')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customDate])

  /*
   * Date calculations
   */
  const thisWeeksFirstDay = dayjs().startOf('week').add(1, 'day')
  const lastWeeksFirstDay = thisWeeksFirstDay.subtract(7, 'days')
  const thisMonthsFirstDay = dayjs().startOf('month')
  const lastMonthsFirstDay = thisMonthsFirstDay.subtract(1, 'month')

  /*
   * Filter completed exercises by date
   */
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

  const completedExercisesCustom =
    customDate?.startDate &&
    customDate.endDate &&
    data?.completedExercises.filter(
      (exercise: iCompletedExercise) =>
        dayjs(exercise.date) > dayjs(customDate.startDate) &&
        dayjs(exercise.date) < dayjs(customDate.endDate)
    )

  /*
   * Set initial completed exercises to this week's exercises
   */
  useEffect(() => {
    if (data?.completedExercises) {
      setCompletedExercises(completedExercisesThisWeek || [])
      setActiveButton('weekAt')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.completedExercises])

  /*
   * Filter completed exercises based on the selected period
   */
  const filterDate = (period: string) => {
    if (period !== 'custom') {
      setCustomDate({
        startDate: null,
        endDate: null
      })
    }
    switch (period) {
      case 'weekAt':
        setCompletedExercises(completedExercisesThisWeek || [])
        setActiveButton('weekAt')
        setCustomDate({
          startDate: null,
          endDate: null
        })
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
      case 'custom':
        setCompletedExercises(completedExercisesCustom || [])
        setActiveButton('custom')
        break
      default:
        console.log('Error: cannot filter by date')
    }
  }

  return {
    completedExercises,
    filterDate,
    activeButton,
    data,
    loading,
    error,
    setCustomDate,
    customDate
  }
}
