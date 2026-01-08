import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation, useQuery } from '@apollo/client'

import ErrorMessage from '../../../components/molecules/ErrorMessage'
import {
  ADD_CLEANING_TASK,
  UPDATE_CLEANING_TASK
} from '../gql/cleaningTaskMutations'
import {
  CLEANING_INFO,
  SELECT_CLEANING_TASKS,
  SELECT_ROOMS
} from '../gql/cleaningTaskQueries'
import { iCleaningTask, iRoom } from '../types/cleaningTasks'
import CleaningTaskForm from './CleaningTaskForm'

const CleaningTaskFormContainer = ({
  cleaningTask,
  setIsOpen
}: {
  cleaningTask?: iCleaningTask | null
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  /*
   * GQL
   */
  const { data, error } = useQuery(SELECT_ROOMS)
  const [addCleaningTask] = useMutation(ADD_CLEANING_TASK, {
    refetchQueries: [{ query: CLEANING_INFO }, { query: SELECT_CLEANING_TASKS }]
  })
  const [updateCleaningTask] = useMutation(UPDATE_CLEANING_TASK, {
    refetchQueries: [{ query: CLEANING_INFO }, { query: SELECT_CLEANING_TASKS }]
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
  } = useForm<iCleaningTask>()

  /*
   * State management
   */
  const [cleaningTaskToUpdate, setCleaningTaskToUpdate] =
    useState<iCleaningTask | null>(cleaningTask || null)

  const [roomOptions, setRoomOptions] = useState<iRoom[]>([])

  /*
   * Populate roomOptions when data is loaded
   */
  useEffect(() => {
    if (data?.rooms) {
      setRoomOptions(data.rooms)
    }
  }, [data])

  /*
   * Handle form submission
   * Validates required fields and sends the form data to create or update a completed cleaning task
   */
  const onSubmit: SubmitHandler<iCleaningTask> = formData => {
    // Set error messages
    if (!formData.name) {
      setError('name', {
        type: 'custom',
        message: 'Nombre requerido'
      })
      return
    }
    if (!formData.slug) {
      setError('slug', {
        type: 'custom',
        message: 'Nombre máquina requerido'
      })
      return
    }
    if (!formData.img) {
      setError('img', {
        type: 'custom',
        message: 'Imagen requerida'
      })
      return
    }

    if (cleaningTask) {
      const updateData = {
        _id: cleaningTask._id,
        name: formData.name,
        slug: formData.slug,
        img: formData.img,
        possibleRooms: formData.possibleRooms?.map(room => room._id) || []
      }
      updateCleaningTask({
        variables: { updateCleaningTaskInput: updateData }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
    } else {
      const createData = {
        name: formData.name,
        slug: formData.slug,
        img: formData.img,
        possibleRooms: formData.possibleRooms?.map(room => room._id) || []
      }
      addCleaningTask({
        variables: { createCleaningTaskInput: createData }
      }).finally(() => {
        setIsOpen(false)
        reset()
      })
    }

    /*
     * If an exercise is provided, populate the form with its data
     */
    if (cleaningTaskToUpdate) {
      setValue('name', cleaningTaskToUpdate.name)
      setValue('slug', cleaningTaskToUpdate.slug)
      setValue('img', cleaningTaskToUpdate.img)
      setValue('possibleRooms', cleaningTaskToUpdate.possibleRooms)
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
      <CleaningTaskForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        setValue={setValue}
        clearErrors={clearErrors}
        setCleaningTaskToUpdate={setCleaningTaskToUpdate}
        setError={setError}
        isValid={isValid}
        setIsOpen={setIsOpen}
        roomOptions={roomOptions}
        cleaningTaskToUpdate={cleaningTaskToUpdate}
      />
    </>
  )
}
export default CleaningTaskFormContainer
