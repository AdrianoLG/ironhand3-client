import {
  iTransactionCategoryOption,
  TransactionCategory
} from '../types/types'

import carIcon from '../assets/car.svg'
import educationIcon from '../assets/education.svg'
import foodIcon from '../assets/food.svg'
import healthIcon from '../assets/health.svg'
import houseIcon from '../assets/house.svg'
import motorcycleIcon from '../assets/motorcycle.svg'
import musicIcon from '../assets/music.svg'
import otherIcon from '../assets/other.svg'
import shopIcon from '../assets/shop.svg'
import travelIcon from '../assets/travel.svg'
import viceIcon from '../assets/vice.svg'
import workIcon from '../assets/work.svg'

interface TransactionCategoryInfo {
  icon: string
  labelEs: string
}

const categoryMap: Record<string, TransactionCategoryInfo> = {
  house: { icon: houseIcon, labelEs: 'Casa' },
  work: { icon: workIcon, labelEs: 'Trabajo' },
  food: { icon: foodIcon, labelEs: 'Comida' },
  vice: { icon: viceIcon, labelEs: 'Vicio' },
  shop: { icon: shopIcon, labelEs: 'Compras' },
  car: { icon: carIcon, labelEs: 'Coche' },
  other: { icon: otherIcon, labelEs: 'Otros' },
  health: { icon: healthIcon, labelEs: 'Salud' },
  motorcycle: { icon: motorcycleIcon, labelEs: 'Moto' },
  travel: { icon: travelIcon, labelEs: 'Viaje' },
  music: { icon: musicIcon, labelEs: 'Musica' },
  education: { icon: educationIcon, labelEs: 'Educacion' }
}

export const transactionCategoryOptions: iTransactionCategoryOption[] = [
  { value: 'HOUSE', name: 'Casa', icon: houseIcon },
  { value: 'WORK', name: 'Trabajo', icon: workIcon },
  { value: 'FOOD', name: 'Comida', icon: foodIcon },
  { value: 'VICE', name: 'Vicio', icon: viceIcon },
  { value: 'SHOP', name: 'Compras', icon: shopIcon },
  { value: 'CAR', name: 'Coche', icon: carIcon },
  { value: 'OTHER', name: 'Otros', icon: otherIcon },
  { value: 'HEALTH', name: 'Salud', icon: healthIcon },
  { value: 'MOTORCYCLE', name: 'Moto', icon: motorcycleIcon },
  { value: 'TRAVEL', name: 'Viaje', icon: travelIcon },
  { value: 'MUSIC', name: 'Musica', icon: musicIcon },
  { value: 'EDUCATION', name: 'Educacion', icon: educationIcon }
]

export const getTransactionCategoryInfo = (
  category?: TransactionCategory | string
): TransactionCategoryInfo => {
  if (!category) {
    return categoryMap.other
  }

  return categoryMap[category.toLowerCase()] || categoryMap.other
}
