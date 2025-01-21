import Button from '../Button'

const FormField = ({
  tag,
  type,
  title,
  isRequired,
  quickButtons
}: {
  tag: string
  type: string
  title: string
  isRequired?: boolean
  quickButtons?: string[]
}) => {
  const handleButton = (button: React.MouseEventHandler<HTMLButtonElement>) => {
    console.log(button)
  }
  return (
    <div className='w-full'>
      <label className='block w-full' htmlFor={tag}>
        {title} {isRequired && <span className='text-warn'>*</span>}
      </label>
      {quickButtons && (
        <div className='my-2 flex justify-between gap-2'>
          {quickButtons.map(buttonText => (
            <Button
              key={buttonText}
              text={buttonText}
              onMouseClick={() => handleButton}
              outline
              small
            ></Button>
          ))}
        </div>
      )}
      <input
        className='block w-full border-1'
        type={type}
        name={tag}
        id={tag}
      />
    </div>
  )
}

export default FormField
