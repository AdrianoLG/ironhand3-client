import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation } from '@apollo/client'

import { Button } from '../../../components/atoms'
import { FormInput, FormInputFile } from '../../../components/organisms/forms'
import { CREATE_COUNTRY } from '../gql/catalogMutations'
import { CATALOG_FORM_DATA } from '../gql/catalogQueries'

type CountryQuickAddFormInput = {
  name: string
  flag?: string
}

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const CountryQuickAddForm = ({
  setIsOpen
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [flagUploadError, setFlagUploadError] = useState<string>('')

  const [createCountry] = useMutation(CREATE_COUNTRY, {
    refetchQueries: [{ query: CATALOG_FORM_DATA }]
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CountryQuickAddFormInput>({
    defaultValues: {
      name: '',
      flag: ''
    }
  })

  const onSubmit: SubmitHandler<CountryQuickAddFormInput> = async formData => {
    await createCountry({
      variables: {
        createCountryInput: {
          name: formData.name,
          slug: slugify(formData.name),
          ...(formData.flag && { flag: formData.flag })
        }
      }
    })
    setIsOpen(false)
  }

  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        {...register('name', {
          required: { value: true, message: 'Nombre requerido' }
        })}
        label='Nombre'
        error={errors.name?.message}
        required
      />
      <FormInputFile
        label='Bandera'
        sublabel='Resolución 50x36, formato .png.'
        type='file'
        error={flagUploadError}
        onUpload={(value: string) => {
          const filename = value.split('/').pop() || value
          setValue('flag', filename)
          setFlagUploadError('')
        }}
        acceptedTypes='image/png'
        setError={(error: string) => setFlagUploadError(error)}
        path='catalog/flags'
      />
      <div className='flex justify-end gap-2'>
        <Button
          text='Cancelar'
          outline
          xsmall
          isFit
          onMouseClick={() => setIsOpen(false)}
          type='button'
        />
        <Button
          text='Añadir país'
          xsmall
          isFit
          type='submit'
          disabled={isSubmitting}
        />
      </div>
    </form>
  )
}

export default CountryQuickAddForm
