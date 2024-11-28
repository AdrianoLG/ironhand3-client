import Card from './Card'
import ShortcutsLayout from './ShortcutsLayout'

const ShortcutsExercise = () => (
  <ShortcutsLayout title='Ejercicio'>
    <Card
      imageSrc='./src/assets/img/walk'
      type='jpg'
      imageAlt='Caminar'
      title='Caminar'
    />
    <Card
      imageSrc='./src/assets/img/todo'
      type='jpg'
      imageAlt='Añadir todo'
      title='Añadir todo'
    />
    <Card
      imageSrc='./src/assets/img/pushup'
      type='jpg'
      imageAlt='Flexiones'
      title='Flexiones'
    />
    <Card
      imageSrc='./src/assets/img/pullup'
      type='jpg'
      imageAlt='Dominadas'
      title='Dominadas'
    />
    <Card
      imageSrc='./src/assets/img/plank'
      type='jpg'
      imageAlt='Planchas'
      title='Planchas'
    />
    <Card
      imageSrc='./src/assets/img/bike'
      type='jpg'
      imageAlt='Bici estática'
      title='Bici estática'
    />
    <Card
      imageSrc='./src/assets/img/punchingbag'
      type='jpg'
      imageAlt='Saco'
      title='Saco'
    />
    <Card
      imageSrc='./src/assets/img/comb'
      type='jpg'
      imageAlt='Cuerda'
      title='Cuerda'
    />
    <Card
      imageSrc='./src/assets/img/squat'
      type='jpg'
      imageAlt='Sentadillas'
      title='Sentadillas'
    />
  </ShortcutsLayout>
)

export default ShortcutsExercise
