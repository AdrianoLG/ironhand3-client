import { Button } from '../../../components/atoms';
import { Dialog } from '../../../components/organisms/dialogs';
import { iTask, iTaskStatus } from '../types/types';

const ProjectTaskDetailDialog = ({
  isOpen,
  setIsOpen,
  selectedTask,
  updatingTaskStatus,
  removingTask,
  priorityLabels,
  onMoveTask,
  onToggleSubtask,
  onDelete,
  onEdit
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedTask: iTask | null
  updatingTaskStatus: boolean
  removingTask: boolean
  priorityLabels: Record<string, string>
  onMoveTask: (taskId: string, status: iTaskStatus) => void
  onToggleSubtask: (
    taskId: string,
    subtaskIndex: number,
    completed: boolean
  ) => void
  onDelete: () => void
  onEdit: () => void
}) => (
  <Dialog
    buttonText='Detalle de tarea'
    title='Detalle de tarea'
    description='Información completa de la tarea seleccionada'
    image='notes-bg'
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    hideTrigger
    child={
      !selectedTask ? (
        <div className='my-7 px-8'>
          <p className='text-secondaryLight text-sm'>
            No hay tarea seleccionada.
          </p>
        </div>
      ) : (
        <div className='my-7 flex flex-col gap-3 px-8'>
          <div className='mb-1 flex gap-2'>
            <Button
              text='Todo'
              xsmall
              isFit
              outline
              disabled={selectedTask.status === 'TODO' || updatingTaskStatus}
              onMouseClick={() => onMoveTask(selectedTask._id, 'TODO')}
              type='button'
            />
            <Button
              text='Doing'
              xsmall
              isFit
              outline
              disabled={selectedTask.status === 'DOING' || updatingTaskStatus}
              onMouseClick={() => onMoveTask(selectedTask._id, 'DOING')}
              type='button'
            />
            <Button
              text='Done'
              xsmall
              isFit
              outline
              disabled={selectedTask.status === 'DONE' || updatingTaskStatus}
              onMouseClick={() => onMoveTask(selectedTask._id, 'DONE')}
              type='button'
            />
          </div>

          <div>
            <p className='text-secondaryLight text-xs'>Título</p>
            <p className='text-secondary text-lg font-semibold'>
              {selectedTask.title}
            </p>
          </div>

          <div>
            <p className='text-secondaryLight text-xs'>Descripción</p>
            <p className='text-secondary text-sm'>
              {selectedTask.description || 'Sin descripción'}
            </p>
          </div>

          <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
            <div>
              <p className='text-secondaryLight text-xs'>Estado</p>
              <p className='text-secondary text-sm'>{selectedTask.status}</p>
            </div>
            <div>
              <p className='text-secondaryLight text-xs'>Prioridad</p>
              <p className='text-secondary text-sm'>
                {selectedTask.priority
                  ? priorityLabels[selectedTask.priority] ||
                    selectedTask.priority
                  : 'Sin prioridad'}
              </p>
            </div>
            <div>
              <p className='text-secondaryLight text-xs'>Asignado a</p>
              <p className='text-secondary text-sm'>
                {selectedTask.asignedTo?.name ||
                  selectedTask.asignedTo?.email ||
                  selectedTask.asignedTo?._id ||
                  'Sin asignar'}
              </p>
            </div>
          </div>

          <div>
            <p className='text-secondaryLight mb-1 text-xs'>Tags</p>
            {(selectedTask.tags ?? []).length > 0 ? (
              <div className='flex flex-wrap gap-1'>
                {(selectedTask.tags ?? []).map(tag => (
                  <span
                    key={tag}
                    className='bg-warn text-accent rounded px-2 py-0.5 text-xs'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className='text-secondaryLight text-sm'>Sin tags</p>
            )}
          </div>

          <div>
            <p className='text-secondaryLight mb-1 text-xs'>Subtareas</p>
            {(selectedTask.subtasks ?? []).length > 0 ? (
              <ul className='flex flex-col gap-1'>
                {(selectedTask.subtasks ?? []).map((subtask, index) => (
                  <li
                    key={`${subtask.title}-${index}`}
                    className='text-secondary text-sm'
                  >
                    <label className='flex cursor-pointer items-center gap-2'>
                      <input
                        type='checkbox'
                        checked={subtask.completed}
                        className='h-3.5 w-3.5 cursor-pointer'
                        onChange={event =>
                          onToggleSubtask(
                            selectedTask._id,
                            index,
                            event.target.checked
                          )
                        }
                      />
                      <span
                        className={
                          subtask.completed ? 'line-through opacity-70' : ''
                        }
                      >
                        {subtask.title}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-secondaryLight text-sm'>Sin subtareas</p>
            )}
          </div>

          <div className='mt-2 flex gap-2 pt-2'>
            <Button
              text='Borrar'
              xsmall
              isFit
              disabled={removingTask}
              onMouseClick={onDelete}
              type='button'
            />
            <Button
              text='Editar'
              xsmall
              isFit
              secondary
              onMouseClick={onEdit}
              type='button'
            />
          </div>
        </div>
      )
    }
  />
)

export default ProjectTaskDetailDialog
