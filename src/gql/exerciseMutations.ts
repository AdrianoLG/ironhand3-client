import { gql } from '@apollo/client'

export const ADD_EXERCISE = gql`
  mutation AddExercise($createExerciseInput: CreateExerciseInput!) {
    createExercise(createExerciseInput: $createExerciseInput) {
      _id
      name
      bodyParts
      type
      img
    }
  }
`

export const COMPLETE_EXERCISE = gql`
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
