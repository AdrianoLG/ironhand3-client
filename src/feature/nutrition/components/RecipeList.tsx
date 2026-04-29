import { useState } from 'react'

import { useMutation } from '@apollo/client'

import { Button } from '../../../components/atoms'
import { AlertDialog, Dialog } from '../../../components/organisms/dialogs'
import FormInputSearch from '../../../components/organisms/forms/FormInputSearch'
import RecipeFormContainer from '../forms/RecipeFormContainer'
import { REMOVE_RECIPE } from '../gql/nutritionMutations'
import { NUTRITION_INFO } from '../gql/nutritionQueries'
import { iRecipe } from '../types/nutrition'

const RecipeList = ({ recipes }: { recipes: iRecipe[] }) => {
  const [expandedRecipeId, setExpandedRecipeId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editRecipe, setEditRecipe] = useState<iRecipe | null>(null)
  const [deleteAlert, setDeleteAlert] = useState<{
    visible: boolean
    recipe: iRecipe | null
  }>({ visible: false, recipe: null })

  const [removeRecipe] = useMutation(REMOVE_RECIPE, {
    refetchQueries: [{ query: NUTRITION_INFO }]
  })

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  const filteredRecipes =
    normalizedSearchTerm.length >= 2
      ? recipes.filter(recipe =>
          recipe.name.toLowerCase().includes(normalizedSearchTerm)
        )
      : recipes

  const toggleRecipe = (e: React.MouseEvent<HTMLLIElement>, id: string) => {
    e.stopPropagation()
    setExpandedRecipeId(currentId => (currentId === id ? null : id))
  }

  return (
    <>
      <FormInputSearch
        placeholder='Buscar receta...'
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      {normalizedSearchTerm.length >= 2 && filteredRecipes.length === 0 && (
        <p className='text-secondary mb-4 w-5/6 text-sm'>
          No hay recetas para esa búsqueda.
        </p>
      )}
      <ul className='border-secondaryLighter flex w-5/6 flex-col gap-4'>
        {filteredRecipes.map(recipe => (
          <li
            key={recipe._id}
            className='overflow-hidden rounded-lg border-1 p-4 hover:cursor-pointer'
            onClick={e => toggleRecipe(e, recipe._id)}
            aria-expanded={expandedRecipeId === recipe._id}
          >
            <h3 className='text-secondary text-lg leading-3.5'>
              {recipe.name}
            </h3>
            <div
              className={`transition-all duration-300 ease-out ${
                expandedRecipeId === recipe._id
                  ? 'mt-4 max-h-96 opacity-100'
                  : 'mt-0 max-h-0 overflow-hidden opacity-0'
              }`}
              aria-hidden={expandedRecipeId !== recipe._id}
            >
              <div className='pb-1'>
                {recipe.machine && (
                  <img
                    src={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/nutrition/machines/${recipe.machine.toLowerCase()}.svg`}
                    alt={recipe.machine}
                    className='mb-2 w-6 rounded-lg object-cover'
                  />
                )}
                <ul className='mt-4'>
                  <h4 className='text-text mb-2 text-sm'>Ingredientes:</h4>
                  {recipe.ingredients?.map((ingredient, index) => (
                    <li
                      key={index}
                      className='text-secondary ml-6 list-disc text-xs'
                    >
                      {ingredient.qty}{' '}
                      {ingredient.unit ? `${ingredient.unit} de` : ''}{' '}
                      {ingredient.qty
                        ? ingredient.name.toLowerCase()
                        : ingredient.name}
                    </li>
                  ))}
                </ul>
                <ol className='mt-4'>
                  <h4 className='text-text mb-2 text-sm'>Pasos:</h4>
                  {recipe.steps?.map((step, index) => (
                    <li
                      key={index}
                      className='text-secondary ml-6 list-decimal text-xs'
                    >
                      {step}
                    </li>
                  ))}
                </ol>
                <div className='mt-8 flex justify-center gap-2'>
                  <Button
                    text='Editar'
                    xsmall
                    isFit
                    onMouseClick={event => {
                      event.stopPropagation()
                      setEditRecipe(recipe)
                      setIsEditOpen(true)
                    }}
                  />
                  <Button
                    text='Borrar'
                    xsmall
                    isFit
                    secondary
                    onMouseClick={event => {
                      event.stopPropagation()
                      setDeleteAlert({ visible: true, recipe })
                    }}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Dialog
        buttonText=''
        title='Editar receta'
        description='Modifica los datos de la receta'
        image='food-bg'
        child={
          editRecipe ? (
            <RecipeFormContainer
              key={editRecipe._id}
              setIsOpen={setIsEditOpen}
              recipeData={editRecipe}
            />
          ) : null
        }
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        hideTrigger
      />
      <AlertDialog
        isOpen={deleteAlert.visible}
        onOpenChange={open => {
          if (!open) setDeleteAlert({ visible: false, recipe: null })
        }}
        title='¿Eliminar receta?'
        description='Esta acción no se puede deshacer.'
        confirmText='Sí, eliminar receta'
        layout='compact'
        onConfirm={() => {
          if (!deleteAlert.recipe) return
          removeRecipe({
            variables: { id: deleteAlert.recipe._id }
          }).finally(() => {
            setDeleteAlert({ visible: false, recipe: null })
          })
        }}
      />
    </>
  )
}

export default RecipeList
