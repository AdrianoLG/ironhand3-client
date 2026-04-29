import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister
} from 'react-hook-form'

import { Button } from '../../../components/atoms'
import { FormInput } from '../../../components/organisms/forms'

export type FoodFormInput = {
  name: string
  kcal?: number
  carbs?: number
  proteins?: number
  fats?: number
}

const FoodForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setIsOpen
}: {
  handleSubmit: UseFormHandleSubmit<FoodFormInput>
  onSubmit: SubmitHandler<FoodFormInput>
  register: UseFormRegister<FoodFormInput>
  errors: FieldErrors<FoodFormInput>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
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
      <FormInput
        {...register('kcal', { valueAsNumber: true })}
        type='number'
        label='Kcal'
        error={errors.kcal?.message}
      />
      <FormInput
        {...register('carbs', { valueAsNumber: true })}
        type='number'
        step='any'
        label='Carbohidratos'
        error={errors.carbs?.message}
      />
      <FormInput
        {...register('proteins', { valueAsNumber: true })}
        type='number'
        step='any'
        label='Proteínas'
        error={errors.proteins?.message}
      />
      <FormInput
        {...register('fats', { valueAsNumber: true })}
        type='number'
        step='any'
        label='Grasas'
        error={errors.fats?.message}
      />
      <div className='col-span-2 mt-4 flex justify-end gap-4'>
        <Button
          text='Cancelar'
          isFit
          small
          secondary
          onMouseClick={() => setIsOpen(false)}
          type='button'
        />
        <Button text='Insertar' type='submit' isFit small />
      </div>
    </form>
  )
}

export default FoodForm
