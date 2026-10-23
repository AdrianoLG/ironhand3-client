import { gql } from '@apollo/client'

export const CREATE_NOTE = gql`
  mutation CreateNote($createNoteInput: CreateNoteInput!) {
    createNote(createNoteInput: $createNoteInput) {
      _id
      title
      category
      shared
    }
  }
`

export const UPDATE_NOTE = gql`
  mutation UpdateNote($updateNoteInput: UpdateNoteInput!) {
    updateNote(updateNoteInput: $updateNoteInput) {
      _id
      title
      category
      tags
      images
      content
      shared
      owner {
        _id
        name
        email
      }
    }
  }
`

export const REMOVE_NOTE = gql`
  mutation RemoveNote($id: String!) {
    removeNote(id: $id) {
      _id
    }
  }
`
