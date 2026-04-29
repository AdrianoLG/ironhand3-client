export interface iNutritionInfo {
  headers: {
    title: string
    url: string
  }[]
  foods: iFood[]
  completedMeals: iCompletedMeal[]
  recipes: iRecipe[]
  ingredients: iIngredient[]
}

export interface iFood {
  _id: string
  name: string
  kcal?: number
  carbs?: number
  proteins?: number
  fats?: number
}

export interface iCompletedMeal {
  _id: string
  food: iFood
  timeOfDay: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER'
  qty?: number
  unit?: string
  created: Date
}

export const timeOfDayOrder: Record<iCompletedMeal['timeOfDay'], number> = {
  BREAKFAST: 0,
  LUNCH: 1,
  SNACK: 2,
  DINNER: 3
}

export const timeOfDayLabel: Record<iCompletedMeal['timeOfDay'], string> = {
  BREAKFAST: 'Desayuno',
  LUNCH: 'Comida',
  SNACK: 'Merienda',
  DINNER: 'Cena'
}

export interface iRecipe {
  _id: string
  name: string
  ingredients?: iRecipeIngredient[]
  steps: string[]
  gallery?: string[]
  machine?: string
}

export interface iRecipeIngredient {
  name: string
  image: string
  qty?: number
  unit?: string
}

export interface iIngredient {
  _id: string
  name: string
  image: string
  qty?: number
  unit?: string
}

export interface iFoodDay {
  dayLabel: string
  dayFoods: iCompletedMeal[]
  selectedFoodId: string | null
  onSelectFood: (id: string | null) => void
  onEditFood: (food: iCompletedMeal) => void
  onDeleteFood: (food: iCompletedMeal) => void
}
