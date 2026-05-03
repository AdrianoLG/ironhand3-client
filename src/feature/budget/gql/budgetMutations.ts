import { gql } from '@apollo/client';

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {
    createTransaction(createTransactionInput: $createTransactionInput) {
      _id
    }
  }
`

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($updateTransactionInput: UpdateTransactionInput!) {
    updateTransaction(updateTransactionInput: $updateTransactionInput) {
      _id
    }
  }
`

export const REMOVE_TRANSACTION = gql`
  mutation RemoveTransaction($id: String!) {
    removeTransaction(id: $id) {
      _id
    }
  }
`

export const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription(
    $createSubscriptionInput: CreateSubscriptionInput!
  ) {
    createSubscription(createSubscriptionInput: $createSubscriptionInput) {
      _id
    }
  }
`

export const UPDATE_SUBSCRIPTION = gql`
  mutation UpdateSubscription(
    $updateSubscriptionInput: UpdateSubscriptionInput!
  ) {
    updateSubscription(updateSubscriptionInput: $updateSubscriptionInput) {
      _id
    }
  }
`

export const REMOVE_SUBSCRIPTION = gql`
  mutation RemoveSubscription($id: String!) {
    removeSubscription(id: $id) {
      _id
    }
  }
`

export const CREATE_SAVING = gql`
  mutation CreateSaving($createSavingInput: CreateSavingInput!) {
    createSaving(createSavingInput: $createSavingInput) {
      _id
    }
  }
`

export const UPDATE_SAVING = gql`
  mutation UpdateSaving($updateSavingInput: UpdateSavingInput!) {
    updateSaving(updateSavingInput: $updateSavingInput) {
      _id
    }
  }
`

export const CREATE_GOAL = gql`
  mutation CreateGoal($createGoalInput: CreateGoalInput!) {
    createGoal(createGoalInput: $createGoalInput) {
      _id
    }
  }
`

export const UPDATE_GOAL = gql`
  mutation UpdateGoal($updateGoalInput: UpdateGoalInput!) {
    updateGoal(updateGoalInput: $updateGoalInput) {
      _id
    }
  }
`
