import Button from '../Button'
import FormField from './FormField'

const AddWatering = ({ closeModal }: { closeModal: () => void }) => (
  <form action=''>
    <div className='my-7 flex w-full gap-9 px-9'>
      <FormField tag='date' type='date' title='Fecha' isRequired />
      <FormField tag='quantity' type='number' title='Cantidad' />
    </div>
    <div className='flex w-full justify-end gap-4 px-9'>
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

export default AddWatering
