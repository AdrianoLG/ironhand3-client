import { NavLink } from 'react-router-dom'

import ModeButton from '../../components/atoms/ModeButton'
import { iHeaders } from '../../types/types'
import UserNav from './UserNav'

const HeaderSecondaryDesktop = ({ headers }: { headers: iHeaders[] }) => (
  <div className='flex items-center justify-end gap-4'>
    <ul className='hidden justify-end gap-3 lg:flex'>
      {headers.map(header => (
        <li key={header.title} className='text-accent hover:text-primary'>
          <NavLink
            to={`/${header.url}`}
            className={({ isActive }) => (isActive ? 'text-primary' : '')}
          >
            {header.title}
          </NavLink>
        </li>
      ))}
    </ul>
    <div className='hidden items-center justify-end gap-4 lg:flex'>
      <span className='text-accent'> | </span>
      <ModeButton hasDarkBG />
      <span className='text-accent'> | </span>
      <UserNav color='accent' />
    </div>
  </div>
)

export default HeaderSecondaryDesktop
