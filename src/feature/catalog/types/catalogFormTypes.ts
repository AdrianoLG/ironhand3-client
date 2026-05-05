import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form'

import {
  iMultiSelect,
  iSelectOptions
} from '../../../components/organisms/forms/types'

export type BookFormInput = {
  title: string
  author: string[]
  cover: string
  format: 'PAPER' | 'ELECTRONIC'
  pages: number
  rating?: number
  coverMaterial?: 'SOFT' | 'HARD'
  editorial?: string
  publishedYear?: number
  synopsis?: string
  genres: string[]
  tags: string[]
}

export type SerieFormInput = {
  title: string
  director: string[]
  actors?: string[]
  country?: string
  cover?: string
  episodeDuration?: number
  rating?: number
  year?: number
  genres: string[]
  tags: string[]
}

export type MovieFormInput = {
  title: string
  director: string[]
  actors?: string[]
  country?: string
  cover: string
  duration?: number
  rating?: number
  year?: number
  genres: string[]
  tags: string[]
}

export const formatOptions: iSelectOptions[] = [
  { value: 'PAPER', name: 'Papel' },
  { value: 'ELECTRONIC', name: 'Electrónico' }
]

export const coverMaterialOptions: iSelectOptions[] = [
  { value: 'SOFT', name: 'Blanda' },
  { value: 'HARD', name: 'Dura' }
]

export interface BookFormProps {
  handleSubmit: UseFormHandleSubmit<BookFormInput>
  onSubmit: SubmitHandler<BookFormInput>
  register: UseFormRegister<BookFormInput>
  errors: FieldErrors<BookFormInput>
  setValue: UseFormSetValue<BookFormInput>
  watch: UseFormWatch<BookFormInput>
  authorOptions: iSelectOptions[]
  genreOptions: iMultiSelect[]
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
