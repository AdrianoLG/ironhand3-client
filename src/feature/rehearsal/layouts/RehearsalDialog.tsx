import { Dialog } from '../../../components/organisms/dialogs'
import SheetFormContainer from '../forms/SheetFormContainer'
import { iSheet } from '../types/rehearsals'

const SheetDialog = ({
  showDialog,
  selectedSheet,
  setShowDialog
}: {
  showDialog: boolean
  selectedSheet: iSheet | null
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    showDialog && (
      <Dialog
        buttonText='Actualizar'
        title='Modificar partitura'
        description='Modifica los datos de la partitura'
        image='rehearsal-bg'
        child={
          <SheetFormContainer sheet={selectedSheet} setIsOpen={setShowDialog} />
        }
        secondary
        xsmall
        isFit
        isOpen={showDialog}
        setIsOpen={setShowDialog}
      />
    )
  )
}
export default SheetDialog
