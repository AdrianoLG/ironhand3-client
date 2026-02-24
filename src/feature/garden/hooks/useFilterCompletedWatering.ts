import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { DateValueType } from 'react-tailwindcss-datepicker'

import { useQuery } from '@apollo/client'

import { GARDEN_INFO } from '../gql/gardenQueries'
import { iGardenInfo, iWatering } from '../types/garden'

export const useFilterCompletedWatering = () => {
  /*
   * GQL
   */
  const { data, loading, error } = useQuery<iGardenInfo>(GARDEN_INFO)

  /*
   * State
   */
  const [completedWatering, setCompletedWatering] = useState<iWatering[]>([])
  const [activeButton, setActiveButton] = useState('thisWeek')
  const [customDate, setCustomDate] = useState<DateValueType>({
    startDate: null,
    endDate: null
  })

  /*
   * Set custom date when the user selects a date range
   * and filter completed waterings by that range
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
   * Filter completed waterings by date
   */
  const completedWateringThisWeek = data?.waterings.filter(
    (watering: iWatering) => dayjs(watering.date) > thisWeeksFirstDay
  )

  const completedWateringLastWeek = data?.waterings.filter(
    (watering: iWatering) =>
      dayjs(watering.date) < thisWeeksFirstDay &&
      dayjs(watering.date) > lastWeeksFirstDay
  )

  const completedWateringThisMonth = data?.waterings.filter(
    (watering: iWatering) => dayjs(watering.date) > thisMonthsFirstDay
  )

  const completedWateringLastMonth = data?.waterings.filter(
    (watering: iWatering) =>
      dayjs(watering.date) < thisMonthsFirstDay &&
      dayjs(watering.date) > lastMonthsFirstDay
  )

  const completedWateringCustom =
    customDate?.startDate &&
    customDate.endDate &&
    data?.waterings.filter(
      (watering: iWatering) =>
        dayjs(watering.date) > dayjs(customDate.startDate) &&
        dayjs(watering.date) < dayjs(customDate.endDate)
    )

  /*
   * Set initial completed waterings to this week's waterings
   */
  useEffect(() => {
    if (data?.waterings) {
      setCompletedWatering(completedWateringThisWeek || [])
      setActiveButton('weekAt')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.waterings])

  /*
   * Filter completed waterings based on the selected period
   */
  const filterDate = (period: string) => {
    if (period !== 'custom') {
      setCustomDate({
        startDate: null,
        endDate: null
      })
    }

    const sortByDateDesc = (tasks: iWatering[]) =>
      [...tasks].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))

    switch (period) {
      case 'weekAt':
        setCompletedWatering(sortByDateDesc(completedWateringThisWeek || []))
        setActiveButton('weekAt')
        setCustomDate({
          startDate: null,
          endDate: null
        })
        break
      case 'pastWeek':
        setCompletedWatering(sortByDateDesc(completedWateringLastWeek || []))
        setActiveButton('pastWeek')
        break
      case 'monthAt':
        setCompletedWatering(sortByDateDesc(completedWateringThisMonth || []))
        setActiveButton('monthAt')
        break
      case 'pastMonth':
        setCompletedWatering(sortByDateDesc(completedWateringLastMonth || []))
        setActiveButton('pastMonth')
        break
      case 'all':
        setCompletedWatering(sortByDateDesc(data?.waterings || []))
        setActiveButton('all')
        break
      case 'custom':
        setCompletedWatering(sortByDateDesc(completedWateringCustom || []))
        setActiveButton('custom')
        break
      default:
        console.log('Error: cannot filter by date')
    }
  }

  return {
    completedWatering,
    filterDate,
    activeButton,
    data,
    loading,
    error,
    setCustomDate,
    customDate
  }
}
