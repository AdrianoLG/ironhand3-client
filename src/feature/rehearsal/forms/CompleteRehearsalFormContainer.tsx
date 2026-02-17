import { useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import Spinner from '../../../components/molecules/Spinner'
import { cleanEmpty } from '../../../utils/cleanEmpty'
import { ADD_REHEARSAL, UPDATE_REHEARSAL } from '../gql/rehearsalMutations'
import {
  REHEARSAL_INFO,
  SELECT_REHEARSALS,
  SELECT_REHEARSALS_DATA
} from '../gql/rehearsalQueries'
import {
  iCompletedRehearsal,
  iCompletedRehearsalFormInput,
  iInstrument,
  iSheet
} from '../types/rehearsals'
import CompleteRehearsalForm from './CompleteRehearsalForm'

const CompleteRehearsalFormContainer = ({
  completedRehearsalData,
  setIsOpen
}: {
  completedRehearsalData?: iCompletedRehearsal
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  /*
   * GQL
   */
  const { data, loading, error } = useQuery<{
    rehearsals: iCompletedRehearsal[]
    sheets: iSheet[]
    instruments: iInstrument[]
  }>(SELECT_REHEARSALS_DATA)
  const [createCompletedRehearsal] = useMutation(ADD_REHEARSAL, {
    refetchQueries: [{ query: REHEARSAL_INFO }, { query: SELECT_REHEARSALS }]
  })
  const [updateCompletedRehearsal] = useMutation(UPDATE_REHEARSAL, {
    refetchQueries: [{ query: REHEARSAL_INFO }, { query: SELECT_REHEARSALS }]
  })

  /*
   * Form logic
   */
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
    reset,
    control
  } = useForm<iCompletedRehearsalFormInput>({
    defaultValues: {
      sheets: [{ sheet: '', duration: 0 }]
    }
  })

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'sheets'
  })

  /*
   * State management
   */
  const [, setIsRequiredSelected] = useState(false)
  const [completedRehearsalToUpdate] = useState<iCompletedRehearsal | null>(
    completedRehearsalData || null
  )
  const [selectedInstrument, setSelectedInstrument] = useState<string>('')

  /*
   * Handle form submission
   * Validates required fields and sends the form data to create or update a completed rehearsal
   */
  const onSubmit: SubmitHandler<iCompletedRehearsalFormInput> = formData => {
    // Set error messages
    if (!getValues('instrument')) {
      setError('instrument', {
        type: 'custom',
        message: 'Instrumento requerido'
      })
      return
    }
    if (!getValues('completedAt')) {
      setError('completedAt', {
        type: 'custom',
        message: 'Fecha de completado requerida'
      })
      return
    }

    // Prepare form data
    clearErrors()

    // Send form: update or create
    if (completedRehearsalData) {
      const sheets = formData.sheets.map(sheet => ({
        sheetId: sheet.sheet,
        duration: sheet.duration
      }))
      const updatedData = {
        ...formData,
        _id: completedRehearsalData?._id,
        sheets: sheets
      }

      updateCompletedRehearsal({
        variables: {
          updateCompletedRehearsalInput: cleanEmpty(updatedData)
        }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
    } else {
      createCompletedRehearsal({
        variables: { createRehearsalInput: cleanEmpty(formData) }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
    }
  }

  /*
   * Set initial values if editing an existing completed rehearsal
   */
  if (completedRehearsalData) {
    setValue('completedAt', new Date(completedRehearsalData.completedAt))
    setValue('instrument', completedRehearsalData.instrument._id)
    replace(
      completedRehearsalData.sheets.map(sheet => ({
        sheet: sheet.sheet._id,
        duration: sheet.duration
      }))
    )
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

  const transformedData = data
    ? {
        ...data,
        rehearsals: data.rehearsals.map(rehearsal => ({
          instrument: rehearsal.instrument._id,
          completedAt: rehearsal.completedAt,
          sheets: rehearsal.sheets.map(sheet => ({
            sheet: sheet.sheet._id,
            duration: sheet.duration
          }))
        }))
      }
    : undefined

  return (
    <CompleteRehearsalForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      register={register}
      data={transformedData}
      setIsRequiredSelected={setIsRequiredSelected}
      setValue={setValue}
      getValues={getValues}
      fields={fields}
      append={append}
      remove={index => remove(index)}
      setIsOpen={setIsOpen}
      isValid={isValid}
      completedRehearsalToUpdate={completedRehearsalToUpdate}
      setSelectedInstrument={setSelectedInstrument}
      selectedInstrument={selectedInstrument}
    />
  )
}
export default CompleteRehearsalFormContainer
