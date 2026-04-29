import { useMutation } from '@apollo/client'

import { AlertDialog } from '../../../components/organisms/dialogs'
import { REMOVE_INGREDIENT } from '../gql/nutritionMutations'
import { NUTRITION_INFO } from '../gql/nutritionQueries'
import { iIngredient } from '../types/nutrition'

const IngredientAlert = ({
  showAlert,
  setShowAlert
}: {
  showAlert: {
    visible: boolean
    ingredient: iIngredient | null
  }
  setShowAlert: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      ingredient: iIngredient | null
    }>
  >
}) => {
  const [removeIngredient] = useMutation(REMOVE_INGREDIENT, {
    refetchQueries: [{ query: NUTRITION_INFO }]
  })

  const handleDelete = () => {
    if (!showAlert.ingredient) return
    removeIngredient({ variables: { id: showAlert.ingredient._id } }).finally(
      () => {
        setShowAlert({ visible: false, ingredient: null })
      }
    )
  }

  return (
    <AlertDialog
      isOpen={showAlert.visible}
      onOpenChange={open => {
        if (!open) setShowAlert({ visible: false, ingredient: null })
      }}
      title='¿Eliminar ingrediente?'
      description='Esta acción no se puede deshacer.'
      confirmText='Sí, eliminar'
      layout='compact'
      onConfirm={handleDelete}
    />
  )
}

export default IngredientAlert
