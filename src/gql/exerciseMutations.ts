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
