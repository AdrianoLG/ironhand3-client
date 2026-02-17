import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import { ADD_SHEET, UPDATE_SHEET } from '../gql/rehearsalMutations'
import {
  REHEARSAL_INFO,
  SELECT_INSTRUMENTS,
  SELECT_SHEETS
} from '../gql/rehearsalQueries'
import { iInstrument, iSheet } from '../types/rehearsals'
import SheetForm from './SheetForm'

const SheetFormContainer = ({
  sheet,
  setIsOpen
}: {
  sheet?: iSheet | null
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  /*
   * GQL
   */
  const { data, error } = useQuery(SELECT_INSTRUMENTS)
  const [addSheet] = useMutation(ADD_SHEET, {
    refetchQueries: [{ query: REHEARSAL_INFO }, { query: SELECT_SHEETS }]
  })
  const [updateSheet] = useMutation(UPDATE_SHEET, {
    refetchQueries: [{ query: REHEARSAL_INFO }, { query: SELECT_SHEETS }]
  })

  /*
   * Form logic
   */
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    setError,
    clearErrors,
    reset
  } = useForm<iSheet>()

  /*
   * State management
   */
  const [sheetToUpdate, setSheetToUpdate] = useState<iSheet | null>(
    sheet || null
  )

  const [instrumentOptions, setInstrumentOptions] = useState<iInstrument[]>([])

  /*
   * Populate instrumentOptions when data is loaded
   */
  useEffect(() => {
    if (data?.instruments) {
      setInstrumentOptions(data.instruments)
    }
  }, [data])

  /*
   * Handle form submission
   * Validates required fields and sends the form data to create or update sheets
   */
  const onSubmit: SubmitHandler<iSheet> = formData => {
    // Set error messages
    if (!formData.title) {
      setError('title', {
        type: 'custom',
        message: 'Título requerido'
      })
      return
    }
    if (!formData.artist) {
      setError('artist', {
        type: 'custom',
        message: 'Artista requerido'
      })
      return
    }

    if (sheetToUpdate) {
      const updateData = {
        _id: sheetToUpdate._id,
        title: formData.title,
        artist: formData.artist,
        possibleInstruments:
          formData.possibleInstruments?.map(instrument => instrument._id) || []
      }
      updateSheet({
        variables: { updateSheetInput: updateData }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
    } else {
      const createData = {
        title: formData.title,
        artist: formData.artist,
        possibleInstruments:
          formData.possibleInstruments?.map(instrument => instrument._id) || []
      }
      addSheet({
        variables: { createSheetInput: createData }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
    }

    /*
     * If an exercise is provided, populate the form with its data
     */
    if (sheetToUpdate) {
      setValue('title', sheetToUpdate.title)
      setValue('artist', sheetToUpdate.artist)
      setValue('possibleInstruments', sheetToUpdate.possibleInstruments)
    }
  }

  if (error)
    return (
      <ErrorMessage
        message={'Error en la base de datos'}
        errorMessage={error.message}
        containerClasses='my-7 flex w-full justify-center px-8 text-secondary'
      />
    )

  return (
    <>
      <SheetForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        setValue={setValue}
        clearErrors={clearErrors}
        setSheetToUpdate={setSheetToUpdate}
        isValid={isValid}
        setIsOpen={setIsOpen}
        instrumentOptions={instrumentOptions}
        sheetToUpdate={sheet}
      />
    </>
  )
}
export default SheetFormContainer
