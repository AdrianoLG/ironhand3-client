import { useLayoutEffect, useState } from 'react'

import BandFigure from '../assets/svg/BandFigure'
import { iCompletedRehearsal } from '../types/rehearsals'
import chosenOpacity from '../utils/chosenOpacity'

const Band = ({
  completedRehearsals
}: {
  completedRehearsals: iCompletedRehearsal[]
}) => {
  const [noRehearsals, setNoRehearsals] = useState(false)
  const [currentPiano, setCurrentPiano] = useState(0)
  const [currentElectricGuitar, setCurrentElectricGuitar] = useState(0)
  const [currentAcousticGuitar, setCurrentAcousticGuitar] = useState(0)
  const [currentDrums, setCurrentDrums] = useState(0)
  const [currentBass, setCurrentBass] = useState(0)
  const [currentMK2, setCurrentMK2] = useState(0)

  useLayoutEffect(() => {
    /*
     * Calculate the total rehearsals for each instrument
     */
    const completedRehearsalsCount = completedRehearsals.reduce(
      (acc: { [key: string]: number }, completedRehearsal) => {
        const instruments = Array.isArray(completedRehearsal.instrument)
          ? completedRehearsal.instrument
          : [completedRehearsal.instrument]
        instruments.forEach(instrument => {
          const instrumentSlug = instrument.slug
          if (!acc[instrumentSlug]) {
            acc[instrumentSlug] = 0
          }
          acc[instrumentSlug] += 1
        })
        return acc
      },
      {}
    )

    /*
     * Map the instruments to their respective state setters
     * to update the opacity based on the calculations
     */
    const opacities: {
      [key: string]: React.Dispatch<React.SetStateAction<number>>
    } = {
      piano: setCurrentPiano,
      electricGuitar: setCurrentElectricGuitar,
      acousticGuitar: setCurrentAcousticGuitar,
      drums: setCurrentDrums,
      bass: setCurrentBass,
      mk2: setCurrentMK2
    }
    /*
     * Set the opacity for each instrument based on
     * the calculations received
     */
    for (const instrument in opacities) {
      const opacityValue = completedRehearsalsCount[instrument]
        ? chosenOpacity(completedRehearsalsCount[instrument])
        : chosenOpacity(0)
      opacities[instrument](opacityValue)
    }
    // If all the opacities are 0, return noRehearsals
    if (Object.values(completedRehearsalsCount).every(value => value === 0)) {
      setNoRehearsals(true)
    } else {
      setNoRehearsals(false)
    }
  }, [completedRehearsals])

  return (
    <BandFigure
      noRehearsals={noRehearsals}
      currentOpacityPiano={currentPiano}
      currentOpacityElectricGuitar={currentElectricGuitar}
      currentOpacityAcousticGuitar={currentAcousticGuitar}
      currentOpacityDrums={currentDrums}
      currentOpacityBass={currentBass}
      currentOpacityMK2={currentMK2}
    />
  )
}

export default Band
