import { Button } from '../../../components/atoms';
import { FormInput, FormMultiSelectIcon } from '../../../components/organisms/forms';
import { ExpenseFormProps } from '../types/expenseForm';
import { iExpenseFormInput } from '../types/types';
import ExpenseFormSubscriptionSection from './ExpenseFormSubscriptionSection';

const ExpenseForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  clearErrors,
  setIsOpen,
  isEdit = false,
  categoryOptions,
  isSubscriptionEnabled,
  isLoan,
  defaultValues
}: ExpenseFormProps) => {
  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8 lg:grid lg:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        {...register('title', {
          required: {
            value: true,
            message: 'Concepto requerido'
          }
        })}
        type='text'
        label='Concepto'
        error={errors.title?.message}
        required
      />

      <FormInput
        {...register('expectedAmount', {
          valueAsNumber: true,
          required: {
            value: true,
            message: 'Importe estimado requerido'
          }
        })}
        type='number'
        step='any'
        label='Importe estimado'
        error={errors.expectedAmount?.message}
        required
      />

      <FormMultiSelectIcon
        label='Tipo'
        isRequired
        options={categoryOptions}
        data={defaultValues.category}
        error={errors.category?.message}
        onChange={value => {
          setValue('category', value as iExpenseFormInput['category'])
          clearErrors('category')
        }}
      />

      <FormInput
        {...register('realAmount', {
          valueAsNumber: true
        })}
        type='number'
        step='any'
        label='Importe real'
        error={errors.realAmount?.message}
      />

      <div className='col-span-2 grid gap-2 lg:grid-cols-3'>
        <label className='text-text flex items-center gap-2 text-sm'>
          <input
            type='checkbox'
            {...register('isPaid')}
            className='h-4 w-4'
            defaultChecked={defaultValues.isPaid}
          />
          Pagado
        </label>

        <label className='text-text flex items-center gap-2 text-sm'>
          <input
            type='checkbox'
            {...register('isRecurring')}
            className='h-4 w-4'
            defaultChecked={defaultValues.isRecurring}
            onChange={event => {
              setValue('isRecurring', event.target.checked)
            }}
          />
          Gasto recurrente
        </label>

        <label className='text-text flex items-center gap-2 text-sm'>
          <input
            type='checkbox'
            {...register('isLoan')}
            className='h-4 w-4'
            defaultChecked={defaultValues.isLoan}
            onChange={event => {
              setValue('isLoan', event.target.checked)
            }}
          />
          Prestamo
        </label>
      </div>

      {isSubscriptionEnabled && (
        <ExpenseFormSubscriptionSection
          register={register}
          errors={errors}
          setValue={setValue}
          clearErrors={clearErrors}
          isLoan={isLoan}
          defaultValues={defaultValues}
        />
      )}

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

export default ExpenseForm
