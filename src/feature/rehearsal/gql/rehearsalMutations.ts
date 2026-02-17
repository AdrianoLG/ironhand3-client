import { gql } from '@apollo/client'

export const ADD_REHEARSAL = gql`
  mutation CreateRehearsal($createRehearsalInput: CreateRehearsalInput!) {
    createRehearsal(createRehearsalInput: $createRehearsalInput) {
      _id
    }
  }
`

export const UPDATE_REHEARSAL = gql`
  mutation UpdateRehearsal($updateRehearsalInput: UpdateRehearsalInput!) {
    updateRehearsal(updateRehearsalInput: $updateRehearsalInput) {
      _id
      completedAt
      sheets {
        duration
      }
    }
  }
`

export const REMOVE_REHEARSAL = gql`
  mutation RemoveRehearsal($removedRehearsalId: String!) {
    removeRehearsal(id: $removedRehearsalId) {
      _id
    }
  }
`

export const ADD_SHEET = gql`
  mutation CreateSheet($createSheetInput: CreateSheetInput!) {
    createSheet(createSheetInput: $createSheetInput) {
      _id
      title
    }
  }
`

export const UPDATE_SHEET = gql`
  mutation UpdateSheet($updateSheetInput: UpdateSheetInput!) {
    updateSheet(updateSheetInput: $updateSheetInput) {
      _id
    }
  }
`

export const REMOVE_SHEET = gql`
  mutation RemoveSheet($removeSheetId: String!) {
    removeSheet(id: $removeSheetId) {
      _id
    }
  }
`
