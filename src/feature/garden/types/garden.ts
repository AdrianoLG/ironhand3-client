export interface iGardenInfo {
  headers: {
    title: string
    url: string
  }[]
  plants: iPlant[]
  crops: iCrop[]
  waterings: iWatering[]
}

export interface iPlant {
  _id: string
  name: string
  specie: iSpecie
  category: string
  planted: Date
  inBloom?: Date[]
  harvested?: Date[]
  death?: {
    date: Date
    cause: string
  }
}

export interface iSpecie {
  _id: string
  name: string
  image: string
  category: 'Vegetables' | 'Fruits' | 'Herbs' | 'Medicinal'
  comments: string
}

export interface iWatering {
  _id: string
  date: Date
  water: number
  fertilizers: iFertilizers[]
}

export interface iFertilizers {
  qty: number
  fertilizer: iFertilizer
}

export interface iFertilizer {
  _id: string
  name: string
  comments: string
  img: string
}

export interface iCrop {
  _id: string
  startDate: Date
  endDate: Date
  plants: iPlant[]
  gallery: string[]
  waterings: iWatering[]
  cropContainer: iCropContainer
}

export interface iCropContainer {
  _id: string
  name: string
  img: string
  capacity: number
  auto: boolean
}
