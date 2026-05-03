import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { FormInput, FormSelect } from '../../../components/organisms/forms';
import { iExpenseFormInput, SubscriptionFrequency } from '../types/types';

const frequencyOptions: { value: SubscriptionFrequency; name: string }[] = [
  { value: 'MONTHLY', name: 'Mensual' },
  { value: 'BIMONTHLY', name: 'Bimensual' },
  { value: 'ANNUALLY', name: 'Anual' }
]

type ExpenseFormSubscriptionSectionProps = {
  register: UseFormRegister<iExpenseFormInput>
  errors: FieldErrors<iExpenseFormInput>
  setValue: UseFormSetValue<iExpenseFormInput>
  clearErrors: UseFormClearErrors<iExpenseFormInput>
  isLoan: boolean
  defaultValues: iExpenseFormInput
}

const ExpenseFormSubscriptionSection = ({
  register,
  errors,
  setValue,
  clearErrors,
  isLoan,
  defaultValues
}: ExpenseFormSubscriptionSectionProps) => {
  return (
    <>
      <FormSelect
        tag='frequency'
        selectName='Frecuencia'
        placeholder='Selecciona una frecuencia'
        isRequired
        error={errors.frequency?.message}
        options={frequencyOptions}
        defaultValue={defaultValues.frequency}
        onChange={(value: string) => {
          setValue('frequency', value as SubscriptionFrequency)
          clearErrors('frequency')
        }}
      />

      <FormInput
        {...register('dayOfMonth', { valueAsNumber: true })}
        type='number'
        label='Dia del mes'
        error={errors.dayOfMonth?.message}
      />

      <FormInput
        {...register('startDate')}
        type='date'
        label='Inicio'
        error={errors.startDate?.message}
      />

      {isLoan && (
        <FormInput
          {...register('endDate')}
          type='date'
          label='Fin del prestamo'
          error={errors.endDate?.message}
        />
      )}

      <label className='text-text flex items-center gap-2 text-sm'>
        <input
          type='checkbox'
          {...register('isActive')}
          className='h-4 w-4'
          defaultChecked={defaultValues.isActive}
        />
        Suscripcion activa
      </label>
    </>
  )
}

export default ExpenseFormSubscriptionSection
