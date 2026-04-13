import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import Spinner from '../../../components/molecules/Spinner'
import { cleanEmpty } from '../../../utils/cleanEmpty'
import { ADD_PLANT, UPDATE_PLANT } from '../gql/gardenMutations'
import { GARDEN_INFO, SELECT_GARDEN_FORM_DATA } from '../gql/gardenQueries'
import { iPlant, iSpecie } from '../types/garden'
import PlantForm from './PlantForm'

type PlantFormInput = {
  name: string
  specie: string
  planted: string
}

const PlantFormContainer = ({
  plantData,
  setIsOpen
}: {
  plantData?: iPlant
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data, loading, error } = useQuery<{ species: iSpecie[] }>(
    SELECT_GARDEN_FORM_DATA
  )

  const [createPlant] = useMutation(ADD_PLANT, {
    refetchQueries: [{ query: GARDEN_INFO }, { query: SELECT_GARDEN_FORM_DATA }]
  })

  const [updatePlant] = useMutation(UPDATE_PLANT, {
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
  } = useForm<PlantFormInput>()

  useEffect(() => {
    if (!plantData) return

    setValue('name', plantData.name)
    setValue('specie', plantData.specie._id)
    setValue('planted', new Date(plantData.planted).toISOString().slice(0, 10))
  }, [plantData, setValue])

  const onSubmit: SubmitHandler<PlantFormInput> = formData => {
    if (!getValues('specie')) {
      setError('specie', {
        type: 'custom',
        message: 'Especie requerida'
      })
      return
    }

    clearErrors('specie')

    const payload = {
      name: formData.name,
      specie: formData.specie,
      planted: new Date(formData.planted)
    }

    if (plantData?._id) {
      updatePlant({
        variables: {
          updatePlantInput: cleanEmpty({ ...payload, _id: plantData._id })
        }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
      return
    }

    createPlant({
      variables: {
        createPlantInput: cleanEmpty(payload)
      }
    }).finally(() => {
      setIsOpen(false)
      reset()
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
    <PlantForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      clearErrors={clearErrors}
      data={data}
      plantData={plantData}
      setIsOpen={setIsOpen}
    />
  )
}

export default PlantFormContainer
