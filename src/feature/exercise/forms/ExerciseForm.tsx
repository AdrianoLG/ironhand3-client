import { Dialog } from 'radix-ui'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation } from '@apollo/client'

import { Button } from '../../../components/atoms'
import {
  FormInput,
  FormInputFile,
  FormMultiSelect,
  FormSelect
} from '../../../components/organisms/forms'
import { ADD_EXERCISE } from '../gql/exerciseMutations'
import { EXERCISES_INFO, SELECT_EXERCISES } from '../gql/exerciseQueries'
import { iExercise } from '../types/exercises'
import {
  exerciseBodyPartsOptions,
  exerciseTypeOptions
} from '../utils/formOptions'

const ExerciseForm = ({
  setIsOpen,
  exercise
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  exercise?: iExercise | null
}) => {
  const [addExercise] = useMutation(ADD_EXERCISE, {
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

  const onSubmit: SubmitHandler<iExercise> = data => {
    if (errors.name || errors.type || errors.bodyParts || errors.img) return
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
    addExercise({ variables: { createExerciseInput: data } })

    setIsOpen(false)
    reset()
  }

  if (exercise) {
    setValue('name', exercise.name)
    setValue('type', exercise.type)
    setValue('bodyParts', exercise.bodyParts)
    setValue('img', exercise.img)
  }

  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <FormInput
          {...register('name', {
            required: {
              value: true,
              message: 'Escribe un nombre'
            }
          })}
          label='Nombre'
          type='text'
          error={errors.name?.message}
          required
        />
        <FormSelect
          tag='type'
          selectName='Tipo'
          placeholder='Selecciona el tipo'
          options={exerciseTypeOptions}
          isRequired
          error={errors.type?.message}
          onChange={(value: string) => {
            setValue('type', value)
            clearErrors('type')
          }}
          defaultValue={exercise?.type}
        />
      </div>
      <FormMultiSelect
        label='Partes del cuerpo'
        isRequired
        options={exerciseBodyPartsOptions}
        error={errors.bodyParts?.message}
        onChange={(value: string[]) => {
          setValue('bodyParts', value)
          clearErrors('bodyParts')
        }}
        data={exercise?.bodyParts}
      />
      <FormInputFile
        label='Imagen'
        type='file'
        error={errors.img?.message}
        required
        onUpload={(value: string) => setValue('img', value)}
        acceptedTypes='image/avif'
        maxSize={0.2}
        setError={(error: string) =>
          error !== ''
            ? setError('img', { message: error })
            : clearErrors('img')
        }
        img={exercise?.img}
      />
      <div className='col-span-2 flex justify-end gap-4'>
        <Dialog.Close asChild>
          <Button text='Cancelar' isFit small secondary />
        </Dialog.Close>
        <Dialog.Close asChild>
          <Button
            text={`${exercise ? 'Actualizar' : 'Insertar'}`}
            type='submit'
            isFit
            small
            disabled={!isValid}
          />
        </Dialog.Close>
      </div>
    </form>
  )
}

export default ExerciseForm
