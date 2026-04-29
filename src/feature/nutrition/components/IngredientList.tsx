import { useState } from 'react'

import { Button } from '../../../components/atoms'
import IngredientAlert from '../layouts/IngredientAlert'
import IngredientDialog from '../layouts/IngredientDialog'
import { iIngredient } from '../types/nutrition'

const IngredientList = ({ ingredients }: { ingredients: iIngredient[] }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [editIngredient, setEditIngredient] = useState<iIngredient | null>(null)
  const [deleteAlert, setDeleteAlert] = useState<{
    visible: boolean
    ingredient: iIngredient | null
  }>({ visible: false, ingredient: null })
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <>
      <div className='box-border grid grid-cols-3 gap-4'>
        {ingredients.map(ingredient => (
          <div
            key={ingredient._id}
            className='relative overflow-hidden rounded-xl'
            onMouseEnter={() => setHoveredId(ingredient._id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img
              src={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/nutrition/ingredients/${ingredient.image}`}
              alt={ingredient.name}
              className='w-full object-cover'
            />
            <h3 className='bg-secondaryLight text-textInv truncate px-4 py-2 text-center text-sm leading-3.5'>
              {ingredient.name}
            </h3>

            {hoveredId === ingredient._id && (
              <div className='absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 px-4'>
                <Button
                  text='Editar'
                  xsmall
                  isFit
                  onMouseClick={() => {
                    setEditIngredient(ingredient)
                    setIsEditOpen(true)
                  }}
                />
                <Button
                  text='Borrar'
                  xsmall
                  isFit
                  secondary
                  onMouseClick={() =>
                    setDeleteAlert({ visible: true, ingredient })
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <IngredientDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        ingredientData={editIngredient}
      />
      <IngredientAlert showAlert={deleteAlert} setShowAlert={setDeleteAlert} />
    </>
  )
}

export default IngredientList
