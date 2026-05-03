import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { useMutation } from '@apollo/client';

import { CREATE_GOAL, CREATE_SAVING, UPDATE_GOAL, UPDATE_SAVING } from '../gql/budgetMutations';
import { BUDGET_INFO } from '../gql/budgetQueries';
import {
    buildSavingInitialValues, saveSavingFormData, SavingFormContainerProps
} from '../utils/savingForm';
import SavingForm, { SavingFormInput } from './SavingForm';

const SavingFormContainer = ({
  setIsOpen,
  savingData,
  onSuccess
}: SavingFormContainerProps) => {
  const isEdit = Boolean(savingData)
  const initialValues = buildSavingInitialValues(savingData)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset
  } = useForm<SavingFormInput>({ defaultValues: initialValues })

  const { fields, append } = useFieldArray({ control, name: 'goals' })

  const [createGoal] = useMutation(CREATE_GOAL)
  const [updateGoal] = useMutation(UPDATE_GOAL)
  const [createSaving] = useMutation(CREATE_SAVING, {
    refetchQueries: [{ query: BUDGET_INFO }]
  })
  const [updateSaving] = useMutation(UPDATE_SAVING, {
    refetchQueries: [{ query: BUDGET_INFO }]
  })

  const onSubmit: SubmitHandler<SavingFormInput> = async formData => {
    if (!formData.name?.trim()) {
      setError('name', {
        type: 'custom',
        message: 'Titulo de cuenta requerido'
      })
      return
    }

    const hasValidGoal = formData.goals.some(g => g.title?.trim().length > 0)
    if (!hasValidGoal) {
      setError('goals', {
        type: 'custom',
        message: 'Debes añadir al menos una meta'
      })
      return
    }

    clearErrors('goals')

    await saveSavingFormData({
      formData,
      savingData,
      mutations: { createGoal, updateGoal, createSaving, updateSaving }
    })

    setIsOpen(false)
    onSuccess?.()
    reset(initialValues)
  }

  return (
    <SavingForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      goalFields={fields}
      onAddGoal={() => append({ title: '', targetAmount: 0 })}
      setIsOpen={setIsOpen}
      isEdit={isEdit}
    />
  )
}

export default SavingFormContainer
