import { Label, Select } from 'radix-ui'
import { forwardRef, useEffect } from 'react'

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@radix-ui/react-icons'

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

  return (
    <div className='flex flex-col'>
      <Label.Root
        className={`mb-1 text-reg ${disabled ? 'text-secondaryLight' : 'text-text'}`}
        htmlFor={tag}
      >
        {selectName} {isRequired && <span className='text-warn'>*</span>}
      </Label.Root>

      <Select.Root
        defaultValue={defaultValue}
        name={tag}
        onValueChange={value => {
          console.log(value)
          onChange(value)
        }}
      >
        <Select.Trigger
          id={selectName}
          className={`inline-flex h-[30px] items-center justify-between gap-[5px] rounded-md border-1 ${disabled ? 'border-secondaryLightest bg-secondaryLightest text-secondaryLighter hover:bg-secondaryLightest data-[placeholder]:text-secondaryLighter' : 'border-secondaryLighter bg-secondaryLightest text-secondary hover:bg-primary data-[placeholder]:text-secondaryLight'} px-2 py-1 text-sm leading-none focus:outline-none focus:ring-1 focus:ring-secondaryLighter`}
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
            <Select.Content className='relative overflow-hidden rounded-md bg-primary shadow-md'>
              <Select.ScrollUpButton className='flex h-[30px] cursor-default items-center justify-center bg-secondaryLighter text-secondary'>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className='absolute rounded-md border-1 border-secondaryLighter'>
                <Select.Group>
                  {options.map(option => (
                    <SelectItem
                      key={option.value}
                      value={
                        hasType
                          ? `${option.value}-${option.type}`
                          : `${option.value}`
                      }
                      className='px-4 py-1 text-sm'
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton className='bg-white flex h-[25px] cursor-default items-center justify-center text-secondary'>
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </div>
      </Select.Root>
      {error && <p className='text-xs text-warn'>{error}</p>}
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
    return (
      <Select.Item
        className={`relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-sm leading-none text-secondary data-[disabled]:pointer-events-none data-[highlighted]:bg-secondaryLight data-[disabled]:text-secondaryLighter data-[highlighted]:text-accent data-[highlighted]:outline-none ${className}`}
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
