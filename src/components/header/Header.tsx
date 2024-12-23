import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import IconLogo from '../icons/IconLogo'
import HeaderSecondaryDesktop from './HeaderSecondaryDesktop'
import HeaderSecondaryMobile from './HeaderSecondaryMobile'
import UserNav from './UserNav'

import type { iHeaders } from '../../utils/types'

const MainHeader = () => (
  <header className='mx-auto px-8 py-3 xl:max-w-screen-content'>
    <nav>
      <ul className='flex justify-end gap-3'>
        <li>
          <UserNav color='secondaryLight' />
        </li>
      </ul>
    </nav>
  </header>
)

const SecondaryHeader = ({ headers }: { headers: iHeaders[] }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={`absolute z-10 block h-screen w-full bg-transparent70 ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div className='relative z-30 bg-secondary shadow-md'>
        <header className='mx-auto flex items-center justify-between px-8 py-1 lg:py-3 xl:max-w-screen-content'>
          <NavLink to='/' className='flex justify-start gap-1'>
            <div className='w-5'>
              <IconLogo color='accent' />
            </div>
            <h1 className='text-reg text-accent'>Iron Hand</h1>
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
}) => {
  if (isMain) {
    return <MainHeader />
  } else {
    if (headers) {
      return <SecondaryHeader headers={headers} />
    }
  }
}

export default Header
