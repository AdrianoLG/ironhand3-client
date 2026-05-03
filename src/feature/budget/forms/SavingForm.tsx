import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import { Button } from '../../../components/atoms';
import { FormInput } from '../../../components/organisms/forms';

type SavingGoalInput = {
  _id?: string
  title: string
  targetAmount: number
}

export type SavingFormInput = {
  name: string
  balance: number
  goals: SavingGoalInput[]
}

type SavingFormProps = {
  handleSubmit: UseFormHandleSubmit<SavingFormInput>
  onSubmit: SubmitHandler<SavingFormInput>
  register: UseFormRegister<SavingFormInput>
  errors: FieldErrors<SavingFormInput>
  goalFields: Array<{ id: string; _id?: string }>
  onAddGoal: () => void
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isEdit?: boolean
}

const SavingForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  goalFields,
  onAddGoal,
  setIsOpen,
  isEdit = false
}: SavingFormProps) => {
  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        {...register('name', {
          required: {
            value: true,
            message: 'Titulo de cuenta requerido'
          }
        })}
        type='text'
        label='Titulo de cuenta'
        error={errors.name?.message}
        required
      />

      <FormInput
        {...register('balance', {
          valueAsNumber: true,
          required: {
            value: true,
            message: 'Cantidad ahorrada requerida'
          }
        })}
        type='number'
        step='any'
        label='Ahorrado'
        error={errors.balance?.message}
        required
      />

      <div className='flex items-center justify-between'>
        <p className='text-text text-sm font-semibold'>Metas</p>
        <Button
          text='Añadir meta'
          type='button'
          small
          isFit
          outline
          onMouseClick={onAddGoal}
        />
      </div>

      <div className='flex flex-col gap-3'>
        {goalFields.map((field, index) => (
          <div
            key={field.id}
            className='border-secondaryLighter rounded-md border-1 p-3'
          >
            <input
              type='hidden'
              {...register(`goals.${index}._id`)}
              defaultValue={field._id}
            />

            <div className='grid gap-2 lg:grid-cols-2'>
              <FormInput
                {...register(`goals.${index}.title`, {
                  required: {
                    value: true,
                    message: 'Nombre de meta requerido'
                  }
                })}
                type='text'
                label={`Meta ${index + 1}`}
                error={errors.goals?.[index]?.title?.message}
                required
              />

              <FormInput
                {...register(`goals.${index}.targetAmount`, {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: 'Objetivo requerido'
                  }
                })}
                type='number'
                step='any'
                label='Objetivo'
                error={errors.goals?.[index]?.targetAmount?.message}
                required
              />
            </div>
          </div>
        ))}
      </div>

      <div className='mt-4 flex justify-end gap-4'>
        <Button
          text='Cancelar'
          isFit
          small
          secondary
          onMouseClick={() => setIsOpen(false)}
          type='button'
        />
        <Button
          text={isEdit ? 'Actualizar ahorros' : 'Crear cuenta'}
          type='submit'
          isFit
          small
        />
      </div>
    </form>
  )
}

export default SavingForm
