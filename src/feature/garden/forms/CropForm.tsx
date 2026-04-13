import {
  FieldErrors,
  SubmitHandler,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form'

import { Button } from '../../../components/atoms'
import {
  FormInput,
  FormMultiSelect,
  FormSelect
} from '../../../components/organisms/forms'
import FormTextarea from '../../../components/organisms/forms/FormTextarea'
import { iCrop, iCropContainer, iPlant } from '../types/garden'

type CropFormInput = {
  startDate: string
  endDate?: string
  comments?: string
  cropContainer: string
  plants: string[]
}

const CropForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  clearErrors,
  data,
  cropData,
  availablePlants,
  setIsOpen
}: {
  handleSubmit: UseFormHandleSubmit<CropFormInput>
  onSubmit: SubmitHandler<CropFormInput>
  register: UseFormRegister<CropFormInput>
  errors: FieldErrors<CropFormInput>
  setValue: UseFormSetValue<CropFormInput>
  clearErrors: UseFormClearErrors<CropFormInput>
  data: { plants: iPlant[]; cropContainers: iCropContainer[] } | undefined
  cropData?: iCrop
  availablePlants: iPlant[]
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8 lg:grid lg:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormSelect
        tag='cropContainer'
        selectName='Contenedor'
        placeholder='Selecciona un contenedor'
        isRequired
        error={errors.cropContainer?.message}
        options={
          data?.cropContainers.map(container => ({
            value: container._id,
            name: `${container.name} (${container.capacity})`
          })) || []
        }
        onChange={(value: string) => {
          setValue('cropContainer', value)
          clearErrors('cropContainer')
        }}
        defaultValue={cropData?.cropContainer._id}
      />
      <FormInput
        {...register('startDate', {
          required: {
            value: true,
            message: 'Fecha de inicio requerida'
          }
        })}
        label='Fecha de inicio'
        type='date'
        defaultValue={new Date().toISOString().slice(0, 10)}
        error={errors.startDate?.message}
        required
      />
      <FormInput
        {...register('endDate')}
        label='Fecha de fin'
        type='date'
        error={errors.endDate?.message}
      />
      <FormMultiSelect
        label='Plantas asociadas'
        options={availablePlants.map(plant => ({
          value: plant._id,
          name: `${plant.name} (${plant.specie.name})`,
          selected: cropData?.plants.some(p => p._id === plant._id) ?? false
        }))}
        onChange={(value: string[]) => {
          setValue('plants', value)
        }}
        data={cropData?.plants.map(p => p._id)}
      />
      <FormTextarea
        {...register('comments')}
        label='Comentarios'
        error={errors.comments?.message}
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
        {cropData ? (
          <Button text='Actualizar' type='submit' isFit small />
        ) : (
          <Button text='Insertar' type='submit' isFit small />
        )}
      </div>
    </form>
  )
}

export default CropForm
