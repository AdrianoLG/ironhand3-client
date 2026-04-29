import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation } from '@apollo/client'

import { cleanEmpty } from '../../../utils/cleanEmpty'
import { ADD_INGREDIENT, UPDATE_INGREDIENT } from '../gql/nutritionMutations'
import { NUTRITION_INFO } from '../gql/nutritionQueries'
import { iIngredient } from '../types/nutrition'
import IngredientForm, { IngredientFormInput } from './IngredientForm'

const allowedUnits: IngredientFormInput['unit'][] = ['g', 'Kg', 'l', 'ml', '']

const normalizeUnit = (unit?: string): IngredientFormInput['unit'] => {
  return allowedUnits.includes(unit as IngredientFormInput['unit'])
    ? (unit as IngredientFormInput['unit'])
    : ''
}

const IngredientFormContainer = ({
  setIsOpen,
  ingredientData
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ingredientData?: iIngredient
}) => {
  const isEdit = !!ingredientData

  const [createIngredient] = useMutation(ADD_INGREDIENT, {
    refetchQueries: [{ query: NUTRITION_INFO }]
  })
  const [updateIngredient] = useMutation(UPDATE_INGREDIENT, {
    refetchQueries: [{ query: NUTRITION_INFO }]
  })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    reset
  } = useForm<IngredientFormInput>({
    defaultValues: {
      name: ingredientData?.name ?? '',
      qty: ingredientData?.qty,
      unit: normalizeUnit(ingredientData?.unit),
      image: ingredientData?.image ?? ''
    }
  })

  const onSubmit: SubmitHandler<IngredientFormInput> = formData => {
    if (!isEdit && !formData.image) {
      setError('image', {
        type: 'custom',
        message: 'Imagen requerida'
      })
      return
    }

    const mutation = isEdit
      ? updateIngredient({
          variables: {
            updateIngredientInput: cleanEmpty({
              ...formData,
              _id: ingredientData!._id
            })
          }
        })
      : createIngredient({
          variables: {
            createIngredientInput: cleanEmpty(formData)
          }
        })

    mutation.finally(() => {
      setIsOpen(false)
      reset()
    })
  }

  return (
    <IngredientForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      setError={setError}
      clearErrors={clearErrors}
      setIsOpen={setIsOpen}
      isEdit={isEdit}
      currentImage={ingredientData?.image}
      currentUnit={normalizeUnit(ingredientData?.unit)}
    />
  )
}

export default IngredientFormContainer
