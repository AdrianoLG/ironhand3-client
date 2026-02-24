import fruitsIcon from '../assets/svg/plantIcons/fruits.svg'
import herbsIcon from '../assets/svg/plantIcons/herbs.svg'
import medicinalIcon from '../assets/svg/plantIcons/medicinal.svg'
import vegetablesIcon from '../assets/svg/plantIcons/vegetables.svg'

export const plantIconMap: Record<string, string> = {
  vegetables: vegetablesIcon,
  fruits: fruitsIcon,
  herbs: herbsIcon,
  medicinal: medicinalIcon
}

export const getPlantIcon = (category?: string): string => {
  if (!category) return vegetablesIcon
  return plantIconMap[category.toLowerCase()] || vegetablesIcon
}
