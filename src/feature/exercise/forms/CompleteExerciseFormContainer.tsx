import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import { cleanEmpty } from '../../../utils/cleanEmpty'
import { COMPLETE_EXERCISE } from '../gql/exerciseMutations'
import { EXERCISES_INFO, SELECT_EXERCISES } from '../gql/exerciseQueries'
import {
  iCompletedExercise,
  iExerciseFormInput,
  iExercises
} from '../types/exercises'
import CompleteExerciseForm from './CompleteExerciseForm'

const CompleteExerciseFormContainer = ({
  completedExerciseData
}: {
  completedExerciseData?: iCompletedExercise
}) => {
  const { data, loading, error } = useQuery<iExercises>(SELECT_EXERCISES)
  const [createCompletedExercise] = useMutation(COMPLETE_EXERCISE, {
    refetchQueries: [{ query: EXERCISES_INFO }, { query: SELECT_EXERCISES }]
  })
  const [isRequiredSelected, setIsRequiredSelected] = useState(false)
  const [fields, setFields] = useState({
    time: false,
    repetitions: false,
    weight: false,
    ppm_max: false,
    ppm_min: false
  })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
    reset
  } = useForm<iExerciseFormInput>()

  const onSubmit: SubmitHandler<iExerciseFormInput> = data => {
    if (!getValues('exercise')) {
      setError('exercise', {
        type: 'custom',
        message: 'Ejercicio requerido'
      })
    }
    clearErrors('exercise')
    const exercise = data.exercise.split('-')[0]
    data.exercise = exercise
    if (completedExerciseData) {
      // TODO: Update completed exercise
      console.log(cleanEmpty(data))
    } else {
      createCompletedExercise({
        variables: { createCompletedExerciseInput: cleanEmpty(data) }
      })
      reset()
    }
  }

  const handleButtons = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: keyof iExerciseFormInput
  ) => {
    e.preventDefault()

    if (setValue) {
      setValue(tag, parseInt(e.currentTarget.textContent || '0'))
    }
  }

  const showFields = (type: string) => {
    setValue('time', undefined)
    setValue('repetitions', undefined)
    setValue('weight', undefined)
    setValue('ppm_max', undefined)
    setValue('ppm_min', undefined)

    if (type === 'strength') {
      setFields({
        time: false,
        repetitions: true,
        weight: true,
        ppm_max: true,
        ppm_min: true
      })
    }
    if (type === 'cardio') {
      setFields({
        time: true,
        repetitions: false,
        weight: false,
        ppm_max: true,
        ppm_min: true
      })
    }
    if (type === 'stretch') {
      setFields({
        time: true,
        repetitions: false,
        weight: false,
        ppm_max: false,
        ppm_min: false
      })
    }
  }

  if (completedExerciseData) {
    setValue(
      'date',
      new Date(completedExerciseData.date).toISOString().slice(0, 10)
    )
    setValue('exercise', completedExerciseData._id)
    setValue('time', completedExerciseData.time)
    setValue('repetitions', completedExerciseData.repetitions)
    setValue('weight', completedExerciseData.weight)
    setValue('ppm_max', completedExerciseData.ppm_max)
    setValue('ppm_min', completedExerciseData.ppm_min)
  }

  if (loading) return 'Cargando...'
  if (error) return <pre>{error.message}</pre>

  return (
    <CompleteExerciseForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isValid={isValid}
      register={register}
      data={data}
      clearErrors={clearErrors}
      setIsRequiredSelected={setIsRequiredSelected}
      setValue={setValue}
      showFields={showFields}
      completedExerciseData={completedExerciseData}
      fields={fields}
      handleButtons={handleButtons}
      isRequiredSelected={isRequiredSelected}
    />
  )
}
export default CompleteExerciseFormContainer
