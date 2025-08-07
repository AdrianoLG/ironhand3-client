import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import Spinner from '../../../components/molecules/Spinner'
import { cleanEmpty } from '../../../utils/cleanEmpty'
import {
  ADD_COMPLETED_CLEANING_TASK,
  UPDATE_COMPLETED_CLEANING_TASK
} from '../gql/cleaningTaskMutations'
import {
  CLEANING_INFO,
  SELECT_CLEANING_TASKS
} from '../gql/cleaningTaskQueries'
import {
  iCleaningTask,
  iCompletedCleaningTask,
  iCompletedCleaningTaskFormInput,
  iRoom
} from '../types/cleaningTasks'
import CompleteCleaningTaskForm from './CompleteCleaningTaskForm'

const CompleteCleaningTaskFormContainer = ({
  completedCleaningTaskData,
  setIsOpen
}: {
  completedCleaningTaskData?: iCompletedCleaningTask
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  /*
   * GQL
   */
  const { data, loading, error } = useQuery<{
    cleaningTasks: iCleaningTask[]
    rooms: iRoom[]
  }>(SELECT_CLEANING_TASKS)
  const [createCompletedCleaningTask] = useMutation(
    ADD_COMPLETED_CLEANING_TASK,
    {
      refetchQueries: [
        { query: CLEANING_INFO },
        { query: SELECT_CLEANING_TASKS }
      ]
    }
  )
  const [updateCompletedCleaningTask] = useMutation(
    UPDATE_COMPLETED_CLEANING_TASK,
    {
      refetchQueries: [
        { query: CLEANING_INFO },
        { query: SELECT_CLEANING_TASKS }
      ]
    }
  )

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
    reset
  } = useForm<iCompletedCleaningTaskFormInput>()

  /*
   * State management
   */
  const [isRequiredSelected, setIsRequiredSelected] = useState(false)
  const [completedCleaningTaskToUpdate, setCompletedCleaningTaskToUpdate] =
    useState<iCleaningTask | null>(
      completedCleaningTaskData?.cleaningTask || null
    )

  /*
   * Handle form submission
   * Validates required fields and sends the form data to create or update a completed cleaning task
   */
  const onSubmit: SubmitHandler<iCompletedCleaningTaskFormInput> = formData => {
    // Set error messages
    if (!getValues('cleaningTask')) {
      setError('cleaningTask', {
        type: 'custom',
        message: 'Tarea requerida'
      })
      return
    }

    // Prepare form data
    clearErrors('cleaningTask')

    // Send form: update or create
    if (completedCleaningTaskData?.cleaningTask) {
      const updatedData = {
        ...formData,
        _id: completedCleaningTaskToUpdate?._id,
        rooms: completedCleaningTaskToUpdate?.possibleRooms || []
      }
      updateCompletedCleaningTask({
        variables: {
          updateCompletedCleaningTaskInput: cleanEmpty(updatedData)
        }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
    } else {
      const createData = {
        ...formData,
        rooms: completedCleaningTaskToUpdate?.possibleRooms || []
      }
      createCompletedCleaningTask({
        variables: { createCompletedCleaningTaskInput: cleanEmpty(createData) }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
    }
  }

  /*
   * Set initial values if editing an existing completed cleaningTask
   */
  if (completedCleaningTaskData) {
    setValue(
      'completedAt',
      new Date(completedCleaningTaskData.completedAt).toISOString().slice(0, 10)
    )
    const rooms = completedCleaningTaskData.rooms.map(room => room._id)
    setValue('rooms', rooms)
    setValue('cleaningTask', completedCleaningTaskData.cleaningTask._id)
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
    <CompleteCleaningTaskForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isValid={isValid}
      register={register}
      data={data}
      clearErrors={clearErrors}
      setIsRequiredSelected={setIsRequiredSelected}
      setValue={setValue}
      isRequiredSelected={isRequiredSelected}
      setIsOpen={setIsOpen}
      completedCleaningTaskData={completedCleaningTaskData}
      roomOptions={data?.rooms || []}
      setCompletedCleaningTaskToUpdate={setCompletedCleaningTaskToUpdate}
    />
  )
}
export default CompleteCleaningTaskFormContainer
