import { gql } from '@apollo/client'

export const GARDEN_INFO = gql`
  query GardenInfo {
    headers {
      title
      url
    }
    plants {
      _id
      name
      specie {
        _id
        name
        category
        image
        comments
      }
      planted
      inBloom
      harvested
      death {
        date
        cause
      }
    }
    crops {
      _id
      startDate
      endDate
      gallery
      comments
      watering {
        _id
        date
      }
      cropContainer {
        _id
        name
        img
        capacity
        auto
      }
    }
    waterings {
      _id
      date
    }
  }
`
