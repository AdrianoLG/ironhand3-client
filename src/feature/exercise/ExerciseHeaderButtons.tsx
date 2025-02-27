import { DialogLayout } from '../../components/layouts'
import CompleteExerciseForm from './CompleteExerciseForm'
import ExerciseForm from './ExerciseForm'

const ExerciseHeaderButtons = () => {
  return (
    <>
      <nav className='mx-auto flex flex-wrap justify-start gap-2 px-8 pb-16 xl:max-w-screen-content'>
        <div>
          <DialogLayout
            buttonText='Completar ejercicio'
            title='Completar ejercicio'
            description='Introduce los datos del ejercicio completado'
            image='exercise-bg'
            child={<CompleteExerciseForm />}
          />
        </div>
        <div>
          <DialogLayout
            buttonText='Añadir ejercicio'
            title='Añadir ejercicio'
            description='Completa los datos del nuevo ejercicio'
            image='exercise-bg'
            child={<ExerciseForm />}
            secondary
          />
        </div>
      </nav>
    </>
  )
}

export default ExerciseHeaderButtons
