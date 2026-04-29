import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import Spinner from '../../../components/molecules/Spinner'
import { cleanEmpty } from '../../../utils/cleanEmpty'
import {
  ADD_COMPLETED_MEAL,
  UPDATE_COMPLETED_MEAL
} from '../gql/nutritionMutations'
import { NUTRITION_INFO } from '../gql/nutritionQueries'
import { iCompletedMeal, iFood } from '../types/nutrition'
import CompletedMealForm, { CompletedMealFormInput } from './CompletedMealForm'

const CompletedMealFormContainer = ({
  setIsOpen,
  completedMealData,
  onSuccess
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  completedMealData?: iCompletedMeal
  onSuccess?: () => void
}) => {
  const { data, loading, error } = useQuery<{ foods: iFood[] }>(NUTRITION_INFO)

  const [createCompletedMeal] = useMutation(ADD_COMPLETED_MEAL, {
    refetchQueries: [{ query: NUTRITION_INFO }]
  })

  const [updateCompletedMeal] = useMutation(UPDATE_COMPLETED_MEAL, {
    refetchQueries: [{ query: NUTRITION_INFO }]
  })

  const allowedUnits: CompletedMealFormInput['unit'][] = [
    'g',
    'Kg',
    'l',
    'ml',
    ''
  ]
  const normalizeUnit = (unit?: string): CompletedMealFormInput['unit'] => {
    return allowedUnits.includes(unit as CompletedMealFormInput['unit'])
      ? (unit as CompletedMealFormInput['unit'])
      : ''
  }

  const initialValues: CompletedMealFormInput = {
    food: completedMealData?.food?._id || '',
    timeOfDay: completedMealData?.timeOfDay || '',
    qty: completedMealData?.qty,
    unit: normalizeUnit(completedMealData?.unit),
    created: completedMealData
      ? new Date(completedMealData.created).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10)
  }

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    reset
  } = useForm<CompletedMealFormInput>({
    defaultValues: initialValues
  })

  const onSubmit: SubmitHandler<CompletedMealFormInput> = formData => {
    if (!formData.food) {
      setError('food', {
        type: 'custom',
        message: 'Comida requerida'
      })
      return
    }

    if (!formData.timeOfDay) {
      setError('timeOfDay', {
        type: 'custom',
        message: 'Momento del día requerido'
      })
      return
    }

    if (formData.qty !== undefined && formData.qty !== null && !formData.unit) {
      setError('unit', {
        type: 'custom',
        message: 'Unidad requerida'
      })
      return
    }

    clearErrors('food')
    clearErrors('timeOfDay')
    clearErrors('unit')

    const formattedInput = cleanEmpty({
      ...formData,
      created: new Date(formData.created).toISOString()
    })

    const mutationPromise = completedMealData
      ? updateCompletedMeal({
          variables: {
            updateCompletedMealInput: {
              _id: completedMealData._id,
              ...formattedInput
            }
          }
        })
      : createCompletedMeal({
          variables: {
            createCompletedMealInput: formattedInput
          }
        })

    mutationPromise.finally(() => {
      setIsOpen(false)
      onSuccess?.()
      reset(initialValues)
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
    <CompletedMealForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      clearErrors={clearErrors}
      foods={data?.foods || []}
      setIsOpen={setIsOpen}
      defaultValues={initialValues}
      isEdit={Boolean(completedMealData)}
    />
  )
}

export default CompletedMealFormContainer
