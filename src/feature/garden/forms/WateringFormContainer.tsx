import { useEffect } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import Spinner from '../../../components/molecules/Spinner'
import { cleanEmpty } from '../../../utils/cleanEmpty'
import {
  ADD_WATERING,
  UPDATE_CROP,
  UPDATE_WATERING
} from '../gql/gardenMutations'
import { GARDEN_INFO, SELECT_GARDEN_FORM_DATA } from '../gql/gardenQueries'
import { iCrop, iFertilizer, iWatering } from '../types/garden'
import WateringForm from './WateringForm'

type WateringFertilizerForm = {
  qty: number
  fertilizer: string
}

type WateringFormInput = {
  crop: string
  date: string
  water: number
  fertilizers: WateringFertilizerForm[]
}

const WateringFormContainer = ({
  completedWateringData,
  setIsOpen
}: {
  completedWateringData?: iWatering
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data, loading, error } = useQuery<{
    crops: (Pick<iCrop, '_id' | 'startDate' | 'comments'> & {
      cropContainer: { _id: string; name: string }
      waterings: { _id: string }[]
    })[]
    fertilizers: iFertilizer[]
  }>(SELECT_GARDEN_FORM_DATA)

  const [createWatering] = useMutation(ADD_WATERING, {
    refetchQueries: [{ query: GARDEN_INFO }, { query: SELECT_GARDEN_FORM_DATA }]
  })

  const [updateWatering] = useMutation(UPDATE_WATERING, {
    refetchQueries: [{ query: GARDEN_INFO }, { query: SELECT_GARDEN_FORM_DATA }]
  })

  const [updateCrop] = useMutation(UPDATE_CROP, {
    refetchQueries: [{ query: GARDEN_INFO }, { query: SELECT_GARDEN_FORM_DATA }]
  })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors },
    reset
  } = useForm<WateringFormInput>({
    defaultValues: {
      fertilizers: [{ qty: 1, fertilizer: '' }]
    }
  })

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'fertilizers'
  })

  useEffect(() => {
    if (!completedWateringData) return

    setValue(
      'date',
      new Date(completedWateringData.date).toISOString().slice(0, 10)
    )
    setValue('water', completedWateringData.water)
    replace(
      completedWateringData.fertilizers.map(item => ({
        qty: item.qty,
        fertilizer: item.fertilizer._id
      }))
    )
  }, [completedWateringData, replace, setValue])

  const onSubmit: SubmitHandler<WateringFormInput> = async formData => {
    if (!formData.crop && !completedWateringData) {
      setError('crop', {
        type: 'custom',
        message: 'Cultivo requerido'
      })
      return
    }

    clearErrors('crop')

    const payload = {
      date: new Date(formData.date),
      water: Number(formData.water),
      fertilizers: formData.fertilizers
        .filter(item => item.fertilizer)
        .map(item => ({
          qty: Number(item.qty),
          fertilizer: item.fertilizer
        }))
    }

    if (completedWateringData?._id) {
      updateWatering({
        variables: {
          updateWateringInput: cleanEmpty({
            ...payload,
            _id: completedWateringData._id
          })
        }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
      return
    }

    const result = await createWatering({
      variables: {
        createWateringInput: cleanEmpty(payload)
      }
    })

    const wateringId = result.data?.createWatering?._id
    const selectedCrop = data?.crops.find(crop => crop._id === formData.crop)

    if (wateringId && selectedCrop) {
      const wateringIds = [
        ...selectedCrop.waterings.map(watering => watering._id),
        wateringId
      ]

      await updateCrop({
        variables: {
          updateCropInput: {
            _id: selectedCrop._id,
            waterings: wateringIds
          }
        }
      })
    }

    setIsOpen(false)
    reset()
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

  const cropOptions =
    data?.crops.map((crop, index) => ({
      value: crop._id,
      name: `Cultivo ${index + 1} - ${crop.cropContainer.name}`
    })) || []

  const fertilizerOptions =
    data?.fertilizers.map(fertilizer => ({
      value: fertilizer._id,
      name: fertilizer.name
    })) || []

  return (
    <WateringForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      clearErrors={clearErrors}
      fields={fields}
      append={append}
      remove={remove}
      cropOptions={cropOptions}
      fertilizerOptions={fertilizerOptions}
      completedWateringData={completedWateringData}
      setIsOpen={setIsOpen}
    />
  )
}

export default WateringFormContainer
