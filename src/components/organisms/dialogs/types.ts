export interface iDialog {
  buttonText: string
  title: string
  description: string
  child: React.ReactNode
  secondary?: boolean
  image: string
  isOpen?: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  onOpenChange?: (open: boolean) => void
  xsmall?: boolean
  isFit?: boolean
  outline?: boolean
  hideTrigger?: boolean
  hideImage?: boolean
  hideHeader?: boolean
  contentClasses?: string
}
