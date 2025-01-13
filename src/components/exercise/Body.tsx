import { useLayoutEffect, useState } from 'react'

import { iCompletedExercises } from '../../utils/types'
import BodyFigure from './BodyFigure'

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
      (acc: { [key: string]: number }, exercise) => {
        for (const ex of exercise.exercises) {
          if (ex.parts.length) {
            for (const part of ex.parts) {
              if (!acc[part]) {
                acc[part] = 0
              }
              if (ex.repetitions != undefined) {
                acc[part] += ex.repetitions
              }
            }
            if (!acc[ex.name]) {
              acc[ex.name] = 0
            }
            if (ex.repetitions != undefined) {
              acc[ex.name] += ex.repetitions
            }
          }
        }
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
      fills[bodyPart](chosenColor(completedExercisesCount[bodyPart]))
    }
  }, [completedExercises])

  const chosenColor = (value: number): string => {
    if (value >= 0 && value < 10) {
      return 'var(--value0)'
    }
    if (value >= 10 && value < 20) {
      return 'var(--value2)'
    }
    if (value >= 20 && value < 30) {
      return 'var(--value3)'
    }
    if (value >= 30 && value < 40) {
      return 'var(--value4)'
    }
    if (value >= 40 && value < 50) {
      return 'var(--value5)'
    }
    if (value >= 50 && value < 60) {
      return 'var(--value6)'
    }
    if (value >= 60 && value < 70) {
      return 'var(--value7)'
    }
    if (value >= 70 && value < 80) {
      return 'var(--value8)'
    }
    if (value >= 80 && value < 90) {
      return 'var(--value9)'
    }
    if (value >= 90) {
      return 'var(--value10)'
    }
    return 'var(--value0)'
  }

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
