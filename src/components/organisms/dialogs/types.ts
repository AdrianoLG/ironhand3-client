export interface iDialog {
  buttonText: string
  title: string
  description: string
  child: React.ReactNode
  secondary?: boolean
  image: string
  isOpen?: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  xsmall?: boolean
  isFit?: boolean
}
