export interface iNutritionInfo {
  headers: {
    title: string
    url: string
  }[]
  foods: iFood[]
  recipes: iRecipe[]
  ingredients: iIngredient[]
}

export interface iFood {
  _id: string
  name: string
  timeOfDay: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER'
  kcal?: number
  carbs?: number
  proteins?: number
  fats?: number
  qty?: number
  unit?: string
  created: Date
}

export interface iRecipe {
  _id: string
  name: string
  ingredients?: iIngredient[]
  steps: string[]
  gallery?: string[]
  machine?: string
}

export interface iIngredient {
  _id: string
  name: string
  image: string
  qty?: number
  unit?: string
}
