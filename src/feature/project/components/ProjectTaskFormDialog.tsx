import { Button, RoundSmallButton } from '../../../components/atoms';
import { Dialog } from '../../../components/organisms/dialogs';
import { FormInputTagChips } from '../../../components/organisms/forms';
import { iTaskStatus } from '../types/types';
import { TaskFormState } from '../utils/taskForm';

const ProjectTaskFormDialog = ({
  isOpen,
  setIsOpen,
  editingTaskId,
  taskForm,
  setTaskForm,
  onSubmit,
  onCancel,
  onAddSubtask,
  onSubtaskTitleChange,
  onRemoveSubtask,
  isSubmitting
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  editingTaskId: string
  taskForm: TaskFormState
  setTaskForm: React.Dispatch<React.SetStateAction<TaskFormState>>
  onSubmit: () => Promise<void>
  onCancel: () => void
  onAddSubtask: () => void
  onSubtaskTitleChange: (index: number, title: string) => void
  onRemoveSubtask: (index: number) => void
  isSubmitting: boolean
}) => (
  <Dialog
    buttonText='Añadir tarea'
    title={editingTaskId ? 'Editar tarea' : 'Añadir tarea'}
    description={
      editingTaskId
        ? 'Actualiza los datos de la tarea'
        : 'Completa los datos de la nueva tarea'
    }
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
            htmlFor='popup-task-title'
          >
            Título <span className='text-warn'>*</span>
          </label>
          <input
            id='popup-task-title'
            type='text'
            value={taskForm.title}
            onChange={event =>
              setTaskForm(prev => ({ ...prev, title: event.target.value }))
            }
            className='bg-primary text-secondaryLight border-secondaryLighter focus:ring-secondaryLighter block w-full rounded-md border-1 p-1 text-sm leading-none focus:ring-1 focus:outline-none'
            required
          />
        </div>

        <div>
          <label
            className='text-text mb-1 block text-sm'
            htmlFor='popup-task-priority'
          >
            Prioridad <span className='text-warn'>*</span>
          </label>
          <select
            id='popup-task-priority'
            value={taskForm.priority}
            onChange={event =>
              setTaskForm(prev => ({
                ...prev,
                priority: event.target.value as TaskFormState['priority']
              }))
            }
            className='bg-primary text-secondaryLight border-secondaryLighter focus:ring-secondaryLighter block h-7.5 w-full rounded-md border-1 px-2 py-1 text-sm leading-none focus:ring-1 focus:outline-none'
            required
          >
            <option value=''>Selecciona prioridad</option>
            <option value='LOW'>Baja</option>
            <option value='MEDIUM'>Media</option>
            <option value='HIGH'>Alta</option>
            <option value='URGENT'>Urgente</option>
          </select>
        </div>

        <div>
          <label
            className='text-text mb-1 block text-sm'
            htmlFor='popup-task-status'
          >
            Estado <span className='text-warn'>*</span>
          </label>
          <select
            id='popup-task-status'
            value={taskForm.status}
            onChange={event =>
              setTaskForm(prev => ({
                ...prev,
                status: event.target.value as iTaskStatus
              }))
            }
            className='bg-primary text-secondaryLight border-secondaryLighter focus:ring-secondaryLighter block h-7.5 w-full rounded-md border-1 px-2 py-1 text-sm leading-none focus:ring-1 focus:outline-none'
          >
            <option value='TODO'>TODO</option>
            <option value='DOING'>DOING</option>
            <option value='DONE'>DONE</option>
          </select>
        </div>

        <div>
          <label
            className='text-text mb-1 block text-sm'
            htmlFor='popup-task-assigned'
          >
            Assigned to (mongoId)
          </label>
          <input
            id='popup-task-assigned'
            type='text'
            value={taskForm.asignedTo}
            onChange={event =>
              setTaskForm(prev => ({
                ...prev,
                asignedTo: event.target.value
              }))
            }
            className='bg-primary text-secondaryLight border-secondaryLighter focus:ring-secondaryLighter block w-full rounded-md border-1 p-1 text-sm leading-none focus:ring-1 focus:outline-none'
          />
        </div>

        <div className='md:col-span-2'>
          <label
            className='text-text mb-1 block text-sm'
            htmlFor='popup-task-description'
          >
            Descripción
          </label>
          <textarea
            id='popup-task-description'
            rows={3}
            value={taskForm.description}
            onChange={event =>
              setTaskForm(prev => ({
                ...prev,
                description: event.target.value
              }))
            }
            className='bg-primary text-secondaryLight border-secondaryLighter focus:ring-secondaryLighter block w-full rounded-md border-1 p-2 text-sm leading-none focus:ring-1 focus:outline-none'
          />
        </div>

        <div className='md:col-span-2'>
          <FormInputTagChips
            label='Tags'
            placeholder='Escribe y separa por comas'
            onChange={(tags: string[]) =>
              setTaskForm(prev => ({ ...prev, tags }))
            }
            data={taskForm.tags}
          />
        </div>

        <div className='md:col-span-2'>
          <div className='mb-2 flex items-center justify-between'>
            <label className='text-text block text-sm'>Subtareas</label>
            <RoundSmallButton title='Añadir subtarea' onClick={onAddSubtask}>
              <span className='text-secondary text-lg leading-none'>+</span>
            </RoundSmallButton>
          </div>
          <div className='flex flex-col gap-2'>
            {taskForm.subtasks.map((subtask, index) => (
              <div
                key={`subtask-${index}`}
                className='bg-secondaryLightest border-secondaryLighter flex items-center gap-2 rounded-md border-1 p-2'
              >
                <input
                  type='text'
                  value={subtask.title}
                  onChange={event =>
                    onSubtaskTitleChange(index, event.target.value)
                  }
                  placeholder={`Subtarea ${index + 1}`}
                  className='text-secondaryLight bg-primary border-secondaryLighter focus:ring-secondaryLighter block w-full rounded-md border-1 p-1 text-sm leading-none focus:ring-1 focus:outline-none'
                />
                <button
                  type='button'
                  className='text-secondaryLight hover:text-secondary px-1 text-sm hover:cursor-pointer'
                  onClick={() => onRemoveSubtask(index)}
                  title='Eliminar subtarea'
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-4 flex justify-end gap-3 md:col-span-2'>
          <Button
            text='Cancelar'
            type='button'
            isFit
            small
            secondary
            onMouseClick={onCancel}
          />
          <Button
            text={editingTaskId ? 'Actualizar tarea' : 'Añadir tarea'}
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

export default ProjectTaskFormDialog
