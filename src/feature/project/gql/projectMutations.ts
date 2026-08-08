import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation CreateProject($createProjectInput: CreateProjectInput!) {
    createProject(createProjectInput: $createProjectInput) {
      _id
      title
      description
      shared
      category
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($updateProjectInput: UpdateProjectInput!) {
    updateProject(updateProjectInput: $updateProjectInput) {
      _id
      title
      description
      shared
      category
    }
  }
`

export const REMOVE_PROJECT = gql`
  mutation RemoveProject($id: String!) {
    removeProject(id: $id) {
      _id
    }
  }
`

export const CREATE_TASK = gql`
  mutation CreateTask($createTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $createTaskInput) {
      _id
      title
      description
      status
      completed
    }
  }
`

export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($updateTaskInput: UpdateTaskInput!) {
    updateTask(updateTaskInput: $updateTaskInput) {
      _id
      title
      description
      priority
      tags
      subtasks {
        title
        completed
      }
      asignedTo {
        _id
        name
        email
      }
      status
      completed
    }
  }
`

export const REMOVE_TASK = gql`
  mutation RemoveTask($id: String!) {
    removeTask(id: $id) {
      _id
    }
  }
`
