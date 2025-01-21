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
  action: string
}

export interface iCompletedExercise {
  _id: string
  name: string
  parts: string[]
  repetitions?: number
  cardio?: number
  time?: number
}

export interface iCompletedExercises {
  _id: string
  date: string
  exercises: iCompletedExercise[]
  totalTime: number
}
