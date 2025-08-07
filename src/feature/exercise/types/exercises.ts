import {
  FieldErrors,
  SubmitHandler,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue
} from 'react-hook-form'

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

export interface iCompleteExerciseForm {
  handleSubmit: UseFormHandleSubmit<iExerciseFormInput>
  onSubmit: SubmitHandler<iExerciseFormInput>
  register: UseFormRegister<iExerciseFormInput>
  errors: FieldErrors<iExerciseFormInput>
  isValid: boolean
  data: iExercises | undefined
  clearErrors: UseFormClearErrors<iExerciseFormInput>
  setIsRequiredSelected: React.Dispatch<React.SetStateAction<boolean>>
  setValue: UseFormSetValue<iExerciseFormInput>
  showFields: (type: string) => void
  completedExerciseData: iCompletedExercise | undefined
  fields: {
    time: boolean
    repetitions: boolean
    weight: boolean
    ppm_max: boolean
    ppm_min: boolean
  }
  handleButtons: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: keyof iExerciseFormInput
  ) => void
  isRequiredSelected: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface iExercise {
  _id: string
  name: string
  bodyParts: string[]
  type: string
  img?: string
}

export interface iExerciseForm {
  handleSubmit: UseFormHandleSubmit<iExercise>
  onSubmit: SubmitHandler<iExercise>
  register: UseFormRegister<iExercise>
  errors: FieldErrors<iExercise>
  setValue: UseFormSetValue<iExercise>
  clearErrors: UseFormClearErrors<iExercise>
  setError: UseFormSetError<iExercise>
  exerciseToUpdate?: iExercise | null
  exerciseTypeOptions: {
    value: string
    name: string
  }[]
  exerciseBodyPartsOptions: {
    value: string
    name: string
    selected: boolean
  }[]
  setExerciseToUpdate?: React.Dispatch<React.SetStateAction<iExercise | null>>
  isValid?: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
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
