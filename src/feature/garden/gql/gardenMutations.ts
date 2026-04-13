import { gql } from '@apollo/client'

export const ADD_PLANT = gql`
  mutation CreatePlant($createPlantInput: CreatePlantInput!) {
    createPlant(createPlantInput: $createPlantInput) {
      _id
    }
  }
`

export const UPDATE_PLANT = gql`
  mutation UpdatePlant($updatePlantInput: UpdatePlantInput!) {
    updatePlant(updatePlantInput: $updatePlantInput) {
      _id
    }
  }
`

export const ADD_CROP = gql`
  mutation CreateCrop($createCropInput: CreateCropInput!) {
    createCrop(createCropInput: $createCropInput) {
      _id
    }
  }
`

export const UPDATE_CROP = gql`
  mutation UpdateCrop($updateCropInput: UpdateCropInput!) {
    updateCrop(updateCropInput: $updateCropInput) {
      _id
    }
  }
`

export const ADD_WATERING = gql`
  mutation CreateWatering($createWateringInput: CreateWateringInput!) {
    createWatering(createWateringInput: $createWateringInput) {
      _id
    }
  }
`

export const UPDATE_WATERING = gql`
  mutation UpdateWatering($updateWateringInput: UpdateWateringInput!) {
    updateWatering(updateWateringInput: $updateWateringInput) {
      _id
    }
  }
`

export const ADD_SPECIE = gql`
  mutation CreateSpecie($createSpecieInput: CreateSpecieInput!) {
    createSpecie(createSpecieInput: $createSpecieInput) {
      _id
    }
  }
`

export const UPDATE_SPECIE = gql`
  mutation UpdateSpecie($updateSpecieInput: UpdateSpecieInput!) {
    updateSpecie(updateSpecieInput: $updateSpecieInput) {
      _id
    }
  }
`

export const REMOVE_SPECIE = gql`
  mutation RemoveSpecie($removedSpecieId: String!) {
    removeSpecie(id: $removedSpecieId) {
      _id
    }
  }
`

export const REMOVE_PLANT = gql`
  mutation RemovePlant($removedPlantId: String!) {
    removePlant(id: $removedPlantId) {
      _id
    }
  }
`

export const REMOVE_CROP = gql`
  mutation RemoveCrop($removedCropId: String!) {
    removeCrop(id: $removedCropId) {
      _id
    }
  }
`

export const REMOVE_COMPLETED_WATERING = gql`
  mutation RemoveCompletedWatering($removedCompletedWateringId: String!) {
    removeWatering(id: $removedCompletedWateringId) {
      _id
    }
  }
`
