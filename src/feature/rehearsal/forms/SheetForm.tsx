import { Button } from '../../../components/atoms'
import { FormInput, FormMultiSelect } from '../../../components/organisms/forms'
import { iSheetForm } from '../types/rehearsals'

const SheetForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  clearErrors,
  setValue,
  sheetToUpdate,
  instrumentOptions,
  setIsOpen,
  setSheetToUpdate
}: iSheetForm) => {
  console.log('Sheet to update', sheetToUpdate)

  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8 lg:grid lg:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        {...register('title', {
          required: {
            value: true,
            message: 'Título requerido'
          }
        })}
        label='Título'
        error={errors.title?.message}
        required
        defaultValue={sheetToUpdate?.title}
      />
      <FormInput
        {...register('artist', {
          required: {
            value: true,
            message: 'Artista requerido'
          }
        })}
        label='Artista'
        error={errors.artist?.message}
        required
        defaultValue={sheetToUpdate?.artist}
      />
      <FormMultiSelect
        label='Instrumentos posibles'
        isRequired
        options={instrumentOptions.map(instrument => ({
          value: instrument._id,
          name: instrument.name,
          selected: false
        }))}
        error={errors.possibleInstruments?.message}
        onChange={(value: string[]) => {
          const possibleInstruments = instrumentOptions.filter(instrument =>
            value.includes(instrument._id)
          )
          setValue('possibleInstruments', possibleInstruments)
          if (setSheetToUpdate && sheetToUpdate) {
            setSheetToUpdate({
              ...sheetToUpdate,
              _id: sheetToUpdate._id,
              possibleInstruments: possibleInstruments
            })
          }
          clearErrors('possibleInstruments')
        }}
        data={
          sheetToUpdate?.possibleInstruments.map(
            instrument => instrument._id
          ) || []
        }
      />
      <div className='col-span-2 flex justify-end gap-4'>
        <Button
          text='Cancelar'
          isFit
          small
          secondary
          onMouseClick={() => setIsOpen(false)}
        />
        {sheetToUpdate && (
          <Button text='Actualizar' type='submit' isFit small />
        )}
        {!sheetToUpdate && <Button text='Insertar' type='submit' isFit small />}
      </div>
    </form>
  )
}

export default SheetForm
