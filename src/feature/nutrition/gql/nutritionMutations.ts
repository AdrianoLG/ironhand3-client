import { gql } from '@apollo/client'

export const ADD_RECIPE = gql`
  mutation CreateRecipe($createRecipeInput: CreateRecipeInput!) {
    createRecipe(createRecipeInput: $createRecipeInput) {
      _id
    }
  }
`

export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($updateRecipeInput: UpdateRecipeInput!) {
    updateRecipe(updateRecipeInput: $updateRecipeInput) {
      _id
    }
  }
`

export const REMOVE_RECIPE = gql`
  mutation RemoveRecipe($id: String!) {
    removeRecipe(id: $id) {
      _id
    }
  }
`

export const ADD_FOOD = gql`
  mutation CreateFood($createFoodInput: CreateFoodInput!) {
    createFood(createFoodInput: $createFoodInput) {
      _id
    }
  }
`

export const ADD_COMPLETED_MEAL = gql`
  mutation CreateCompletedMeal(
    $createCompletedMealInput: CreateCompletedMealInput!
  ) {
    createCompletedMeal(createCompletedMealInput: $createCompletedMealInput) {
      _id
    }
  }
`

export const UPDATE_COMPLETED_MEAL = gql`
  mutation UpdateCompletedMeal(
    $updateCompletedMealInput: UpdateCompletedMealInput!
  ) {
    updateCompletedMeal(updateCompletedMealInput: $updateCompletedMealInput) {
      _id
    }
  }
`

export const REMOVE_COMPLETED_MEAL = gql`
  mutation RemoveCompletedMeal($id: String!) {
    removeCompletedMeal(id: $id) {
      _id
    }
  }
`

export const ADD_INGREDIENT = gql`
  mutation CreateIngredient($createIngredientInput: CreateIngredientInput!) {
    createIngredient(createIngredientInput: $createIngredientInput) {
      _id
    }
  }
`

export const UPDATE_INGREDIENT = gql`
  mutation UpdateIngredient($updateIngredientInput: UpdateIngredientInput!) {
    updateIngredient(updateIngredientInput: $updateIngredientInput) {
      _id
    }
  }
`

export const REMOVE_INGREDIENT = gql`
  mutation RemoveIngredient($id: String!) {
    removeIngredient(id: $id) {
      _id
    }
  }
`
