import ErrorMessage from '../components/molecules/ErrorMessage';
import Heading from '../components/molecules/Heading';
import Spinner from '../components/molecules/Spinner';
import ProjectEditDialog from '../feature/project/components/ProjectEditDialog';
import ProjectsHeaderButtons from '../feature/project/components/ProjectsHeaderButtons';
import ProjectSidebar from '../feature/project/components/ProjectSidebar';
import ProjectTaskBoard from '../feature/project/components/ProjectTaskBoard';
import ProjectTaskDetailDialog from '../feature/project/components/ProjectTaskDetailDialog';
import ProjectTaskFormDialog from '../feature/project/components/ProjectTaskFormDialog';
import useFilterProjects from '../feature/project/hooks/useFilterProjects';
import useProjectsTaskBoard from '../feature/project/hooks/useProjectsTaskBoard';
import ThirdsLayout from '../layouts/body/ThirdsLayout';
import Header from '../layouts/header/Header';

const Projects = () => {
  const { data, loading, error, refetch } = useFilterProjects()
  const projects = data?.projects ?? []
  const taskBoard = useProjectsTaskBoard({ projects, refetch })

  if (loading)
    return (
      <Spinner classes='my-7 flex w-full justify-center px-8' widthInRem={2} />
    )

  if (error)
    return (
      <ErrorMessage
        message={'No conectado a la base de datos'}
        errorMessage={error.message}
        containerClasses='my-7 flex w-full justify-center px-8 text-secondary'
      />
    )

  return (
    <>
      <Header isMain={false} headers={data?.headers} />
      <Heading title='Proyectos' />
      <ProjectsHeaderButtons />
      <ThirdsLayout>
        <ProjectSidebar
          projects={projects}
          selectedProjectId={taskBoard.selectedProjectId}
          onSelectProject={taskBoard.setSelectedProjectId}
        />
        <section className='border-secondaryLight w-full rounded-md border-1 p-8 lg:col-span-2'>
          <ProjectTaskBoard
            selectedProject={taskBoard.selectedProject}
            todoTasks={taskBoard.todoTasks}
            doingTasks={taskBoard.doingTasks}
            doneTasks={taskBoard.doneTasks}
            onOpenTaskDialog={taskBoard.openTaskDialog}
            onOpenTaskDetail={taskBoard.openTaskDetail}
            onToggleSubtask={taskBoard.toggleSubtask}
            onDeleteProject={taskBoard.deleteSelectedProject}
            onUpdateProject={taskBoard.openProjectDialog}
            isDeletingProject={taskBoard.removingProject}
          />
        </section>
      </ThirdsLayout>

      <ProjectEditDialog
        isOpen={taskBoard.projectDialogOpen}
        setIsOpen={taskBoard.setProjectDialogOpen}
        projectForm={taskBoard.projectForm}
        setProjectForm={taskBoard.setProjectForm}
        onSubmit={taskBoard.submitProjectForm}
        isSubmitting={taskBoard.updatingProject}
      />

      <ProjectTaskFormDialog
        isOpen={taskBoard.taskDialogOpen}
        setIsOpen={taskBoard.setTaskDialogOpen}
        editingTaskId={taskBoard.editingTaskId}
        taskForm={taskBoard.taskForm}
        setTaskForm={taskBoard.setTaskForm}
        onSubmit={taskBoard.submitTaskForm}
        onCancel={taskBoard.closeTaskDialog}
        onAddSubtask={taskBoard.addSubtask}
        onSubtaskTitleChange={taskBoard.changeSubtaskTitle}
        onRemoveSubtask={taskBoard.removeSubtask}
        isSubmitting={
          taskBoard.editingTaskId
            ? taskBoard.updatingTaskStatus
            : taskBoard.creatingTask
        }
      />

      <ProjectTaskDetailDialog
        isOpen={taskBoard.taskDetailDialogOpen}
        setIsOpen={taskBoard.setTaskDetailDialogOpen}
        selectedTask={taskBoard.selectedTask}
        updatingTaskStatus={taskBoard.updatingTaskStatus}
        removingTask={taskBoard.removingTask}
        priorityLabels={taskBoard.priorityLabels}
        onMoveTask={taskBoard.moveTaskFromDetail}
        onToggleSubtask={taskBoard.toggleSubtask}
        onDelete={taskBoard.deleteSelectedTask}
        onEdit={() => {
          if (!taskBoard.selectedTask) return
          taskBoard.setTaskDetailDialogOpen(false)
          taskBoard.openEditTaskDialog(taskBoard.selectedTask)
        }}
      />
    </>
  )
}
export default Projects
