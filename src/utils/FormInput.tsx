import { forwardRef, HTMLProps, Ref } from 'react'

import Button from '../components/Button'

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string
  error?: string
  quickButtons?: string[]
  handleButtons?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const FormInput = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const {
      label,
      error,
      quickButtons,
      required,
      handleButtons,
      ...inputProps
    } = props

    return (
      <div className='w-full'>
        <label htmlFor={label} className='mb-1 block w-full'>
          {label} {required && <span className='text-warn'>*</span>}
        </label>
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
        <input
          id={label}
          ref={ref}
          {...inputProps}
          className='block w-full rounded-md border-1 border-secondaryLighter bg-secondaryLightest p-1 text-sm leading-none text-secondaryLight hover:bg-primary focus:outline-none focus:ring-1 focus:ring-secondaryLighter'
        />
        {error && <p className='text-xs text-warn'>{error}</p>}
      </div>
    )
  }
)

export default FormInput
