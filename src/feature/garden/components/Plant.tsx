import { useState } from 'react'

import { Dialog } from '../../../components/organisms/dialogs'
import PlantFormContainer from '../forms/PlantFormContainer'
import GardenAlert from '../layouts/GardenAlert'
import { iPlant } from '../types/garden'
import { getPlantIcon } from '../utils/plantIcons'
import PlantHoverCard from './PlantHoverCard'

const Plant = ({ plant }: { plant: iPlant }) => {
  const removePlant = (id: string) => {
    setShowAlert({ visible: true, id })
    setShowHoverCard(false)
  }

  /*
   * State
   */
  const [showDialog, setShowDialog] = useState(false)
  const [showHoverCard, setShowHoverCard] = useState(false)
  const [showAlert, setShowAlert] = useState<{
    visible: boolean
    id: string | null
  }>({
    visible: false,
    id: null
  })

  return (
    <>
      <GardenAlert
        type='plant'
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
      <div
        key={plant._id}
        className='relative'
        onMouseEnter={() => {
          setShowHoverCard(true)
        }}
        onMouseLeave={() => {
          setShowHoverCard(false)
        }}
      >
        <div
          className={`border-secondaryLighter text-secondary flex w-full items-center gap-2 rounded-md border-1 p-2 ${plant.death ? 'bg-secondaryLightest' : ''}`}
        >
          <div className='w-4'>
            <img
              src={getPlantIcon(plant.specie?.category)}
              alt={plant.specie?.category || 'plant'}
              className='w-full'
            />
          </div>
          <div className='flex w-full'>
            <div className='w-1/2'>
              <p className={` ${plant.death ? 'line-through' : ''}`}>
                {plant.name}
              </p>
            </div>
            <div className='flex w-1/2 items-center justify-end'>
              <p className={`text-sm ${plant.death ? 'line-through' : ''}`}>
                {plant.specie.name}
              </p>
            </div>
          </div>
          {!showDialog && (
            <PlantHoverCard
              showHoverCard={showHoverCard}
              plant={plant}
              setShowDialog={setShowDialog}
              setShowHoverCard={setShowHoverCard}
              removePlant={removePlant}
            />
          )}
        </div>
        {showDialog && (
          <Dialog
            buttonText='Actualizar'
            title='Modificar planta'
            description='Modifica los datos de la planta'
            image='plant-bg'
            child={
              <PlantFormContainer plantData={plant} setIsOpen={setShowDialog} />
            }
            isOpen={showDialog}
            setIsOpen={setShowDialog}
            hideTrigger
          />
        )}
      </div>
    </>
  )
}

export default Plant
