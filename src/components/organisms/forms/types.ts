import { HTMLProps } from 'react'

export interface iMultiSelect {
  value: string
  name: string
  selected: boolean
}

export interface iMultiSelectIcon {
  value: string
  name: string
  icon: string
}

export interface iSelectOptions {
  value: string
  name: string
  type?: string
  hasType?: boolean
}

export interface iFileProps extends HTMLProps<HTMLInputElement> {
  label: string
  sublabel?: string
  error?: string
  acceptedTypes?: string
  multiple?: boolean
  maxSize?: number
  createThumbnail?: boolean
  setError?: (error: string) => void
  onUpload: (value: string) => void
  img?: string
  path: string
}

export interface iFormField {
  tag: string
  type: string
  title: string
  isRequired?: boolean
  quickButtons?: string[]
  defaultValue?: string
}

export interface iFormMultiSelect {
  label: string
  isRequired?: boolean
  options: iMultiSelect[]
  onChange: (value: string[]) => void
  error?: string
  data?: string[]
}

export interface iFormInputAutocompleteMulti {
  label: string
  isRequired?: boolean
  options: iSelectOptions[]
  onChange: (value: string[]) => void
  placeholder?: string
  error?: string
  data?: string[]
}

export interface iFormInputTagChips {
  label: string
  isRequired?: boolean
  onChange: (value: string[]) => void
  placeholder?: string
  error?: string
  data?: string[]
}

export interface iFormMultiSelectIcon {
  label: string
  isRequired?: boolean
  options: iMultiSelectIcon[]
  onChange: (value: string) => void
  error?: string
  data?: string
}

export interface iFormSelect {
  selectName: string
  placeholder?: string
  options: iSelectOptions[]
  isRequired?: boolean
  error?: string
  tag: string
  onChange: (value: string) => void
  hasType?: boolean
  defaultValue?: string
  changeDefaultValue?: (value: string) => void
  showFields?: (type: string) => void
  disabled?: boolean
}

export interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string
  error?: string
  quickButtons?: string[]
  inputClasses?: string
  handleButtons?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
