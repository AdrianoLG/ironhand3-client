import { useEffect, useRef, useState } from 'react'

import { ListButton, RoundSmallButton } from '../../../components/atoms'
import orderIcon from '../assets/order.svg'
import { SortField, SortValue } from './CatalogSectionHeader'

const sortFieldOptions: { value: SortField; label: string }[] = [
  { value: 'title', label: 'Título' },
  { value: 'person', label: 'Persona' },
  { value: 'recent', label: 'Reciente' }
]

interface SortDropdownProps {
  sortValue: SortValue
  onSortChange: (v: SortValue) => void
  personLabel: string
}

const SortDropdown = ({
  sortValue,
  onSortChange,
  personLabel
}: SortDropdownProps) => {
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

  return (
    <div className='relative' ref={ref}>
      <RoundSmallButton
        title='Ordenar'
        onClick={() => setOpen(o => !o)}
        active={sortValue.field !== 'recent' || sortValue.dir !== 'desc'}
      >
        <img src={orderIcon} alt='Ordenar' className='w-4' />
      </RoundSmallButton>
      {open && (
        <div className='bg-primary border-secondaryLight absolute top-full right-0 z-30 mt-1 min-w-40 rounded border shadow-md'>
          <p className='text-secondary px-3 pt-2 pb-1 text-xs font-semibold uppercase'>
            Ordenar por
          </p>
          {sortFieldOptions.map(opt => (
            <ListButton
              key={opt.value}
              active={sortValue.field === opt.value}
              onClick={() => {
                if (sortValue.field === opt.value) {
                  onSortChange({
                    field: opt.value,
                    dir: sortValue.dir === 'asc' ? 'desc' : 'asc'
                  })
                } else {
                  onSortChange({ field: opt.value, dir: 'asc' })
                }
              }}
              suffix={
                sortValue.field === opt.value
                  ? sortValue.dir === 'asc'
                    ? '↑'
                    : '↓'
                  : undefined
              }
            >
              {opt.value === 'person' ? personLabel : opt.label}
            </ListButton>
          ))}
        </div>
      )}
    </div>
  )
}

export default SortDropdown
