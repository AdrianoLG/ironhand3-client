import { useLayoutEffect, useState } from 'react'

import BodyFigure from '../assets/svgs/BodyFigure'
import { iCompletedExercise } from '../types/exercises'
import chosenColor from '../utils/chosenColor'

const Body = ({
  color,
  completedExercises
}: {
  color: string
  completedExercises: iCompletedExercise[]
}) => {
  const [currentFillHead, setCurrentFillHead] = useState('current')
  const [currentFillNeck, setCurrentFillNeck] = useState('current')
  const [currentFillShoulders, setCurrentFillShoulders] = useState('current')
  const [currentFillChest, setCurrentFillChest] = useState('current')
  const [currentFillBack, setCurrentFillBack] = useState('current')
  const [currentFillAbs, setCurrentFillAbs] = useState('current')
  const [currentFillTriceps, setCurrentFillTriceps] = useState('current')
  const [currentFillBiceps, setCurrentFillBiceps] = useState('current')
  const [currentFillArms, setCurrentFillArms] = useState('current')
  const [currentFillHands, setCurrentFillHands] = useState('current')
  const [currentFillGlutes, setCurrentFillGlutes] = useState('current')
  const [currentFillThighs, setCurrentFillThighs] = useState('current')
  const [currentFillQuadriceps, setCurrentFillQuadriceps] = useState('current')
  const [currentFillKnees, setCurrentFillKnees] = useState('current')
  const [currentFillLegs, setCurrentFillLegs] = useState('current')
  const [currentFillFeet, setCurrentFillFeet] = useState('current')

  useLayoutEffect(() => {
    /*
     * Calculate the total repetitions and weight for each body part
     * and calculate the punctuation based on the type of exercise
     */
    const completedExercisesCount = completedExercises.reduce(
      (acc: { [key: string]: number }, completedExercise) => {
        const type = completedExercise.exercise.type
        const reps = completedExercise.repetitions || 0
        const weight = completedExercise.weight || 0
        const punctuation =
          type === 'strength'
            ? weight
              ? reps + (reps * weight) / 100
              : reps
            : 1
        completedExercise.exercise.bodyParts.forEach(part => {
          if (!acc[part]) {
            acc[part] = 0
          }
          acc[part] += punctuation
        })
        return acc
      },
      {}
    )

    /*
     * Map the body parts to their respective state setters
     * to update the fill colors based on the calculations
     */
    const fills: {
      [key: string]: React.Dispatch<React.SetStateAction<string>>
    } = {
      head: setCurrentFillHead,
      neck: setCurrentFillNeck,
      shoulders: setCurrentFillShoulders,
      chest: setCurrentFillChest,
      back: setCurrentFillBack,
      abs: setCurrentFillAbs,
      triceps: setCurrentFillTriceps,
      biceps: setCurrentFillBiceps,
      arms: setCurrentFillArms,
      hands: setCurrentFillHands,
      glutes: setCurrentFillGlutes,
      thighs: setCurrentFillThighs,
      quadriceps: setCurrentFillQuadriceps,
      knees: setCurrentFillKnees,
      legs: setCurrentFillLegs,
      feet: setCurrentFillFeet
    }
    /*
     * Set the fill color for each body part based on
     * the calculations received
     */
    for (const bodyPart in fills) {
      fills[bodyPart](
        completedExercisesCount[bodyPart]
          ? chosenColor(completedExercisesCount[bodyPart], 'strength')
          : chosenColor(0, 'strength')
      )
    }
  }, [completedExercises])

  return (
    <BodyFigure
      color={color}
      currentFillAbs={currentFillAbs}
      currentFillArms={currentFillArms}
      currentFillBack={currentFillBack}
      currentFillBiceps={currentFillBiceps}
      currentFillChest={currentFillChest}
      currentFillFeet={currentFillFeet}
      currentFillGlutes={currentFillGlutes}
      currentFillHands={currentFillHands}
      currentFillHead={currentFillHead}
      currentFillKnees={currentFillKnees}
      currentFillLegs={currentFillLegs}
      currentFillNeck={currentFillNeck}
      currentFillQuadriceps={currentFillQuadriceps}
      currentFillShoulders={currentFillShoulders}
      currentFillThighs={currentFillThighs}
      currentFillTriceps={currentFillTriceps}
    />
  )
}

export default Body
