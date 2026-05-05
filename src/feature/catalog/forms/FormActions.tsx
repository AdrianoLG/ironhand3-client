import { Button } from '../../../components/atoms'

interface FormActionsProps {
  submitText: string
  onCancel: () => void
  small?: boolean
}

const FormActions = ({ submitText, onCancel, small }: FormActionsProps) => {
  return (
    <div className='col-span-2 flex justify-end gap-2'>
      <Button
        text='Cancelar'
        outline
        isFit
        small={small}
        onMouseClick={onCancel}
        type='button'
      />
      <Button text={submitText} isFit small={small} type='submit' />
    </div>
  )
}

export default FormActions
