import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import Spinner from '../../../components/molecules/Spinner'
import { cleanEmpty } from '../../../utils/cleanEmpty'
import {
  ADD_SPECIE,
  REMOVE_SPECIE,
  UPDATE_SPECIE
} from '../gql/gardenMutations'
import { GARDEN_INFO, SELECT_GARDEN_FORM_DATA } from '../gql/gardenQueries'
import { iSpecie } from '../types/garden'
import SpecieForm from './SpecieForm'

type SpecieCategory = 'VEGETABLES' | 'FRUITS' | 'HERBS' | 'MEDICINAL'

type SpecieFormInput = {
  name: string
  image: string
  category: SpecieCategory
  comments: string
}

const categoryOptions: { value: SpecieCategory; name: string }[] = [
  { value: 'VEGETABLES', name: 'Vegetales' },
  { value: 'FRUITS', name: 'Frutales' },
  { value: 'HERBS', name: 'Plantas' },
  { value: 'MEDICINAL', name: 'Medicinales' }
]

const mapCategoryToEnum = (category?: string): SpecieCategory | undefined => {
  if (!category) return undefined

  const normalized = category.toLowerCase()
  if (normalized === 'vegetables') return 'VEGETABLES'
  if (normalized === 'fruits') return 'FRUITS'
  if (normalized === 'herbs') return 'HERBS'
  if (normalized === 'medicinal') return 'MEDICINAL'

  return undefined
}

const SpecieFormContainer = ({
  specieData,
  setIsOpen
}: {
  specieData?: iSpecie
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data, loading, error } = useQuery<{ species: iSpecie[] }>(
    SELECT_GARDEN_FORM_DATA
  )

  const [createSpecie] = useMutation(ADD_SPECIE, {
    refetchQueries: [{ query: GARDEN_INFO }, { query: SELECT_GARDEN_FORM_DATA }]
  })

  const [updateSpecie] = useMutation(UPDATE_SPECIE, {
    refetchQueries: [{ query: GARDEN_INFO }, { query: SELECT_GARDEN_FORM_DATA }]
  })

  const [removeSpecie] = useMutation(REMOVE_SPECIE, {
    refetchQueries: [{ query: GARDEN_INFO }, { query: SELECT_GARDEN_FORM_DATA }]
  })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
    reset
  } = useForm<SpecieFormInput>()

  useEffect(() => {
    if (!specieData) return

    setValue('name', specieData.name)
    setValue('image', specieData.image)
    setValue('comments', specieData.comments || '')

    const enumCategory = mapCategoryToEnum(specieData.category)
    if (enumCategory) {
      setValue('category', enumCategory)
    }
  }, [specieData, setValue])

  const onSubmit: SubmitHandler<SpecieFormInput> = formData => {
    if (!getValues('category')) {
      setError('category', {
        type: 'custom',
        message: 'Categoría requerida'
      })
      return
    }

    clearErrors('category')

    const payload = {
      name: formData.name,
      image: formData.image,
      category: formData.category,
      comments: formData.comments
    }

    if (specieData?._id) {
      updateSpecie({
        variables: {
          updateSpecieInput: cleanEmpty({ ...payload, _id: specieData._id })
        }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
      return
    }

    createSpecie({
      variables: {
        createSpecieInput: cleanEmpty(payload)
      }
    }).finally(() => {
      setIsOpen(false)
      reset()
    })
  }

  const handleRemoveSpecie = (specieId: string) => {
    removeSpecie({
      variables: {
        removedSpecieId: specieId
      }
    })
  }

  if (loading)
    return (
      <Spinner classes='my-7 flex w-full justify-center px-8' widthInRem={2} />
    )

  if (error)
    return (
      <ErrorMessage
        message={'Error en la base de datos'}
        errorMessage={error.message}
        containerClasses='my-7 flex w-full justify-center px-8 text-secondary'
      />
    )

  return (
    <SpecieForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      setError={setError}
      clearErrors={clearErrors}
      setIsOpen={setIsOpen}
      specieData={specieData}
      species={data?.species || []}
      removeSpecie={handleRemoveSpecie}
      categoryOptions={categoryOptions}
      defaultCategory={mapCategoryToEnum(specieData?.category)}
    />
  )
}

export default SpecieFormContainer
