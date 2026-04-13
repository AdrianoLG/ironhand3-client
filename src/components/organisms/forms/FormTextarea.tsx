import { forwardRef, Ref, TextareaHTMLAttributes } from 'react'

import Button from '../../atoms/Button'

interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
> {
  label: string
  error?: string
  quickButtons?: string[]
  required?: boolean
  inputClasses?: string
  handleButtons?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const FormTextarea = forwardRef(
  (props: TextareaProps, ref: Ref<HTMLTextAreaElement>) => {
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
      <div
        className={`w-full lg:col-span-2 ${props.className ? props.className : ''}`}
      >
        <label htmlFor={label} className='text-text mb-1 block w-full text-sm'>
          {label} {required && <span className='text-warn'>*</span>}
        </label>
        <textarea
          id={label}
          ref={ref}
          rows={4}
          {...inputProps}
          className={`${inputClasses ? inputClasses : 'bg-secondaryLightest hover:bg-primary text-secondaryLight border-secondaryLighter text-sm'} focus:ring-secondaryLighter block w-full rounded-md border-1 p-4 leading-none focus:ring-1 focus:outline-none`}
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

export default FormTextarea
