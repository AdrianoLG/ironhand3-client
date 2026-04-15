import { iIngredient } from '../types/nutrition'

const IngredientList = ({ ingredients }: { ingredients: iIngredient[] }) => {
  return (
    <div className='box-border grid grid-cols-3 gap-4'>
      {ingredients.map(ingredient => (
        <div key={ingredient._id} className='overflow-hidden rounded-xl'>
          <img
            src={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/nutrition/ingredients/${ingredient.image}`}
            alt={ingredient.name}
            className='w-full object-cover'
          />
          <h3 className='bg-secondaryLight text-textInv truncate px-4 py-2 text-center text-sm leading-3.5'>
            {ingredient.name}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default IngredientList
