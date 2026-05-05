import { iCatalogPerson } from '../types/types'
import { getFlagSrc, getPersonImageCandidates } from '../utils/catalogMedia'
import { getFullName } from '../utils/catalogPeople'

type PersonTooltipProps = {
  person: iCatalogPerson
  imgFolder: 'actors' | 'directors'
}

const PersonTooltip = ({ person, imgFolder }: PersonTooltipProps) => {
  const fullName = getFullName(person)
  const birthCountryFlagSrc = getFlagSrc(person.birthCountry?.flag)
  const imageCandidates = getPersonImageCandidates(
    person.img,
    fullName,
    imgFolder
  )

  return (
    <span
      className='group relative inline-block'
      onClick={event => event.stopPropagation()}
    >
      <span className='cursor-help underline decoration-dotted'>
        {fullName}
      </span>
      <span className='bg-primary border-secondaryLight pointer-events-none absolute top-full left-0 z-20 mt-1 hidden w-16 rounded border shadow-md group-hover:block'>
        {imageCandidates.length > 0 && (
          <img
            src={imageCandidates[0]}
            alt={fullName}
            className='w-16 rounded'
            data-fallback-index='0'
            onError={event => {
              const imageElement = event.currentTarget
              const currentIndex = Number(
                imageElement.dataset.fallbackIndex || '0'
              )
              const nextIndex = currentIndex + 1

              if (nextIndex < imageCandidates.length) {
                const nextSrc = imageCandidates[nextIndex]
                if (!nextSrc) return
                imageElement.dataset.fallbackIndex = String(nextIndex)
                imageElement.src = nextSrc
              } else {
                imageElement.style.display = 'none'
              }
            }}
          />
        )}
        {person.birthCountry?.name && birthCountryFlagSrc && (
          <img
            src={birthCountryFlagSrc}
            alt={`Bandera de ${person.birthCountry.name}`}
            className='absolute right-1 bottom-1 mr-1 h-3 w-4 rounded-sm object-cover'
          />
        )}
      </span>
    </span>
  )
}

export const renderPeopleWithTooltip = (
  people: iCatalogPerson[],
  imgFolder: 'actors' | 'directors'
) =>
  people.map((person, index) => (
    <span key={person._id}>
      <PersonTooltip person={person} imgFolder={imgFolder} />
      {index < people.length - 1 ? ', ' : ''}
    </span>
  ))

export default PersonTooltip
