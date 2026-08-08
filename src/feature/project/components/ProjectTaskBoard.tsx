import { Button, RoundSmallButton } from '../../../components/atoms';
import { iProject, iTask, iTaskStatus } from '../types/types';

const ProjectTaskBoard = ({
  selectedProject,
  todoTasks,
  doingTasks,
  doneTasks,
  onOpenTaskDialog,
  onOpenTaskDetail,
  onToggleSubtask,
  onDeleteProject,
  onUpdateProject,
  isDeletingProject
}: {
  selectedProject: iProject | null
  todoTasks: iTask[]
  doingTasks: iTask[]
  doneTasks: iTask[]
  onOpenTaskDialog: (status: iTaskStatus) => void
  onOpenTaskDetail: (taskId: string) => void
  onToggleSubtask: (
    taskId: string,
    subtaskIndex: number,
    completed: boolean
  ) => void
  onDeleteProject: () => void
  onUpdateProject: () => void
  isDeletingProject: boolean
}) => {
  const renderTaskCard = (task: iTask) => (
    <article
      key={task._id}
      tabIndex={0}
      role='button'
      onClick={() => onOpenTaskDetail(task._id)}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpenTaskDetail(task._id)
        }
      }}
      className='border-secondaryLighter hover:border-secondary mt-4 rounded-md border-1 p-3 text-left hover:cursor-pointer'
    >
      <h4 className='text-secondary text-sm font-semibold'>{task.title}</h4>
      {task.description && (
        <p
          className='text-secondaryLight mt-1 text-xs'
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {task.description}
        </p>
      )}

      {(task.subtasks ?? []).length > 0 && (
        <div className='mt-2 flex flex-col gap-1'>
          {(task.subtasks ?? []).map((subtask, index) => (
            <button
              key={`${task._id}-subtask-${index}`}
              type='button'
              className='text-secondaryLight hover:bg-primary/40 flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-left text-xs'
              onMouseDown={event => event.stopPropagation()}
              onClick={event => {
                event.stopPropagation()
                onToggleSubtask(task._id, index, !subtask.completed)
              }}
              onKeyDown={event => {
                event.stopPropagation()
              }}
            >
              <input
                type='checkbox'
                checked={subtask.completed}
                className='h-3.5 w-3.5 cursor-pointer'
                onClick={event => event.stopPropagation()}
                onChange={event =>
                  onToggleSubtask(task._id, index, event.target.checked)
                }
              />
              <span
                className={subtask.completed ? 'line-through opacity-70' : ''}
              >
                {subtask.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </article>
  )

  if (!selectedProject) {
    return (
      <div className='border-secondaryLighter rounded-md border-1 p-6'>
        <p className='text-secondary'>No hay proyecto seleccionado.</p>
      </div>
    )
  }

  return (
    <>
      <div className='mb-4'>
        <h2 className='text-secondary text-2xl font-semibold'>
          {selectedProject.title}
        </h2>
        <p className='text-secondaryLight mt-2 text-sm'>
          {selectedProject.description || 'Sin descripción'}
        </p>
      </div>

      <div className='flex gap-8'>
        <TaskColumn
          title='TODO'
          tasks={todoTasks}
          onAddTask={() => onOpenTaskDialog('TODO')}
          renderTaskCard={renderTaskCard}
        />
        <TaskColumn
          title='DOING'
          tasks={doingTasks}
          onAddTask={() => onOpenTaskDialog('DOING')}
          renderTaskCard={renderTaskCard}
        />
        <TaskColumn
          title='DONE'
          tasks={doneTasks}
          onAddTask={() => onOpenTaskDialog('DONE')}
          renderTaskCard={renderTaskCard}
        />
      </div>

      <div className='mt-8 flex justify-end gap-2'>
        <Button
          text='Borrar'
          xsmall
          isFit
          onMouseClick={onDeleteProject}
          disabled={isDeletingProject}
          type='button'
        />
        <Button
          text='Actualizar'
          xsmall
          isFit
          secondary
          onMouseClick={onUpdateProject}
          type='button'
        />
      </div>
    </>
  )
}

const TaskColumn = ({
  title,
  tasks,
  onAddTask,
  renderTaskCard
}: {
  title: string
  tasks: iTask[]
  onAddTask: () => void
  renderTaskCard: (task: iTask) => React.ReactNode
}) => (
  <div className='w-1/3'>
    <div className='mb-2 flex items-center justify-between'>
      <h3 className='text-lg font-semibold'>{title}</h3>
      <RoundSmallButton title={`Añadir tarea en ${title}`} onClick={onAddTask}>
        <span className='text-secondary text-lg leading-none'>+</span>
      </RoundSmallButton>
    </div>
    <div className='flex flex-col gap-2'>{tasks.map(renderTaskCard)}</div>
  </div>
)

export default ProjectTaskBoard
