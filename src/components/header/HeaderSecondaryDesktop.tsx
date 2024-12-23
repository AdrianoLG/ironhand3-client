import { NavLink } from 'react-router-dom'

import { iHeaders } from '../../utils/types'
import UserNav from './UserNav'

const HeaderSecondaryDesktop = ({ headers }: { headers: iHeaders[] }) => (
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
    <span className='hidden text-accent sm:block'> | </span>
    <li>
      <UserNav color='accent' />
    </li>
  </ul>
)

export default HeaderSecondaryDesktop
