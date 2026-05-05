interface RoundSmallButtonProps {
  title: string
  onClick: () => void
  active?: boolean
  children: React.ReactNode
}

const RoundSmallButton = ({
  title,
  onClick,
  active = false,
  children
}: RoundSmallButtonProps) => {
  return (
    <button
      type='button'
      title={title}
      onClick={onClick}
      className={`border-secondaryLight hover:bg-secondaryLightest flex size-7 items-center justify-center rounded-full border-1 hover:cursor-pointer ${active ? 'bg-secondaryLightest' : ''}`}
    >
      {children}
    </button>
  )
}

export default RoundSmallButton
