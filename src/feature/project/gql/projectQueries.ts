import { gql } from '@apollo/client'

export const PROJECTS_INFO = gql`
  query {
    headers {
      title
      url
    }
    projects {
      _id
      title
      description
      shared
      category
      owner {
        _id
        name
        email
      }
      tasks {
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
  }
`

export const PROJECT_INFO = PROJECTS_INFO
