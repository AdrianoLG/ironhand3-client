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
import { ADD_EXERCISE } from '../../../gql/exerciseMutations'
import { EXERCISES_INFO, SELECT_EXERCISES } from '../../../gql/exerciseQueries'
import {
  exerciseBodyPartsOptions,
  exerciseTypeOptions
} from '../utils/formOptions'

interface iFormInput {
  name: string
  type: string
  bodyParts: string[]
  img: string
}

const ExerciseForm = ({
  setIsOpen
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [addExercise, { data, loading, error }] = useMutation(ADD_EXERCISE, {
    refetchQueries: [{ query: EXERCISES_INFO }, { query: SELECT_EXERCISES }]
  })
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    reset
  } = useForm<iFormInput>()

  const onSubmit: SubmitHandler<iFormInput> = data => {
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

  const watchForm = watch()

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
      />
      <div className='col-span-2 flex justify-end'>
        <Dialog.Close asChild>
          <Button text='Insertar' type='submit' isFit small />
        </Dialog.Close>
      </div>
      <div className='col-span-2'>
        <small>
          {data ? 'Data' : 'No data'} | {loading ? 'Loading' : 'No loading'} |{' '}
          {error?.message ? error.message : 'No error message'}
        </small>
        <div className='col-span-2'>
          <code>
            <pre>{JSON.stringify(watchForm, null, 4)}</pre>
          </code>
        </div>
      </div>
    </form>
  )
}

export default ExerciseForm
