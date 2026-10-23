import { gql } from '@apollo/client'

export const CATALOG_FORM_DATA = gql`
  query {
    people {
      _id
      name
      lastName
      role
    }
    genres {
      _id
      name
    }
    countries {
      _id
      name
    }
  }
`

export const CATALOG_INFO = gql`
  query CatalogInfo($viewUserId: String) {
    headers {
      title
      url
    }
    books(viewUserId: $viewUserId) {
      _id
      title
      rating
      cover
      format
      pages
      coverMaterial
      editorial
      publishedYear
      synopsis
      tags
      author {
        _id
        name
        lastName
        img
        birthCountry {
          _id
          name
          flag
        }
      }
      genres {
        _id
        name
        slug
      }
    }
    series(viewUserId: $viewUserId) {
      _id
      title
      rating
      cover
      episodeDuration
      year
      tags
      director {
        _id
        name
        lastName
        img
        birthCountry {
          _id
          name
          flag
        }
      }
      actors {
        _id
        name
        lastName
        img
        birthCountry {
          _id
          name
          flag
        }
      }
      country {
        _id
        name
        slug
        flag
      }
      genres {
        _id
        name
        slug
      }
    }
    movies(viewUserId: $viewUserId) {
      _id
      title
      rating
      cover
      duration
      year
      tags
      director {
        _id
        name
        lastName
        img
        birthCountry {
          _id
          name
          flag
        }
      }
      actors {
        _id
        name
        lastName
        img
        birthCountry {
          _id
          name
          flag
        }
      }
      country {
        _id
        name
        slug
        flag
      }
      genres {
        _id
        name
        slug
      }
    }
  }
`
