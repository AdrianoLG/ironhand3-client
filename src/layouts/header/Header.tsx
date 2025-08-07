import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import IconLogo from '../../assets/svgs/IconLogo'
import ModeButton from '../../components/atoms/ModeButton'
import { iHeaders } from '../../types/types'
import HeaderSecondaryDesktop from './HeaderSecondaryDesktop'
import HeaderSecondaryMobile from './HeaderSecondaryMobile'
import UserNav from './UserNav'

const MainHeader = () => {
  return (
    <header className='bg-primary xl:max-w-screen-content mx-auto px-8 py-3'>
      <nav className='flex items-center justify-end gap-4'>
        <ModeButton />
        <span className='text-secondaryLighter hidden sm:block'> | </span>
        <ul className='flex justify-end gap-3'>
          <li>
            <UserNav color='secondaryLight' />
          </li>
        </ul>
      </nav>
    </header>
  )
}

const SecondaryHeader = ({ headers }: { headers: iHeaders[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHover, setIsHover] = useState(false)

  return (
    <>
      <div
        className={`bg-transparent70 absolute z-10 block h-screen w-full lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div className='bg-secondary relative z-30 shadow-md'>
        <header className='xl:max-w-screen-content mx-auto flex items-center justify-between px-8 py-1 lg:py-3'>
          <NavLink
            to='/'
            className='flex items-center justify-start gap-1'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <div className='w-5'>
              <IconLogo color={`${isHover ? 'primary' : 'accent'}`} />
            </div>
            <h1 className={`text-reg text-${isHover ? 'primary' : 'accent'}`}>
              Iron Hand
            </h1>
          </NavLink>
          <nav>
            <HeaderSecondaryDesktop headers={headers} />
            <HeaderSecondaryMobile
              isOpen={isOpen}
              headers={headers}
              setIsOpen={setIsOpen}
            />
          </nav>
        </header>
      </div>
    </>
  )
}

const Header = ({
  isMain,
  headers
}: {
  isMain: boolean
  headers?: iHeaders[]
}) =>
  isMain ? (
    <MainHeader />
  ) : headers ? (
    <SecondaryHeader headers={headers} />
  ) : (
    <></>
  )

export default Header
