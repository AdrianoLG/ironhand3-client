import { gql } from '@apollo/client'

export const NUTRITION_INFO = gql`
  query NutritionInfo {
    headers {
      title
      url
    }
    foods {
      _id
      name
      kcal
      carbs
      proteins
      fats
    }
    completedMeals {
      _id
      timeOfDay
      qty
      unit
      created
      food {
        _id
        name
        kcal
        carbs
        proteins
        fats
      }
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
