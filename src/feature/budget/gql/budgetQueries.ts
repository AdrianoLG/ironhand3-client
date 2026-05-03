import { gql } from '@apollo/client';

export const BUDGET_INFO = gql`
  query {
    headers {
      title
      url
    }
    transactions {
      _id
      title
      category
      type
      month
      year
      expectedAmount
      realAmount
      isPaid
      subscription {
        _id
        frequency
        isLoan
        dayOfMonth
        startDate
        endDate
        amount
        isActive
      }
    }
    savings {
      _id
      name
      balance
      goals {
        _id
        title
        targetAmount
        isCompleted
        completedAt
      }
    }
  }
`
