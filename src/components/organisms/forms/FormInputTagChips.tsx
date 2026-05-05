import { useEffect, useState } from 'react'

import { Cross2Icon } from '@radix-ui/react-icons'

import { iFormInputTagChips } from './types'

const normalizeTag = (rawTag: string) =>
  rawTag.replace(/^#+/, '').trim().toLowerCase()

const FormInputTagChips = ({
  label,
  onChange,
  placeholder,
  isRequired,
  error,
  data
}: iFormInputTagChips) => {
  const [query, setQuery] = useState('')
  const [tags, setTags] = useState<string[]>(data ?? [])

  useEffect(() => {
    setTags(data ?? [])
  }, [data])

  const commitTag = (rawTag: string) => {
    const tag = normalizeTag(rawTag)
    if (!tag) return
    if (tags.includes(tag)) {
      setQuery('')
      return
    }

    const nextTags = [...tags, tag]
    setTags(nextTags)
    onChange(nextTags)
    setQuery('')
  }

  const removeTag = (tagToRemove: string) => {
    const nextTags = tags.filter(tag => tag !== tagToRemove)
    setTags(nextTags)
    onChange(nextTags)
  }

  return (
    <div className='w-full'>
      <label htmlFor={label} className='text-text mb-1 block w-full text-sm'>
        {label} {isRequired && <span className='text-warn'>*</span>}
      </label>
      <div className='bg-secondaryLightest border-secondaryLighter rounded-md border-1 p-1'>
        {tags.length > 0 && (
          <div className='mb-1 flex flex-wrap gap-1'>
            {tags.map(tag => (
              <span
                key={tag}
                className='bg-warn text-accent inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs'
              >
                #{tag}
                <button
                  type='button'
                  onClick={() => removeTag(tag)}
                  className='hover:text-primary inline-flex items-center justify-center hover:cursor-pointer'
                  title={`Eliminar etiqueta ${tag}`}
                  aria-label={`Eliminar etiqueta ${tag}`}
                >
                  <Cross2Icon />
                </button>
              </span>
            ))}
          </div>
        )}
        <input
          id={label}
          type='text'
          value={query}
          placeholder={placeholder}
          onChange={event => {
            const nextValue = event.target.value
            if (nextValue.includes(',')) {
              const [firstTag] = nextValue.split(',')
              if (firstTag) {
                commitTag(firstTag)
                return
              }
            }
            setQuery(nextValue)
          }}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === 'Tab') {
              event.preventDefault()
              commitTag(query)
            }
          }}
          onBlur={() => {
            if (query.trim()) {
              commitTag(query)
            }
          }}
          className='bg-primary hover:bg-primary text-secondaryLight border-secondaryLighter focus:ring-secondaryLighter w-full rounded-md border-1 p-1 text-sm leading-none focus:ring-1 focus:outline-none'
        />
      </div>
      {error && <p className='text-warn mt-1 text-xs'>{error}</p>}
    </div>
  )
}

export default FormInputTagChips
