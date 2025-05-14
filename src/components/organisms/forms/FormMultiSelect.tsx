import { useState } from 'react'

import { CheckIcon } from '@radix-ui/react-icons'

import { iMultiSelect } from '../../../utils/types'

const FormMultiSelect = ({
  label,
  isRequired,
  options,
  onChange,
  error
}: {
  label: string
  isRequired?: boolean
  options: iMultiSelect[]
  onChange: (value: string[]) => void
  error?: string
}) => {
  const [bodyPartsOptions, setBodyPartsOptions] = useState(options)
  const [selectedParts, setSelectedParts] = useState<string[]>([])
  return (
    <div className='col-span-2 w-full'>
      <label className='mb-1 block w-full'>
        {label} {isRequired && <span className='text-warn'>*</span>}
      </label>
      <div className='mb-2 flex flex-wrap gap-2'>
        {bodyPartsOptions.map(part => (
          <div
            key={part.value}
            className='flex w-fit items-center justify-between gap-2 rounded-md border-1 border-secondaryLighter bg-secondaryLightest p-1 text-sm leading-none text-secondaryLight hover:cursor-pointer hover:bg-primary hover:shadow-sm focus:outline-none focus:ring-1 focus:ring-secondaryLighter'
            onClick={() => {
              setBodyPartsOptions(
                bodyPartsOptions.map(option =>
                  option.value === part.value
                    ? { ...option, selected: !option.selected }
                    : option
                )
              )
              if (part.selected) {
                setSelectedParts(
                  selectedParts.filter(
                    selectedPart => selectedPart !== part.value
                  )
                )
                onChange(
                  selectedParts.filter(
                    selectedPart => selectedPart !== part.value
                  )
                )
              } else {
                setSelectedParts([...selectedParts, part.value])
                onChange([...selectedParts, part.value])
              }
            }}
          >
            <p className='select-none'>{part.name}</p>
            <div className='flex h-3 w-3 items-center justify-center rounded-sm border-1 border-secondaryLighter'>
              {part.selected && <CheckIcon />}
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-end'>
        <div
          key='reset'
          className='flex w-fit items-center justify-between gap-2 rounded-md border-1 border-secondaryLighter bg-warn px-3 py-1 text-sm leading-none text-textInv hover:cursor-pointer hover:bg-primary hover:text-warn hover:shadow-sm focus:outline-none focus:ring-1 focus:ring-secondaryLighter'
          onClick={() => {
            setBodyPartsOptions(
              bodyPartsOptions.map(option => ({
                ...option,
                selected: false
              }))
            )
            setSelectedParts([])
            onChange([])
          }}
        >
          <p>Reset</p>
        </div>
      </div>
      {error && <p className='text-xs text-warn'>{error}</p>}
    </div>
  )
}

export default FormMultiSelect
