import {
  FieldErrors,
  SubmitHandler,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue
} from 'react-hook-form'

import { Button } from '../../../components/atoms'
import {
  FormInput,
  FormInputFile,
  FormSelect
} from '../../../components/organisms/forms'

export type IngredientFormInput = {
  name: string
  image: string
  qty?: number
  unit: 'g' | 'Kg' | 'l' | 'ml' | ''
}

const unitOptions: { value: 'g' | 'Kg' | 'l' | 'ml'; name: string }[] = [
  { value: 'g', name: 'g' },
  { value: 'Kg', name: 'Kg' },
  { value: 'l', name: 'l' },
  { value: 'ml', name: 'ml' }
]

const IngredientForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  setError,
  clearErrors,
  setIsOpen,
  isEdit = false,
  currentImage,
  currentUnit
}: {
  handleSubmit: UseFormHandleSubmit<IngredientFormInput, IngredientFormInput>
  onSubmit: SubmitHandler<IngredientFormInput>
  register: UseFormRegister<IngredientFormInput>
  errors: FieldErrors<IngredientFormInput>
  setValue: UseFormSetValue<IngredientFormInput>
  setError: UseFormSetError<IngredientFormInput>
  clearErrors: UseFormClearErrors<IngredientFormInput>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isEdit?: boolean
  currentImage?: string
  currentUnit?: IngredientFormInput['unit']
}) => {
  const previewUrl = currentImage
    ? `${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/nutrition/ingredients/${currentImage}`
    : undefined
  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8 lg:grid lg:grid-cols-2'
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
        error={errors.name?.message}
        required
      />
      <div className='lg:grid lg:grid-cols-2 lg:gap-4'>
        <FormInput
          {...register('qty', { valueAsNumber: true })}
          type='number'
          label='Cantidad'
          error={errors.qty?.message}
        />
        <FormSelect
          tag='unit'
          selectName='Unidad'
          options={unitOptions}
          defaultValue={currentUnit || undefined}
          error={errors.unit?.message}
          onChange={(value: string) => {
            setValue('unit', value as IngredientFormInput['unit'])
            clearErrors('unit')
          }}
        />
      </div>
      <div className='lg:col-span-2'>
        <FormInputFile
          label='Imagen'
          type='file'
          error={errors.image?.message}
          required={!isEdit}
          img={previewUrl}
          onUpload={(value: string) => {
            const filename = value.split('/').pop() || value
            setValue('image', filename)
            clearErrors('image')
          }}
          acceptedTypes='image/avif'
          maxSize={0.2}
          setError={(error: string) =>
            error !== ''
              ? setError('image', { message: error })
              : clearErrors('image')
          }
          path='nutrition/ingredients'
        />
        <p className='text-secondaryLight mt-1 text-xs'>
          Formato avif, resolución 300x248.
        </p>
      </div>
      <div className='col-span-2 mt-4 flex justify-end gap-4'>
        <Button
          text='Cancelar'
          isFit
          small
          secondary
          onMouseClick={() => setIsOpen(false)}
          type='button'
        />
        <Button
          text={isEdit ? 'Actualizar' : 'Insertar'}
          type='submit'
          isFit
          small
        />
      </div>
    </form>
  )
}

export default IngredientForm
