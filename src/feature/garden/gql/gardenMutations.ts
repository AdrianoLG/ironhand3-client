import { gql } from '@apollo/client'

export const REMOVE_PLANT = gql`
  mutation RemovePlant($removedPlantId: String!) {
    removePlant(id: $removedPlantId) {
      _id
    }
  }
`
export const REMOVE_COMPLETED_WATERING = gql`
  mutation RemoveCompletedWatering($removedCompletedWateringId: String!) {
    removeCompletedWatering(id: $removedCompletedWateringId) {
      _id
    }
  }
`
