import { useState } from 'react'

import { useMutation } from '@apollo/client'

import IconWarn from '../../../assets/svgs/IconWarn'
import { Button } from '../../../components/atoms'
import { AlertDialog } from '../../../components/organisms/dialogs'
import {
  REMOVE_COMPLETED_WATERING,
  REMOVE_CROP,
  REMOVE_PLANT,
  REMOVE_SPECIE
} from '../gql/gardenMutations'
import { GARDEN_INFO, SELECT_GARDEN_FORM_DATA } from '../gql/gardenQueries'
import GardenToast from './GardenToast'

const GardenAlert = ({
  type,
  showAlert,
  setShowAlert
}: {
  type: 'specie' | 'plant' | 'crop' | 'watering'
  showAlert: {
    visible: boolean
    id: string | null
  }
  setShowAlert: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      id: string | null
    }>
  >
}) => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const [deleteSpecie] = useMutation(REMOVE_SPECIE, {
    refetchQueries: [{ query: GARDEN_INFO }, { query: SELECT_GARDEN_FORM_DATA }]
  })
  const [deletePlant] = useMutation(REMOVE_PLANT, {
    refetchQueries: [{ query: GARDEN_INFO }]
  })
  const [deleteCrop] = useMutation(REMOVE_CROP, {
    refetchQueries: [{ query: GARDEN_INFO }]
  })
  const [deleteWatering] = useMutation(REMOVE_COMPLETED_WATERING, {
    refetchQueries: [{ query: GARDEN_INFO }]
  })

  const content =
    type === 'plant'
      ? {
          title: '¿Estás seguro de que quieres eliminar la planta?',
          description: 'Esta acción no se puede deshacer.',
          confirmText: 'Sí, eliminar planta'
        }
      : type === 'crop'
        ? {
            title: '¿Estás seguro de que quieres eliminar el cultivo?',
            description: 'Esta acción no se puede deshacer.',
            confirmText: 'Sí, eliminar cultivo'
          }
        : type === 'watering'
          ? {
              title: '¿Estás seguro de que quieres eliminar el riego?',
              description: 'Esta acción no se puede deshacer.',
              confirmText: 'Sí, eliminar riego'
            }
          : {
              title: '¿Estás seguro de que quieres eliminar la especie?',
              description:
                'Esta acción no se puede deshacer. La especie se eliminará permanentemente, a no ser que esté asociada a alguna planta.',
              confirmText: 'Sí, eliminar especie'
            }

  const handleDelete = () => {
    if (!showAlert.id) return

    const deletePromise =
      type === 'plant'
        ? deletePlant({ variables: { removedPlantId: showAlert.id } })
        : type === 'crop'
          ? deleteCrop({ variables: { removedCropId: showAlert.id } })
          : type === 'watering'
            ? deleteWatering({
                variables: { removedCompletedWateringId: showAlert.id }
              })
            : deleteSpecie({ variables: { removedSpecieId: showAlert.id } })

    deletePromise.catch((err: Error) => {
      setToastMessage(err.message)
      setShowToast(true)
    })
  }

  return (
    <>
      <GardenToast
        showToast={showToast}
        setShowToast={setShowToast}
        message={toastMessage}
      />
      <AlertDialog
        isOpen={showAlert.visible}
        onOpenChange={open => {
          if (!open) setShowAlert({ visible: false, id: null })
        }}
        title={content.title}
        description={content.description}
        confirmText={content.confirmText}
        onConfirm={() => {
          setShowAlert({ visible: false, id: null })
          handleDelete()
        }}
      />
    </>
  )
}

export default GardenAlert
