import { iShortcut } from '../../types/types'
import {
  AddCleanTask,
  AddExercise,
  AddExpense,
  AddFood,
  AddRecipee,
  AddToCatalog,
  AddTodo,
  AddWatering,
  CompleteCleanTask,
  PlayInstrument
} from './forms'

const HomePopupForms = ({
  cardAction,
  closeModal,
  setActiveCard
}: {
  cardAction: string | null
  closeModal: () => void
  setActiveCard: (card: iShortcut | null) => void
}): JSX.Element | null => {
  const components: { [key: string]: JSX.Element } = {
    addExpense: <AddExpense closeModal={closeModal} />,
    addFood: <AddFood closeModal={closeModal} />,
    addRecipee: <AddRecipee closeModal={closeModal} />,
    addToCatalog: <AddToCatalog closeModal={closeModal} />,
    addTodo: <AddTodo closeModal={closeModal} />,
    addWatering: <AddWatering closeModal={closeModal} />,
    cleanBath: <AddCleanTask closeModal={closeModal} type='bath' />,
    dishwasher: <CompleteCleanTask closeModal={closeModal} type='dishwasher' />,
    mop: <AddCleanTask closeModal={closeModal} type='mop' />,
    planks: <AddExercise closeModal={closeModal} type='planks' />,
    playBass: <PlayInstrument closeModal={closeModal} type='bass' />,
    playDrums: <PlayInstrument closeModal={closeModal} type='drums' />,
    playGuitar: <PlayInstrument closeModal={closeModal} type='guitar' />,
    playMaschine: <PlayInstrument closeModal={closeModal} type='maschine' />,
    playPiano: <PlayInstrument closeModal={closeModal} type='piano' />,
    pullups: <AddExercise closeModal={closeModal} type='pullups' />,
    punchBag: <AddExercise closeModal={closeModal} type='punchBag' />,
    pushups: <AddExercise closeModal={closeModal} type='pushups' />,
    recordMusic: <PlayInstrument closeModal={closeModal} type='record' />,
    removeDust: <CompleteCleanTask closeModal={closeModal} type='removeDust' />,
    rideBike: <AddExercise closeModal={closeModal} type='rideBike' />,
    ropeJump: <AddExercise closeModal={closeModal} type='ropeJump' />,
    squats: <AddExercise closeModal={closeModal} type='squats' />,
    sweep: <AddCleanTask closeModal={closeModal} type='sweep' />,
    throwTrash: <CompleteCleanTask closeModal={closeModal} type='throwTrash' />,
    vacuum: <AddCleanTask closeModal={closeModal} type='vacuum' />,
    walk: <AddExercise closeModal={closeModal} type='walk' />,
    washClothes: (
      <CompleteCleanTask closeModal={closeModal} type='washClothes' />
    )
  }

  if (cardAction) {
    const Component = components[cardAction as keyof typeof components] ?? null
    if (!Component) {
      setActiveCard(null)
      return null
    }
    return Component
  }
  return null
}

export default HomePopupForms
