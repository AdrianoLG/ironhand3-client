import { Dialog } from '../../../components/organisms/dialogs'
import IngredientFormContainer from '../forms/IngredientFormContainer'
import { iIngredient } from '../types/nutrition'

const IngredientDialog = ({
  isOpen,
  setIsOpen,
  ingredientData
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ingredientData: iIngredient | null
}) => {
  return (
    <Dialog
      buttonText=''
      title='Editar ingrediente'
      description='Modifica los datos del ingrediente'
      image='food-bg'
      child={
        <IngredientFormContainer
          setIsOpen={setIsOpen}
          ingredientData={ingredientData ?? undefined}
        />
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      hideTrigger
    />
  )
}

export default IngredientDialog
