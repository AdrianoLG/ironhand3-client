import Emptylist from '../../../components/molecules/EmptyList'
import { iFood } from '../types/nutrition'

const timeOfDayOrder: Record<iFood['timeOfDay'], number> = {
  BREAKFAST: 0,
  LUNCH: 1,
  SNACK: 2,
  DINNER: 3
}

const timeOfDayLabel: Record<iFood['timeOfDay'], string> = {
  BREAKFAST: 'Desayuno',
  LUNCH: 'Comida',
  SNACK: 'Merienda',
  DINNER: 'Cena'
}

const normalizeToDay = (value: Date) =>
  new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime()

const getDayLabel = (date: Date) => {
  const today = new Date()
  const dayDiff = Math.floor(
    (normalizeToDay(today) - normalizeToDay(date)) / (1000 * 60 * 60 * 24)
  )

  if (dayDiff === 0) return 'HOY'
  if (dayDiff === 1) return 'AYER'
  if (dayDiff === 2) return 'ANTEAYER'

  return Intl.DateTimeFormat('es-ES', { dateStyle: 'short' }).format(date)
}

const FoodList = ({ foods }: { foods: iFood[] }) => {
  if (foods.length === 0) {
    return (
      <Emptylist
        message={
          'No hay comidas registradas en este periodo.\n¡Añade la primera!'
        }
        secondary
      />
    )
  }

  const sortedFoods = [...foods].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  )

  const foodsByDay = sortedFoods.reduce(
    (acc, food) => {
      const dayLabel = getDayLabel(new Date(food.created))

      if (!acc[dayLabel]) {
        acc[dayLabel] = []
      }

      acc[dayLabel].push(food)
      return acc
    },
    {} as Record<string, iFood[]>
  )

  return (
    <div className='w-full'>
      {Object.entries(foodsByDay).map(([dayLabel, dayFoods]) => {
        const foodsByTimeOfDay = dayFoods.reduce(
          (acc, food) => {
            if (!acc[food.timeOfDay]) {
              acc[food.timeOfDay] = []
            }

            ;(acc[food.timeOfDay] as iFood[]).push(food)
            return acc
          },
          {} as Partial<Record<iFood['timeOfDay'], iFood[]>>
        )

        const orderedTimeOfDayGroups = Object.entries(foodsByTimeOfDay).sort(
          ([timeA], [timeB]) =>
            timeOfDayOrder[timeA as iFood['timeOfDay']] -
            timeOfDayOrder[timeB as iFood['timeOfDay']]
        )

        return (
          <div key={dayLabel} className='text-text mb-4'>
            <h3 className='mb-4 text-sm font-semibold'>{dayLabel}</h3>

            {orderedTimeOfDayGroups.map(([timeOfDay, timeFoods]) => (
              <div key={`${dayLabel}-${timeOfDay}`}>
                <h4 className='text-secondaryLight mb-2 text-xs font-semibold'>
                  {timeOfDayLabel[timeOfDay as iFood['timeOfDay']]}
                </h4>

                <ul className='border-secondaryLighter inline-block flex-col gap-2 overflow-hidden rounded-xl border-1 px-2 py-1'>
                  {timeFoods?.map(food => (
                    <li key={food._id} className='text-sm'>
                      <span>{food.name}</span>
                      {food.qty !== undefined && (
                        <span className='text-secondary'>
                          {' '}
                          - {food.qty}
                          {food.unit ? ` ${food.unit}` : ''}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default FoodList
