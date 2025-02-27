import { HTMLProps, useRef, useState } from 'react'

import Button from '../../atoms/Button'

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string
  error?: string
  acceptedTypes?: string
  multiple?: boolean
  maxSize?: number
  setError?: (error: string) => void
  onUpload: (value: string) => void
}

const FormInputFile = (props: InputProps) => {
  const {
    label,
    error,
    required,
    acceptedTypes,
    multiple,
    onUpload,
    maxSize,
    setError,
    ...inputProps
  } = props
  const [preview, setPreview] = useState<string>()
  const uploadButtonLabel = preview ? 'Cambiar imagen' : 'Subir imagen'

  const hiddenInputRef = useRef<HTMLInputElement | null>()

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileSizeInMB = file.size / 1024 / 1024
      if (setError) {
        if (maxSize && fileSizeInMB > maxSize) {
          setError(`El archivo excede el tamaño máximo de ${maxSize}MB`)
        } else {
          const formdata = new FormData()
          formdata.append('path', 'exercise')
          formdata.append('file', file)

          await fetch(import.meta.env.VITE_UPLOAD_URI, {
            method: 'POST',
            body: formdata
          })
            .then(response => response.json())
            .then(result => {
              if (result.error) {
                if (result.status === 400) {
                  setError('Sólo se permiten imágenes')
                }
                if (result.status === 413) {
                  if (maxSize) {
                    setError(
                      `El archivo excede el tamaño máximo de ${maxSize}MB`
                    )
                  } else {
                    setError('El archivo excede el tamaño máximo')
                  }
                }
                if (result.status === 500) {
                  setError('No existe carpeta en el servidor')
                }
                return
              }
              setPreview(result.data.image)
              onUpload(result.data.image)
              setError('')
            })
            .catch(error => console.log('error', error))
        }
      }
    }
  }

  const hideRef = () => {
    hiddenInputRef.current?.click()
  }

  return (
    <div className='w-full'>
      <label htmlFor={label} className='mb-1 block w-full'>
        {label} {required && <span className='text-warn'>*</span>}
      </label>
      <Button text={uploadButtonLabel} xsmall outline onMouseClick={hideRef} />
      <input
        id={label}
        hidden
        {...inputProps}
        onChange={handleUploadFile}
        ref={e => {
          hiddenInputRef.current = e
        }}
        accept={acceptedTypes}
        multiple={multiple}
      />
      {preview ? (
        <img src={preview} className='mt-2 block w-full' alt='Preview' />
      ) : (
        error && <p className='text-xs text-warn'>{error}</p>
      )}
    </div>
  )
}

export default FormInputFile
