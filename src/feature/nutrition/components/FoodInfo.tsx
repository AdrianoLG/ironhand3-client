import { Button } from '../../../components/atoms'
import carbsImg from '../assets/carbs.png'
import fatImg from '../assets/fat.png'
import proteinImg from '../assets/protein.png'
import { iCompletedMeal } from '../types/nutrition'
import { calculateTotalMacro, formatMacro } from '../utils/nutrition'

const FoodInfo = ({
  food,
  onEdit,
  onDelete
}: {
  food: iCompletedMeal
  onEdit: () => void
  onDelete: () => void
}) => {
  return (
    <div
      className='bg-primary border-secondaryLighter absolute top-full left-0 z-20 mt-2 w-72 rounded-md border-1 px-3 pt-3 pb-4 shadow-lg'
      onClick={event => event.stopPropagation()}
    >
      {food.qty !== undefined && (
        <p className='text-secondary text-center text-xs font-semibold'>
          <span className='border-secondaryLighter mr-4 inline-block rounded-md border-1 p-1 text-center'>
            {food.qty}
            {food.unit ? ` ${food.unit}` : ''}
          </span>
          <span className='border-secondaryLighter rounded-md border-1 p-1 text-center'>
            {formatMacro(
              calculateTotalMacro(food.food.kcal, food.qty, food.unit)
            )}{' '}
            kcal
          </span>
        </p>
      )}
      <div className='mt-2 grid grid-cols-3 gap-2'>
        <div className='relative flex flex-col items-center gap-1'>
          <img
            src={carbsImg}
            alt='Carbohidratos'
            className='h-22 w-22 object-contain'
          />
          <span className='text-secondary absolute top-2 text-xs font-bold tracking-tight'>
            Carbs
          </span>
          <span className='text-secondary absolute bottom-2 text-xs font-bold'>
            {formatMacro(
              calculateTotalMacro(food.food.carbs, food.qty, food.unit)
            )}
          </span>
        </div>
        <div className='relative flex flex-col items-center gap-1'>
          <img
            src={proteinImg}
            alt='Proteínas'
            className='h-22 w-22 object-contain'
          />
          <span className='text-secondary absolute top-2 text-xs font-bold tracking-tight'>
            Prots
          </span>
          <span className='text-secondary absolute bottom-2 text-xs font-bold'>
            {formatMacro(
              calculateTotalMacro(food.food.proteins, food.qty, food.unit)
            )}
          </span>
        </div>
        <div className='relative flex flex-col items-center gap-0'>
          <img src={fatImg} alt='Grasas' className='h-22 w-22 object-contain' />
          <span className='text-secondary absolute top-2 text-xs font-bold tracking-tight'>
            Fats
          </span>
          <span className='text-secondary absolute bottom-2 text-xs font-bold'>
            {formatMacro(
              calculateTotalMacro(food.food.fats, food.qty, food.unit)
            )}
          </span>
        </div>
      </div>

      <div className='mt-4 flex justify-center gap-2'>
        <Button text='Editar' isFit xsmall secondary onMouseClick={onEdit} />
        <Button text='Borrar' isFit xsmall onMouseClick={onDelete} />
      </div>
    </div>
  )
}

export default FoodInfo
