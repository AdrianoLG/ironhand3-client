import { gql } from '@apollo/client'

export const ME = gql`
  query Me {
    me {
      _id
      name
      email
    }
  }
`

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      _id
      name
      email
    }
  }
`

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
    forgotPassword(forgotPasswordInput: $forgotPasswordInput)
  }
`

export const RESET_PASSWORD = gql`
  mutation ResetPassword($resetPasswordInput: ResetPasswordInput!) {
    resetPassword(resetPasswordInput: $resetPasswordInput)
  }
`

export const USERS = gql`
  query Users {
    users {
      _id
      name
      email
    }
  }
`
