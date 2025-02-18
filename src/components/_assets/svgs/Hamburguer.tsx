import switchColor from '../../../utils/switchColor'

const Hamburguer = ({
  color,
  width,
  classes,
  isOpen
}: {
  color: string
  width: string
  classes: string
  isOpen: boolean
}) => {
  color = switchColor(color)
  return (
    <svg
      fill={color}
      width={width}
      viewBox='0 0 52 52'
      xmlns='http://www.w3.org/2000/svg'
      className={classes}
    >
      <title>Hamburguer icon</title>
      <path
        d='M50,12.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z'
        className={
          isOpen
            ? 'origin-top-left translate-x-2 rotate-45 transform transition-all duration-500'
            : 'origin-top-left'
        }
      />
      {isOpen ? '' : <path d='M50,28H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z' />}
      <path
        d='M50,43.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z'
        className={
          isOpen
            ? 'origin-bottom-left translate-x-2 -rotate-45 transform transition-all duration-500'
            : 'origin-bottom-left'
        }
      />
    </svg>
  )
}

export default Hamburguer
