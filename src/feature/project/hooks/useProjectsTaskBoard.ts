import { useEffect, useMemo, useState } from 'react';

import { useMutation } from '@apollo/client';

import {
    CREATE_TASK, REMOVE_PROJECT, REMOVE_TASK, UPDATE_PROJECT, UPDATE_TASK_STATUS
} from '../gql/projectMutations';
import { PROJECTS_INFO } from '../gql/projectQueries';
import { iProject, iTask, iTaskStatus } from '../types/types';
import {
    createEmptyTaskForm, filterTasksByStatus, mapTaskToTaskForm, sanitizeSubtasks, TaskFormState
} from '../utils/taskForm';

const priorityLabels: Record<string, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  URGENT: 'Urgente'
}

const useProjectsTaskBoard = ({
  projects,
  refetch
}: {
  projects: iProject[]
  refetch: () => Promise<unknown>
}) => {
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '',
    shared: false
  })
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const [taskDetailDialogOpen, setTaskDetailDialogOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState('')
  const [editingTaskId, setEditingTaskId] = useState('')
  const [taskDialogStatus, setTaskDialogStatus] = useState<iTaskStatus>('TODO')
  const [taskForm, setTaskForm] = useState<TaskFormState>(
    createEmptyTaskForm('TODO')
  )

  const [createTask, { loading: creatingTask }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: PROJECTS_INFO }],
    awaitRefetchQueries: true
  })
  const [updateTaskStatus, { loading: updatingTaskStatus }] = useMutation(
    UPDATE_TASK_STATUS,
    {
      refetchQueries: [{ query: PROJECTS_INFO }],
      awaitRefetchQueries: true
    }
  )
  const [removeTask, { loading: removingTask }] = useMutation(REMOVE_TASK, {
    refetchQueries: [{ query: PROJECTS_INFO }],
    awaitRefetchQueries: true
  })
  const [updateProject, { loading: updatingProject }] = useMutation(
    UPDATE_PROJECT,
    {
      refetchQueries: [{ query: PROJECTS_INFO }],
      awaitRefetchQueries: true
    }
  )
  const [removeProject, { loading: removingProject }] = useMutation(
    REMOVE_PROJECT,
    {
      refetchQueries: [{ query: PROJECTS_INFO }],
      awaitRefetchQueries: true
    }
  )

  useEffect(() => {
    if (projects.length === 0) {
      setSelectedProjectId('')
      return
    }

    if (
      !selectedProjectId ||
      !projects.some(p => p._id === selectedProjectId)
    ) {
      setSelectedProjectId(projects[0]._id)
    }
  }, [projects, selectedProjectId])

  const selectedProject = useMemo(
    () => projects.find(project => project._id === selectedProjectId) ?? null,
    [projects, selectedProjectId]
  )

  const selectedTask = useMemo(() => {
    const tasks = selectedProject?.tasks ?? []
    return tasks.find(task => task._id === selectedTaskId) ?? null
  }, [selectedProject?.tasks, selectedTaskId])

  useEffect(() => {
    if (!selectedTaskId) return
    const exists = (selectedProject?.tasks ?? []).some(
      task => task._id === selectedTaskId
    )

    if (!exists) {
      setSelectedTaskId('')
      setTaskDetailDialogOpen(false)
    }
  }, [selectedProject?.tasks, selectedTaskId])

  const todoTasks = useMemo(
    () => filterTasksByStatus(selectedProject?.tasks ?? [], 'TODO'),
    [selectedProject?.tasks]
  )
  const doingTasks = useMemo(
    () => filterTasksByStatus(selectedProject?.tasks ?? [], 'DOING'),
    [selectedProject?.tasks]
  )
  const doneTasks = useMemo(
    () => filterTasksByStatus(selectedProject?.tasks ?? [], 'DONE'),
    [selectedProject?.tasks]
  )

  const openTaskDialog = (status: iTaskStatus) => {
    setEditingTaskId('')
    setTaskDialogStatus(status)
    setTaskForm(createEmptyTaskForm(status))
    setTaskDialogOpen(true)
  }

  const openEditTaskDialog = (task: iTask) => {
    setEditingTaskId(task._id)
    setTaskDialogStatus(task.status)
    setTaskForm(mapTaskToTaskForm(task))
    setTaskDialogOpen(true)
  }

  const closeTaskDialog = () => {
    setTaskDialogOpen(false)
    setEditingTaskId('')
  }

  const submitTaskForm = async () => {
    if (!selectedProject || !taskForm.title.trim() || !taskForm.priority) return

    const parsedSubtasks = sanitizeSubtasks(taskForm.subtasks)

    if (editingTaskId) {
      await updateTaskStatus({
        variables: {
          updateTaskInput: {
            _id: editingTaskId,
            title: taskForm.title.trim(),
            description: taskForm.description.trim(),
            subtasks: parsedSubtasks,
            asignedTo: taskForm.asignedTo.trim() || undefined,
            priority: taskForm.priority,
            status: taskForm.status,
            tags: taskForm.tags,
            project: selectedProject._id
          }
        }
      })
    } else {
      await createTask({
        variables: {
          createTaskInput: {
            title: taskForm.title.trim(),
            description: taskForm.description.trim(),
            subtasks: parsedSubtasks,
            asignedTo: taskForm.asignedTo.trim() || undefined,
            priority: taskForm.priority,
            status: taskForm.status,
            tags: taskForm.tags,
            project: selectedProject._id
          }
        }
      })
    }

    await refetch()

    setTaskDialogOpen(false)
    setEditingTaskId('')
    setTaskForm(createEmptyTaskForm(taskDialogStatus))
  }

  const addSubtask = () => {
    setTaskForm(prev => ({
      ...prev,
      subtasks: [...prev.subtasks, { title: '', completed: false }]
    }))
  }

  const changeSubtaskTitle = (index: number, title: string) => {
    setTaskForm(prev => ({
      ...prev,
      subtasks: prev.subtasks.map((subtask, currentIndex) =>
        currentIndex === index ? { ...subtask, title } : subtask
      )
    }))
  }

  const removeSubtask = (index: number) => {
    setTaskForm(prev => ({
      ...prev,
      subtasks:
        prev.subtasks.length === 1
          ? [{ title: '', completed: false }]
          : prev.subtasks.filter((_, currentIndex) => currentIndex !== index)
    }))
  }

  const moveTask = async (taskId: string, status: iTaskStatus) => {
    await updateTaskStatus({
      variables: {
        updateTaskInput: {
          _id: taskId,
          status
        }
      }
    })
    await refetch()
  }

  const moveTaskFromDetail = async (taskId: string, status: iTaskStatus) => {
    await moveTask(taskId, status)
    setTaskDetailDialogOpen(false)
  }

  const toggleSubtask = async (
    taskId: string,
    subtaskIndex: number,
    completed: boolean
  ) => {
    const task = (selectedProject?.tasks ?? []).find(
      item => item._id === taskId
    )
    if (!task?.subtasks?.length) return

    const nextSubtasks = task.subtasks.map((subtask, index) => ({
      title: subtask.title,
      completed: index === subtaskIndex ? completed : subtask.completed
    }))

    await updateTaskStatus({
      variables: {
        updateTaskInput: {
          _id: taskId,
          subtasks: nextSubtasks
        }
      }
    })
    await refetch()
  }

  const openTaskDetail = (taskId: string) => {
    setSelectedTaskId(taskId)
    setTaskDetailDialogOpen(true)
  }

  const deleteSelectedTask = async () => {
    if (!selectedTaskId) return

    await removeTask({ variables: { id: selectedTaskId } })
    await refetch()
    setTaskDetailDialogOpen(false)
    setSelectedTaskId('')
  }

  const openProjectDialog = () => {
    if (!selectedProject) return

    setProjectForm({
      title: selectedProject.title,
      description: selectedProject.description || '',
      category: selectedProject.category,
      shared: selectedProject.shared
    })
    setProjectDialogOpen(true)
  }

  const closeProjectDialog = () => {
    setProjectDialogOpen(false)
  }

  const submitProjectForm = async () => {
    if (
      !selectedProject ||
      !projectForm.title.trim() ||
      !projectForm.category.trim()
    ) {
      return
    }

    await updateProject({
      variables: {
        updateProjectInput: {
          _id: selectedProject._id,
          title: projectForm.title.trim(),
          description: projectForm.description.trim(),
          category: projectForm.category.trim(),
          shared: projectForm.shared
        }
      }
    })

    await refetch()
    setProjectDialogOpen(false)
  }

  const deleteSelectedProject = async () => {
    if (!selectedProject) return

    await removeProject({
      variables: {
        id: selectedProject._id
      }
    })

    await refetch()
    setProjectDialogOpen(false)
  }

  return {
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
    selectedTask,
    todoTasks,
    doingTasks,
    doneTasks,
    taskDialogOpen,
    setTaskDialogOpen,
    taskDetailDialogOpen,
    setTaskDetailDialogOpen,
    editingTaskId,
    taskForm,
    setTaskForm,
    creatingTask,
    updatingTaskStatus,
    removingTask,
    priorityLabels,
    projectDialogOpen,
    setProjectDialogOpen,
    projectForm,
    setProjectForm,
    updatingProject,
    removingProject,
    openProjectDialog,
    closeProjectDialog,
    submitProjectForm,
    deleteSelectedProject,
    openTaskDialog,
    openEditTaskDialog,
    closeTaskDialog,
    submitTaskForm,
    addSubtask,
    changeSubtaskTitle,
    removeSubtask,
    moveTaskFromDetail,
    toggleSubtask,
    openTaskDetail,
    deleteSelectedTask
  }
}

export default useProjectsTaskBoard
