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
      plants {
        _id
        name
        specie {
          _id
        }
        planted
        inBloom
        harvested
        death {
          date
          cause
        }
      }
      waterings {
        _id
        date
        water
        fertilizers {
          qty
          fertilizer {
            _id
            name
            comments
            img
          }
        }
      }
      cropContainer {
        _id
        name
        img
        capacity
        auto
      }
    }
  }
`
