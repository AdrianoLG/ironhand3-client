const CloseButton = ({ strokeColor }: { strokeColor: string }) => (
  <svg
    width='32'
    height='32'
    viewBox='0 0 24 24'
    fill='white'
    xmlns='http://www.w3.org/2000/svg'
  >
    <title>Close button icon</title>
    <rect
      x='1'
      y='1'
      width='22'
      height='22'
      rx='4'
      stroke={strokeColor}
      strokeWidth='2'
    />
    <path
      d='M17 7.00004L7.00004 17M7 7L17 17'
      stroke='var(--secondary)'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
)

export default CloseButton
