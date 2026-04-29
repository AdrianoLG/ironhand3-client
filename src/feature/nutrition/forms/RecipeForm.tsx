import {
  FieldErrors,
  SubmitHandler,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form'

import { Button } from '../../../components/atoms'
import {
  FormInput,
  FormMultiSelect,
  FormSelect
} from '../../../components/organisms/forms'
import FormTextarea from '../../../components/organisms/forms/FormTextarea'
import { iIngredient } from '../types/nutrition'
import RecipeGalleryManager from './RecipeGalleryManager'

export type RecipeMachineOption =
  | 'MAMBO'
  | 'TAURUS'
  | 'OVEN'
  | 'MICROWAVE'
  | 'MIXER'
  | 'GRINDER'

export type RecipeFormInput = {
  name: string
  ingredientIds: string[]
  steps: string
  gallery: string[]
  machine: RecipeMachineOption | ''
}

const machineOptions: { value: RecipeMachineOption; name: string }[] = [
  { value: 'MAMBO', name: 'Mambo' },
  { value: 'TAURUS', name: 'Taurus' },
  { value: 'OVEN', name: 'Horno' },
  { value: 'MICROWAVE', name: 'Microondas' },
  { value: 'MIXER', name: 'Batidora' },
  { value: 'GRINDER', name: 'Molinillo' }
]

const RecipeForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  clearErrors,
  ingredients,
  gallery,
  setIsOpen,
  selectedIngredientIds = [],
  defaultMachine = '',
  isEdit = false
}: {
  handleSubmit: UseFormHandleSubmit<RecipeFormInput>
  onSubmit: SubmitHandler<RecipeFormInput>
  register: UseFormRegister<RecipeFormInput>
  errors: FieldErrors<RecipeFormInput>
  setValue: UseFormSetValue<RecipeFormInput>
  clearErrors: UseFormClearErrors<RecipeFormInput>
  ingredients: iIngredient[]
  gallery: string[]
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedIngredientIds?: string[]
  defaultMachine?: string
  isEdit?: boolean
}) => {
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
      <FormSelect
        tag='machine'
        selectName='Máquina'
        placeholder='Selecciona una máquina'
        defaultValue={defaultMachine}
        options={machineOptions}
        onChange={(value: string) => {
          setValue('machine', value as RecipeMachineOption)
          clearErrors('machine')
        }}
        error={errors.machine?.message}
      />
      <FormMultiSelect
        label='Ingredientes'
        isRequired
        options={ingredients.map(ingredient => ({
          value: ingredient._id,
          name: ingredient.name,
          selected: false
        }))}
        onChange={(values: string[]) => {
          setValue('ingredientIds', values)
          clearErrors('ingredientIds')
        }}
        error={errors.ingredientIds?.message as string | undefined}
        data={selectedIngredientIds}
      />
      <FormTextarea
        {...register('steps', {
          required: {
            value: true,
            message: 'Pasos requeridos'
          }
        })}
        label='Pasos'
        placeholder='Un paso por línea'
        error={errors.steps?.message}
        required
      />
      <RecipeGalleryManager
        gallery={gallery}
        onChange={value => setValue('gallery', value)}
      />
      <div className='col-span-2 mt-4 flex justify-end gap-4'>
        <Button
          text='Cancelar'
          isFit
          small
          secondary
          onMouseClick={() => setIsOpen(false)}
          type='button'
        />
        <Button
          text={isEdit ? 'Actualizar' : 'Insertar'}
          type='submit'
          isFit
          small
        />
      </div>
    </form>
  )
}

export default RecipeForm
