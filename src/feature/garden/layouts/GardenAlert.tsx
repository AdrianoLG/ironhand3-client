import { AlertDialog } from 'radix-ui';
import { useState } from 'react';

import { useMutation } from '@apollo/client';

import IconWarn from '../../../assets/svgs/IconWarn';
import { Button } from '../../../components/atoms';
import {
    REMOVE_COMPLETED_WATERING, REMOVE_CROP, REMOVE_PLANT, REMOVE_SPECIE
} from '../gql/gardenMutations';
import { GARDEN_INFO, SELECT_GARDEN_FORM_DATA } from '../gql/gardenQueries';
import GardenToast from './GardenToast';

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
            ? deleteWatering({ variables: { removedCompletedWateringId: showAlert.id } })
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
      <AlertDialog.Root open={showAlert.visible}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            className='bg-transparent70B fixed inset-0'
            onClick={() => setShowAlert({ visible: false, id: null })}
          />
          <AlertDialog.Content className='bg-warn fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-125 -translate-x-1/2 -translate-y-1/2 rounded-md focus:outline-none'>
            <div className='relative px-8 pt-12 pb-8'>
              <IconWarn
                color='var(--warn)'
                classes='bg-primary rounded-full w-12 absolute -top-6 left-1/2 -translate-x-1/2'
              />
              <AlertDialog.Title className='text-secondary mb-2 text-center text-lg font-semibold'>
                {content.title}
              </AlertDialog.Title>
              <AlertDialog.Description className='text-text mb-8 text-center text-sm font-semibold text-wrap'>
                {content.description}
              </AlertDialog.Description>
              <div className='flex justify-center gap-4'>
                <AlertDialog.Cancel asChild>
                  <Button
                    text='Cancelar'
                    secondary
                    isFit
                    small
                    onMouseClick={() =>
                      setShowAlert({
                        ...showAlert,
                        visible: false,
                        id: null
                      })
                    }
                  />
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <Button
                    text={content.confirmText}
                    isFit
                    small
                    onMouseClick={() => {
                      setShowAlert({ visible: false, id: null })
                      handleDelete()
                    }}
                  />
                </AlertDialog.Action>
              </div>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  )
}

export default GardenAlert
