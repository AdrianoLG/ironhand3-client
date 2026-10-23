import Button from '../../../components/atoms/Button';
import FormField from '../../../components/organisms/forms/FormField';

const PlayInstrument = ({
  closeModal
}: {
  closeModal: () => void
  type: string
}) => (
  <form action=''>
    <div className='my-7 flex w-full flex-col gap-4 px-6 sm:flex-row sm:gap-9 sm:px-9'>
      <FormField tag='date' type='date' title='Fecha' isRequired />
      <FormField tag='instrument' type='text' title='Instrumento' />
    </div>
    <div className='flex w-full justify-end gap-4 px-6 sm:px-9'>
      <Button
        text='Cancelar'
        onMouseClick={() => closeModal()}
        small={true}
        outline
        isFit
      />
      <Button
        text='Añadir'
        onMouseClick={() => console.log('submit')}
        small={true}
        type='submit'
        isFit
      />
    </div>
  </form>
)

export default PlayInstrument
