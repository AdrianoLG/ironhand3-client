import { useRef, useState } from 'react'

import Button from '../../atoms/Button'
import { iFileProps } from './types'

const FormInputFile = (props: iFileProps) => {
  const {
    label,
    error,
    required,
    acceptedTypes,
    multiple,
    onUpload,
    maxSize,
    setError,
    img,
    path,
    sublabel,
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
          formdata.append('path', path)
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
            .catch(error => {
              setError('No se ha podido subir correctamente la imagen')
              console.log('error', error)
            })
        }
      }
    }
  }

  const hideRef = () => {
    hiddenInputRef.current?.click()
  }

  return (
    <div className='w-full'>
      <label htmlFor={label} className={`text-text mb-1 block w-full`}>
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
      {preview || img ? (
        <img src={preview || img} className='mt-2 block w-full' alt='Preview' />
      ) : (
        error && <p className='text-warn text-xs'>{error}</p>
      )}
      {!error && sublabel && (
        <p className='text-text mt-1 text-xs'>{sublabel}</p>
      )}
    </div>
  )
}

export default FormInputFile
