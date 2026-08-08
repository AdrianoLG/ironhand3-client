import {
    FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormSetValue
} from 'react-hook-form';

import { Button } from '../../../components/atoms';
import FormInput from '../../../components/organisms/forms/FormInput';
import FormTextarea from '../../../components/organisms/forms/FormTextarea';
import { iProjectFormInput } from '../types/types';

type ProjectFormProps = {
  register: UseFormRegister<iProjectFormInput>
  handleSubmit: UseFormHandleSubmit<iProjectFormInput>
  onSubmit: SubmitHandler<iProjectFormInput>
  errors: FieldErrors<iProjectFormInput>
  setValue: UseFormSetValue<iProjectFormInput>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ProjectForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  setValue,
  setIsOpen
}: ProjectFormProps) => {
  return (
    <form
      className='my-7 flex w-full flex-col gap-4 px-8'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <FormInput
          {...register('title', {
            required: {
              value: true,
              message: 'Escribe un titulo'
            }
          })}
          label='Titulo'
          type='text'
          error={errors.title?.message}
          required
        />

        <FormInput
          {...register('category', {
            required: {
              value: true,
              message: 'Escribe una categoria'
            }
          })}
          label='Categoria'
          type='text'
          error={errors.category?.message}
          required
        />

        <FormTextarea
          {...register('description')}
          label='Descripcion'
          placeholder='Describe el proyecto'
          error={errors.description?.message}
          className='lg:col-span-2'
        />

        <label className='text-text flex items-center gap-2 text-sm lg:col-span-2'>
          <input
            type='checkbox'
            {...register('shared')}
            className='h-4 w-4'
            onChange={event => {
              setValue('shared', event.target.checked)
            }}
          />
          Proyecto compartido
        </label>
      </div>

      <div className='col-span-2 flex justify-end gap-4'>
        <Button
          text='Cancelar'
          isFit
          small
          secondary
          type='button'
          onMouseClick={() => setIsOpen(false)}
        />
        <Button text='Insertar' type='submit' isFit small />
      </div>
    </form>
  )
}

export default ProjectForm
