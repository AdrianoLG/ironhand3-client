import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { useMutation } from '@apollo/client'

import { Button } from '../components/atoms'
import FormInput from '../components/organisms/forms/FormInput'
import { FORGOT_PASSWORD } from '../feature/auth/gql/authQueries'

type ForgotPasswordFormInput = {
  email: string
}

const ForgotPassword = () => {
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD)
  const [wasSent, setWasSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormInput>({ defaultValues: { email: '' } })

  const onSubmit = async (formData: ForgotPasswordFormInput) => {
    await forgotPassword({
      variables: { forgotPasswordInput: { email: formData.email } }
    })
    setWasSent(true)
  }

  return (
    <div className='flex min-h-screen w-full items-center justify-center px-8'>
      {wasSent ? (
        <p className='text-secondary max-w-sm text-center'>
          Si el email existe, te hemos enviado un enlace para restablecer tu
          contraseña. Revisa tu bandeja de entrada.
        </p>
      ) : (
        <form
          className='flex w-full max-w-sm flex-col gap-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='text-secondary mb-2 text-center text-xl font-bold'>
            Recuperar contraseña
          </h1>

          <FormInput
            {...register('email', {
              required: { value: true, message: 'Email requerido' }
            })}
            label='Email'
            type='email'
            error={errors.email?.message}
            required
          />

          <Button
            text={loading ? 'Enviando...' : 'Enviar enlace'}
            type='submit'
            disabled={loading}
          />

          <Link
            to='/login'
            className='text-secondary text-center text-sm underline'
          >
            Volver a iniciar sesión
          </Link>
        </form>
      )}
    </div>
  )
}

export default ForgotPassword
