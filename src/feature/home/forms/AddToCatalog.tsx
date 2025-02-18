import Button from '../../../components/atoms/Button'
import FormField from '../../../utils/FormField'

const AddToCatalog = ({ closeModal }: { closeModal: () => void }) => (
  <form action=''>
    <div className='my-7 flex w-full gap-9 px-9'>
      <FormField tag='title' type='text' title='Título' isRequired />
      <FormField tag='author' type='text' title='Autor' />
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

export default AddToCatalog
