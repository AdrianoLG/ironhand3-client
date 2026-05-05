import { useMemo, useState } from 'react'

import { iFormInputAutocompleteMulti } from './types'

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

const FormInputAutocompleteMulti = ({
  label,
  options,
  onChange,
  placeholder,
  isRequired,
  error,
  data
}: iFormInputAutocompleteMulti) => {
  const [query, setQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>(data ?? [])

  const selectedOptions = useMemo(
    () => options.filter(option => selectedIds.includes(option.value)),
    [options, selectedIds]
  )

  const availableOptions = useMemo(
    () => options.filter(option => !selectedIds.includes(option.value)),
    [options, selectedIds]
  )

  const filteredOptions = useMemo(() => {
    const normalizedQuery = normalize(query.trim())
    if (!normalizedQuery) return availableOptions.slice(0, 8)

    return availableOptions
      .filter(option => normalize(option.name).includes(normalizedQuery))
      .slice(0, 8)
  }, [availableOptions, query])

  const commitSelection = (optionValue: string) => {
    if (selectedIds.includes(optionValue)) return

    const nextSelectedIds = [...selectedIds, optionValue]
    setSelectedIds(nextSelectedIds)
    onChange(nextSelectedIds)
    setQuery('')
  }

  const removeSelection = (optionValue: string) => {
    const nextSelectedIds = selectedIds.filter(id => id !== optionValue)
    setSelectedIds(nextSelectedIds)
    onChange(nextSelectedIds)
  }

  const tryAutocomplete = () => {
    const normalizedQuery = normalize(query.trim())
    if (!normalizedQuery) return

    const exactMatch = availableOptions.find(
      option => normalize(option.name) === normalizedQuery
    )

    if (exactMatch) {
      commitSelection(exactMatch.value)
      return
    }

    const firstMatch = filteredOptions[0]
    if (firstMatch) {
      commitSelection(firstMatch.value)
    }
  }

  return (
    <div className='w-full'>
      <label htmlFor={label} className='text-text mb-1 block w-full text-sm'>
        {label} {isRequired && <span className='text-warn'>*</span>}
      </label>
      <div className='bg-secondaryLightest border-secondaryLighter rounded-md border-1 p-1'>
        {selectedOptions.length > 0 && (
          <div className='mb-1 flex flex-wrap gap-1'>
            {selectedOptions.map(option => (
              <button
                key={option.value}
                type='button'
                onClick={() => removeSelection(option.value)}
                className='bg-secondary text-accent rounded px-2 py-0.5 text-xs hover:cursor-pointer hover:opacity-90'
                title='Quitar'
              >
                {option.name} ×
              </button>
            ))}
          </div>
        )}
        <input
          id={label}
          type='text'
          value={query}
          placeholder={placeholder}
          onChange={event => setQuery(event.target.value)}
          onKeyDown={event => {
            if (
              event.key === 'Enter' ||
              event.key === 'Tab' ||
              event.key === ','
            ) {
              event.preventDefault()
              tryAutocomplete()
            }
          }}
          className='bg-primary hover:bg-primary text-secondaryLight border-secondaryLighter focus:ring-secondaryLighter w-full rounded-md border-1 p-1 text-sm leading-none focus:ring-1 focus:outline-none'
        />
        {query.trim().length > 0 && filteredOptions.length > 0 && (
          <ul className='bg-primary border-secondaryLighter mt-1 max-h-36 overflow-y-auto rounded-md border-1 py-1'>
            {filteredOptions.map(option => (
              <li key={option.value}>
                <button
                  type='button'
                  className='hover:bg-secondaryLightest w-full px-2 py-1 text-left text-sm hover:cursor-pointer'
                  onClick={() => commitSelection(option.value)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className='text-warn mt-1 text-xs'>{error}</p>}
    </div>
  )
}

export default FormInputAutocompleteMulti
