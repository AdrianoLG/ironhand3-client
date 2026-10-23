import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { useMutation } from '@apollo/client'

import { Button } from '../components/atoms'
import FormInput from '../components/organisms/forms/FormInput'
import { RESET_PASSWORD } from '../feature/auth/gql/authQueries'

type ResetPasswordFormInput = {
  newPassword: string
  confirmPassword: string
}

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ResetPasswordFormInput>({
    defaultValues: { newPassword: '', confirmPassword: '' }
  })

  const newPassword = watch('newPassword')

  const onSubmit = async (formData: ResetPasswordFormInput) => {
    if (!token) return
    setServerError('')
    try {
      await resetPassword({
        variables: {
          resetPasswordInput: { token, newPassword: formData.newPassword }
        }
      })
      navigate('/login')
    } catch {
      setServerError('El enlace no es válido o ha caducado')
    }
  }

  return (
    <div className='flex min-h-screen w-full items-center justify-center px-8'>
      <form
        className='flex w-full max-w-sm flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-secondary mb-2 text-center text-xl font-bold'>
          Elegir nueva contraseña
        </h1>

        <FormInput
          {...register('newPassword', {
            required: { value: true, message: 'Contraseña requerida' },
            minLength: { value: 8, message: 'Mínimo 8 caracteres' }
          })}
          label='Nueva contraseña'
          type='password'
          error={errors.newPassword?.message}
          required
        />

        <FormInput
          {...register('confirmPassword', {
            required: { value: true, message: 'Confirma la contraseña' },
            validate: value =>
              value === newPassword || 'Las contraseñas no coinciden'
          })}
          label='Confirmar contraseña'
          type='password'
          error={errors.confirmPassword?.message}
          required
        />

        {serverError && <p className='text-warn text-sm'>{serverError}</p>}

        <Button
          text={loading ? 'Guardando...' : 'Guardar nueva contraseña'}
          type='submit'
          disabled={loading}
        />
      </form>
    </div>
  )
}

export default ResetPassword
