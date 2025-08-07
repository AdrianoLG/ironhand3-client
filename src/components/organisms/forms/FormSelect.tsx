import '../../../styles.css'

import { Label, Select } from 'radix-ui'
import { forwardRef, useEffect } from 'react'

import { useReactiveVar } from '@apollo/client'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@radix-ui/react-icons'

import { mode } from '../../../main'
import { iFormSelect } from './types'

const FormSelect = ({
  selectName,
  placeholder,
  options,
  isRequired,
  error,
  tag,
  onChange,
  hasType,
  defaultValue,
  showFields,
  disabled
}: iFormSelect) => {
  useEffect(() => {
    if (showFields && defaultValue) {
      showFields(defaultValue.split('-')[1])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isDarkMode = useReactiveVar(mode)

  return (
    <div className='flex flex-col'>
      <Label.Root
        className={`text-reg mb-1 ${disabled ? 'text-secondaryLight' : 'text-text'}`}
        htmlFor={tag}
      >
        {selectName} {isRequired && <span className='text-warn'>*</span>}{' '}
      </Label.Root>

      <Select.Root
        defaultValue={defaultValue}
        name={tag}
        onValueChange={value => {
          onChange(value)
        }}
      >
        <Select.Trigger
          id={selectName}
          className={`inline-flex h-[30px] items-center justify-between gap-[5px] rounded-md border-1 ${disabled ? 'border-secondaryLightest bg-secondaryLightest text-secondaryLighter data-[placeholder]:text-secondaryLighter' : 'border-secondaryLighter bg-secondaryLightest text-secondary data-[placeholder]:text-secondaryLight'} focus:ring-secondaryLighter px-2 py-1 text-sm leading-none focus:ring-1 focus:outline-none`}
          aria-label={selectName}
          disabled={disabled}
        >
          <Select.Value placeholder={placeholder} className='text-sm' />
          <Select.Icon className='text-secondary'>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <div className='absolute z-50'>
          <Select.Portal>
            <Select.Content
              className={`${isDarkMode === 'dark' ? 'bg-[black] text-[white]' : 'bg-[white] text-[black]'} relative overflow-hidden rounded-md shadow-md`}
            >
              <Select.ScrollUpButton className='bg-secondaryLighter text-secondary flex h-[30px] cursor-default items-center justify-center'>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className='border-secondaryLighter absolute rounded-md border-1'>
                <Select.Group>
                  {options.map(option => (
                    <SelectItem
                      key={option.value}
                      value={
                        hasType
                          ? `${option.value}-${option.type}`
                          : `${option.value}`
                      }
                      className={`px-4 py-1 text-sm`}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton className='text-secondary flex h-[25px] cursor-default items-center justify-center bg-white'>
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </div>
      </Select.Root>
      {error && <p className='text-warn text-xs'>{error}</p>}
    </div>
  )
}

interface SelectItemProps {
  children: React.ReactNode
  className?: string
  value: string
  disabled?: boolean
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    const isDarkMode = useReactiveVar(mode)
    return (
      <Select.Item
        className={`${isDarkMode === 'dark' ? 'data-[highlighted]:bg-[var(--lightYellow)] data-[highlighted]:text-[var(--darkBlue)]' : 'data-[highlighted]:bg-[var(--lightestBlue)]'} text-secondary data-[disabled]:text-secondaryLighter relative flex h-[25px] items-center rounded-[3px] pr-[35px] pl-[25px] text-sm leading-none select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none ${className}`}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className='absolute left-0 inline-flex w-[25px] items-center justify-center'>
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    )
  }
)

export default FormSelect
