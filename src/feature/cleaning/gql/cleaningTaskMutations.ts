import { gql } from '@apollo/client'

export const ADD_CLEANING_TASK = gql`
  mutation CleaningTask($createCleaningTaskInput: CreateCleaningTaskInput!) {
    createCleaningTask(createCleaningTaskInput: $createCleaningTaskInput) {
      _id
      name
    }
  }
`

export const UPDATE_CLEANING_TASK = gql`
  mutation UpdateCleaningTask(
    $updateCleaningTaskInput: UpdateCleaningTaskInput!
  ) {
    updateCleaningTask(updateCleaningTaskInput: $updateCleaningTaskInput) {
      _id
      name
      possibleRooms
      slug
    }
  }
`

export const REMOVE_CLEANING_TASK = gql`
  mutation RemoveCleaningTask($removedCleaningTaskId: String!) {
    removedCleaningTask(id: $removedCleaningTaskId) {
      _id
    }
  }
`

export const ADD_COMPLETED_CLEANING_TASK = gql`
  mutation CompletedCleaningTask(
    $createCompletedCleaningTaskInput: CreateCompletedCleaningTaskInput!
  ) {
    createCompletedCleaningTask(
      createCompletedCleaningTaskInput: $createCompletedCleaningTaskInput
    ) {
      _id
    }
  }
`

export const UPDATE_COMPLETED_CLEANING_TASK = gql`
  mutation UpdateCompletedCleaningTask(
    $updateCompletedCleaningTaskInput: UpdateCompletedCleaningTaskInput!
  ) {
    updateCompletedCleaningTask(
      updateCompletedCleaningTaskInput: $updateCompletedCleaningTaskInput
    ) {
      _id
    }
  }
`

export const REMOVE_COMPLETED_CLEANING_TASK = gql`
  mutation RemoveCompletedCleaningTask(
    $removeCompletedCleaningTaskId: String!
  ) {
    removeCompletedCleaningTask(id: $removeCompletedCleaningTaskId) {
      _id
    }
  }
`
