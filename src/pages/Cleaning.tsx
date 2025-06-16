import ErrorMessage from '../components/molecules/ErrorMessage'
import Heading from '../components/molecules/Heading'
import Spinner from '../components/molecules/Spinner'
import House from '../feature/cleaning/assets/svgs/House'
import { useFilterCleaningTasks } from '../feature/cleaning/hooks/useFilterCleaningTasks'
import LRLayout from '../layouts/body/LRLayout'
import Header from '../layouts/header/Header'

const Cleaning = () => {
  const { data, loading, error } = useFilterCleaningTasks()

  if (loading)
    return (
      <Spinner classes='my-7 flex w-full justify-center px-8' widthInRem={2} />
    )

  if (error)
    return (
      <ErrorMessage
        message={error.message}
        containerClasses='my-7 flex w-full justify-center px-8 text-warn'
      />
    )

  return (
    <>
      <Header isMain={false} headers={data?.headers} />
      <Heading title='Limpieza' />
      <LRLayout>
        <aside className='w-full pb-8 md:w-1/3'>
          <div className='relative rounded-md border-1 border-secondaryLighter px-12 py-4 shadow-md xl:px-24 xl:py-9'>
            <House />
          </div>
        </aside>
        <main className='w-full pb-8 md:w-2/3 md:pl-10 xl:pl-36'>
          <div className='my-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <div className='mb-4'>
              <h3 className='mb-2 text-sm font-semibold'>Tarea 1</h3>
              <div className='flex flex-col gap-2'>
                <h2 className='text-xl font-bold'>Tareas 1</h2>
                <p className='text-gray-600'>Tarea 1 yo!</p>
              </div>
            </div>
            <div className='mb-4'>
              <h3 className='mb-2 text-sm font-semibold'>Tarea 2</h3>
              <div className='flex flex-col gap-2'>
                <h2 className='text-xl font-bold'>Tareas 2</h2>
                <p className='text-gray-600'>Tarea 2 yo!</p>
              </div>
            </div>
          </div>
        </main>
      </LRLayout>
    </>
  )
}

export default Cleaning
