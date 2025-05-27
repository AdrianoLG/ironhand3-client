import { Button } from '../../../components/atoms'
import { FormInput, FormSelect } from '../../../components/organisms/forms'
import { iCompleteExerciseForm } from '../types/exercises'

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
  isRequiredSelected,
  setIsOpen
}: iCompleteExerciseForm) => {
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
      <div className='col-span-2 flex justify-end gap-4'>
        <Button
          text='Cancelar'
          isFit
          small
          secondary
          onMouseClick={() => setIsOpen(false)}
        />
        {completedExerciseData && (
          <Button
            text='Actualizar'
            type='submit'
            isFit
            small
            disabled={!isValid}
          />
        )}
        {!completedExerciseData && (
          <Button
            text='Insertar'
            type='submit'
            isFit
            small
            disabled={!isRequiredSelected || !isValid}
          />
        )}
      </div>
    </form>
  )
}
export default CompleteExerciseForm
