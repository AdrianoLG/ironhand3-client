import { SubmitHandler, useForm } from 'react-hook-form';

import { useMutation } from '@apollo/client';

import { CREATE_PROJECT } from '../gql/projectMutations';
import { PROJECTS_INFO } from '../gql/projectQueries';
import { iProjectFormInput } from '../types/types';
import ProjectForm from './ProjectForm';

const ProjectFormContainer = ({
  setIsOpen
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [createProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: PROJECTS_INFO }]
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<iProjectFormInput>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      shared: false
    }
  })

  const onSubmit: SubmitHandler<iProjectFormInput> = data => {
    createProject({
      variables: {
        createProjectInput: {
          title: data.title,
          description: data.description || '',
          category: data.category,
          shared: Boolean(data.shared)
        }
      }
    }).finally(() => {
      setIsOpen(false)
      reset()
    })
  }

  return (
    <ProjectForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      setValue={setValue}
      setIsOpen={setIsOpen}
    />
  )
}

export default ProjectFormContainer
