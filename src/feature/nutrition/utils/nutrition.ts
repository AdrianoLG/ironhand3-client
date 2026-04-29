import { iCompletedMeal, timeOfDayOrder } from '../types/nutrition'

const normalizeToDay = (value: Date) =>
  new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime()

const DAY_IN_MS = 1000 * 60 * 60 * 24

const getWeekRange = (weekOffset = 0) => {
  const today = new Date()
  const rangeEnd = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - weekOffset * 7
  )
  const rangeStart = new Date(
    rangeEnd.getFullYear(),
    rangeEnd.getMonth(),
    rangeEnd.getDate() - 6
  )

  return {
    start: rangeStart,
    end: rangeEnd
  }
}

export const getDayLabel = (date: Date) => {
  const today = new Date()
  const dayDiff = Math.floor(
    (normalizeToDay(today) - normalizeToDay(date)) / (1000 * 60 * 60 * 24)
  )

  if (dayDiff === 0) return 'HOY'
  if (dayDiff === 1) return 'AYER'
  if (dayDiff === 2) return 'ANTEAYER'

  return Intl.DateTimeFormat('es-ES', { dateStyle: 'short' }).format(date)
}

export const getQtyInGrams = (qty?: number, unit?: string) => {
  if (qty === undefined || qty === null) return undefined

  switch (unit) {
    case 'Kg':
      return qty * 1000
    case 'l':
      return qty * 1000
    case 'ml':
    case 'g':
    default:
      return qty
  }
}

export const calculateTotalMacro = (
  per100gValue?: number,
  qty?: number,
  unit?: string
) => {
  if (per100gValue === undefined || per100gValue === null) return 0
  const qtyInGrams = getQtyInGrams(qty, unit)
  if (qtyInGrams === undefined) return per100gValue
  return (per100gValue * qtyInGrams) / 100
}

export const formatMacro = (value: number) => {
  if (Number.isInteger(value)) return `${value}`
  return value.toFixed(1)
}

export const sortFoodsByCreatedDesc = (completedMeals: iCompletedMeal[]) =>
  [...completedMeals].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  )

export const getFoodsByDay = (completedMeals: iCompletedMeal[]) => {
  const sortedFoods = sortFoodsByCreatedDesc(completedMeals)

  return sortedFoods.reduce(
    (acc, food) => {
      const dayLabel = getDayLabel(new Date(food.created))

      if (!acc[dayLabel]) {
        acc[dayLabel] = []
      }

      acc[dayLabel].push(food)
      return acc
    },
    {} as Record<string, iCompletedMeal[]>
  )
}

export const getFoodsByTimeOfDay = (dayFoods: iCompletedMeal[]) =>
  dayFoods.reduce(
    (acc, food) => {
      if (!acc[food.timeOfDay]) {
        acc[food.timeOfDay] = []
      }

      ;(acc[food.timeOfDay] as iCompletedMeal[]).push(food)
      return acc
    },
    {} as Partial<Record<iCompletedMeal['timeOfDay'], iCompletedMeal[]>>
  )

export const getOrderedTimeOfDayGroups = (dayFoods: iCompletedMeal[]) => {
  const foodsByTimeOfDay = getFoodsByTimeOfDay(dayFoods)

  return (
    Object.entries(foodsByTimeOfDay) as Array<
      [iCompletedMeal['timeOfDay'], iCompletedMeal[]]
    >
  ).sort(([timeA], [timeB]) => timeOfDayOrder[timeA] - timeOfDayOrder[timeB])
}

export const getDayTotalKcal = (dayFoods: iCompletedMeal[]) =>
  dayFoods.reduce(
    (total, food) =>
      total + calculateTotalMacro(food.food.kcal, food.qty, food.unit),
    0
  )

export const getFoodsForWeek = (
  completedMeals: iCompletedMeal[],
  weekOffset = 0
) => {
  const { start, end } = getWeekRange(weekOffset)
  const startTime = normalizeToDay(start)
  const endTime = normalizeToDay(end)

  return completedMeals.filter(food => {
    const createdTime = normalizeToDay(new Date(food.created))
    return createdTime >= startTime && createdTime <= endTime
  })
}

export const getMaxWeekOffset = (completedMeals: iCompletedMeal[]) => {
  if (completedMeals.length === 0) return 0

  const oldestMeal = completedMeals.reduce((oldest, current) => {
    return new Date(current.created).getTime() <
      new Date(oldest.created).getTime()
      ? current
      : oldest
  })

  const today = new Date()
  const diffInDays = Math.floor(
    (normalizeToDay(today) - normalizeToDay(new Date(oldestMeal.created))) /
      DAY_IN_MS
  )

  return Math.max(0, Math.floor(diffInDays / 7))
}

export const getWeekRangeLabel = (weekOffset = 0) => {
  const { start, end } = getWeekRange(weekOffset)
  const dateFormatter = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short'
  })

  return `${dateFormatter.format(start)} - ${dateFormatter.format(end)}`
}

export const getWeekTitle = (weekOffset: number) => {
  if (weekOffset === 0) return 'Últimos 7 días'
  if (weekOffset === 1) return 'Semana pasada'
  return `Hace ${weekOffset} semanas`
}

export const getPreviousWeekOffset = (current: number, max: number) =>
  Math.min(current + 1, max)

export const getNextWeekOffset = (current: number) => Math.max(current - 1, 0)
