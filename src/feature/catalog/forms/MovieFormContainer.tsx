import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import Spinner from '../../../components/molecules/Spinner'
import { CREATE_MOVIE } from '../gql/catalogMutations'
import { CATALOG_FORM_DATA, CATALOG_INFO } from '../gql/catalogQueries'
import MovieForm, { MovieFormInput } from './MovieForm'

interface iFormData {
  people: { _id: string; name: string; lastName?: string; role: string }[]
  genres: { _id: string; name: string }[]
  countries: { _id: string; name: string }[]
}

const MovieFormContainer = ({
  setIsOpen
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data, loading, error } = useQuery<iFormData>(CATALOG_FORM_DATA)
  const [createMovie] = useMutation(CREATE_MOVIE, {
    refetchQueries: [{ query: CATALOG_INFO }]
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<MovieFormInput>({
    defaultValues: {
      title: '',
      director: [],
      actors: [],
      genres: [],
      tags: []
    }
  })

  const onSubmit: SubmitHandler<MovieFormInput> = async formData => {
    const tags = (formData.tags ?? []).filter(Boolean)

    await createMovie({
      variables: {
        createMovieInput: {
          title: formData.title,
          director: formData.director,
          cover: formData.cover || 'no-cover.avif',
          ...(formData.actors?.length && { actors: formData.actors }),
          ...(formData.country && { country: formData.country }),
          ...(formData.duration && { duration: Number(formData.duration) }),
          ...(formData.rating !== undefined &&
            formData.rating !== null && {
              rating: Number(formData.rating)
            }),
          ...(formData.year && { year: Number(formData.year) }),
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

  const people = data?.people ?? []
  const directorOptions = people
    .filter(p => p.role === 'DIRECTOR')
    .map(p => ({
      value: p._id,
      name: `${p.name}${p.lastName ? ` ${p.lastName}` : ''}`
    }))
  const actorOptions = people
    .filter(p => p.role === 'ACTOR')
    .map(p => ({
      value: p._id,
      name: `${p.name}${p.lastName ? ` ${p.lastName}` : ''}`
    }))
  const genreOptions = (data?.genres ?? []).map(g => ({
    value: g._id,
    name: g.name,
    selected: false
  }))
  const countryOptions = (data?.countries ?? []).map(c => ({
    value: c._id,
    name: c.name
  }))

  return (
    <MovieForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      directorOptions={directorOptions}
      actorOptions={actorOptions}
      genreOptions={genreOptions}
      countryOptions={countryOptions}
      setIsOpen={setIsOpen}
    />
  )
}

export default MovieFormContainer
