import {
  FieldErrors,
  SubmitHandler,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue
} from 'react-hook-form'

import { Button } from '../../../components/atoms'
import {
  FormInput,
  FormInputFile,
  FormSelect
} from '../../../components/organisms/forms'
import FormTextarea from '../../../components/organisms/forms/FormTextarea'
import { iSpecie } from '../types/garden'

type SpecieCategory = 'VEGETABLES' | 'FRUITS' | 'HERBS' | 'MEDICINAL'

type SpecieFormInput = {
  name: string
  image: string
  category: SpecieCategory
  comments: string
}

const SpecieForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  setError,
  clearErrors,
  setIsOpen,
  specieData,
  species,
  removeSpecie,
  categoryOptions,
  defaultCategory
}: {
  handleSubmit: UseFormHandleSubmit<SpecieFormInput>
  onSubmit: SubmitHandler<SpecieFormInput>
  register: UseFormRegister<SpecieFormInput>
  errors: FieldErrors<SpecieFormInput>
  setValue: UseFormSetValue<SpecieFormInput>
  setError: UseFormSetError<SpecieFormInput>
  clearErrors: UseFormClearErrors<SpecieFormInput>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  specieData?: iSpecie
  species: iSpecie[]
  removeSpecie: (specieId: string) => void
  categoryOptions: { value: SpecieCategory; name: string }[]
  defaultCategory: SpecieCategory | undefined
}) => {
  return (
    <>
      {species.length > 0 && (
        <div className='mt-7 mb-2 flex w-full flex-col gap-2 px-8'>
          <label className='border-secondaryLighter text-secondaryLighter text-2xs mb-2 block w-full border-b-1 uppercase'>
            Especies existentes
          </label>
          <div className='flex flex-wrap gap-2'>
            {species.map(specie => (
              <div
                key={specie._id}
                className='border-secondaryLighter bg-secondaryLightest flex items-center gap-2 rounded-md border-1 px-2 py-1'
              >
                <span className='text-sm'>{specie.name}</span>
                <button
                  className='text-sm leading-none hover:cursor-pointer'
                  type='button'
                  onClick={() => removeSpecie(specie._id)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
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
          tag='category'
          selectName='Categoría'
          placeholder='Selecciona una categoría'
          isRequired
          error={errors.category?.message}
          options={categoryOptions}
          onChange={(value: string) => {
            setValue('category', value as SpecieCategory)
            clearErrors('category')
          }}
          defaultValue={defaultCategory}
        />
        <div className='lg:col-span-2'>
          <FormInputFile
            label='Imagen'
            type='file'
            error={errors.image?.message}
            required
            onUpload={(value: string) => {
              const filename = value.split('/').pop() || value
              setValue('image', filename)
              clearErrors('image')
            }}
            acceptedTypes='image/avif'
            maxSize={0.2}
            setError={(error: string) =>
              error !== ''
                ? setError('image', { message: error })
                : clearErrors('image')
            }
            img={
              specieData?.image
                ? `${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/garden/specie/${specieData.image}`
                : undefined
            }
            path='garden/specie'
          />
        </div>
        <FormTextarea
          {...register('comments', {
            required: {
              value: true,
              message: 'Comentarios requeridos'
            }
          })}
          label='Comentarios'
          error={errors.comments?.message}
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
          {specieData ? (
            <Button text='Actualizar' type='submit' isFit small />
          ) : (
            <Button text='Insertar' type='submit' isFit small />
          )}
        </div>
      </form>
    </>
  )
}

export default SpecieForm
