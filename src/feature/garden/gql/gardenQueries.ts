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

export const SELECT_GARDEN_FORM_DATA = gql`
  query SelectGardenFormData {
    species {
      _id
      name
      category
      image
      comments
    }
    plants {
      _id
      name
      specie {
        _id
        name
      }
      planted
      inBloom
      harvested
      death {
        date
        cause
      }
    }
    cropContainers {
      _id
      name
      img
      capacity
      auto
    }
    fertilizers {
      _id
      name
      comments
      img
    }
    crops {
      _id
      startDate
      comments
      cropContainer {
        _id
        name
      }
      plants {
        _id
      }
      waterings {
        _id
      }
    }
  }
`
