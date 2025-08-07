import { HTMLProps } from 'react'

export interface iMultiSelect {
  value: string
  name: string
  selected: boolean
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOptions: React.Dispatch<React.SetStateAction<any[]>>
  onChange: (value: string[]) => void
  error?: string
  data?: string[]
}

export interface iFormSelect {
  selectName: string
  placeholder: string
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
