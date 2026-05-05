import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import Spinner from '../../../components/molecules/Spinner'
import { CREATE_BOOK } from '../gql/catalogMutations'
import { CATALOG_FORM_DATA, CATALOG_INFO } from '../gql/catalogQueries'
import BookForm, { BookFormInput } from './BookForm'

interface iFormData {
  people: { _id: string; name: string; lastName?: string; role: string }[]
  genres: { _id: string; name: string }[]
}

const BookFormContainer = ({
  setIsOpen
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data, loading, error } = useQuery<iFormData>(CATALOG_FORM_DATA)
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: CATALOG_INFO }]
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<BookFormInput>({
    defaultValues: {
      title: '',
      author: [],
      format: 'PAPER',
      pages: 0,
      genres: [],
      tags: []
    }
  })

  const onSubmit: SubmitHandler<BookFormInput> = async formData => {
    const tags = (formData.tags ?? []).filter(Boolean)

    await createBook({
      variables: {
        createBookInput: {
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
      }
    })
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
    selected: false
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
    />
  )
}

export default BookFormContainer
