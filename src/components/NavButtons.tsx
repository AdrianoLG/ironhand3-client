import { useState } from 'react'
import Button from './Button'
import { removeDiacritics } from '../utils/removeDiacritics'

const NavButtons = () => {
  const [showMobMenu, setShowMobMenu] = useState(false)
  const buttons = [
    'Notas',
    'Proyectos',
    'Nutrición',
    'Ejercicio',
    'Limpieza',
    'Ensayos',
    'Catálogo',
    'Presupuestos',
    'Jardín'
  ]
  const handleMenuItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const buttonClicked = event.currentTarget.textContent
    window.location.href = removeDiacritics(buttonClicked!.toLowerCase())
  }

  return (
    <>
      {!showMobMenu && (
        <div className='block sm:hidden'>
          <Button text='Ver menú' onMouseClick={() => setShowMobMenu(true)} />
        </div>
      )}
      {showMobMenu && (
        <div className='mb-3 block sm:hidden'>
          <Button
            text='Cerrar menú'
            onMouseClick={() => setShowMobMenu(false)}
          />
        </div>
      )}
      <ul
        className={
          (showMobMenu ? 'grid' : 'hidden') +
          ' absolute z-10 w-full grid-cols-1 gap-x-4 gap-y-3 sm:static sm:z-0 sm:grid sm:grid-cols-2 lg:grid-cols-3'
        }
      >
        {buttons.map(name => (
          <li key={name}>
            <Button text={name} onMouseClick={event => handleMenuItem(event)} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default NavButtons
