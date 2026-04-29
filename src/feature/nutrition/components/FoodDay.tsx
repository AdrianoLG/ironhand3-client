import { useState } from 'react'

import { iCompletedMeal, iFoodDay, timeOfDayLabel } from '../types/nutrition'
import {
  formatMacro,
  getDayTotalKcal,
  getOrderedTimeOfDayGroups
} from '../utils/nutrition'
import FoodInfo from './FoodInfo'

const FoodDay = ({
  dayLabel,
  dayFoods,
  selectedFoodId,
  onSelectFood,
  onEditFood,
  onDeleteFood
}: iFoodDay) => {
  const [isHovered, setIsHovered] = useState(false)
  const orderedTimeOfDayGroups = getOrderedTimeOfDayGroups(dayFoods)
  const dayTotalKcal = getDayTotalKcal(dayFoods)

  return (
    <div className='text-text mb-6'>
      <div
        className='relative mb-4 inline-flex items-center'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3 className='inline-block text-sm font-semibold'>{dayLabel}</h3>
        {isHovered && (
          <div className='bg-primary border-secondaryLighter absolute top-1/2 left-full z-20 ml-2 w-36 -translate-y-1/2 rounded-md border-1 px-3 py-2 shadow-lg'>
            <p className='text-secondary text-xs font-semibold'>
              Total día: {formatMacro(dayTotalKcal)} kcal
            </p>
          </div>
        )}
      </div>

      {orderedTimeOfDayGroups.map(([timeOfDay, timeFoods]) => (
        <div key={`${dayLabel}-${timeOfDay}`} className='mb-4'>
          <h4 className='text-secondaryLight mb-2 text-xs font-semibold'>
            {timeOfDayLabel[timeOfDay as iCompletedMeal['timeOfDay']]}
          </h4>

          <ul className='border-secondaryLighter inline-block flex-col gap-2 overflow-visible rounded-md border-1 px-2 py-1'>
            {timeFoods?.map(food => (
              <li
                key={food._id}
                className='group relative cursor-pointer text-sm'
                onClick={event => {
                  event.stopPropagation()
                  onSelectFood(selectedFoodId === food._id ? null : food._id)
                }}
              >
                <span>{food.food.name}</span>

                {selectedFoodId === food._id && (
                  <FoodInfo
                    food={food}
                    onEdit={() => onEditFood(food)}
                    onDelete={() => onDeleteFood(food)}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default FoodDay
