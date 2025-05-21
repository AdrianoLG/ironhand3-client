import { Dialog } from 'radix-ui'
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
import {
  iCompletedExercise,
  iExerciseFormInput,
  iExercises
} from '../types/exercises'

const CompleteExerciseForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isValid,
  data,
  clearErrors,
  setIsRequiredSelected,
  setValue,
  showFields,
  completedExerciseData,
  fields,
  handleButtons,
  isRequiredSelected
}: {
  handleSubmit: UseFormHandleSubmit<iExerciseFormInput, undefined>
  onSubmit: SubmitHandler<iExerciseFormInput>
  register: UseFormRegister<iExerciseFormInput>
  errors: FieldErrors<iExerciseFormInput>
  isValid: boolean
  data: iExercises | undefined
  clearErrors: UseFormClearErrors<iExerciseFormInput>
  setIsRequiredSelected: React.Dispatch<React.SetStateAction<boolean>>
  setValue: UseFormSetValue<iExerciseFormInput>
  showFields: (type: string) => void
  completedExerciseData: iCompletedExercise | undefined
  fields: {
    time: boolean
    repetitions: boolean
    weight: boolean
    ppm_max: boolean
    ppm_min: boolean
  }
  handleButtons: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: keyof iExerciseFormInput
  ) => void
  isRequiredSelected: boolean
}) => {
  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8 lg:grid lg:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        {...register('date', {
          required: {
            value: true,
            message: 'Fecha requerida'
          },
          valueAsDate: true
        })}
        label='Fecha'
        type='date'
        defaultValue={new Date().toISOString().slice(0, 10)}
        error={errors.date?.message}
        required
      />
      <FormSelect
        tag='exercise'
        selectName='Ejercicio'
        placeholder='Selecciona un ejercicio'
        options={
          data?.exercises.map(exercise => ({
            value: exercise._id,
            name: exercise.name,
            type: exercise.type
          })) || []
        }
        isRequired
        error={errors.exercise?.message}
        onChange={(value: string) => {
          console.log(value)
          clearErrors('exercise')
          setIsRequiredSelected(true)
          setValue('exercise', value)
          showFields(value.split('-')[1])
        }}
        showFields={showFields}
        defaultValue={
          completedExerciseData?.exercise._id +
          '-' +
          completedExerciseData?.exercise.type
        }
        hasType
        disabled={!!completedExerciseData}
      />
      {fields.time && (
        <FormInput
          {...register('time', {
            valueAsNumber: true
          })}
          label='Tiempo (min)'
          error={errors.time?.message}
          type='number'
          quickButtons={['5', '10', '15']}
          handleButtons={e => handleButtons(e, 'time')}
        />
      )}
      {fields.repetitions && (
        <FormInput
          {...register('repetitions', {
            valueAsNumber: true
          })}
          label='Repeticiones'
          error={errors.repetitions?.message}
          type='number'
          quickButtons={['20', '30', '40']}
          handleButtons={e => handleButtons(e, 'repetitions')}
        />
      )}
      {fields.weight && (
        <FormInput
          {...register('weight', {
            valueAsNumber: true
          })}
          label='Peso (kg)'
          error={errors.weight?.message}
          type='number'
          quickButtons={['10', '15', '20']}
          handleButtons={e => handleButtons(e, 'weight')}
        />
      )}
      {fields.ppm_min && (
        <FormInput
          {...register('ppm_min', {
            valueAsNumber: true
          })}
          label='Mínimo de PPM'
          error={errors.ppm_min?.message}
          type='number'
        />
      )}
      {fields.ppm_max && (
        <FormInput
          {...register('ppm_max', {
            valueAsNumber: true
          })}
          label='Máximo de PPM'
          error={errors.ppm_max?.message}
          type='number'
        />
      )}
      <div className='col-span-2 flex justify-end'>
        {completedExerciseData && (
          <Dialog.Close asChild>
            <Button
              text='Actualizar'
              type='submit'
              isFit
              small
              disabled={!isValid}
            />
          </Dialog.Close>
        )}
        {!completedExerciseData && (
          <Dialog.Close asChild>
            <Button
              text='Insertar'
              type='submit'
              isFit
              small
              disabled={!isRequiredSelected || !isValid}
            />
          </Dialog.Close>
        )}
      </div>
    </form>
  )
}
export default CompleteExerciseForm
