import DarkIcon from '../../assets/svgs/DarkIcon'
import LightIcon from '../../assets/svgs/LightIcon'
import { mode } from '../../main'

const ModeButton = ({
  hasDarkBG,
  isMobile
}: {
  hasDarkBG?: boolean
  isMobile?: boolean
}) => {
  return (
    <button
      onClick={() => {
        const nextMode = mode() === 'light' ? 'dark' : 'light'
        mode(nextMode)
        sessionStorage.setItem('mode', nextMode)
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(nextMode)
      }}
      className={`text-secondaryLight`}
    >
      {mode() === 'light' ? (
        <DarkIcon
          fill={`${hasDarkBG ? 'var(--accent)' : 'var(--secondaryLight)'}`}
          isMobile={isMobile}
        />
      ) : (
        <LightIcon
          fill={`${hasDarkBG ? 'var(--accent)' : 'var(--secondaryLight)'}`}
          isMobile={isMobile}
        />
      )}
    </button>
  )
}
export default ModeButton
