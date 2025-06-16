const Button = ({
  text,
  onMouseClick,
  small,
  xsmall,
  secondary,
  outline,
  classes,
  disabled,
  type,
  isFit
}: {
  text: string
  onMouseClick?: React.MouseEventHandler<HTMLButtonElement>
  small?: boolean
  xsmall?: boolean
  secondary?: boolean
  outline?: boolean
  classes?: string
  disabled?: boolean
  type?: 'submit' | 'reset' | 'button'
  isFit?: boolean
}) => (
  <button
    className={`${isFit ? 'w-fit' : 'w-full'} ${disabled ? 'cursor-default opacity-60' : 'hover:shadow-md'} ${secondary ? 'bg-accent text-secondary' : outline ? 'border-secondary bg-primary text-secondary' : 'bg-secondary text-accent'} ${small ? 'text-reg px-4 py-1' : xsmall ? 'px-4 py-1 text-xs' : 'px-6 py-2 text-xl'} border-secondary hover:border-secondary hover:bg-primary hover:text-secondary focus:ring-secondaryLighter rounded-md border-1 hover:cursor-pointer focus:ring-1 focus:outline-none ${classes ? classes : ''} `}
    onClick={disabled ? undefined : onMouseClick}
    type={type}
    tabIndex={disabled ? -1 : 0}
  >
    {text}
  </button>
)

export default Button
