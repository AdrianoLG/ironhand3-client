import { gql } from '@apollo/client'

export const NOTE_INFO = gql`
  query {
    headers {
      title
      url
    }
  }
`
