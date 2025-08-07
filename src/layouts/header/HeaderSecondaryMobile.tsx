import { NavLink } from 'react-router-dom'

import Hamburguer from '../../assets/svgs/Hamburguer'
import ModeButton from '../../components/atoms/ModeButton'
import { iHeaders } from '../../types/types'

const HeaderSecondaryMobile = ({
  isOpen,
  headers,
  setIsOpen
}: {
  isOpen: boolean
  headers: iHeaders[]
  setIsOpen: (isOpen: boolean) => void
}) => {
  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer'>
        <Hamburguer
          classes='block lg:hidden p-2'
          color='accent'
          width='2.5rem'
          isOpen={isOpen}
        />
      </div>
      <div
        className={`bg-secondary absolute top-12 right-0 w-2/3 transition-all duration-500 ease-in lg:hidden ${isOpen ? 'h-[calc(100vh-3rem)]' : 'h-0 overflow-clip'} z-20`}
      >
        <div className='flex justify-center p-4'>
          <ModeButton isMobile hasDarkBG />
        </div>
        <ul className={``}>
          <div className='flex w-full flex-wrap items-center justify-center py-8'>
            {headers.map(header => (
              <li
                key={header.title}
                className={`text-accent hover:text-primary hover:shadow-primary w-1/2 text-center hover:shadow-sm`}
              >
                <NavLink
                  to={`/${header.url}`}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? 'pending'
                      : isActive
                        ? 'text-primary block w-full cursor-default py-3'
                        : 'block w-full py-3'
                  }
                >
                  {header.title}
                </NavLink>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </>
  )
}

export default HeaderSecondaryMobile
