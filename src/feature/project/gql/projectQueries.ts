import { gql } from '@apollo/client'

export const PROJECT_INFO = gql`
  query {
    headers {
      title
      url
    }
  }
`
