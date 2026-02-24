import ErrorMessage from '../components/molecules/ErrorMessage'
import Heading from '../components/molecules/Heading'
import Spinner from '../components/molecules/Spinner'
import PlantList from '../feature/garden/components/PlantList'
import { useFilterCompletedWatering } from '../feature/garden/hooks/useFilterCompletedWatering'
import ThirdsLayout from '../layouts/body/ThirdsLayout'
import Header from '../layouts/header/Header'

const Garden = () => {
  const {
    // completedWatering,
    // filterDate,
    // activeButton,
    data,
    loading,
    error
    // setCustomDate,
    // customDate
  } = useFilterCompletedWatering()

  // const [showDialog, setShowDialog] = useState(false)
  // const [showAlert, setShowAlert] = useState<{
  //   visible: boolean
  //   id: string | null
  // }>({ visible: false, id: null })

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
      <Heading title='Jardín' />
      <ThirdsLayout>
        <div>
          <h2 className='mb-4 text-2xl'>Riegos</h2>
        </div>
        <div>
          <h2 className='mb-4 text-2xl'>Cultivos</h2>
          <pre>{JSON.stringify(data?.crops, null, 2)}</pre>
        </div>
        <div>
          <h2 className='mb-4 text-2xl'>Plantas</h2>
          <PlantList plants={data?.plants ?? []} />
        </div>
      </ThirdsLayout>
    </>
  )
}

export default Garden
