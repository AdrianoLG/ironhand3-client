import { Button } from '../../../components/atoms'
import {
  FormInput,
  FormInputFile,
  FormMultiSelect,
  FormSelect
} from '../../../components/organisms/forms'
import { iExerciseForm } from '../types/exercises'

const ExerciseForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  clearErrors,
  exerciseToUpdate,
  exerciseTypeOptions,
  exerciseBodyPartsOptions,
  setExerciseToUpdate,
  setError,
  isValid,
  setIsOpen
}: iExerciseForm) => (
  <form
    className='my-7 flex w-full flex-col gap-4 px-8'
    onSubmit={handleSubmit(onSubmit)}
  >
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
      <FormInput
        {...register('name', {
          required: {
            value: true,
            message: 'Escribe un nombre'
          }
        })}
        label='Nombre'
        type='text'
        error={errors.name?.message}
        required
      />
      <FormSelect
        tag='type'
        selectName='Tipo'
        placeholder='Selecciona el tipo'
        options={exerciseTypeOptions}
        isRequired
        error={errors.type?.message}
        onChange={(value: string) => {
          setValue('type', value)
          clearErrors('type')
        }}
        defaultValue={exerciseToUpdate?.type}
      />
    </div>
    <FormMultiSelect
      label='Partes del cuerpo'
      isRequired
      options={exerciseBodyPartsOptions}
      error={errors.bodyParts?.message}
      onChange={(value: string[]) => {
        setValue('bodyParts', value)
        if (exerciseToUpdate && setExerciseToUpdate) {
          setExerciseToUpdate({
            ...exerciseToUpdate,
            bodyParts: value
          })
        }
        clearErrors('bodyParts')
      }}
      data={exerciseToUpdate?.bodyParts}
    />
    <FormInputFile
      label='Imagen'
      type='file'
      error={errors.img?.message}
      required
      onUpload={(value: string) => setValue('img', value)}
      acceptedTypes='image/avif'
      maxSize={0.2}
      setError={(error: string) =>
        error !== '' ? setError('img', { message: error }) : clearErrors('img')
      }
      img={exerciseToUpdate?.img}
    />
    <div className='col-span-2 flex justify-end gap-4'>
      <Button
        text='Cancelar'
        isFit
        small
        secondary
        onMouseClick={() => setIsOpen(false)}
      />
      <Button
        text={`${exerciseToUpdate ? 'Actualizar' : 'Insertar'}`}
        type='submit'
        isFit
        small
        disabled={!isValid}
      />
    </div>
  </form>
)

export default ExerciseForm
