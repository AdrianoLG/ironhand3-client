import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation } from '@apollo/client'

import { ADD_EXERCISE, UPDATE_EXERCISE } from '../gql/exerciseMutations'
import { EXERCISES_INFO, SELECT_EXERCISES } from '../gql/exerciseQueries'
import { iExercise } from '../types/exercises'
import {
  exerciseBodyPartsOptions,
  exerciseTypeOptions
} from '../utils/formOptions'
import ExerciseForm from './ExerciseForm'

const ExerciseFormContainer = ({
  setIsOpen,
  exercise
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  exercise?: iExercise | null
}) => {
  const [addExercise] = useMutation(ADD_EXERCISE, {
    refetchQueries: [{ query: EXERCISES_INFO }, { query: SELECT_EXERCISES }]
  })
  const [updateExercise] = useMutation(UPDATE_EXERCISE, {
    refetchQueries: [{ query: EXERCISES_INFO }, { query: SELECT_EXERCISES }]
  })
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    setError,
    clearErrors,
    reset
  } = useForm<iExercise>()

  const [exerciseToUpdate, setExerciseToUpdate] = useState<iExercise | null>(
    exercise || null
  )

  const onSubmit: SubmitHandler<iExercise> = data => {
    if (!data.type) {
      setError('type', {
        message: 'Selecciona un tipo de ejercicio'
      })
      return
    }
    if (!data.bodyParts || data.bodyParts.length === 0) {
      setError('bodyParts', {
        message: 'Selecciona al menos una parte del cuerpo'
      })
      return
    }
    if (!data.img) {
      setError('img', { message: 'Selecciona una imagen' })
      return
    }

    if (exercise) {
      const updateData = { ...data, _id: exercise._id }
      updateExercise({
        variables: { updateExerciseInput: updateData }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
    } else {
      addExercise({ variables: { createExerciseInput: data } }).finally(() => {
        setIsOpen(false)
        reset()
      })
    }
  }

  if (exerciseToUpdate) {
    setValue('name', exerciseToUpdate.name)
    setValue('type', exerciseToUpdate.type)
    setValue('bodyParts', exerciseToUpdate.bodyParts)
    setValue('img', exerciseToUpdate.img)
  }

  return (
    <ExerciseForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      clearErrors={clearErrors}
      exerciseToUpdate={exerciseToUpdate}
      exerciseTypeOptions={exerciseTypeOptions}
      exerciseBodyPartsOptions={exerciseBodyPartsOptions}
      setExerciseToUpdate={setExerciseToUpdate}
      setError={setError}
      isValid={isValid}
      setIsOpen={setIsOpen}
    />
  )
}

export default ExerciseFormContainer
