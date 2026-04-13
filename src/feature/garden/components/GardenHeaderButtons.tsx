import { useState } from 'react'

import { Dialog } from '../../../components/organisms/dialogs'
import CropFormContainer from '../forms/CropFormContainer'
import PlantFormContainer from '../forms/PlantFormContainer'
import SpecieFormContainer from '../forms/SpecieFormContainer.tsx'
import WateringFormContainer from '../forms/WateringFormContainer'

const GardenHeaderButtons = () => {
  const [completeWateringFormIsOpen, setWateringFormIsOpen] = useState(false)
  const [completeCropFormIsOpen, setCropFormIsOpen] = useState(false)
  const [completePlantFormIsOpen, setPlantFormIsOpen] = useState(false)
  const [specieFormIsOpen, setSpecieFormIsOpen] = useState(false)

  return (
    <>
      <nav className='xl:max-w-screen-content mx-auto flex flex-wrap justify-start gap-2 px-8 pb-16'>
        <div>
          <Dialog
            buttonText='Añadir riego'
            title='Añadir riego'
            description='Introduce los datos del riego añadido'
            image='watering-bg'
            child={<WateringFormContainer setIsOpen={setWateringFormIsOpen} />}
            isOpen={completeWateringFormIsOpen}
            setIsOpen={setWateringFormIsOpen}
            secondary
          />
        </div>
        <div>
          <Dialog
            buttonText='Añadir cultivo'
            title='Añadir cultivo'
            description='Introduce los datos del cultivo añadido'
            image='crop-bg'
            child={<CropFormContainer setIsOpen={setCropFormIsOpen} />}
            isOpen={completeCropFormIsOpen}
            setIsOpen={setCropFormIsOpen}
          />
        </div>
        <div>
          <Dialog
            buttonText='Añadir planta'
            title='Añadir planta'
            description='Introduce los datos de la planta añadida'
            image='plant-bg'
            child={<PlantFormContainer setIsOpen={setPlantFormIsOpen} />}
            isOpen={completePlantFormIsOpen}
            setIsOpen={setPlantFormIsOpen}
          />
        </div>
        <div>
          <Dialog
            buttonText='Gestionar especies'
            title='Gestionar especies'
            description='Gestiona los datos de las especies de tu jardín'
            image='specie-bg'
            child={<SpecieFormContainer setIsOpen={setSpecieFormIsOpen} />}
            isOpen={specieFormIsOpen}
            setIsOpen={setSpecieFormIsOpen}
          />
        </div>
      </nav>
    </>
  )
}

export default GardenHeaderButtons
