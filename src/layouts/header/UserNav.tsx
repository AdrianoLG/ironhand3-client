import IconPerson from '../../assets/svgs/IconPerson'
import { useAuth } from '../../feature/auth/context/AuthContext'

const UserNav = ({ color }: { color: string }) => {
  const { user, logout } = useAuth()

  return (
    <p className={`flex items-center gap-2 text-${color}`}>
      {user?.name ?? user?.email ?? ''} <IconPerson color={color} />
      {user && (
        <button
          type='button'
          className='text-xs underline'
          onClick={() => logout()}
        >
          Salir
        </button>
      )}
    </p>
  )
}

export default UserNav
