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
export interface iExercises {
  exercises: iExercise[]
}
export interface iHeaders {
  title: string
  url: string
}

export interface iShortcut {
  _id: string
  title: string
  subtitle?: string
  image: string
  category: string
  action: string
}

export interface iShortcuts {
  _id: string
  title: string
  shortcuts: iShortcut[]
  action?: string
}

export interface iPopupData {
  title: string
  subtitle: string
  image: string
  action: () => void
}

export interface iExercise {
  _id: string
  name: string
  bodyParts: string[]
  type: string
  img?: string
}

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
