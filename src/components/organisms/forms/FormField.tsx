import { useState } from 'react'

import Button from '../../atoms/Button'

const FormField = ({
  tag,
  type,
  title,
  isRequired,
  quickButtons,
  defaultValue
}: {
  tag: string
  type: string
  title: string
  isRequired?: boolean
  quickButtons?: string[]
  defaultValue?: string
}) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : '')
  const handleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setValue(e.currentTarget.textContent || '')
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return (
    <div className='w-full'>
      <label className='mb-1 block w-full' htmlFor={tag}>
        {title} {isRequired && <span className='text-warn'>*</span>}
      </label>
      {quickButtons && (
        <div className='my-2 flex justify-between gap-2'>
          {quickButtons.map(buttonText => (
            <Button
              key={buttonText}
              text={buttonText}
              onMouseClick={e => handleButton(e)}
              outline
              xsmall
            ></Button>
          ))}
        </div>
      )}
      <input
        className='block w-full rounded-md border-1 border-secondaryLighter bg-secondaryLightest p-1 text-sm leading-none text-secondaryLight hover:bg-primary focus:outline-none focus:ring-1 focus:ring-secondaryLighter'
        type={type}
        {...(type === 'number' ? { min: '0' } : {})}
        name={tag}
        id={tag}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default FormField
