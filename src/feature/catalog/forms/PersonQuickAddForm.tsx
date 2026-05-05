import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import { Button } from '../../../components/atoms'
import {
  FormInput,
  FormInputFile,
  FormSelect
} from '../../../components/organisms/forms'
import { CREATE_PERSON } from '../gql/catalogMutations'
import { CATALOG_FORM_DATA } from '../gql/catalogQueries'

type PersonRole = 'WRITER' | 'DIRECTOR' | 'ACTOR'

type PersonQuickAddFormInput = {
  name: string
  lastName?: string
  birthCountry?: string
  img?: string
}

interface iFormData {
  countries: { _id: string; name: string }[]
}

const roleLabel: Record<PersonRole, string> = {
  WRITER: 'escritor',
  DIRECTOR: 'director',
  ACTOR: 'actor'
}

const PersonQuickAddForm = ({
  role,
  setIsOpen
}: {
  role: PersonRole
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data } = useQuery<iFormData>(CATALOG_FORM_DATA)
  const [imgUploadError, setImgUploadError] = useState<string>('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: CATALOG_FORM_DATA }]
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<PersonQuickAddFormInput>({
    defaultValues: {
      name: '',
      lastName: '',
      birthCountry: '',
      img: ''
    }
  })

  const countryOptions = (data?.countries ?? []).map(country => ({
    value: country._id,
    name: country.name
  }))
  const imageUploadPath =
    role === 'DIRECTOR' ? 'catalog/directors' : 'catalog/actors'

  const onSubmit: SubmitHandler<PersonQuickAddFormInput> = async formData => {
    await createPerson({
      variables: {
        createPersonInput: {
          name: formData.name,
          ...(formData.lastName && { lastName: formData.lastName }),
          ...(formData.birthCountry && { birthCountry: formData.birthCountry }),
          ...(formData.img && { img: formData.img }),
          role
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
      <FormInput
        {...register('lastName')}
        label='Apellidos'
        error={errors.lastName?.message}
      />
      <FormSelect
        tag='birthCountry'
        selectName='País'
        placeholder='Selecciona un país'
        options={countryOptions}
        onChange={(value: string) => setValue('birthCountry', value)}
      />
      <FormInputFile
        label='Imagen'
        sublabel='Resolución 300x450, formato .avif.'
        type='file'
        error={imgUploadError}
        onUpload={(value: string) => {
          const filename = value.split('/').pop() || value
          setValue('img', filename)
          setImgUploadError('')
        }}
        acceptedTypes='image/avif'
        setError={(error: string) => setImgUploadError(error)}
        path={imageUploadPath}
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
          text={`Añadir ${roleLabel[role]}`}
          xsmall
          isFit
          type='submit'
          disabled={isSubmitting}
        />
      </div>
    </form>
  )
}

export default PersonQuickAddForm
