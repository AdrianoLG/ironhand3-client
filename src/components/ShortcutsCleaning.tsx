import Card from './Card'
import ShortcutsLayout from './ShortcutsLayout'

const ShortcutsCleaning = () => (
  <ShortcutsLayout title='Limpieza'>
    <Card
      imageSrc='./src/assets/img/trash'
      type='jpg'
      imageAlt='Tirar basura'
      title='Tirar basura'
    />
    <Card
      imageSrc='./src/assets/img/dishwasher'
      type='jpg'
      imageAlt='Lavavajillas'
      title='Lavavajillas'
    />
    <Card
      imageSrc='./src/assets/img/broom'
      type='jpg'
      imageAlt='Barrer'
      title='Barrer'
    />
    <Card
      imageSrc='./src/assets/img/washingmaschine'
      type='jpg'
      imageAlt='Lavadora'
      title='Lavadora'
    />
    <Card
      imageSrc='./src/assets/img/vacuum'
      type='jpg'
      imageAlt='Aspiradora'
      title='Aspiradora'
    />
    <Card
      imageSrc='./src/assets/img/bath'
      type='jpg'
      imageAlt='Limpiar baño'
      title='Limpiar baño'
    />
    <Card
      imageSrc='./src/assets/img/mop'
      type='jpg'
      imageAlt='Fregona'
      title='Fregona'
    />
    <Card
      imageSrc='./src/assets/img/dust'
      type='jpg'
      imageAlt='Polvo'
      title='Polvo'
    />
  </ShortcutsLayout>
)

export default ShortcutsCleaning
