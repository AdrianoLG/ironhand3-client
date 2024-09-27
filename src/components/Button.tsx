const Button = ({
  text,
  onMouseClick
}: {
  text: string
  onMouseClick: React.MouseEventHandler<HTMLButtonElement>
}) => (
  <button
    className='border-1 w-full rounded-md border-secondary bg-secondary px-6 py-2 text-xl text-accent hover:border-secondary hover:bg-primary hover:text-secondary'
    onClick={onMouseClick}
  >
    {text}
  </button>
)

export default Button
