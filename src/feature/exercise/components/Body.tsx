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
    const completedExercisesCount = completedExercises.reduce(
      (acc: { [key: string]: number }, completedExercise) => {
        completedExercise.exercise.bodyParts.forEach(part => {
          if (!acc[part]) {
            acc[part] = 0
          }
          acc[part]++
        })
        return acc
      },
      {}
    )

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
    for (const bodyPart in fills) {
      fills[bodyPart](
        chosenColor(completedExercisesCount[bodyPart], 'strength')
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
