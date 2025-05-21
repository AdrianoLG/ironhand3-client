import Abs from './body/Abs'
import Arms from './body/Arms'
import Back from './body/Back'
import Biceps from './body/Biceps'
import Chest from './body/Chest'
import Feet from './body/Feet'
import Glutes from './body/Glutes'
import Hands from './body/Hands'
import Head from './body/Head'
import Knees from './body/Knees'
import Legs from './body/Legs'
import Neck from './body/Neck'
import Quadriceps from './body/Quadriceps'
import Shoulders from './body/Shoulders'
import Thighs from './body/Thighs'
import Triceps from './body/Triceps'
import { iBodyFigure } from './types'

const BodyFigure = ({
  color,
  currentFillAbs,
  currentFillArms,
  currentFillBack,
  currentFillBiceps,
  currentFillChest,
  currentFillFeet,
  currentFillGlutes,
  currentFillHands,
  currentFillHead,
  currentFillKnees,
  currentFillLegs,
  currentFillNeck,
  currentFillQuadriceps,
  currentFillShoulders,
  currentFillThighs,
  currentFillTriceps
}: iBodyFigure) => (
  <svg
    id='body'
    xmlns='http://www.w3.org/2000/svg'
    version='1.1'
    viewBox='0 0 316 294'
    fill={color}
  >
    <title>Body figure</title>
    <Abs fillColor={currentFillAbs} />
    <Thighs fillColor={currentFillThighs} />
    <Knees fillColor={currentFillKnees} />
    <Arms fillColor={currentFillArms} />
    <Biceps fillColor={currentFillBiceps} />
    <Chest fillColor={currentFillChest} />
    <Neck fillColor={currentFillNeck} />
    <Shoulders fillColor={currentFillShoulders} />
    <Quadriceps fillColor={currentFillQuadriceps} />
    <Legs fillColor={currentFillLegs} />
    <Back fillColor={currentFillBack} />
    <Glutes fillColor={currentFillGlutes} />
    <Triceps fillColor={currentFillTriceps} />
    <Head fillColor={currentFillHead} />
    <Hands fillColor={currentFillHands} />
    <Feet fillColor={currentFillFeet} />
  </svg>
)

export default BodyFigure
