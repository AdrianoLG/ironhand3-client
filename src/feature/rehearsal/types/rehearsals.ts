import {
  FieldErrors,
  SubmitHandler,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form'

import { iShortcut } from '../../../types/types'

export interface iInstrument {
  _id: string
  name: string
  slug: string
  img: string
}

export interface iSheet {
  _id: string
  title: string
  artist: string
  possibleInstruments: iInstrument[]
}

export interface iSheetForm {
  handleSubmit: UseFormHandleSubmit<iSheet>
  onSubmit: SubmitHandler<iSheet>
  register: UseFormRegister<iSheet>
  errors: FieldErrors<iSheet>
  isValid: boolean
  clearErrors: UseFormClearErrors<iSheet>
  setValue: UseFormSetValue<iSheet>
  sheetToUpdate: iSheet | null | undefined
  instrumentOptions: iInstrument[]
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSheetToUpdate?: React.Dispatch<React.SetStateAction<iSheet | null>>
}

export interface iCompletedRehearsal {
  _id: string
  instrument: iInstrument
  completedAt: Date
  sheets: {
    sheet: iSheet
    duration: number
  }[]
}

export interface iRehearsalInfo {
  shortcutCategories: {
    _id: string
    title: string
    shortcuts: iShortcut[]
  }[]
  headers: {
    title: string
    url: string
  }[]
  rehearsals: iCompletedRehearsal[]
  sheets: iSheet[]
}

export interface iCompletedRehearsalFormInput {
  instrument: string
  completedAt: Date
  sheets: {
    sheet: string
    duration: number
  }[]
}

export interface iCompletedRehearsalForm {
  handleSubmit: UseFormHandleSubmit<iCompletedRehearsalFormInput>
  onSubmit: SubmitHandler<iCompletedRehearsalFormInput>
  register: UseFormRegister<iCompletedRehearsalFormInput>
  errors: FieldErrors<iCompletedRehearsalFormInput>
  isValid: boolean
  data:
    | {
        instruments: iInstrument[]
        sheets: iSheet[]
        rehearsals: iCompletedRehearsalFormInput[]
      }
    | undefined
  setValue: UseFormSetValue<iCompletedRehearsalFormInput>
  getValues: UseFormGetValues<iCompletedRehearsalFormInput>
  fields: { id: string }[]
  append: (value: { sheet: string; duration: number }) => void
  remove: (index: number) => void
  completedRehearsalToUpdate: iCompletedRehearsal | null
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsRequiredSelected: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedInstrument: React.Dispatch<React.SetStateAction<string>>
  selectedInstrument: string
}
