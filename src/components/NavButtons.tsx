import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { iHeaders } from '../utils/types'
import Button from './Button'

const NavButtons = ({ headers }: { headers: iHeaders[] }) => {
  const [showMobMenu, setShowMobMenu] = useState(false)

  return (
    <>
      {!showMobMenu && (
        <div className='block sm:hidden'>
          <Button text='Ver menú' onMouseClick={() => setShowMobMenu(true)} />
        </div>
      )}
      {showMobMenu && (
        <div className='block sm:hidden'>
          <Button
            text='Cerrar menú'
            onMouseClick={() => setShowMobMenu(false)}
          />
        </div>
      )}
      <ul
        className={
          (showMobMenu ? 'grid' : 'hidden') +
          ' absolute z-10 w-full grid-cols-1 gap-x-4 gap-y-3 rounded-b-md bg-accent p-4 sm:static sm:z-0 sm:grid sm:grid-cols-2 lg:grid-cols-3'
        }
      >
        {headers?.map(header => (
          <li key={header.title}>
            <NavLink
              to={header.url}
              className='block rounded-md p-2 hover:bg-accentLight'
            >
              {header.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}

export default NavButtons
