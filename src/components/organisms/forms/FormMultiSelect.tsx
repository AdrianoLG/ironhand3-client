import { useEffect, useState } from 'react'

import { CheckIcon } from '@radix-ui/react-icons'

import { iFormMultiSelect, iMultiSelect } from './types'

const FormMultiSelect = ({
  label,
  isRequired,
  options,
  onChange,
  error,
  data,
  setOptions
}: iFormMultiSelect) => {
  const [selectedParts, setSelectedParts] = useState<string[]>(data || [])

  useEffect(() => {
    const optionsToSet = options.map(option =>
      selectedParts.includes(option.value)
        ? { ...option, selected: true }
        : { ...option, selected: false }
    )
    setOptions(optionsToSet)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeOptions = (part: iMultiSelect) => {
    setOptions(
      options.map(option =>
        option.value === part.value
          ? { ...option, selected: !option.selected }
          : option
      )
    )
    if (part.selected) {
      setSelectedParts(
        selectedParts.filter(selectedPart => selectedPart !== part.value)
      )
      onChange(
        selectedParts.filter(selectedPart => selectedPart !== part.value)
      )
    } else {
      setSelectedParts([...selectedParts, part.value])
      onChange([...selectedParts, part.value])
    }
  }

  const resetOptions = () => {
    setOptions(
      options.map(option => ({
        ...option,
        selected: false
      }))
    )
    setSelectedParts([])
    onChange([])
  }

  return (
    <div className='col-span-2 w-full'>
      <label className='text-text mb-1 block w-full'>
        {label} {isRequired && <span className='text-warn'>*</span>}
      </label>
      <div className='mb-2 flex flex-wrap gap-2'>
        {options.map(part => (
          <div
            key={part.value}
            className='border-secondaryLighter bg-secondaryLightest text-secondaryLight hover:bg-primary focus:ring-secondaryLighter flex w-fit items-center justify-between gap-2 rounded-md border-1 p-1 text-sm leading-none hover:cursor-pointer hover:shadow-sm focus:ring-1 focus:outline-none'
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') changeOptions(part)
            }}
            onClick={() => changeOptions(part)}
          >
            <p className='select-none'>{part.name}</p>
            <div className='border-secondaryLighter flex h-3 w-3 items-center justify-center rounded-sm border-1'>
              {part.selected && <CheckIcon />}
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-end'>
        <div
          key='reset'
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

export default FormMultiSelect
