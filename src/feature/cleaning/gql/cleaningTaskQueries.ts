import { gql } from '@apollo/client'

export const SELECT_CLEANING_TASKS = gql`
  query {
    cleaningTasks {
      _id
      name
      slug
      img
      possibleRooms {
        _id
        name
        slug
        image
      }
    }
    rooms {
      _id
      name
      slug
    }
  }
`

export const CLEANING_INFO = gql`
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
    completedCleaningTasks {
      _id
      completedAt
      cleaningTask {
        _id
        name
        slug
        img
      }
      rooms {
        _id
        name
        slug
        image
      }
    }
    cleaningTasks {
      _id
      name
      slug
      img
      possibleRooms {
        _id
        name
        slug
        image
      }
    }
  }
`

export const SELECT_ROOMS = gql`
  query {
    rooms {
      _id
      name
      slug
      image
    }
  }
`
