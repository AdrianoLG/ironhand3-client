import Card from './Card'
import ShortcutsLayout from './ShortcutsLayout'

const ShortcutsMusic = () => (
  <ShortcutsLayout title='Música'>
    <Card
      imageSrc='./src/assets/img/guitar'
      type='jpg'
      imageAlt='Guitarra'
      title='Guitarra'
    />
    <Card
      imageSrc='./src/assets/img/piano'
      type='jpg'
      imageAlt='Piano'
      title='Piano'
    />
    <Card
      imageSrc='./src/assets/img/drums'
      type='jpg'
      imageAlt='Batería'
      title='Batería'
    />
    <Card
      imageSrc='./src/assets/img/bass'
      type='jpg'
      imageAlt='Bajo'
      title='Bajo'
    />
    <Card
      imageSrc='./src/assets/img/mkII'
      type='jpg'
      imageAlt='Maschine Mikro II'
      title='Maschine Mikro II'
    />
    <Card
      imageSrc='./src/assets/img/reaper'
      type='jpg'
      imageAlt='Grabación'
      title='Grabación'
    />
  </ShortcutsLayout>
)

export default ShortcutsMusic
