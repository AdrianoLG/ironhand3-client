import { useEffect, useState } from 'react'

import { Button } from '../../../components/atoms'
import {
  FormInput,
  FormMultiSelect,
  FormSelect
} from '../../../components/organisms/forms'
import { iCompleteCleaningTaskForm } from '../types/cleaningTasks'

const CompleteCleaningTaskForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isValid,
  data,
  clearErrors,
  setIsRequiredSelected,
  setValue,
  completedCleaningTaskData,
  isRequiredSelected,
  roomOptions,
  setIsOpen,
  setCompletedCleaningTaskToUpdate
}: iCompleteCleaningTaskForm) => {
  const [selectedTask, setSelectedTask] = useState('')
  const options =
    data?.cleaningTasks.map(cleaningTask => ({
      value: cleaningTask._id,
      name: cleaningTask.name
    })) || []
  const [roomOptionss, setRoomOptionss] = useState<
    { value: string; name: string; selected: boolean }[]
  >([])

  useEffect(() => {
    if (data && data.cleaningTasks && selectedTask) {
      const task = data.cleaningTasks.find(task => task._id === selectedTask)
      setRoomOptionss(
        task?.possibleRooms.map(room => ({
          value: room._id,
          name: room.name,
          selected: false
        })) || []
      )
    }
  }, [data, selectedTask])

  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8 lg:grid lg:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        {...register('completedAt', {
          required: {
            value: true,
            message: 'Fecha requerida'
          },
          valueAsDate: true
        })}
        label='Fecha'
        type='date'
        defaultValue={new Date().toISOString().slice(0, 10)}
        error={errors.completedAt?.message}
        required
      />
      <FormSelect
        tag='cleaningTask'
        selectName='Tarea de limpieza'
        placeholder='Selecciona una tarea'
        isRequired
        error={errors.cleaningTask?.message}
        options={options}
        onChange={(value: string) => {
          setIsRequiredSelected(true)
          setValue('cleaningTask', value)
          setSelectedTask(value)
        }}
        defaultValue={completedCleaningTaskData?.cleaningTask._id}
        disabled={!!completedCleaningTaskData}
      />
      {selectedTask !== '' && roomOptionss.length && (
        <FormMultiSelect
          label='Habitaciones'
          isRequired
          options={roomOptionss}
          setOptions={setRoomOptionss}
          error={errors.rooms?.message}
          onChange={(value: string[]) => {
            // Guardar los _id seleccionados en el formulario
            setValue('rooms', value)
            if (
              setCompletedCleaningTaskToUpdate &&
              completedCleaningTaskData?.cleaningTask
            ) {
              const selectedRooms = roomOptions.filter(room =>
                value.includes(room._id)
              )
              setCompletedCleaningTaskToUpdate({
                ...completedCleaningTaskData?.cleaningTask,
                _id: completedCleaningTaskData._id,
                possibleRooms: selectedRooms
              })
            }
            clearErrors('rooms')
          }}
          data={completedCleaningTaskData?.rooms.map(room => room._id) || []}
        />
      )}
      <div className='col-span-2 flex justify-end gap-4'>
        <Button
          text='Cancelar'
          isFit
          small
          secondary
          onMouseClick={() => setIsOpen(false)}
        />
        {completedCleaningTaskData && (
          <Button
            text='Actualizar'
            type='submit'
            isFit
            small
            disabled={!isValid}
          />
        )}
        {!completedCleaningTaskData && (
          <Button
            text='Insertar'
            type='submit'
            isFit
            small
            disabled={!isRequiredSelected || !isValid}
          />
        )}
      </div>
    </form>
  )
}
export default CompleteCleaningTaskForm
