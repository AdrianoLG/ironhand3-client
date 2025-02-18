import { gql } from '@apollo/client'

export const SHORTCUT_CATEGORIES_AND_HEADERS = gql`
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
