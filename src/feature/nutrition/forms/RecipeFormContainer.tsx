import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import Spinner from '../../../components/molecules/Spinner'
import { cleanEmpty } from '../../../utils/cleanEmpty'
import { ADD_RECIPE, UPDATE_RECIPE } from '../gql/nutritionMutations'
import { NUTRITION_INFO } from '../gql/nutritionQueries'
import { iIngredient, iRecipe } from '../types/nutrition'
import RecipeForm, { RecipeFormInput } from './RecipeForm'

const RecipeFormContainer = ({
  setIsOpen,
  recipeData
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  recipeData?: iRecipe
}) => {
  const isEdit = !!recipeData

  const { data, loading, error } = useQuery<{ ingredients: iIngredient[] }>(
    NUTRITION_INFO
  )

  const [createRecipe] = useMutation(ADD_RECIPE, {
    refetchQueries: [{ query: NUTRITION_INFO }]
  })
  const [updateRecipe] = useMutation(UPDATE_RECIPE, {
    refetchQueries: [{ query: NUTRITION_INFO }]
  })

  const getDefaultIngredientIds = () => {
    if (!recipeData?.ingredients || !data?.ingredients) return []

    return recipeData.ingredients
      .map(
        recipeIngredient =>
          data.ingredients.find(
            ingredient => ingredient.name === recipeIngredient.name
          )?._id
      )
      .filter((id): id is string => Boolean(id))
  }

  const defaultIngredientIds = getDefaultIngredientIds()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    reset
  } = useForm<RecipeFormInput>({
    defaultValues: {
      name: recipeData?.name ?? '',
      ingredientIds: defaultIngredientIds,
      steps: recipeData?.steps?.join('\n') ?? '',
      machine: (recipeData?.machine as RecipeFormInput['machine']) ?? '',
      gallery: recipeData?.gallery ?? []
    }
  })

  const onSubmit: SubmitHandler<RecipeFormInput> = formData => {
    const ingredientIds = formData.ingredientIds || []
    const selectedIngredients = ingredientIds
      .map(ingredientId =>
        data?.ingredients.find(ingredient => ingredient._id === ingredientId)
      )
      .filter((ingredient): ingredient is iIngredient => Boolean(ingredient))

    if (selectedIngredients.length === 0) {
      setError('ingredientIds', {
        type: 'custom',
        message: 'Ingredientes requeridos'
      })
      return
    }

    const steps = formData.steps
      .split('\n')
      .map(step => step.trim())
      .filter(Boolean)

    if (steps.length === 0) {
      setError('steps', {
        type: 'custom',
        message: 'Pasos requeridos'
      })
      return
    }

    clearErrors('ingredientIds')
    clearErrors('steps')

    const recipePayload = cleanEmpty({
      name: formData.name,
      ingredients: selectedIngredients.map(ingredient => ({
        name: ingredient.name,
        image: ingredient.image,
        qty: ingredient.qty,
        unit: ingredient.unit
      })),
      steps,
      gallery: formData.gallery,
      machine: formData.machine || undefined
    })

    const mutation = isEdit
      ? updateRecipe({
          variables: {
            updateRecipeInput: {
              ...recipePayload,
              _id: recipeData!._id
            }
          }
        })
      : createRecipe({
          variables: {
            createRecipeInput: recipePayload
          }
        })

    mutation.finally(() => {
      setIsOpen(false)
      reset()
    })
  }

  if (loading)
    return (
      <Spinner classes='my-7 flex w-full justify-center px-8' widthInRem={2} />
    )

  if (error)
    return (
      <ErrorMessage
        message={'Error en la base de datos'}
        errorMessage={error.message}
        containerClasses='my-7 flex w-full justify-center px-8 text-secondary'
      />
    )

  return (
    <RecipeForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      clearErrors={clearErrors}
      ingredients={data?.ingredients || []}
      gallery={watch('gallery') || []}
      setIsOpen={setIsOpen}
      selectedIngredientIds={defaultIngredientIds}
      defaultMachine={recipeData?.machine ?? ''}
      isEdit={isEdit}
    />
  )
}

export default RecipeFormContainer
