import acousticGuitar from '../assets/img/acousticGuitar.svg'
import bass from '../assets/img/bass.svg'
import drums from '../assets/img/drums.svg'
import electricGuitar from '../assets/img/electricGuitar.svg'
import maschine from '../assets/img/maschine.svg'
import piano from '../assets/img/piano.svg'

export const instrumentIcons: Record<string, string> = {
  electricGuitar,
  acousticGuitar,
  bass,
  drums,
  piano,
  maschine
}

export const getInstrumentIcon = (slug: string): string | undefined => {
  console.log(instrumentIcons[slug])
  return instrumentIcons[slug]
}
