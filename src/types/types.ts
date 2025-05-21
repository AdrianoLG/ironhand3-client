import { iExercise } from '../feature/exercise/types/exercises'

export interface iHeaders {
  title: string
  url: string
}

export interface iPopupData {
  title: string
  subtitle: string
  image: string
  action: () => void
}

export interface iShortcut {
  _id: string
  title: string
  subtitle?: string
  image: string
  category: string
  action: string
}

export interface iShortcutCategoriesAndHeaders {
  shortcutCategories: {
    _id: string
    title: string
    shortcuts: iShortcut[]
  }[]
  headers: {
    title: string
    url: string
  }[]
}

export interface iShortcutCategoriesHeadersAndCompletedExercises {
  shortcutCategories: {
    _id: string
    title: string
    shortcuts: iShortcut[]
  }[]
  headers: {
    title: string
    url: string
  }[]
  completedExercises: {
    date: Date
    exercise: iExercise
    repetitions: number
    time: number
  }[]
}

export interface iShortcuts {
  _id: string
  title: string
  shortcuts: iShortcut[]
  action?: string
}
