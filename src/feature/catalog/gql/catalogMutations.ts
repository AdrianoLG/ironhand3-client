import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation CreateBook($createBookInput: CreateBookInput!) {
    createBook(createBookInput: $createBookInput) {
      _id
      title
    }
  }
`

export const UPDATE_BOOK = gql`
  mutation UpdateBook($updateBookInput: UpdateBookInput!) {
    updateBook(updateBookInput: $updateBookInput) {
      _id
      title
    }
  }
`

export const REMOVE_BOOK = gql`
  mutation RemoveBook($id: String!) {
    removeBook(id: $id) {
      _id
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

export const UPDATE_SERIE = gql`
  mutation UpdateSerie($updateSerieInput: UpdateSerieInput!) {
    updateSerie(updateSerieInput: $updateSerieInput) {
      _id
      title
    }
  }
`

export const REMOVE_SERIE = gql`
  mutation RemoveSerie($id: String!) {
    removeSerie(id: $id) {
      _id
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

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($updateMovieInput: UpdateMovieInput!) {
    updateMovie(updateMovieInput: $updateMovieInput) {
      _id
      title
    }
  }
`

export const REMOVE_MOVIE = gql`
  mutation RemoveMovie($id: String!) {
    removeMovie(id: $id) {
      _id
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
