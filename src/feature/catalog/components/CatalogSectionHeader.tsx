import { RoundSmallButton } from '../../../components/atoms'
import FormInputSearch from '../../../components/organisms/forms/FormInputSearch'
import SortDropdown from './SortDropdown'
import TagsDropdown from './TagsDropdown'

export type SortField = 'title' | 'person' | 'recent'
export type SortDir = 'asc' | 'desc'
export type SortValue = { field: SortField; dir: SortDir }

interface CatalogSectionHeaderProps {
  title: string
  personLabel: string
  onAdd: () => void
  sortValue: SortValue
  onSortChange: (v: SortValue) => void
  tags: string[]
  activeTag: string | null
  onTagClick: (tag: string | null) => void
  searchPlaceholder: string
  searchValue: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CatalogSectionHeader = ({
  title,
  personLabel,
  onAdd,
  sortValue,
  onSortChange,
  tags,
  activeTag,
  onTagClick,
  searchPlaceholder,
  searchValue,
  onSearchChange
}: CatalogSectionHeaderProps) => {
  return (
    <div className='mb-6'>
      <h2 className='mb-2 text-2xl'>{title}</h2>
      <div className='flex items-center justify-between gap-4'>
        <FormInputSearch
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
        />
        <div className='flex gap-2'>
          <RoundSmallButton
            title={`A\u00f1adir ${title.toLowerCase()}`}
            onClick={onAdd}
          >
            <span className='text-secondary text-lg leading-none'>+</span>
          </RoundSmallButton>
          <SortDropdown
            sortValue={sortValue}
            onSortChange={onSortChange}
            personLabel={personLabel}
          />
          <TagsDropdown
            tags={tags}
            activeTag={activeTag}
            onTagClick={onTagClick}
          />
        </div>
      </div>
    </div>
  )
}

export default CatalogSectionHeader
