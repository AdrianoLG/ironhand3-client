export const getFullName = (person: {
  name: string
  lastName?: string
}): string => `${person.name}${person.lastName ? ` ${person.lastName}` : ''}`

export const getFullNames = (
  people: { name: string; lastName?: string }[]
): string => people.map(getFullName).join(', ')
