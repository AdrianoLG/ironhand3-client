import { iProject } from '../types/types';

const ProjectSidebar = ({
  projects,
  selectedProjectId,
  onSelectProject
}: {
  projects: iProject[]
  selectedProjectId: string
  onSelectProject: (projectId: string) => void
}) => (
  <aside className='mr-8'>
    <div className='flex flex-col gap-2'>
      {projects.map(project => (
        <button
          key={project._id}
          type='button'
          className={`${selectedProjectId === project._id ? 'border-secondary bg-secondaryLightest font-semibold' : 'border-secondaryLighter'} text-text rounded-md border-1 px-3 py-2 text-left text-sm`}
          onClick={() => onSelectProject(project._id)}
        >
          <p className='font-semibold'>{project.title}</p>
          <p className='text-xs opacity-80'>{project.category}</p>
        </button>
      ))}
    </div>
  </aside>
)

export default ProjectSidebar
