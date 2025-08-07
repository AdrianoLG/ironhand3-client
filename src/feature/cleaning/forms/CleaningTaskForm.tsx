import { Button } from '../../../components/atoms'
import {
  FormInput,
  FormInputFile,
  FormMultiSelect
} from '../../../components/organisms/forms'
import { iCleaningTaskForm } from '../types/cleaningTasks'

const CleaningTaskForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  clearErrors,
  setValue,
  cleaningTaskToUpdate,
  roomOptions,
  setIsOpen,
  setCleaningTaskToUpdate,
  setError,
  setRoomOptions
}: iCleaningTaskForm) => {
  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8 lg:grid lg:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        {...register('name', {
          required: {
            value: true,
            message: 'Nombre requerido'
          }
        })}
        label='Nombre'
        error={errors.name?.message}
        required
      />
      <FormInput
        {...register('slug', {
          required: {
            value: true,
            message: 'Slug requerido'
          },
          pattern: {
            value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            message: 'A-Z, a-z, 0-9 y guiones bajos'
          }
        })}
        label='Nombre máquina'
        error={errors.slug?.message}
        required
      />
      <div className='col-span-2'>
        <FormInputFile
          label='Imagen'
          sublabel='Resolución 800x306'
          type='file'
          error={errors.img?.message}
          required
          onUpload={(value: string) => setValue('img', value)}
          acceptedTypes='image/avif'
          maxSize={0.2}
          setError={(error: string) =>
            error !== ''
              ? setError('img', { message: error })
              : clearErrors('img')
          }
          img={cleaningTaskToUpdate?.img}
          path='cleaning'
        />
      </div>
      <FormMultiSelect
        label='Posibles habitaciones'
        options={roomOptions.map(room => ({
          value: room._id,
          name: room.name,
          selected: false
        }))}
        setOptions={setRoomOptions}
        error={errors.possibleRooms?.message}
        onChange={(value: string[]) => {
          if (setCleaningTaskToUpdate && cleaningTaskToUpdate) {
            const possibleRooms = roomOptions.filter(room =>
              value.includes(room.slug)
            )
            setCleaningTaskToUpdate({
              ...cleaningTaskToUpdate,
              _id: cleaningTaskToUpdate._id,
              possibleRooms: possibleRooms
            })
          }
          clearErrors('possibleRooms')
        }}
        data={cleaningTaskToUpdate?.possibleRooms.map(room => room.slug) || []}
      />
      <div className='col-span-2 flex justify-end gap-4'>
        <Button
          text='Cancelar'
          isFit
          small
          secondary
          onMouseClick={() => setIsOpen(false)}
        />
        {cleaningTaskToUpdate && (
          <Button text='Actualizar' type='submit' isFit small />
        )}
        {!cleaningTaskToUpdate && (
          <Button text='Insertar' type='submit' isFit small />
        )}
      </div>
    </form>
  )
}

export default CleaningTaskForm
