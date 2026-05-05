import { useEffect, useRef, useState } from 'react'

import { RoundSmallButton } from '../../../components/atoms'
import hashtagIcon from '../assets/hashtag.svg'

interface TagsDropdownProps {
  tags: string[]
  activeTag: string | null
  onTagClick: (tag: string | null) => void
}

const TagsDropdown = ({ tags, activeTag, onTagClick }: TagsDropdownProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (tags.length === 0) return null

  return (
    <div className='relative' ref={ref}>
      <RoundSmallButton
        title='Filtrar por etiqueta'
        onClick={() => setOpen(o => !o)}
        active={!!activeTag}
      >
        <img src={hashtagIcon} alt='Etiquetas' className='w-4' />
      </RoundSmallButton>
      {open && (
        <div className='bg-primary border-secondaryLight absolute top-full right-0 z-30 mt-1 min-w-48 rounded border p-3 shadow-md'>
          <p className='text-secondary mb-2 text-xs font-semibold uppercase'>
            Filtrar por etiqueta
          </p>
          <div className='flex flex-wrap gap-1.5'>
            {activeTag && (
              <button
                type='button'
                onClick={() => {
                  onTagClick(null)
                  setOpen(false)
                }}
                className='bg-secondary text-accent rounded px-2 py-0.5 text-xs hover:cursor-pointer hover:opacity-80'
              >
                × Limpiar
              </button>
            )}
            {tags.map(tag => (
              <button
                key={tag}
                type='button'
                onClick={() => {
                  onTagClick(activeTag === tag ? null : tag)
                  setOpen(false)
                }}
                className={`rounded px-2 py-0.5 text-xs hover:cursor-pointer ${activeTag === tag ? 'bg-secondary text-accent' : 'bg-warn text-white hover:opacity-80'}`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TagsDropdown
