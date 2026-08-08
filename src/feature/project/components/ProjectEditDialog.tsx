import { Button } from '../../../components/atoms';
import { Dialog } from '../../../components/organisms/dialogs';

const ProjectEditDialog = ({
  isOpen,
  setIsOpen,
  projectForm,
  setProjectForm,
  onSubmit,
  isSubmitting
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  projectForm: {
    title: string
    description: string
    category: string
    shared: boolean
  }
  setProjectForm: React.Dispatch<
    React.SetStateAction<{
      title: string
      description: string
      category: string
      shared: boolean
    }>
  >
  onSubmit: () => Promise<void>
  isSubmitting: boolean
}) => (
  <Dialog
    buttonText='Actualizar proyecto'
    title='Actualizar proyecto'
    description='Modifica los datos del proyecto seleccionado'
    image='notes-bg'
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    hideTrigger
    child={
      <form
        className='my-7 grid grid-cols-1 gap-3 px-8 md:grid-cols-2'
        onSubmit={event => {
          event.preventDefault()
          void onSubmit()
        }}
      >
        <div>
          <label
            className='text-text mb-1 block text-sm'
            htmlFor='project-edit-title'
          >
            Título <span className='text-warn'>*</span>
          </label>
          <input
            id='project-edit-title'
            type='text'
            value={projectForm.title}
            onChange={event =>
              setProjectForm(prev => ({ ...prev, title: event.target.value }))
            }
            className='bg-primary text-secondaryLight border-secondaryLighter focus:ring-secondaryLighter block w-full rounded-md border-1 p-1 text-sm leading-none focus:ring-1 focus:outline-none'
            required
          />
        </div>

        <div>
          <label
            className='text-text mb-1 block text-sm'
            htmlFor='project-edit-category'
          >
            Categoría <span className='text-warn'>*</span>
          </label>
          <input
            id='project-edit-category'
            type='text'
            value={projectForm.category}
            onChange={event =>
              setProjectForm(prev => ({
                ...prev,
                category: event.target.value
              }))
            }
            className='bg-primary text-secondaryLight border-secondaryLighter focus:ring-secondaryLighter block w-full rounded-md border-1 p-1 text-sm leading-none focus:ring-1 focus:outline-none'
            required
          />
        </div>

        <div className='md:col-span-2'>
          <label
            className='text-text mb-1 block text-sm'
            htmlFor='project-edit-description'
          >
            Descripción
          </label>
          <textarea
            id='project-edit-description'
            rows={3}
            value={projectForm.description}
            onChange={event =>
              setProjectForm(prev => ({
                ...prev,
                description: event.target.value
              }))
            }
            className='bg-primary text-secondaryLight border-secondaryLighter focus:ring-secondaryLighter block w-full rounded-md border-1 p-2 text-sm leading-none focus:ring-1 focus:outline-none'
          />
        </div>

        <label className='text-text flex items-center gap-2 text-sm md:col-span-2'>
          <input
            type='checkbox'
            checked={projectForm.shared}
            onChange={event =>
              setProjectForm(prev => ({
                ...prev,
                shared: event.target.checked
              }))
            }
            className='h-4 w-4'
          />
          Proyecto compartido
        </label>

        <div className='mt-4 flex justify-end gap-3 md:col-span-2'>
          <Button
            text='Cancelar'
            type='button'
            isFit
            small
            secondary
            onMouseClick={() => setIsOpen(false)}
          />
          <Button
            text='Actualizar'
            type='submit'
            isFit
            small
            disabled={isSubmitting}
          />
        </div>
      </form>
    }
  />
)

export default ProjectEditDialog
