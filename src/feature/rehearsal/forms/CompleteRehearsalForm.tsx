import { useState } from 'react'

import { Button } from '../../../components/atoms'
import { FormInput, FormSelect } from '../../../components/organisms/forms'
import { iCompletedRehearsalForm } from '../types/rehearsals'

const CompletedRehearsalForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  data,
  setValue,
  completedRehearsalToUpdate,
  setIsOpen,
  setIsRequiredSelected,
  setSelectedInstrument,
  fields,
  append,
  remove
}: iCompletedRehearsalForm) => {
  const [availableSheets, setAvailableSheets] = useState<
    { value: string; name: string }[]
  >([])

  const options =
    data?.instruments.map(instrument => ({
      value: instrument._id,
      name: instrument.name
    })) || []

  const addSheetRow = () => {
    append({ sheet: '', duration: 0 })
  }

  const removeThisSheetRow = (index: number) => {
    if (fields.length <= 1) return
    remove(index)
  }

  const searchForAvailableSheets = (instrumentId: string) => {
    const sheets = data?.sheets.filter(sheet =>
      sheet.possibleInstruments.some(
        instrument => instrument._id === instrumentId
      )
    )
    setAvailableSheets(
      sheets?.map(sheet => ({
        value: sheet._id,
        name: `${sheet.artist} - ${sheet.title}`
      })) || []
    )
  }

  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8 lg:grid lg:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormSelect
        tag='instrument'
        selectName='Instrumento'
        placeholder='Selecciona un instrumento'
        isRequired
        error={errors.instrument?.message}
        options={options}
        onChange={(value: string) => {
          setIsRequiredSelected(true)
          setValue('instrument', value)
          setSelectedInstrument(value)
          searchForAvailableSheets(value)
        }}
        defaultValue={completedRehearsalToUpdate?.instrument._id}
        disabled={!!completedRehearsalToUpdate}
      />
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
      <div className='col-span-2'>
        <label className='border-secondaryLighter text-secondaryLighter text-2xs mb-2 block w-full border-b-1 uppercase'>
          Partituras
        </label>
        {fields.map((field, i) => (
          <div className='mb-4 flex items-end gap-4' key={field.id}>
            <div className='w-1/6'>
              <FormInput
                {...register(`sheets.${i}.duration`, {
                  required: {
                    value: true,
                    message: 'Minutos requeridos'
                  },
                  valueAsNumber: true
                })}
                label='Minutos'
                type='number'
                defaultValue={`${(field as unknown as { duration?: number }).duration ?? 0}`}
                error={errors.sheets?.[i]?.duration?.message}
                required
              />
            </div>
            <div className='w-4/6'>
              <FormSelect
                tag='sheet'
                selectName='Partitura'
                placeholder='Selecciona una partitura'
                isRequired
                options={availableSheets}
                onChange={(value: string) => {
                  setIsRequiredSelected(true)
                  setValue(`sheets.${i}.sheet`, value)
                }}
                defaultValue={(field as unknown as { sheet?: string }).sheet}
                disabled={!!completedRehearsalToUpdate}
              />
            </div>
            <div className='flex w-1/6'>
              <Button
                text='❌'
                xsmall
                outline
                classes={'bg-secondaryLightest'}
                type='button'
                onMouseClick={() => removeThisSheetRow(i)}
              />
            </div>
          </div>
        ))}
        <div className='flex w-full justify-end gap-2 pt-2 pb-4'>
          <Button
            text='Añadir partitura'
            xsmall
            classes={'bg-warn max-w-2/5'}
            type='button'
            onMouseClick={addSheetRow}
          />
        </div>
      </div>

      <div className='col-span-2 flex justify-end gap-4'>
        <Button
          text='Cancelar'
          isFit
          small
          secondary
          onMouseClick={() => setIsOpen(false)}
        />
        {completedRehearsalToUpdate && (
          <Button text='Actualizar' type='submit' isFit small />
        )}
        {!completedRehearsalToUpdate && (
          <Button text='Insertar' type='submit' isFit small />
        )}
      </div>
    </form>
  )
}

export default CompletedRehearsalForm
