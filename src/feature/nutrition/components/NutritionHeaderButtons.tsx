import { useState } from 'react'

import { Dialog } from '../../../components/organisms/dialogs'
import CompletedMealFormContainer from '../forms/CompletedMealFormContainer'
import FoodFormContainer from '../forms/FoodFormContainer'
import IngredientFormContainer from '../forms/IngredientFormContainer'
import RecipeFormContainer from '../forms/RecipeFormContainer'

const NutritionHeaderButtons = () => {
  const [completeDietFormIsOpen, setCompleteDietFormIsOpen] = useState(false)
  const [recipeFormIsOpen, setRecipeFormIsOpen] = useState(false)
  const [foodFormIsOpen, setFoodFormIsOpen] = useState(false)
  const [ingredientFormIsOpen, setIngredientFormIsOpen] = useState(false)

  return (
    <>
      <nav className='xl:max-w-screen-content mx-auto flex flex-wrap justify-start gap-2 px-12 pb-16'>
        <div>
          <Dialog
            buttonText='Completar dieta'
            title='Completar dieta'
            description='Introduce los datos de la dieta completada'
            image='food-bg'
            child={
              <CompletedMealFormContainer
                setIsOpen={setCompleteDietFormIsOpen}
              />
            }
            isOpen={completeDietFormIsOpen}
            setIsOpen={setCompleteDietFormIsOpen}
            secondary
          />
        </div>
        <div>
          <Dialog
            buttonText='Añadir comida'
            title='Añadir comida'
            description='Introduce los datos de la comida'
            image='food-bg'
            child={<FoodFormContainer setIsOpen={setRecipeFormIsOpen} />}
            isOpen={recipeFormIsOpen}
            setIsOpen={setRecipeFormIsOpen}
          />
        </div>
        <div>
          <Dialog
            buttonText='Añadir receta'
            title='Añadir receta'
            description='Introduce los datos de la receta'
            image='food-bg'
            child={<RecipeFormContainer setIsOpen={setFoodFormIsOpen} />}
            isOpen={foodFormIsOpen}
            setIsOpen={setFoodFormIsOpen}
          />
        </div>
        <div>
          <Dialog
            buttonText='Añadir ingrediente'
            title='Añadir ingrediente'
            description='Introduce los datos del ingrediente'
            image='food-bg'
            child={
              <IngredientFormContainer setIsOpen={setIngredientFormIsOpen} />
            }
            isOpen={ingredientFormIsOpen}
            setIsOpen={setIngredientFormIsOpen}
          />
        </div>
      </nav>
    </>
  )
}

export default NutritionHeaderButtons
