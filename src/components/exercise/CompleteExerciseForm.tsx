import { Dialog } from 'radix-ui'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useQuery } from '@apollo/client'

import { SELECT_EXERCISES } from '../../gql/Queries'
import FormInput from '../../utils/FormInput'
import FormSelect from '../../utils/FormSelect'
import { iExercises } from '../../utils/types'
import Button from '../Button'

interface iFormInput {
  exercise: string
  date: string
  time: number
  repetitions: number
  weight: number
  ppm_max: number
  ppm_min: number
}

const CompleteExerciseForm = () => {
  const { data, loading, error } = useQuery<iExercises>(SELECT_EXERCISES)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<iFormInput>()

  const onSubmit: SubmitHandler<iFormInput> = data => {
    console.log(data)
  }

  const handleButtons = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: keyof iFormInput
  ) => {
    e.preventDefault()

    if (setValue) {
      setValue(tag, parseInt(e.currentTarget.textContent || '0'))
    }
  }

  if (loading) return 'Loading...'
  if (error) return <pre>{error.message}</pre>

  const watchForm = watch()

  return (
    <form
      className='my-7 grid w-full grid-cols-1 gap-4 px-8 sm:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormSelect
        tag='exercise'
        selectName='Ejercicio'
        placeholder='Selecciona un ejercicio'
        options={
          data?.exercises.map(exercise => ({
            value: exercise._id,
            name: exercise.name
          })) || []
        }
        isRequired
        error={errors.exercise?.message}
        onChange={(value: string) => setValue('exercise', value)}
      />
      <FormInput
        {...register('date', {
          required: {
            value: true,
            message: 'Fecha requerida'
          }
        })}
        label='Fecha'
        type='date'
        value={new Date().toISOString().slice(0, 10)}
        error={errors.date?.message}
        required
      />
      <FormInput
        {...register('time', {
          required: {
            value: true,
            message: 'Tiempo requerido'
          },
          valueAsNumber: true
        })}
        label='Tiempo (min)'
        error={errors.time?.message}
        defaultValue={2}
        type='number'
        quickButtons={['5', '10', '15']}
        handleButtons={e => handleButtons(e, 'time')}
        required
      />
      <FormInput
        {...register('repetitions', {
          valueAsNumber: true
        })}
        label='Repeticiones'
        error={errors.repetitions?.message}
        defaultValue={10}
        type='number'
        quickButtons={['20', '30', '40']}
        handleButtons={e => handleButtons(e, 'repetitions')}
      />
      <FormInput
        {...register('weight', {
          valueAsNumber: true
        })}
        label='Peso (kg)'
        error={errors.weight?.message}
        defaultValue={10}
        type='number'
      />
      <FormInput
        {...register('ppm_max', {
          valueAsNumber: true
        })}
        label='Máximo de PPM'
        error={errors.ppm_max?.message}
        defaultValue={2}
        type='number'
      />
      <FormInput
        {...register('ppm_min', {
          valueAsNumber: true
        })}
        label='Mínimo de PPM'
        error={errors.ppm_min?.message}
        defaultValue={2}
        type='number'
      />
      <div className='col-span-2'>
        <code>
          <pre>{JSON.stringify(watchForm, null, 4)}</pre>
        </code>
      </div>
      <Dialog.Close asChild>
        <Button text='Insertar' type='submit' isFit small />
      </Dialog.Close>
    </form>
  )
}
export default CompleteExerciseForm
