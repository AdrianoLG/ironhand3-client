import { gql } from '@apollo/client';

export const NUTRITION_INFO = gql`
  query NutritionInfo {
    headers {
      title
      url
    }
    foods {
      _id
      name
      timeOfDay
      kcal
      carbs
      proteins
      fats
      created
    }
    ingredients {
      _id
      name
      image
      qty
      unit
    }
    recipes {
      _id
      name
      ingredients {
        name
        image
        qty
        unit
      }
      steps
      gallery
      machine
    }
  }
`
