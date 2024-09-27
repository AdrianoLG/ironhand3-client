import UserNav from './UserNav'

const MainHeader = () => (
  <header className='mx-auto px-8 py-3 xl:max-w-screen-content 2xl:px-0'>
    <nav>
      <ul className='flex justify-end gap-3'>
        <li>
          <UserNav />
        </li>
      </ul>
    </nav>
  </header>
)

export default MainHeader
