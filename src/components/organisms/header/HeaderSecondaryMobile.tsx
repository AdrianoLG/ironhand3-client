import { NavLink } from 'react-router-dom'

import Hamburguer from '../../../assets/svgs/Hamburguer'
import { iHeaders } from '../../../utils/types'

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
      <ul
        className={`absolute right-0 top-12 w-2/3 bg-secondary transition-all duration-500 ease-in lg:hidden ${isOpen ? 'h-[calc(100vh-3rem)]' : 'h-0 overflow-clip'} z-20`}
      >
        <div className='flex w-full flex-wrap items-center justify-center py-8'>
          {headers.map(header => (
            <li
              key={header.title}
              className={`w-1/2 text-center text-accent hover:text-primary hover:shadow-sm hover:shadow-primary`}
            >
              <NavLink
                to={`/${header.url}`}
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'pending'
                    : isActive
                      ? 'block w-full cursor-default py-3 text-primary'
                      : 'block w-full py-3'
                }
              >
                {header.title}
              </NavLink>
            </li>
          ))}
        </div>
      </ul>
    </>
  )
}

export default HeaderSecondaryMobile
