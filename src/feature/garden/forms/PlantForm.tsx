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
import { iPlant, iSpecie } from '../types/garden'

type PlantFormInput = {
  name: string
  specie: string
  planted: string
}

const PlantForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  clearErrors,
  data,
  plantData,
  setIsOpen
}: {
  handleSubmit: UseFormHandleSubmit<PlantFormInput>
  onSubmit: SubmitHandler<PlantFormInput>
  register: UseFormRegister<PlantFormInput>
  errors: FieldErrors<PlantFormInput>
  setValue: UseFormSetValue<PlantFormInput>
  clearErrors: UseFormClearErrors<PlantFormInput>
  data: { species: iSpecie[] } | undefined
  plantData?: iPlant
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
      <FormSelect
        tag='specie'
        selectName='Especie'
        placeholder='Selecciona una especie'
        isRequired
        error={errors.specie?.message}
        options={
          data?.species.map(specie => ({
            value: specie._id,
            name: specie.name
          })) || []
        }
        onChange={(value: string) => {
          setValue('specie', value)
          clearErrors('specie')
        }}
        defaultValue={plantData?.specie._id}
      />
      <FormInput
        {...register('planted', {
          required: {
            value: true,
            message: 'Fecha requerida'
          }
        })}
        label='Fecha de plantado'
        type='date'
        defaultValue={new Date().toISOString().slice(0, 10)}
        error={errors.planted?.message}
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
        {plantData ? (
          <Button text='Actualizar' type='submit' isFit small />
        ) : (
          <Button text='Insertar' type='submit' isFit small />
        )}
      </div>
    </form>
  )
}

export default PlantForm
