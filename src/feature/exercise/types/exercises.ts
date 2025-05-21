import { iShortcut } from '../../../types/types'

export interface iCompletedExercise {
  _id: string
  date: Date
  exercise: iExercise
  time?: number
  repetitions?: number
  weight?: number
  ppm_max?: number
  ppm_min?: number
  img?: string
}

export interface iExercise {
  _id: string
  name: string
  bodyParts: string[]
  type: string
  img?: string
}

export interface iExerciseFormInput {
  exercise: string
  date: string
  time?: number
  repetitions?: number
  weight?: number
  ppm_max?: number
  ppm_min?: number
}

export interface iExercises {
  exercises: iExercise[]
}

export interface iExercisesInfo {
  shortcutCategories: {
    _id: string
    title: string
    shortcuts: iShortcut[]
  }[]
  headers: {
    title: string
    url: string
  }[]
  completedExercises: iCompletedExercise[]
  exercises: iExercise[]
}
