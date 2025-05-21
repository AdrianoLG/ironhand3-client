import IconPerson from '../../assets/svgs/IconPerson'

const UserNav = ({ color }: { color: string }) => (
  <p className={`flex gap-2 text-${color}`}>
    John Doe <IconPerson color={color} />
  </p>
)

export default UserNav
