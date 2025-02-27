import Button from '../../../components/atoms/Button'
import FormField from '../../../components/organisms/forms/FormField'

const AddRecipee = ({ closeModal }: { closeModal: () => void }) => (
  <form action=''>
    <div className='my-7 flex w-full gap-9 px-9'>
      <FormField tag='name' type='number' title='Nombre' isRequired />
      <FormField tag='ingredients' type='text' title='Ingredientes' />
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

export default AddRecipee
