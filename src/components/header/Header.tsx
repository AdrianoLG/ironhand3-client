import { NavLink } from 'react-router-dom'

import IconLogo from '../icons/IconLogo'
import UserNav from './UserNav'

import type { iHeaders } from '../../utils/types'

const MainHeader = () => (
  <header className='mx-auto px-8 py-3 xl:max-w-screen-content 2xl:px-0'>
    <nav>
      <ul className='flex justify-end gap-3'>
        <li>
          <UserNav color='secondaryLight' />
        </li>
      </ul>
    </nav>
  </header>
)

const SecondaryHeader = ({ headers }: { headers: iHeaders[] }) => (
  <div className='bg-secondary shadow-md'>
    <header className='mx-auto flex justify-between px-8 py-3 xl:max-w-screen-content 2xl:px-0'>
      <NavLink to='/' className='flex justify-start gap-1'>
        <div className='w-5'>
          <IconLogo color='accent' />
        </div>
        <h1 className='text-reg text-accent'>Iron Hand</h1>
      </NavLink>
      <nav>
        <ul className='flex justify-end gap-3'>
          {headers.map(header => (
            <li key={header.title} className='text-accent'>
              <NavLink to={`/${header.url}</li>`}>{header.title}</NavLink>
            </li>
          ))}
          <span className='text-accent'> | </span>
          <li>
            <UserNav color='accent' />
          </li>
        </ul>
      </nav>
    </header>
  </div>
)

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
