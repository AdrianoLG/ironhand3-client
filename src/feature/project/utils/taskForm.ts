import { iTask, iTaskPriority, iTaskStatus, iTaskSubtask } from '../types/types';

export type TaskFormState = {
  title: string
  description: string
  subtasks: iTaskSubtask[]
  asignedTo: string
  priority: '' | iTaskPriority
  status: iTaskStatus
  tags: string[]
}

export const createEmptyTaskForm = (
  status: iTaskStatus = 'TODO'
): TaskFormState => ({
  title: '',
  description: '',
  subtasks: [{ title: '', completed: false }],
  asignedTo: '',
  priority: '',
  status,
  tags: []
})

export const mapTaskToTaskForm = (task: iTask): TaskFormState => ({
  title: task.title,
  description: task.description || '',
  subtasks:
    (task.subtasks ?? []).length > 0
      ? task.subtasks!.map(subtask => ({
          title: subtask.title,
          completed: subtask.completed
        }))
      : [{ title: '', completed: false }],
  asignedTo: task.asignedTo?._id || '',
  priority: task.priority || '',
  status: task.status,
  tags: task.tags ?? []
})

export const sanitizeSubtasks = (subtasks: iTaskSubtask[]): iTaskSubtask[] =>
  subtasks
    .map(subtask => ({
      title: subtask.title.trim(),
      completed: subtask.completed ?? false
    }))
    .filter(subtask => subtask.title.length > 0)

export const filterTasksByStatus = (tasks: iTask[] = [], status: iTaskStatus) =>
  tasks.filter(task => task.status === status)
