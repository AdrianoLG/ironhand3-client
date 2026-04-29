import { useState } from 'react'

import { useMutation } from '@apollo/client'

import Emptylist from '../../../components/molecules/EmptyList'
import { AlertDialog, Dialog } from '../../../components/organisms/dialogs'
import CompletedMealFormContainer from '../forms/CompletedMealFormContainer'
import { REMOVE_COMPLETED_MEAL } from '../gql/nutritionMutations'
import { NUTRITION_INFO } from '../gql/nutritionQueries'
import { iCompletedMeal } from '../types/nutrition'
import {
  getFoodsByDay,
  getFoodsForWeek,
  getMaxWeekOffset,
  getNextWeekOffset,
  getPreviousWeekOffset,
  getWeekRangeLabel
} from '../utils/nutrition'
import FoodDay from './FoodDay'
import WeekPagination from './WeekPagination'

const FoodList = ({ completedMeals }: { completedMeals: iCompletedMeal[] }) => {
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [foodToEdit, setFoodToEdit] = useState<iCompletedMeal | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [foodToDelete, setFoodToDelete] = useState<iCompletedMeal | null>(null)

  const [removeCompletedMeal] = useMutation(REMOVE_COMPLETED_MEAL, {
    refetchQueries: [{ query: NUTRITION_INFO }]
  })

  const handleEditCompletedMeal = (food: iCompletedMeal) => {
    setFoodToEdit(food)
    setIsEditOpen(true)
  }

  const handleDeleteClick = (food: iCompletedMeal) => {
    setFoodToDelete(food)
    setIsDeleteOpen(true)
  }

  const handleRemoveCompletedMeal = () => {
    if (!foodToDelete) return

    removeCompletedMeal({
      variables: {
        id: foodToDelete._id
      }
    }).finally(() => {
      setIsDeleteOpen(false)
      setFoodToDelete(null)
      setSelectedFoodId(null)
    })
  }

  if (completedMeals.length === 0) {
    return (
      <Emptylist
        message={
          'No hay comidas registradas en este periodo.\n¡Añade la primera!'
        }
        secondary
      />
    )
  }

  const maxWeekOffset = getMaxWeekOffset(completedMeals)
  const weeklyFoods = getFoodsForWeek(completedMeals, weekOffset)
  const foodsByDay = getFoodsByDay(weeklyFoods)
  const weekRangeLabel = getWeekRangeLabel(weekOffset)

  const handlePreviousWeek = () => {
    setSelectedFoodId(null)
    setWeekOffset(current => getPreviousWeekOffset(current, maxWeekOffset))
  }

  const handleNextWeek = () => {
    setSelectedFoodId(null)
    setWeekOffset(current => getNextWeekOffset(current))
  }

  return (
    <>
      <div className='w-full' onClick={() => setSelectedFoodId(null)}>
        {weeklyFoods.length === 0 ? (
          <Emptylist
            message={'No hay comidas registradas en esta semana.'}
            secondary
          />
        ) : (
          <>
            {Object.entries(foodsByDay).map(([dayLabel, dayFoods]) => (
              <FoodDay
                key={dayLabel}
                dayLabel={dayLabel}
                dayFoods={dayFoods}
                selectedFoodId={selectedFoodId}
                onSelectFood={setSelectedFoodId}
                onEditFood={handleEditCompletedMeal}
                onDeleteFood={handleDeleteClick}
              />
            ))}
          </>
        )}
        <hr className='border-secondaryLighter my-6 border-dashed' />
        <WeekPagination
          weekOffset={weekOffset}
          maxWeekOffset={maxWeekOffset}
          weekRangeLabel={weekRangeLabel}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
        />
      </div>

      <Dialog
        buttonText=''
        title='Editar comida completada'
        description='Actualiza los datos de la comida completada'
        image='food-bg'
        child={
          foodToEdit ? (
            <CompletedMealFormContainer
              setIsOpen={setIsEditOpen}
              completedMealData={foodToEdit}
              onSuccess={() => setSelectedFoodId(null)}
            />
          ) : null
        }
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        hideTrigger
      />

      <AlertDialog
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title='¿Quieres eliminar esta comida?'
        description='Esta acción no se puede deshacer y se eliminará de tu historial.'
        confirmText='Sí, eliminar comida'
        onConfirm={handleRemoveCompletedMeal}
        layout='compact'
      />
    </>
  )
}

export default FoodList
