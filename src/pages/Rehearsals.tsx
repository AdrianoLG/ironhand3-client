import { useState } from 'react'

import ErrorMessage from '../components/molecules/ErrorMessage'
import Heading from '../components/molecules/Heading'
import Spinner from '../components/molecules/Spinner'
import RehearsalHeaderButtons from '../feature/rehearsal/components/RehearsalHeaderButtons'
import { useFilterCompletedRehearsals } from '../feature/rehearsal/hooks/useFilterCompletedRehearsals'
import RehearsalAlert from '../feature/rehearsal/layouts/RehearsalAlert'
import RehearsalAside from '../feature/rehearsal/layouts/RehearsalAside'
import SheetDialog from '../feature/rehearsal/layouts/RehearsalDialog'
import RehearsalMain from '../feature/rehearsal/layouts/RehearsalMain'
import { iSheet } from '../feature/rehearsal/types/rehearsals'
import LRLayout from '../layouts/body/LRLayout'
import Header from '../layouts/header/Header'

const Rehearsals = () => {
  const {
    completedRehearsals,
    filterDate,
    activeButton,
    data,
    loading,
    error,
    setCustomDate,
    customDate
  } = useFilterCompletedRehearsals()

  const [showDialog, setShowDialog] = useState(false)
  const [showAlert, setShowAlert] = useState<{
    visible: boolean
    id: string | null
  }>({ visible: false, id: null })
  const [selectedSheet, setSelectedSheet] = useState<iSheet | null>(null)

  const removeSheet = (id: string) => {
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
      <Heading title='Ensayos' />
      <RehearsalHeaderButtons />
      <LRLayout>
        <RehearsalAside
          data={data}
          completedRehearsals={completedRehearsals}
          filterDate={filterDate}
          activeButton={activeButton}
          setCustomDate={setCustomDate}
          customDate={customDate}
        />
        <RehearsalMain
          completedRehearsals={completedRehearsals}
          data={data}
          setShowDialog={setShowDialog}
          setSelectedSheet={setSelectedSheet}
          removeSheet={removeSheet}
        />
      </LRLayout>
      <SheetDialog
        selectedSheet={selectedSheet}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
      <RehearsalAlert showAlert={showAlert} setShowAlert={setShowAlert} />
    </>
  )
}

export default Rehearsals
