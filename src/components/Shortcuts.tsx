import Card from './Card'
import ShortcutsLayout from './ShortcutsLayout'

const Shortcuts = () => (
  <ShortcutsLayout title='Accesos directos'>
    <Card
      imageSrc='./src/assets/img/todo'
      type='jpg'
      imageAlt='Añadir todo'
      title='Añadir todo'
    />
    <Card
      imageSrc='./src/assets/img/lunch'
      type='jpg'
      imageAlt='Añadir comida'
      title='Añadir comida'
    />
    <Card
      imageSrc='./src/assets/img/catalog'
      type='jpg'
      imageAlt='Añadir al catálogo'
      title='Añadir al catálogo'
    />
    <Card
      imageSrc='./src/assets/img/expenses'
      type='jpg'
      imageAlt='Añadir gasto'
      title='Añadir gasto'
    />
    <Card
      imageSrc='./src/assets/img/watering'
      type='jpg'
      imageAlt='Añadir riego'
      title='Añadir riego'
    />
    <Card
      imageSrc='./src/assets/img/recipee'
      type='jpg'
      imageAlt='Añadir receta'
      title='Añadir receta'
    />
  </ShortcutsLayout>
)

export default Shortcuts
