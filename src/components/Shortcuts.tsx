import { iShortcut } from '../utils/types'
import Card from './Card'
import ShortcutsLayout from './ShortcutsLayout'

const Shortcuts = ({
  title,
  shortcuts
}: {
  title: string
  shortcuts: iShortcut[]
}) => (
  <ShortcutsLayout title={title}>
    {shortcuts.map((shortcut: iShortcut) => (
      <Card
        key={shortcut._id}
        imageSrc={`./src/assets/img/${shortcut.image}`}
        type='jpg'
        imageAlt={shortcut.title}
        title={shortcut.title}
      />
    ))}
  </ShortcutsLayout>
)

export default Shortcuts
