import { useState } from 'react'

import {
  FormInput,
  FormInputFile,
  FormInputTagChips,
  FormMultiSelect,
  FormSelect
} from '../../../components/organisms/forms'
import FormTextarea from '../../../components/organisms/forms/FormTextarea'
import {
  BookFormInput,
  BookFormProps,
  coverMaterialOptions,
  formatOptions
} from '../types/catalogFormTypes'
import FormActions from './FormActions'
import PersonFieldWithDialog from './PersonFieldWithDialog'

export type { BookFormInput }

const BookForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  watch,
  authorOptions,
  genreOptions,
  setIsOpen
}: BookFormProps) => {
  const format = watch('format')
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
        sublabel='Resolución 262x399, formato .avif.'
        type='file'
        error={coverUploadError}
        onUpload={(value: string) => {
          const filename = value.split('/').pop() || value
          setValue('cover', filename)
          setCoverUploadError('')
        }}
        acceptedTypes='image/avif'
        setError={(error: string) => setCoverUploadError(error)}
        path='catalog/covers/books'
      />
      <FormSelect
        tag='format'
        selectName='Formato'
        placeholder='Selecciona formato'
        defaultValue='PAPER'
        options={formatOptions}
        isRequired
        onChange={(value: string) =>
          setValue('format', value as 'PAPER' | 'ELECTRONIC')
        }
        error={errors.format?.message}
      />
      <FormInput
        {...register('pages', {
          required: { value: true, message: 'Páginas requeridas' }
        })}
        label='Páginas'
        type='number'
        error={errors.pages?.message}
        required
      />
      <PersonFieldWithDialog
        label='Autor/es'
        isRequired
        options={authorOptions}
        placeholder='Escribe autor y pulsa Enter'
        onChange={(ids: string[]) => setValue('author', ids)}
        error={errors.author?.message as string}
        buttonText='Añadir escritor'
        role='WRITER'
        dialogImage='book-bg'
      />
      <FormMultiSelect
        label='Géneros'
        options={genreOptions}
        onChange={(ids: string[]) => setValue('genres', ids)}
      />
      {format === 'PAPER' && (
        <FormSelect
          tag='coverMaterial'
          selectName='Tapa'
          placeholder='Selecciona tapa'
          options={coverMaterialOptions}
          onChange={(value: string) =>
            setValue('coverMaterial', value as 'SOFT' | 'HARD')
          }
        />
      )}
      <FormInput
        {...register('rating', { min: 0, max: 9 })}
        label='Valoración (1-10)'
        type='number'
        error={errors.rating?.message}
      />
      <FormInput
        {...register('editorial')}
        label='Editorial'
        error={errors.editorial?.message}
      />
      <FormInput
        {...register('publishedYear')}
        label='Año de publicación'
        type='number'
        error={errors.publishedYear?.message}
      />
      <FormTextarea
        {...register('synopsis')}
        label='Sinopsis'
        error={errors.synopsis?.message}
      />
      <FormInputTagChips
        label='Etiquetas'
        placeholder='Escribe y separa por comas'
        onChange={(tags: string[]) => setValue('tags', tags)}
        error={errors.tags?.message as string}
      />
      <FormActions
        submitText='Añadir libro'
        onCancel={() => setIsOpen(false)}
        small
      />
    </form>
  )
}

export default BookForm
