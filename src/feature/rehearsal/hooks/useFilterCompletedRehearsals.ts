import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { DateValueType } from 'react-tailwindcss-datepicker'

import { useQuery } from '@apollo/client'

import { REHEARSAL_INFO } from '../gql/rehearsalQueries'
import { iCompletedRehearsal, iRehearsalInfo } from '../types/rehearsals'

export const useFilterCompletedRehearsals = () => {
  /*
   * GQL
   */
  const { data, loading, error } = useQuery<iRehearsalInfo>(REHEARSAL_INFO)

  /*
   * State
   */
  const [completedRehearsals, setCompletedRehearsals] = useState<
    iCompletedRehearsal[]
  >([])
  const [activeButton, setActiveButton] = useState('thisWeek')
  const [customDate, setCustomDate] = useState<DateValueType>({
    startDate: null,
    endDate: null
  })

  /*
   * Set custom date when the user selects a date range
   * and filter completed rehearsals by that range
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
   * Filter completed rehearsals by date
   */
  const completedRehearsalsThisWeek = data?.rehearsals.filter(
    (rehearsal: iCompletedRehearsal) =>
      dayjs(rehearsal.completedAt) > thisWeeksFirstDay
  )

  const completedRehearsalsLastWeek = data?.rehearsals.filter(
    (rehearsal: iCompletedRehearsal) =>
      dayjs(rehearsal.completedAt) < thisWeeksFirstDay &&
      dayjs(rehearsal.completedAt) > lastWeeksFirstDay
  )

  const completedRehearsalsThisMonth = data?.rehearsals.filter(
    (rehearsal: iCompletedRehearsal) =>
      dayjs(rehearsal.completedAt) > thisMonthsFirstDay
  )

  const completedRehearsalsLastMonth = data?.rehearsals.filter(
    (rehearsal: iCompletedRehearsal) =>
      dayjs(rehearsal.completedAt) < thisMonthsFirstDay &&
      dayjs(rehearsal.completedAt) > lastMonthsFirstDay
  )

  const completedRehearsalsCustom =
    customDate?.startDate &&
    customDate.endDate &&
    data?.rehearsals.filter(
      (rehearsal: iCompletedRehearsal) =>
        dayjs(rehearsal.completedAt) > dayjs(customDate.startDate) &&
        dayjs(rehearsal.completedAt) < dayjs(customDate.endDate)
    )

  /*
   * Set initial completed rehearsals to this week's rehearsals
   */
  useEffect(() => {
    if (data?.rehearsals) {
      setCompletedRehearsals(completedRehearsalsThisWeek || [])
      setActiveButton('weekAt')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.rehearsals])

  /*
   * Filter completed rehearsals based on the selected period
   */
  const filterDate = (period: string) => {
    if (period !== 'custom') {
      setCustomDate({
        startDate: null,
        endDate: null
      })
    }

    const sortByDateDesc = (tasks: iCompletedRehearsal[]) =>
      [...tasks].sort((a, b) => dayjs(b.completedAt).diff(dayjs(a.completedAt)))

    switch (period) {
      case 'weekAt':
        setCompletedRehearsals(
          sortByDateDesc(completedRehearsalsThisWeek || [])
        )
        setActiveButton('weekAt')
        setCustomDate({
          startDate: null,
          endDate: null
        })
        break
      case 'pastWeek':
        setCompletedRehearsals(
          sortByDateDesc(completedRehearsalsLastWeek || [])
        )
        setActiveButton('pastWeek')
        break
      case 'monthAt':
        setCompletedRehearsals(
          sortByDateDesc(completedRehearsalsThisMonth || [])
        )
        setActiveButton('monthAt')
        break
      case 'pastMonth':
        setCompletedRehearsals(
          sortByDateDesc(completedRehearsalsLastMonth || [])
        )
        setActiveButton('pastMonth')
        break
      case 'all':
        setCompletedRehearsals(sortByDateDesc(data?.rehearsals || []))
        setActiveButton('all')
        break
      case 'custom':
        setCompletedRehearsals(sortByDateDesc(completedRehearsalsCustom || []))
        setActiveButton('custom')
        break
      default:
        console.log('Error: cannot filter by date')
    }
  }

  return {
    completedRehearsals,
    filterDate,
    activeButton,
    data,
    loading,
    error,
    setCustomDate,
    customDate
  }
}
