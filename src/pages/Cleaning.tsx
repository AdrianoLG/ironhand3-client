import { useState } from 'react'

import ErrorMessage from '../components/molecules/ErrorMessage'
import Heading from '../components/molecules/Heading'
import Spinner from '../components/molecules/Spinner'
import CleaningHeaderButtons from '../feature/cleaning/components/CleaningHeaderButtons'
import { useFilterCleaningTasks } from '../feature/cleaning/hooks/useFilterCleaningTasks'
import CleaningAlert from '../feature/cleaning/layouts/CleaningAlert'
import CleaningAside from '../feature/cleaning/layouts/CleaningAside'
import CleaningDialog from '../feature/cleaning/layouts/CleaningDialog'
import CleaningMain from '../feature/cleaning/layouts/CleaningMain'
import { iCleaningTask } from '../feature/cleaning/types/cleaningTasks'
import LRLayout from '../layouts/body/LRLayout'
import Header from '../layouts/header/Header'

const Cleaning = () => {
  const {
    completedCleaningTasks,
    filterDate,
    activeButton,
    data,
    loading,
    error,
    setCustomDate,
    customDate
  } = useFilterCleaningTasks()

  const [showDialog, setShowDialog] = useState(false)
  const [showAlert, setShowAlert] = useState<{
    visible: boolean
    id: string | null
  }>({ visible: false, id: null })
  const [selectedCleaningTask, setSelectedCleaningTask] =
    useState<iCleaningTask | null>(null)

  const removeCleaningTask = (id: string) => {
    setShowAlert({ visible: true, id: id })
  }

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
      <Heading title='Limpieza' />
      <CleaningHeaderButtons />
      <LRLayout>
        <CleaningAside
          data={data}
          completedCleaningTasks={completedCleaningTasks}
          filterDate={filterDate}
          activeButton={activeButton}
          setCustomDate={setCustomDate}
          customDate={customDate}
        />
        <CleaningMain
          completedCleaningTasks={completedCleaningTasks}
          data={data}
          setShowDialog={setShowDialog}
          setSelectedCleaningTask={setSelectedCleaningTask}
          removeCleaningTask={removeCleaningTask}
        />
      </LRLayout>
      <CleaningDialog
        selectedCleaningTask={selectedCleaningTask}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
      <CleaningAlert showAlert={showAlert} setShowAlert={setShowAlert} />
    </>
  )
}

export default Cleaning
