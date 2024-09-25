import IconPerson from './icons/person'

function Header() {
  return (
    <header className='py-3 px-8 2xl:px-0 xl:max-w-screen-content mx-auto'>
      <nav>
        <ul className='flex justify-end gap-3'>
          <li className='flex gap-2 text-secondaryLight'>
            John Doe <IconPerson />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
