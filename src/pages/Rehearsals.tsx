import Heading from '../components/molecules/Heading'
import { useFilterCompletedExercises } from '../feature/exercise/hooks/useFilterCompletedExercises'
import Header from '../layouts/header/Header'

const Rehearsals = () => {
  const { data } = useFilterCompletedExercises()

  return (
    <>
      <Header isMain={false} headers={data?.headers} />
      <Heading title='Ensayos' />
    </>
  )
}

export default Rehearsals
