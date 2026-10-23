import { SubmitHandler, useForm } from 'react-hook-form';

import { useMutation, useQuery } from '@apollo/client';

import ErrorMessage from '../../../components/molecules/ErrorMessage';
import Spinner from '../../../components/molecules/Spinner';
import { CREATE_SERIE, UPDATE_SERIE } from '../gql/catalogMutations';
import { CATALOG_FORM_DATA, CATALOG_INFO } from '../gql/catalogQueries';
import { iCatalogSerie } from '../types/types';
import SerieForm, { SerieFormInput } from './SerieForm';

interface iFormData {
  people: { _id: string; name: string; lastName?: string; role: string }[]
  genres: { _id: string; name: string }[]
  countries: { _id: string; name: string }[]
}

const buildDefaultValues = (serie?: iCatalogSerie): SerieFormInput => ({
  title: serie?.title ?? '',
  director: serie?.director?.map(person => person._id) ?? [],
  actors: serie?.actors?.map(person => person._id) ?? [],
  country: serie?.country?._id,
  cover: serie?.cover,
  episodeDuration: serie?.episodeDuration,
  rating: serie?.rating,
  year: serie?.year,
  genres: serie?.genres?.map(genre => genre._id) ?? [],
  tags: serie?.tags ?? []
})

const SerieFormContainer = ({
  setIsOpen,
  serie
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  serie?: iCatalogSerie
}) => {
  const { data, loading, error } = useQuery<iFormData>(CATALOG_FORM_DATA)
  const [createSerie] = useMutation(CREATE_SERIE, {
    refetchQueries: [{ query: CATALOG_INFO }]
  })
  const [updateSerie] = useMutation(UPDATE_SERIE, {
    refetchQueries: [{ query: CATALOG_INFO }]
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<SerieFormInput>({
    defaultValues: buildDefaultValues(serie)
  })

  const onSubmit: SubmitHandler<SerieFormInput> = async formData => {
    const tags = (formData.tags ?? []).filter(Boolean)

    const serieInput = {
      title: formData.title,
      director: formData.director,
      ...(formData.actors?.length && { actors: formData.actors }),
      ...(formData.country && { country: formData.country }),
      ...(formData.cover && { cover: formData.cover }),
      ...(formData.episodeDuration && {
        episodeDuration: Number(formData.episodeDuration)
      }),
      ...(formData.rating !== undefined &&
        formData.rating !== null && {
          rating: Number(formData.rating)
        }),
      ...(formData.year && { year: Number(formData.year) }),
      ...(formData.genres.length && { genres: formData.genres }),
      ...(tags.length && { tags })
    }

    if (serie) {
      await updateSerie({
        variables: { updateSerieInput: { _id: serie._id, ...serieInput } }
      })
    } else {
      await createSerie({ variables: { createSerieInput: serieInput } })
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
    selected: serie?.genres?.some(genre => genre._id === g._id) ?? false
  }))
  const countryOptions = (data?.countries ?? []).map(c => ({
    value: c._id,
    name: c.name
  }))

  return (
    <SerieForm
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
      submitText={serie ? 'Guardar cambios' : undefined}
      initialValues={serie ? buildDefaultValues(serie) : undefined}
    />
  )
}

export default SerieFormContainer
