import { useState } from 'react';

import { Dialog } from '../../../components/organisms/dialogs';
import ProjectFormContainer from '../forms/ProjectFormContainer';

const ProjectsHeaderButtons = () => {
  const [projectFormIsOpen, setProjectFormIsOpen] = useState(false)

  return (
    <nav className='xl:max-w-screen-content mx-auto flex flex-wrap justify-start gap-2 px-4 pb-16 sm:px-8 lg:px-12'>
      <div>
        <Dialog
          buttonText='Añadir proyecto'
          title='Añadir proyecto'
          description='Completa los datos del nuevo proyecto'
          image='notes-bg'
          child={<ProjectFormContainer setIsOpen={setProjectFormIsOpen} />}
          isOpen={projectFormIsOpen}
          setIsOpen={setProjectFormIsOpen}
        />
      </div>
    </nav>
  )
}

export default ProjectsHeaderButtons
