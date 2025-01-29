import FormField from '../../utils/FormField';
import Button from '../Button';

const ExerciseForm = ({ closeModal }: { closeModal: () => void }) => (
  <form action=''>
    <div className='my-7 flex w-full gap-9 px-9'>
      <FormField tag='name' type='text' title='Nombre' isRequired />
      <FormField tag='bodyParts' type='text' title='Partes del cuerpo' />
      <FormField tag='type' type='text' title='Tipo' />
      <FormField tag='img' type='img' title='Imagen' />
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

export default ExerciseForm
