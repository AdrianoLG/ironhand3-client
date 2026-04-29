import ErrorMessage from '../components/molecules/ErrorMessage'
import Heading from '../components/molecules/Heading'
import Spinner from '../components/molecules/Spinner'
import FoodList from '../feature/nutrition/components/FoodList'
import IngredientList from '../feature/nutrition/components/IngredientList'
import NutritionHeaderButtons from '../feature/nutrition/components/NutritionHeaderButtons'
import RecipeList from '../feature/nutrition/components/RecipeList'
import { useFilterCompletedDiets } from '../feature/nutrition/hooks/useFilterCompletedDiets'
import ThirdsLayout from '../layouts/body/ThirdsLayout'
import Header from '../layouts/header/Header'

const Nutrition = () => {
  const { data, loading, error } = useFilterCompletedDiets()

  if (loading)
    return (
      <Spinner classes='my-7 flex w-full justify-center px-8' widthInRem={2} />
    )

  if (error)
    return (
      <ErrorMessage
        message={'No conectado a la base de datos'}
        errorMessage={error.message}
        containerClasses='my-7 flex w-full justify-center px-8 text-secondary'
      />
    )

  return (
    <>
      <Header isMain={false} headers={data?.headers} />
      <Heading title='Nutrición' />
      <NutritionHeaderButtons />
      <ThirdsLayout>
        <div>
          <h2 className='mb-4 text-2xl'>Dieta</h2>
          <FoodList completedMeals={data?.completedMeals ?? []} />
        </div>
        <div>
          <h2 className='mb-4 text-2xl'>Recetas</h2>
          <RecipeList recipes={data?.recipes ?? []} />
        </div>
        <div>
          <h2 className='mb-4 text-2xl'>Ingredientes</h2>
          <IngredientList ingredients={data?.ingredients ?? []} />
        </div>
      </ThirdsLayout>
    </>
  )
}
export default Nutrition
