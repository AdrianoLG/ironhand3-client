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
  const [completedWaterings, setCompletedWaterings] = useState<iWatering[]>([])
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
  const completedWateringThisWeek = data?.crops
    .reduce((acc, crop) => [...acc, ...crop.waterings], [] as iWatering[])
    .filter((watering: iWatering) => dayjs(watering.date) > thisWeeksFirstDay)

  const completedWateringLastWeek = data?.crops
    .reduce((acc, crop) => [...acc, ...crop.waterings], [] as iWatering[])
    .filter(
      (watering: iWatering) =>
        dayjs(watering.date) < thisWeeksFirstDay &&
        dayjs(watering.date) > lastWeeksFirstDay
    )

  const completedWateringThisMonth = data?.crops
    .reduce((acc, crop) => [...acc, ...crop.waterings], [] as iWatering[])
    .filter((watering: iWatering) => dayjs(watering.date) > thisMonthsFirstDay)

  const completedWateringLastMonth = data?.crops
    .reduce((acc, crop) => [...acc, ...crop.waterings], [] as iWatering[])
    .filter(
      (watering: iWatering) =>
        dayjs(watering.date) < thisMonthsFirstDay &&
        dayjs(watering.date) > lastMonthsFirstDay
    )

  const completedWateringCustom =
    customDate?.startDate &&
    customDate.endDate &&
    data?.crops
      .reduce((acc, crop) => [...acc, ...crop.waterings], [] as iWatering[])
      .filter(
        (watering: iWatering) =>
          dayjs(watering.date) > dayjs(customDate.startDate) &&
          dayjs(watering.date) < dayjs(customDate.endDate)
      )

  /*
   * Set initial completed waterings to this week's waterings
   */
  useEffect(() => {
    if (
      data?.crops.reduce(
        (acc, crop) => [...acc, ...crop.waterings],
        [] as iWatering[]
      )
    ) {
      setCompletedWaterings(completedWateringThisWeek || [])
      setActiveButton('weekAt')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.crops])

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
        setCompletedWaterings(sortByDateDesc(completedWateringThisWeek || []))
        setActiveButton('weekAt')
        setCustomDate({
          startDate: null,
          endDate: null
        })
        break
      case 'pastWeek':
        setCompletedWaterings(sortByDateDesc(completedWateringLastWeek || []))
        setActiveButton('pastWeek')
        break
      case 'monthAt':
        setCompletedWaterings(sortByDateDesc(completedWateringThisMonth || []))
        setActiveButton('monthAt')
        break
      case 'pastMonth':
        setCompletedWaterings(sortByDateDesc(completedWateringLastMonth || []))
        setActiveButton('pastMonth')
        break
      case 'all':
        setCompletedWaterings(
          sortByDateDesc(
            data?.crops.reduce(
              (acc, crop) => [...acc, ...crop.waterings],
              [] as iWatering[]
            ) || []
          )
        )
        setActiveButton('all')
        break
      case 'custom':
        setCompletedWaterings(sortByDateDesc(completedWateringCustom || []))
        setActiveButton('custom')
        break
      default:
        console.log('Error: cannot filter by date')
    }
  }

  return {
    completedWaterings,
    filterDate,
    activeButton,
    data,
    loading,
    error,
    setCustomDate,
    customDate
  }
}
