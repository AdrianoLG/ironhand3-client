import { gql } from '@apollo/client'

export const REHEARSAL_INFO = gql`
  query RehearsalInfo {
    headers {
      title
      url
    }
    rehearsals {
      _id
      instrument {
        _id
        name
        slug
        img
      }
      completedAt
      sheets {
        sheet {
          _id
          title
          artist
          possibleInstruments {
            _id
          }
        }
        duration
      }
    }
    sheets {
      _id
      title
      artist
      possibleInstruments {
        _id
        name
        slug
        img
      }
    }
  }
`

export const SELECT_REHEARSALS = gql`
  query Rehearsals {
    rehearsals {
      _id
      instrument {
        _id
        name
        slug
        img
      }
      completedAt
      sheets {
        sheet {
          _id
          title
          artist
          possibleInstruments {
            _id
          }
        }
        duration
      }
    }
  }
`

export const SELECT_REHEARSALS_DATA = gql`
  query RehearsalsData {
    rehearsals {
      _id
      instrument {
        _id
        name
        slug
        img
      }
      completedAt
      sheets {
        sheet {
          _id
          title
          artist
          possibleInstruments {
            _id
          }
        }
        duration
      }
    }
    sheets {
      _id
      title
      artist
      possibleInstruments {
        _id
        name
        slug
        img
      }
    }
    instruments {
      _id
      name
      slug
      img
    }
  }
`

export const SELECT_SHEETS = gql`
  query Sheets {
    sheets {
      _id
      title
      artist
      possibleInstruments {
        _id
        name
        slug
        img
      }
    }
  }
`

export const SELECT_SHEET = gql`
  query Sheet($sheetId: Int!) {
    sheet(id: $sheetId) {
      _id
      title
      artist
      possibleInstruments {
        _id
        name
        slug
        img
      }
    }
  }
`

export const SELECT_INSTRUMENTS = gql`
  query Instruments {
    instruments {
      _id
      name
      slug
      img
    }
  }
`
