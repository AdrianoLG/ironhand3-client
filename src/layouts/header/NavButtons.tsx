import { useState } from 'react'

import Button from '../../components/atoms/Button'
import { iHeaders } from '../../types/types'
import { removeDiacritics } from '../../utils/removeDiacritics'

const NavButtons = ({ headers }: { headers: iHeaders[] }) => {
  const [showMobMenu, setShowMobMenu] = useState(false)

  const handleMenuItem = (url: string) => () => {
    window.location.href = removeDiacritics(url.toLocaleLowerCase())
  }

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
            classes='relative z-10'
          />
        </div>
      )}
      <ul
        className={
          (showMobMenu ? 'grid' : 'hidden') +
          ' bg-secondaryLight absolute top-[98%] z-[9] w-full grid-cols-1 gap-x-4 gap-y-3 p-4 sm:static sm:z-0 sm:grid sm:grid-cols-2 sm:bg-transparent lg:grid-cols-3'
        }
      >
        {headers?.map(header => (
          <li key={header.title}>
            <Button
              text={header.title}
              onMouseClick={handleMenuItem(header.url)}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default NavButtons
