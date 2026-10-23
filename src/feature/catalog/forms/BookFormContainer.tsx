import { SubmitHandler, useForm } from 'react-hook-form';

import { useMutation, useQuery } from '@apollo/client';

import ErrorMessage from '../../../components/molecules/ErrorMessage';
import Spinner from '../../../components/molecules/Spinner';
import { CREATE_BOOK, UPDATE_BOOK } from '../gql/catalogMutations';
import { CATALOG_FORM_DATA, CATALOG_INFO } from '../gql/catalogQueries';
import { iCatalogBook } from '../types/types';
import BookForm, { BookFormInput } from './BookForm';

interface iFormData {
  people: { _id: string; name: string; lastName?: string; role: string }[]
  genres: { _id: string; name: string }[]
}

const buildDefaultValues = (book?: iCatalogBook): BookFormInput => ({
  title: book?.title ?? '',
  author: book?.author?.map(person => person._id) ?? [],
  cover: book?.cover ?? '',
  format: book?.format ?? 'PAPER',
  pages: book?.pages ?? 0,
  rating: book?.rating,
  coverMaterial: book?.coverMaterial,
  editorial: book?.editorial ?? '',
  publishedYear: book?.publishedYear,
  synopsis: book?.synopsis ?? '',
  genres: book?.genres?.map(genre => genre._id) ?? [],
  tags: book?.tags ?? []
})

const BookFormContainer = ({
  setIsOpen,
  book
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  book?: iCatalogBook
}) => {
  const { data, loading, error } = useQuery<iFormData>(CATALOG_FORM_DATA)
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: CATALOG_INFO }]
  })
  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: CATALOG_INFO }]
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<BookFormInput>({
    defaultValues: buildDefaultValues(book)
  })

  const onSubmit: SubmitHandler<BookFormInput> = async formData => {
    const tags = (formData.tags ?? []).filter(Boolean)

    const bookInput = {
      title: formData.title,
      author: formData.author,
      cover: formData.cover || 'no-cover.avif',
      format: formData.format,
      pages: Number(formData.pages),
      ...(formData.rating !== undefined &&
        formData.rating !== null && {
          rating: Number(formData.rating)
        }),
      ...(formData.coverMaterial && {
        coverMaterial: formData.coverMaterial
      }),
      ...(formData.editorial && { editorial: formData.editorial }),
      ...(formData.publishedYear && {
        publishedYear: Number(formData.publishedYear)
      }),
      ...(formData.synopsis && { synopsis: formData.synopsis }),
      ...(formData.genres.length && { genres: formData.genres }),
      ...(tags.length && { tags })
    }

    if (book) {
      await updateBook({
        variables: { updateBookInput: { _id: book._id, ...bookInput } }
      })
    } else {
      await createBook({ variables: { createBookInput: bookInput } })
    }
    setIsOpen(false)
  }

  if (loading)
    return (
      <Spinner classes='my-7 flex w-full justify-center px-8' widthInRem={2} />
    )

  if (error)
    return (
      <ErrorMessage
        message='Error cargando datos'
        errorMessage={error.message}
        containerClasses='my-7 px-8 text-secondary'
      />
    )

  const writers = (data?.people ?? []).filter(p => p.role === 'WRITER')
  const authorOptions = writers.map(p => ({
    value: p._id,
    name: `${p.name}${p.lastName ? ` ${p.lastName}` : ''}`
  }))
  const genreOptions = (data?.genres ?? []).map(g => ({
    value: g._id,
    name: g.name,
    selected: book?.genres?.some(genre => genre._id === g._id) ?? false
  }))

  return (
    <BookForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      watch={watch}
      authorOptions={authorOptions}
      genreOptions={genreOptions}
      setIsOpen={setIsOpen}
      submitText={book ? 'Guardar cambios' : undefined}
      initialValues={book ? buildDefaultValues(book) : undefined}
    />
  )
}

export default BookFormContainer
