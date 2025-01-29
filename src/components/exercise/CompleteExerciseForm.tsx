import FormField from '../../utils/FormField';
import Button from '../Button';

const CompleteExerciseForm = ({ closeModal }: { closeModal: () => void }) => (
  <form action=''>
    <div className='my-7 flex w-full gap-9 px-9'>
      <FormField tag='exercise' type='text' title='Ejercicio' isRequired />
      <FormField tag='date' type='date' title='Fecha' />
      <FormField tag='time' type='number' title='Tiempo' />
      <FormField tag='repetitions' type='number' title='Repeticiones' />
      <FormField tag='weight' type='number' title='Peso' />
      <FormField tag='ppm_max' type='number' title='PPM máximas' />
      <FormField tag='ppm_min' type='number' title='PPM mínimas' />
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

export default CompleteExerciseForm
