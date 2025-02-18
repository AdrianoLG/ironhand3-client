import { Dialog } from 'radix-ui'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '../../components/atoms/Button'
import FormInput from '../../utils/FormInput'
import FormSelect from '../../utils/FormSelect'

interface iFormInput {
  name: string
  type: string
  bodyParts: string
  img: string
}

const ExerciseForm = () => {
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

  const watchForm = watch()
  return (
    <form
      className='my-7 grid w-full grid-cols-1 gap-4 px-8 sm:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        {...register('name', {
          required: {
            value: true,
            message: 'Nombre requerido'
          }
        })}
        label='Nombre'
        type='text'
        error={errors.name?.message}
        required
      />
      <FormInput
        {...register('img', {
          required: {
            value: true,
            message: 'Imagen requerida'
          }
        })}
        label='Imagen'
        type='img'
        error={errors.type?.message}
        required
      />
      <FormSelect
        tag='type'
        selectName='Tipo'
        placeholder='Selecciona el tipo'
        options={[
          { value: 'strength', name: 'Fuerza' },
          { value: 'cardio', name: 'Cardio' },
          { value: 'stretch', name: 'Estiramiento' }
        ]}
        isRequired
        error={errors.type?.message}
        onChange={(value: string) => setValue('type', value)}
      />
      <FormSelect
        tag='bodyParts'
        selectName='Partes del cuerpo'
        placeholder='Selecciona parte...'
        options={[
          { value: 'face', name: 'Cara' },
          { value: 'neck', name: 'Cuello' }
        ]}
        isRequired
        error={errors.bodyParts?.message}
        onChange={(value: string) => setValue('bodyParts', value)}
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

export default ExerciseForm
