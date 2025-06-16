import { gql } from '@apollo/client'

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
  }
`
