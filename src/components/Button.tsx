const Button = ({
  text,
  onMouseClick,
  small,
  secondary,
  outline,
  classes,
  disabled,
  type
}: {
  text: string
  onMouseClick: React.MouseEventHandler<HTMLButtonElement>
  small?: boolean
  secondary?: boolean
  outline?: boolean
  classes?: string
  disabled?: boolean
  type?: 'submit' | 'reset' | 'button'
}) => (
  <button
    className={`${outline ? 'w-fit' : 'w-full'} rounded-md border-1 border-secondary ${disabled ? '' : 'hover:drop-shadow-md'} ${secondary ? 'bg-accent text-secondaryLight' : outline ? 'border-secondary bg-primary text-secondary' : 'bg-secondary text-accent'} ${small ? 'px-4 py-1 text-lg' : 'px-6 py-2 text-xl'} hover:border-secondary hover:bg-primary hover:text-secondary ${classes ? classes : ''} ${disabled ? 'cursor-default opacity-40' : ''}`}
    onClick={disabled ? undefined : onMouseClick}
    type={type}
  >
    {text}
  </button>
)

export default Button
