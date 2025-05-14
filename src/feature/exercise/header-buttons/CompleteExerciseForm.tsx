import { Dialog } from 'radix-ui'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import Button from '../../../components/atoms/Button'
import FormInput from '../../../components/organisms/forms/FormInput'
import FormSelect from '../../../components/organisms/forms/FormSelect'
import { COMPLETE_EXERCISE } from '../../../gql/exerciseMutations'
import { EXERCISES_INFO, SELECT_EXERCISES } from '../../../gql/exerciseQueries'
import { cleanEmpty } from '../../../utils/cleanEmpty'
import { iExerciseFormInput, iExercises } from '../../../utils/types'

const CompleteExerciseForm = ({
  setIsOpen
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data, loading, error } = useQuery<iExercises>(SELECT_EXERCISES)
  const [createCompletedExercise] = useMutation(COMPLETE_EXERCISE, {
    refetchQueries: [{ query: EXERCISES_INFO }, { query: SELECT_EXERCISES }]
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

  const [isRequiredSelected, setIsRequiredSelected] = useState(false)

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
    createCompletedExercise({
      variables: { createCompletedExerciseInput: cleanEmpty(data) }
    })
    setIsOpen(false)
    reset()
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

  const [fields, setFields] = useState({
    time: false,
    repetitions: false,
    weight: false,
    ppm_max: false,
    ppm_min: false
  })

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

  if (loading) return 'Cargando...'
  if (error) return <pre>{error.message}</pre>

  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8 lg:grid lg:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        {...register('date', {
          required: {
            value: true,
            message: 'Fecha requerida'
          },
          valueAsDate: true
        })}
        label='Fecha'
        type='date'
        defaultValue={new Date().toISOString().slice(0, 10)}
        error={errors.date?.message}
        required
      />
      <FormSelect
        tag='exercise'
        selectName='Ejercicio'
        placeholder='Selecciona un ejercicio'
        options={
          data?.exercises.map(exercise => ({
            value: exercise._id,
            name: exercise.name,
            type: exercise.type
          })) || []
        }
        isRequired
        error={errors.exercise?.message}
        onChange={(value: string) => {
          clearErrors('exercise')
          setIsRequiredSelected(true)
          setValue('exercise', value)
          showFields(value.split('-')[1])
        }}
        hasType
      />
      {fields.time && (
        <FormInput
          {...register('time', {
            valueAsNumber: true
          })}
          label='Tiempo (min)'
          error={errors.time?.message}
          type='number'
          quickButtons={['5', '10', '15']}
          handleButtons={e => handleButtons(e, 'time')}
        />
      )}
      {fields.repetitions && (
        <FormInput
          {...register('repetitions', {
            valueAsNumber: true
          })}
          label='Repeticiones'
          error={errors.repetitions?.message}
          type='number'
          quickButtons={['20', '30', '40']}
          handleButtons={e => handleButtons(e, 'repetitions')}
        />
      )}
      {fields.weight && (
        <FormInput
          {...register('weight', {
            valueAsNumber: true
          })}
          label='Peso (kg)'
          error={errors.weight?.message}
          type='number'
          quickButtons={['10', '15', '20']}
          handleButtons={e => handleButtons(e, 'weight')}
        />
      )}
      {fields.ppm_min && (
        <FormInput
          {...register('ppm_min', {
            valueAsNumber: true
          })}
          label='Mínimo de PPM'
          error={errors.ppm_min?.message}
          type='number'
        />
      )}
      {fields.ppm_max && (
        <FormInput
          {...register('ppm_max', {
            valueAsNumber: true
          })}
          label='Máximo de PPM'
          error={errors.ppm_max?.message}
          type='number'
        />
      )}
      <div className='col-span-2 flex justify-end'>
        <Dialog.Close asChild>
          <Button
            text='Insertar'
            type='submit'
            isFit
            small
            disabled={!isRequiredSelected || !isValid}
          />
        </Dialog.Close>
      </div>
    </form>
  )
}
export default CompleteExerciseForm
