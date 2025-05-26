import { gql } from '@apollo/client'

export const ADD_EXERCISE = gql`
  mutation AddExercise($createExerciseInput: CreateExerciseInput!) {
    createExercise(createExerciseInput: $createExerciseInput) {
      _id
      name
      type
      bodyParts
      img
    }
  }
`

export const ADD_COMPLETE_EXERCISE = gql`
  mutation CompleteExercise(
    $createCompletedExerciseInput: CreateCompletedExerciseInput!
  ) {
    createCompletedExercise(
      createCompletedExerciseInput: $createCompletedExerciseInput
    ) {
      exercise {
        _id
      }
      date
    }
  }
`

export const UPDATE_EXERCISE = gql`
  mutation UpdateExercise($updateExerciseInput: UpdateExerciseInput!) {
    updateExercise(updateExerciseInput: $updateExerciseInput) {
      _id
      name
      bodyParts
      type
      img
    }
  }
`

export const REMOVE_EXERCISE = gql`
  mutation RemoveExercise($removeExerciseId: String!) {
    removeExercise(id: $removeExerciseId) {
      _id
    }
  }
`

export const UPDATE_COMPLETE_EXERCISE = gql`
  mutation CompleteExercise(
    $updateCompletedExerciseInput: UpdateCompletedExerciseInput!
  ) {
    updateCompletedExercise(
      updateCompletedExerciseInput: $updateCompletedExerciseInput
    ) {
      exercise {
        _id
      }
      date
    }
  }
`

export const REMOVE_COMPLETE_EXERCISE = gql`
  mutation RemoveCompleteExercise($removeCompletedExerciseId: String!) {
    removeCompletedExercise(id: $removeCompletedExerciseId) {
      _id
    }
  }
`
