import Button from '../Button'

const HeaderButtons = () => {
  const completeExercise = () => {
    console.log('completeExercise')
  }

  const addExercise = () => {
    console.log('addExercise')
  }

  return (
    <nav className='mx-auto flex flex-wrap justify-start gap-2 px-8 pb-16 xl:max-w-screen-content'>
      <div>
        <Button text='Completar' onMouseClick={completeExercise} small />
      </div>
      <div>
        <Button
          text='Añadir ejercicio'
          onMouseClick={addExercise}
          small
          secondary
        />
      </div>
    </nav>
  )
}

export default HeaderButtons
