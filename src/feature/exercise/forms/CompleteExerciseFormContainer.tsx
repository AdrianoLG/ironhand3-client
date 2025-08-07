import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import Spinner from '../../../components/molecules/Spinner'
import { cleanEmpty } from '../../../utils/cleanEmpty'
import {
  ADD_COMPLETE_EXERCISE,
  UPDATE_COMPLETE_EXERCISE
} from '../gql/exerciseMutations'
import { EXERCISES_INFO, SELECT_EXERCISES } from '../gql/exerciseQueries'
import {
  iCompletedExercise,
  iExerciseFormInput,
  iExercises
} from '../types/exercises'
import CompleteExerciseForm from './CompleteExerciseForm'

const CompleteExerciseFormContainer = ({
  completedExerciseData,
  setIsOpen
}: {
  completedExerciseData?: iCompletedExercise
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  /*
   * GQL
   */
  const { data, loading, error } = useQuery<iExercises>(SELECT_EXERCISES)
  const [createCompletedExercise] = useMutation(ADD_COMPLETE_EXERCISE, {
    refetchQueries: [{ query: EXERCISES_INFO }, { query: SELECT_EXERCISES }]
  })
  const [updateCompletedExercise] = useMutation(UPDATE_COMPLETE_EXERCISE, {
    refetchQueries: [{ query: EXERCISES_INFO }, { query: SELECT_EXERCISES }]
  })

  /*
   * Form logic
   */
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

  /*
   * State management
   */
  const [isRequiredSelected, setIsRequiredSelected] = useState(false)
  const [fields, setFields] = useState({
    time: false,
    repetitions: false,
    weight: false,
    ppm_max: false,
    ppm_min: false
  })

  /*
   * Handle form submission
   * Validates required fields and sends the form data to create or update a completed exercise
   */
  const onSubmit: SubmitHandler<iExerciseFormInput> = formData => {
    // Set error messages
    if (!getValues('exercise')) {
      setError('exercise', {
        type: 'custom',
        message: 'Ejercicio requerido'
      })
      return
    }
    const ppmMin = getValues('ppm_min')
    const ppmMax = getValues('ppm_max')
    if (ppmMin !== undefined && ppmMax !== undefined && ppmMin > ppmMax) {
      setError('ppm_min', {
        type: 'custom',
        message: 'PPM mínimo no puede ser mayor que PPM máximo'
      })
      return
    }

    // Prepare form data
    clearErrors('exercise')
    const exercise = formData.exercise.split('-')[0]
    formData.exercise = exercise

    // Send form: update or create
    if (completedExerciseData) {
      const updateData = {
        ...formData,
        exercise: completedExerciseData?.exercise._id,
        _id: completedExerciseData._id
      }
      updateCompletedExercise({
        variables: { updateCompletedExerciseInput: cleanEmpty(updateData) }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
    } else {
      createCompletedExercise({
        variables: { createCompletedExerciseInput: cleanEmpty(formData) }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
    }
  }

  /*
   * Handle button clicks to set values for time, repetitions, weight, etc.
   */
  const handleButtons = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: keyof iExerciseFormInput
  ) => {
    e.preventDefault()

    if (setValue) {
      setValue(tag, parseInt(e.currentTarget.textContent || '0'))
    }
  }

  /*
   * Show fields based on exercise type
   */
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

  /*
   * Set initial values if editing an existing completed exercise
   */
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
    <CompleteExerciseForm
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
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
      setIsOpen={setIsOpen}
    />
  )
}
export default CompleteExerciseFormContainer
