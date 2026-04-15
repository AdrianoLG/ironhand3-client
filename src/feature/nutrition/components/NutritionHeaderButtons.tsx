import { useState } from 'react'

import { Dialog } from '../../../components/organisms/dialogs'

const NutritionHeaderButtons = () => {
  const [completeDietFormIsOpen, setCompleteDietFormIsOpen] = useState(false)
  const [recipeFormIsOpen, setRecipeFormIsOpen] = useState(false)
  const [foodFormIsOpen, setFoodFormIsOpen] = useState(false)
  const [ingredientFormIsOpen, setIngredientFormIsOpen] = useState(false)

  const placeholder = (
    <div className='text-secondary px-8 py-6'>Formulario en construccion.</div>
  )

  return (
    <>
      <nav className='xl:max-w-screen-content mx-auto flex flex-wrap justify-start gap-2 px-12 pb-16'>
        <div>
          <Dialog
            buttonText='Completar dieta'
            title='Completar dieta'
            description='Introduce los datos de la dieta completada'
            image='exercise-bg'
            child={placeholder}
            isOpen={completeDietFormIsOpen}
            setIsOpen={setCompleteDietFormIsOpen}
            secondary
          />
        </div>
        <div>
          <Dialog
            buttonText='Añadir receta'
            title='Añadir receta'
            description='Introduce los datos de la receta'
            image='exercise-bg'
            child={placeholder}
            isOpen={recipeFormIsOpen}
            setIsOpen={setRecipeFormIsOpen}
          />
        </div>
        <div>
          <Dialog
            buttonText='Añadir comida'
            title='Añadir comida'
            description='Introduce los datos de la comida'
            image='exercise-bg'
            child={placeholder}
            isOpen={foodFormIsOpen}
            setIsOpen={setFoodFormIsOpen}
          />
        </div>
        <div>
          <Dialog
            buttonText='Añadir ingrediente'
            title='Añadir ingrediente'
            description='Introduce los datos del ingrediente'
            image='exercise-bg'
            child={placeholder}
            isOpen={ingredientFormIsOpen}
            setIsOpen={setIngredientFormIsOpen}
          />
        </div>
      </nav>
    </>
  )
}

export default NutritionHeaderButtons
