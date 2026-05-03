import { useEffect, useState } from 'react'

import { CheckIcon } from '@radix-ui/react-icons'

import { iFormMultiSelectIcon, iMultiSelectIcon } from './types'

const FormMultiSelectIcon = ({
  label,
  isRequired,
  options,
  onChange,
  error,
  data
}: iFormMultiSelectIcon) => {
  const [selectedOption, setSelectedOption] = useState<string>(data || '')

  useEffect(() => {
    setSelectedOption(data || '')
  }, [data])

  const isSelected = (value: string) => selectedOption === value

  const changeOption = (option: iMultiSelectIcon) => {
    const newSelected = isSelected(option.value) ? '' : option.value
    setSelectedOption(newSelected)
    onChange(newSelected)
  }

  const resetOptions = () => {
    setSelectedOption('')
    onChange('')
  }

  return (
    <div className='col-span-2 w-full'>
      <label className='text-text mb-1 block w-full text-sm'>
        {label} {isRequired && <span className='text-warn'>*</span>}
      </label>
      <div className='mb-2 flex flex-wrap gap-2'>
        {options.map(option => (
          <div
            key={option.value}
            className='border-secondaryLighter bg-secondaryLightest text-secondaryLight hover:bg-primary focus:ring-secondaryLighter flex w-fit items-center justify-between gap-2 rounded-md border-1 p-1 text-sm leading-none hover:cursor-pointer hover:shadow-sm focus:ring-1 focus:outline-none'
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') changeOption(option)
            }}
            onClick={() => changeOption(option)}
          >
            <img src={option.icon} alt={option.name} className='h-3 w-3' />
            <p className='select-none'>{option.name}</p>
            <div className='border-secondaryLighter flex h-3 w-3 items-center justify-center rounded-sm border-1'>
              {isSelected(option.value) && <CheckIcon />}
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-end'>
        <div
          className='border-secondaryLighter bg-warn text-textInv hover:bg-primary hover:text-warn focus:ring-secondaryLighter flex w-fit items-center justify-between gap-2 rounded-md border-1 px-3 py-1 text-sm leading-none hover:cursor-pointer hover:shadow-md focus:ring-1 focus:outline-none'
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') resetOptions()
          }}
          onClick={() => resetOptions()}
        >
          <p>Reset</p>
        </div>
      </div>
      {error && <p className='text-warn text-xs'>{error}</p>}
    </div>
  )
}

export default FormMultiSelectIcon
