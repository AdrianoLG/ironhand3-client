import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import Spinner from '../../../components/molecules/Spinner'
import { cleanEmpty } from '../../../utils/cleanEmpty'
import { ADD_CROP, UPDATE_CROP } from '../gql/gardenMutations'
import { GARDEN_INFO, SELECT_GARDEN_FORM_DATA } from '../gql/gardenQueries'
import { iCrop, iCropContainer, iPlant } from '../types/garden'
import CropForm from './CropForm'

type CropFormInput = {
  startDate: string
  endDate?: string
  comments?: string
  cropContainer: string
  plants: string
}

const CropFormContainer = ({
  cropData,
  setIsOpen
}: {
  cropData?: iCrop
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data, loading, error } = useQuery<{
    plants: iPlant[]
    cropContainers: iCropContainer[]
  }>(SELECT_GARDEN_FORM_DATA)

  const [createCrop] = useMutation(ADD_CROP, {
    refetchQueries: [{ query: GARDEN_INFO }, { query: SELECT_GARDEN_FORM_DATA }]
  })

  const [updateCrop] = useMutation(UPDATE_CROP, {
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
  } = useForm<CropFormInput>()

  useEffect(() => {
    if (!cropData) return

    setValue(
      'startDate',
      new Date(cropData.startDate).toISOString().slice(0, 10)
    )
    setValue(
      'endDate',
      cropData.endDate
        ? new Date(cropData.endDate).toISOString().slice(0, 10)
        : ''
    )
    setValue('comments', cropData.comments || '')
    setValue('cropContainer', cropData.cropContainer._id)
    setValue('plants', cropData.plants[0]?._id || '')
  }, [cropData, setValue])

  const onSubmit: SubmitHandler<CropFormInput> = formData => {
    if (!getValues('cropContainer')) {
      setError('cropContainer', {
        type: 'custom',
        message: 'Contenedor requerido'
      })
      return
    }

    clearErrors('cropContainer')

    const payload = {
      startDate: new Date(formData.startDate),
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      comments: formData.comments,
      plants: formData.plants ? [formData.plants] : [],
      cropContainer: formData.cropContainer
    }

    if (cropData?._id) {
      updateCrop({
        variables: {
          updateCropInput: cleanEmpty({ ...payload, _id: cropData._id })
        }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
      return
    }

    createCrop({
      variables: {
        createCropInput: cleanEmpty(payload)
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
    <CropForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      clearErrors={clearErrors}
      data={data}
      cropData={cropData}
      setIsOpen={setIsOpen}
    />
  )
}

export default CropFormContainer
