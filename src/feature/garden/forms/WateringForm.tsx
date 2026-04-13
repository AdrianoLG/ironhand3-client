import {
  FieldErrors,
  SubmitHandler,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form'

import { Button } from '../../../components/atoms'
import { FormInput, FormSelect } from '../../../components/organisms/forms'
import { iWatering } from '../types/garden'

type WateringFertilizerForm = {
  qty: number
  fertilizer: string
}

type WateringFormInput = {
  crop: string
  date: string
  water: number
  fertilizers: WateringFertilizerForm[]
}

const WateringForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  clearErrors,
  fields,
  append,
  remove,
  cropOptions,
  fertilizerOptions,
  completedWateringData,
  setIsOpen
}: {
  handleSubmit: UseFormHandleSubmit<WateringFormInput>
  onSubmit: SubmitHandler<WateringFormInput>
  register: UseFormRegister<WateringFormInput>
  errors: FieldErrors<WateringFormInput>
  setValue: UseFormSetValue<WateringFormInput>
  clearErrors: UseFormClearErrors<WateringFormInput>
  fields: { id: string }[]
  append: UseFieldArrayAppend<WateringFormInput, 'fertilizers'>
  remove: UseFieldArrayRemove
  cropOptions: { value: string; name: string }[]
  fertilizerOptions: { value: string; name: string }[]
  completedWateringData?: iWatering
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8 lg:grid lg:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      {!completedWateringData && (
        <FormSelect
          tag='crop'
          selectName='Cultivo'
          placeholder='Selecciona un cultivo'
          isRequired
          error={errors.crop?.message}
          options={cropOptions}
          onChange={(value: string) => {
            setValue('crop', value)
            clearErrors('crop')
          }}
        />
      )}
      <FormInput
        {...register('date', {
          required: {
            value: true,
            message: 'Fecha requerida'
          }
        })}
        label='Fecha'
        type='date'
        defaultValue={new Date().toISOString().slice(0, 10)}
        error={errors.date?.message}
        required
      />
      <FormInput
        {...register('water', {
          required: {
            value: true,
            message: 'Litros requeridos'
          },
          valueAsNumber: true
        })}
        label='Litros de agua'
        type='number'
        error={errors.water?.message}
        required
      />

      <div className='col-span-2'>
        <label className='border-secondaryLighter text-secondaryLighter text-2xs mb-2 block w-full border-b-1 uppercase'>
          Fertilizantes
        </label>
        {fields.map((field, i) => (
          <div className='mb-4 flex items-end gap-4' key={field.id}>
            <div className='w-1/6'>
              <FormInput
                {...register(`fertilizers.${i}.qty`, {
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: 'Mínimo 1'
                  }
                })}
                label='Cantidad'
                type='number'
                defaultValue={`${(field as unknown as { qty?: number }).qty ?? 1}`}
                error={errors.fertilizers?.[i]?.qty?.message}
              />
            </div>
            <div className='w-4/6'>
              <FormSelect
                tag={`fertilizer-${i}`}
                selectName='Fertilizante'
                placeholder='Selecciona un fertilizante'
                options={fertilizerOptions}
                onChange={(value: string) => {
                  setValue(`fertilizers.${i}.fertilizer`, value)
                }}
                defaultValue={
                  (field as unknown as { fertilizer?: string }).fertilizer
                }
              />
            </div>
            <div className='flex w-1/6'>
              <Button
                text='❌'
                xsmall
                outline
                classes='bg-secondaryLightest'
                type='button'
                onMouseClick={() => {
                  if (fields.length > 1) remove(i)
                }}
              />
            </div>
          </div>
        ))}
        <div className='flex w-full justify-end gap-2 pt-2 pb-4'>
          <Button
            text='Añadir fertilizante'
            xsmall
            classes='bg-warn max-w-2/5'
            type='button'
            onMouseClick={() => append({ qty: 1, fertilizer: '' })}
          />
        </div>
      </div>

      <div className='col-span-2 flex justify-end gap-4'>
        <Button
          text='Cancelar'
          isFit
          small
          secondary
          onMouseClick={() => setIsOpen(false)}
          type='button'
        />
        {completedWateringData ? (
          <Button text='Actualizar' type='submit' isFit small />
        ) : (
          <Button text='Insertar' type='submit' isFit small />
        )}
      </div>
    </form>
  )
}

export default WateringForm
