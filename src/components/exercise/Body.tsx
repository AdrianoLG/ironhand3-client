import { useLayoutEffect, useState } from 'react';

import { iCompletedExercises } from '../../utils/types';
import BodyFigure from './BodyFigure';
import chosenColor from './ChosenColor';

const Body = ({
  color,
  completedExercises
}: {
  color: string
  completedExercises: iCompletedExercises[]
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
          if (!acc[completedExercise.exercise.name]) {
            acc[completedExercise.exercise.name] = 0
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
      Cabeza: setCurrentFillHead,
      Cuello: setCurrentFillNeck,
      Hombros: setCurrentFillShoulders,
      Pecho: setCurrentFillChest,
      Espalda: setCurrentFillBack,
      Abdominales: setCurrentFillAbs,
      Tríceps: setCurrentFillTriceps,
      Bíceps: setCurrentFillBiceps,
      Brazos: setCurrentFillArms,
      Manos: setCurrentFillHands,
      Glúteos: setCurrentFillGlutes,
      Muslos: setCurrentFillThighs,
      Cuádriceps: setCurrentFillQuadriceps,
      Rodillas: setCurrentFillKnees,
      Piernas: setCurrentFillLegs,
      Pies: setCurrentFillFeet
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
