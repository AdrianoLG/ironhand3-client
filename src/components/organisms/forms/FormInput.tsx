import { forwardRef, Ref } from 'react'

import Button from '../../atoms/Button'
import { InputProps } from './types'

const FormInput = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const {
      label,
      error,
      quickButtons,
      required,
      inputClasses,
      handleButtons,
      ...inputProps
    } = props

    return (
      <div className={`w-full ${props.className ? props.className : ''}`}>
        <label htmlFor={label} className='text-text mb-1 block w-full text-sm'>
          {label} {required && <span className='text-warn'>*</span>}
        </label>
        <input
          id={label}
          ref={ref}
          {...inputProps}
          {...(props.type === 'number' && { min: '0' })}
          className={`${inputClasses ? inputClasses : 'bg-secondaryLightest hover:bg-primary text-secondaryLight border-secondaryLighter text-sm'} focus:ring-secondaryLighter block w-full rounded-md border-1 p-1 leading-none focus:ring-1 focus:outline-none`}
          tabIndex={0}
        />
        {error && <p className='text-warn mt-1 text-xs'>{error}</p>}
        {quickButtons && (
          <div className='my-2 flex justify-between gap-2'>
            {quickButtons.map(buttonText => (
              <Button
                key={buttonText}
                text={buttonText}
                onMouseClick={e => handleButtons && handleButtons(e)}
                outline
                xsmall
              ></Button>
            ))}
          </div>
        )}
      </div>
    )
  }
)

export default FormInput
