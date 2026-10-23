import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { Button } from '../components/atoms';
import FormInput from '../components/organisms/forms/FormInput';
import { useAuth } from '../feature/auth/context/AuthContext';

type LoginFormInput = {
  email: string
  password: string
}

const Login = () => {
  const { login, user, loading } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInput>({ defaultValues: { email: '', password: '' } })

  const onSubmit = async (formData: LoginFormInput) => {
    setServerError('')
    setIsSubmitting(true)
    try {
      await login(formData.email, formData.password)
      navigate('/')
    } catch {
      setServerError('Email o contraseña incorrectos')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!loading && user) return <Navigate to='/' replace />

  return (
    <div className='flex min-h-screen w-full items-center justify-center px-8'>
      <form
        className='flex w-full max-w-sm flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-secondary mb-2 text-center text-xl font-bold'>
          Iniciar sesión
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

        <FormInput
          {...register('password', {
            required: { value: true, message: 'Contraseña requerida' }
          })}
          label='Contraseña'
          type='password'
          error={errors.password?.message}
          required
        />

        {serverError && <p className='text-warn text-sm'>{serverError}</p>}

        <Button
          text={isSubmitting ? 'Entrando...' : 'Entrar'}
          type='submit'
          disabled={isSubmitting}
        />

        <Link
          to='/recuperar-password'
          className='text-secondary text-center text-sm underline'
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </form>
    </div>
  )
}

export default Login
