import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation CreateBook($createBookInput: CreateBookInput!) {
    createBook(createBookInput: $createBookInput) {
      _id
      title
    }
  }
`

export const CREATE_SERIE = gql`
  mutation CreateSerie($createSerieInput: CreateSerieInput!) {
    createSerie(createSerieInput: $createSerieInput) {
      _id
      title
    }
  }
`

export const CREATE_MOVIE = gql`
  mutation CreateMovie($createMovieInput: CreateMovieInput!) {
    createMovie(createMovieInput: $createMovieInput) {
      _id
      title
    }
  }
`

export const CREATE_PERSON = gql`
  mutation CreatePerson($createPersonInput: CreatePersonInput!) {
    createPerson(createPersonInput: $createPersonInput) {
      _id
      name
      lastName
      role
    }
  }
`

export const CREATE_COUNTRY = gql`
  mutation CreateCountry($createCountryInput: CreateCountryInput!) {
    createCountry(createCountryInput: $createCountryInput) {
      _id
      name
      slug
    }
  }
`
