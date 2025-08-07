import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { DateValueType } from 'react-tailwindcss-datepicker'

import { useQuery } from '@apollo/client'

import { CLEANING_INFO } from '../gql/cleaningTaskQueries'
import { iCleaningInfo, iCompletedCleaningTask } from '../types/cleaningTasks'

export const useFilterCleaningTasks = () => {
  /*
   * GQL
   */
  const { data, loading, error } = useQuery<iCleaningInfo>(CLEANING_INFO)

  /*
   * State
   */
  const [completedCleaningTasks, setCompletedCleaningTasks] = useState<
    iCompletedCleaningTask[]
  >([])
  const [activeButton, setActiveButton] = useState('thisWeek')
  const [customDate, setCustomDate] = useState<DateValueType>({
    startDate: null,
    endDate: null
  })

  /*
   * Set custom date when the user selects a date range
   * and filter completed cleaningTasks by that range
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
   * Filter completed cleaningTasks by date
   */
  const completedCleaningTasksThisWeek = data?.completedCleaningTasks.filter(
    (cleaningTask: iCompletedCleaningTask) =>
      dayjs(cleaningTask.completedAt) > thisWeeksFirstDay
  )

  const completedCleaningTasksLastWeek = data?.completedCleaningTasks.filter(
    (cleaningTask: iCompletedCleaningTask) =>
      dayjs(cleaningTask.completedAt) < thisWeeksFirstDay &&
      dayjs(cleaningTask.completedAt) > lastWeeksFirstDay
  )

  const completedCleaningTasksThisMonth = data?.completedCleaningTasks.filter(
    (cleaningTask: iCompletedCleaningTask) =>
      dayjs(cleaningTask.completedAt) > thisMonthsFirstDay
  )

  const completedCleaningTasksLastMonth = data?.completedCleaningTasks.filter(
    (cleaningTask: iCompletedCleaningTask) =>
      dayjs(cleaningTask.completedAt) < thisMonthsFirstDay &&
      dayjs(cleaningTask.completedAt) > lastMonthsFirstDay
  )

  const completedCleaningTasksCustom =
    customDate?.startDate &&
    customDate.endDate &&
    data?.completedCleaningTasks.filter(
      (cleaningTask: iCompletedCleaningTask) =>
        dayjs(cleaningTask.completedAt) > dayjs(customDate.startDate) &&
        dayjs(cleaningTask.completedAt) < dayjs(customDate.endDate)
    )

  /*
   * Set initial completed cleaningTasks to this week's cleaningTasks
   */
  useEffect(() => {
    if (data?.completedCleaningTasks) {
      setCompletedCleaningTasks(completedCleaningTasksThisWeek || [])
      setActiveButton('weekAt')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.completedCleaningTasks])

  /*
   * Filter completed cleaningTasks based on the selected period
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
        setCompletedCleaningTasks(completedCleaningTasksThisWeek || [])
        setActiveButton('weekAt')
        setCustomDate({
          startDate: null,
          endDate: null
        })
        break
      case 'pastWeek':
        setCompletedCleaningTasks(completedCleaningTasksLastWeek || [])
        setActiveButton('pastWeek')
        break
      case 'monthAt':
        setCompletedCleaningTasks(completedCleaningTasksThisMonth || [])
        setActiveButton('monthAt')
        break
      case 'pastMonth':
        setCompletedCleaningTasks(completedCleaningTasksLastMonth || [])
        setActiveButton('pastMonth')
        break
      case 'all':
        setCompletedCleaningTasks(data?.completedCleaningTasks || [])
        setActiveButton('all')
        break
      case 'custom':
        setCompletedCleaningTasks(completedCleaningTasksCustom || [])
        setActiveButton('custom')
        break
      default:
        console.log('Error')
    }
  }

  return {
    completedCleaningTasks,
    filterDate,
    activeButton,
    data,
    loading,
    error,
    setCustomDate,
    customDate
  }
}
