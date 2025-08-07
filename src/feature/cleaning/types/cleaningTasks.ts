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

export interface iRoom {
  _id: string
  name: string
  slug: string
  image: string
}

export interface iCleaningTask {
  _id: string
  name: string
  slug: string
  img: string
  possibleRooms: iRoom[]
}

export interface iCompletedCleaningTask {
  _id: string
  completedAt: Date
  cleaningTask: iCleaningTask
  rooms: iRoom[]
}

export interface iCompleteCleaningTaskForm {
  handleSubmit: UseFormHandleSubmit<iCompletedCleaningTaskFormInput>
  onSubmit: SubmitHandler<iCompletedCleaningTaskFormInput>
  register: UseFormRegister<iCompletedCleaningTaskFormInput>
  errors: FieldErrors<iCompletedCleaningTaskFormInput>
  isValid: boolean
  data: { cleaningTasks: iCleaningTask[]; rooms: iRoom[] } | undefined
  clearErrors: UseFormClearErrors<iCompletedCleaningTaskFormInput>
  setIsRequiredSelected: React.Dispatch<React.SetStateAction<boolean>>
  setValue: UseFormSetValue<iCompletedCleaningTaskFormInput>
  completedCleaningTaskData: iCompletedCleaningTask | undefined
  isRequiredSelected: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCleaningTaskToUpdate?: React.Dispatch<
    React.SetStateAction<iCleaningTask | null>
  >
  roomOptions: iRoom[]
  setCompletedCleaningTaskToUpdate?: React.Dispatch<
    React.SetStateAction<iCleaningTask | null>
  >
}

export interface iCleaningTaskForm {
  handleSubmit: UseFormHandleSubmit<iCleaningTask>
  onSubmit: SubmitHandler<iCleaningTask>
  register: UseFormRegister<iCleaningTask>
  errors: FieldErrors<iCleaningTask>
  isValid: boolean
  clearErrors: UseFormClearErrors<iCleaningTask>
  setValue: UseFormSetValue<iCleaningTask>
  cleaningTaskToUpdate: iCleaningTask | null
  roomOptions: iRoom[]
  setRoomOptions: React.Dispatch<React.SetStateAction<iRoom[]>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCleaningTaskToUpdate?: React.Dispatch<
    React.SetStateAction<iCleaningTask | null>
  >
  setError: UseFormSetError<iCleaningTask>
}

export interface iCleaningInfo {
  shortcutCategories: {
    _id: string
    title: string
    shortcuts: iShortcut[]
  }[]
  headers: {
    title: string
    url: string
  }[]
  completedCleaningTasks: iCompletedCleaningTask[]
  cleaningTasks: iCleaningTask[]
}

export interface iCompletedCleaningTaskFormInput {
  cleaningTask: string
  completedAt: string
  rooms?: string[]
}

export interface iCleaningTaskFormInput {
  name: string
  slug: string
  img: string
  possibleRooms?: string[]
}
