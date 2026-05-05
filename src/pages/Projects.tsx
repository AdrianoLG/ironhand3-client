import ErrorMessage from '../components/molecules/ErrorMessage'
import Heading from '../components/molecules/Heading'
import Spinner from '../components/molecules/Spinner'
import useFilterProjects from '../feature/project/hooks/useFilterProjects'
import Header from '../layouts/header/Header'

const Projects = () => {
  const { data, loading, error } = useFilterProjects()
  if (loading)
    return (
      <Spinner classes='my-7 flex w-full justify-center px-8' widthInRem={2} />
    )

  if (error)
    return (
      <ErrorMessage
        message={'No conectado a la base de datos'}
        errorMessage={error.message}
        containerClasses='my-7 flex w-full justify-center px-8 text-secondary'
      />
    )

  return (
    <>
      <Header isMain={false} headers={data?.headers} />
      <Heading title='Proyectos' />
    </>
  )
}
export default Projects
