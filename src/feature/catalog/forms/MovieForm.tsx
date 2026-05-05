import { useState } from 'react'
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form'

import {
  FormInput,
  FormInputFile,
  FormInputTagChips,
  FormMultiSelect
} from '../../../components/organisms/forms'
import {
  iMultiSelect,
  iSelectOptions
} from '../../../components/organisms/forms/types'
import { MovieFormInput } from '../types/catalogFormTypes'
import CountryFieldWithDialog from './CountryFieldWithDialog'
import FormActions from './FormActions'
import PersonFieldWithDialog from './PersonFieldWithDialog'

export type { MovieFormInput }

const MovieForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  directorOptions,
  actorOptions,
  genreOptions,
  countryOptions,
  setIsOpen
}: {
  handleSubmit: UseFormHandleSubmit<MovieFormInput>
  onSubmit: SubmitHandler<MovieFormInput>
  register: UseFormRegister<MovieFormInput>
  errors: FieldErrors<MovieFormInput>
  setValue: UseFormSetValue<MovieFormInput>
  directorOptions: iSelectOptions[]
  actorOptions: iSelectOptions[]
  genreOptions: iMultiSelect[]
  countryOptions: iSelectOptions[]
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [coverUploadError, setCoverUploadError] = useState<string>('')

  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8 lg:grid lg:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        {...register('title', {
          required: { value: true, message: 'Título requerido' }
        })}
        label='Título'
        error={errors.title?.message}
        required
      />
      <FormInputFile
        label='Portada'
        sublabel='Resolución 300x440, formato .avif.'
        type='file'
        error={coverUploadError}
        onUpload={(value: string) => {
          const filename = value.split('/').pop() || value
          setValue('cover', filename)
          setCoverUploadError('')
        }}
        acceptedTypes='image/avif'
        setError={(error: string) => setCoverUploadError(error)}
        path='catalog/covers/movies'
      />
      <PersonFieldWithDialog
        label='Director/es'
        isRequired
        options={directorOptions}
        placeholder='Escribe director y pulsa Enter'
        onChange={(ids: string[]) => setValue('director', ids)}
        error={errors.director?.message as string}
        buttonText='Añadir director'
        role='DIRECTOR'
        dialogImage='movie-bg'
      />
      <PersonFieldWithDialog
        label='Actores'
        options={actorOptions}
        placeholder='Escribe actor y pulsa Enter'
        onChange={(ids: string[]) => setValue('actors', ids)}
        buttonText='Añadir actor'
        role='ACTOR'
        dialogImage='movie-bg'
      />
      <FormInputTagChips
        label='Etiquetas'
        placeholder='Escribe y separa por comas'
        onChange={(tags: string[]) => setValue('tags', tags)}
        error={errors.tags?.message as string}
      />
      <FormMultiSelect
        label='Géneros'
        options={genreOptions}
        onChange={(ids: string[]) => setValue('genres', ids)}
      />
      <FormInput
        {...register('duration')}
        label='Duración (min)'
        type='number'
        error={errors.duration?.message}
      />
      <FormInput
        {...register('year')}
        label='Año'
        type='number'
        error={errors.year?.message}
      />
      <FormInput
        {...register('rating', { min: 0, max: 9 })}
        label='Valoración (1-10)'
        type='number'
        error={errors.rating?.message}
      />
      <CountryFieldWithDialog
        options={countryOptions}
        onChange={(value: string) => setValue('country', value)}
        dialogImage='movie-bg'
      />
      <FormActions
        submitText='Añadir película'
        onCancel={() => setIsOpen(false)}
        small
      />
    </form>
  )
}

export default MovieForm
