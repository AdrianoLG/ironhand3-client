import { useState } from 'react'

import { useMutation } from '@apollo/client'

import { Dialog } from '../../../components/organisms/dialogs'
import { REMOVE_PLANT } from '../gql/gardenMutations'
import { GARDEN_INFO } from '../gql/gardenQueries'
import { iPlant } from '../types/garden'
import { getPlantIcon } from '../utils/plantIcons'
import PlantHoverCard from './PlantHoverCard'

const Plant = ({ plant }: { plant: iPlant }) => {
  /*
   * GQL
   */
  const [deletePlant] = useMutation(REMOVE_PLANT, {
    refetchQueries: [{ query: GARDEN_INFO }]
  })
  const removePlant = (id: string) => {
    deletePlant({
      variables: { removedPlantId: id }
    })
    setShowDialog(false)
  }

  /*
   * State
   */
  const [showDialog, setShowDialog] = useState(false)
  const [showHoverCard, setShowHoverCard] = useState(false)

  return (
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
        <PlantHoverCard
          showHoverCard={showHoverCard}
          plant={plant}
          setShowDialog={setShowDialog}
          setShowHoverCard={setShowHoverCard}
          removePlant={removePlant}
        />
      </div>
      {showDialog && (
        <Dialog
          buttonText='Actualizar'
          title='Modificar planta'
          description='Modifica los datos de la planta'
          image='plant-bg'
          child={
            <></>
            // <CompletePlantFormContainer
            //   plantData={plant}
            //   setIsOpen={() => setShowDialog(false)}
            // />
          }
          secondary
          xsmall
          isFit
          isOpen={showDialog}
          setIsOpen={setShowDialog}
        />
      )}
    </div>
  )
}

export default Plant
