interface ListButtonProps {
  onClick: () => void
  active?: boolean
  children: React.ReactNode
  suffix?: React.ReactNode
}

const ListButton = ({
  onClick,
  active = false,
  children,
  suffix
}: ListButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`hover:bg-secondaryLightest flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:cursor-pointer ${active ? 'text-secondary font-semibold' : ''}`}
    >
      <span>{children}</span>
      {suffix && <span className='text-secondary ml-2'>{suffix}</span>}
    </button>
  )
}

export default ListButton
