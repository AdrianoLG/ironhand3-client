import { useState } from 'react'

import { Button } from '../../../components/atoms'
import { Dialog } from '../../../components/organisms/dialogs'
import CropFormContainer from '../forms/CropFormContainer'
import GardenAlert from '../layouts/GardenAlert'
import { iCrop } from '../types/garden'
import CropGallery from './CropGallery'
import CropGalleryManager from './CropGalleryManager'
import CropTooltip from './CropTooltip'

const CropListDetail = ({ crop }: { crop: iCrop }) => {
  const [activeCropForGallery, setActiveCropForGallery] = useState<string>('')
  const [activeCropForUpdate, setActiveCropForUpdate] = useState<string>('')
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
        type='crop'
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
      <div>
        <p className='text-secondary mb-2 text-sm font-semibold'>Plantas</p>
        <div className='grid grid-cols-2 gap-1'>
          <CropTooltip crop={crop} />
        </div>
      </div>
      <p className='text-lg'>{crop.comments}</p>
      <CropGallery crop={crop} />
      <div className='my-6'>
        <Dialog
          buttonText='Gestionar galería'
          title='Gestionar galería'
          description='Añade o elimina miniaturas del cultivo'
          image='crop-bg'
          child={<CropGalleryManager crop={crop} />}
          isOpen={activeCropForGallery === crop._id}
          setIsOpen={isOpen => {
            if (isOpen) {
              setActiveCropForGallery(crop._id)
            } else {
              setActiveCropForGallery('')
            }
          }}
          outline
          xsmall
          isFit
        />
      </div>
      <div className='mt-6 flex flex-wrap justify-center gap-2'>
        <Dialog
          buttonText='Actualizar'
          title='Modificar cultivo'
          description='Modifica los datos del cultivo'
          image='crop-bg'
          child={
            <CropFormContainer
              cropData={crop}
              setIsOpen={() => setActiveCropForUpdate('')}
            />
          }
          isOpen={activeCropForUpdate === crop._id}
          setIsOpen={isOpen => {
            if (isOpen) {
              setActiveCropForUpdate(crop._id)
            } else {
              setActiveCropForUpdate('')
            }
          }}
          xsmall
          isFit
        />
        <Button
          text='Borrar'
          xsmall
          outline
          isFit
          onMouseClick={() => setShowAlert({ visible: true, id: crop._id })}
          secondary
        />
      </div>
    </>
  )
}

export default CropListDetail
