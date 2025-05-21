import { gql } from '@apollo/client'

export const SELECT_EXERCISES = gql`
  query {
    exercises {
      _id
      name
      type
    }
  }
`

export const EXERCISES_INFO = gql`
  query {
    shortcutCategories {
      _id
      title
      shortcuts {
        _id
        title
        image
        action
      }
    }
    headers {
      title
      url
    }
    completedExercises {
      _id
      date
      exercise {
        _id
        name
        bodyParts
        type
        img
      }
      repetitions
      time
      ppm_max
      ppm_min
      weight
    }
    exercises {
      _id
      name
      bodyParts
      type
      img
    }
  }
`
