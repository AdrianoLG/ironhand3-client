import { gql } from '@apollo/client'

export const REMOVE_PLANT = gql`
  mutation RemovePlant($removedPlantId: String!) {
    removePlant(id: $removedPlantId) {
      _id
    }
  }
`
