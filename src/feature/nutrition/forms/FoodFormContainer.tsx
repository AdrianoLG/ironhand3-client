import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation } from '@apollo/client'

import { cleanEmpty } from '../../../utils/cleanEmpty'
import { ADD_FOOD } from '../gql/nutritionMutations'
import { NUTRITION_INFO } from '../gql/nutritionQueries'
import FoodForm, { FoodFormInput } from './FoodForm'

const FoodFormContainer = ({
  setIsOpen
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [createFood] = useMutation(ADD_FOOD, {
    refetchQueries: [{ query: NUTRITION_INFO }]
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FoodFormInput>({
    defaultValues: {}
  })

  const onSubmit: SubmitHandler<FoodFormInput> = formData => {
    createFood({
      variables: {
        createFoodInput: cleanEmpty(formData)
      }
    }).finally(() => {
      setIsOpen(false)
      reset()
    })
  }

  return (
    <FoodForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setIsOpen={setIsOpen}
    />
  )
}

export default FoodFormContainer
