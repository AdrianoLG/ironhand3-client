import Button from './Button'

const navButtons = () => (
  <ul className='grid max-w-3xl grid-cols-3 grid-rows-3'>
    <li>
      <Button text='Notas' />
    </li>
    <li>
      <Button text='Proyectos' />
    </li>
    <li>
      <Button text='Nutrición' />
    </li>
    <li>
      <Button text='Ejercicio' />
    </li>
    <li>
      <Button text='Limpieza' />
    </li>
    <li>
      <Button text='Ensayos' />
    </li>
    <li>
      <Button text='Catálogo' />
    </li>
    <li>
      <Button text='Presupuestos' />
    </li>
    <li>
      <Button text='Jardín' />
    </li>
  </ul>
)

export default navButtons
