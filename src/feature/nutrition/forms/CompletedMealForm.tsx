import {
  FieldErrors,
  SubmitHandler,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form'

import { Button } from '../../../components/atoms'
import { FormInput, FormSelect } from '../../../components/organisms/forms'
import { iFood } from '../types/nutrition'

export type CompletedMealTimeOfDayOption =
  | 'BREAKFAST'
  | 'LUNCH'
  | 'SNACK'
  | 'DINNER'

export type CompletedMealUnitOption = 'g' | 'Kg' | 'l' | 'ml'

export type CompletedMealFormInput = {
  food: string
  timeOfDay: CompletedMealTimeOfDayOption | ''
  qty?: number
  unit: CompletedMealUnitOption | ''
  created: string
}

const timeOfDayOptions: {
  value: CompletedMealTimeOfDayOption
  name: string
}[] = [
  { value: 'BREAKFAST', name: 'Desayuno' },
  { value: 'LUNCH', name: 'Comida' },
  { value: 'SNACK', name: 'Merienda' },
  { value: 'DINNER', name: 'Cena' }
]

const unitOptions: {
  value: CompletedMealUnitOption
  name: string
}[] = [
  { value: 'g', name: 'g' },
  { value: 'Kg', name: 'Kg' },
  { value: 'l', name: 'l' },
  { value: 'ml', name: 'ml' }
]

const CompletedMealForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  clearErrors,
  foods,
  setIsOpen,
  defaultValues,
  isEdit = false
}: {
  handleSubmit: UseFormHandleSubmit<CompletedMealFormInput>
  onSubmit: SubmitHandler<CompletedMealFormInput>
  register: UseFormRegister<CompletedMealFormInput>
  errors: FieldErrors<CompletedMealFormInput>
  setValue: UseFormSetValue<CompletedMealFormInput>
  clearErrors: UseFormClearErrors<CompletedMealFormInput>
  foods: iFood[]
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  defaultValues?: Partial<CompletedMealFormInput>
  isEdit?: boolean
}) => {
  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8 lg:grid lg:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormSelect
        tag='food'
        selectName='Comida'
        placeholder='Selecciona una comida'
        isRequired
        error={errors.food?.message}
        options={foods.map(food => ({ value: food._id, name: food.name }))}
        defaultValue={defaultValues?.food}
        onChange={(value: string) => {
          setValue('food', value)
          clearErrors('food')
        }}
      />
      <FormSelect
        tag='timeOfDay'
        selectName='Momento del día'
        placeholder='Selecciona un momento'
        isRequired
        error={errors.timeOfDay?.message}
        options={timeOfDayOptions}
        defaultValue={defaultValues?.timeOfDay}
        onChange={(value: string) => {
          setValue('timeOfDay', value as CompletedMealTimeOfDayOption)
          clearErrors('timeOfDay')
        }}
      />
      <FormInput
        {...register('qty', { valueAsNumber: true })}
        type='number'
        step='any'
        label='Cantidad'
        error={errors.qty?.message}
      />
      <FormSelect
        tag='unit'
        selectName='Unidad'
        placeholder='Selecciona una unidad'
        options={unitOptions}
        error={errors.unit?.message}
        defaultValue={defaultValues?.unit}
        onChange={(value: string) => {
          setValue('unit', value as CompletedMealUnitOption)
          clearErrors('unit')
        }}
      />
      <FormInput
        {...register('created', {
          required: {
            value: true,
            message: 'Fecha requerida'
          }
        })}
        type='date'
        label='Fecha'
        error={errors.created?.message}
        required
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

export default CompletedMealForm
