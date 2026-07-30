import { gql } from '@apollo/client';

export const NOTE_INFO = gql`
  query {
    headers {
      title
      url
    }
    noteCategories
    notes {
      _id
      title
      category
      tags
      images
      content
    }
  }
`
