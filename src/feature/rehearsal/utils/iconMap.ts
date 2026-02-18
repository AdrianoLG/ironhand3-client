import acousticGuitar from '../assets/svg/instruments/acousticGuitar.svg'
import bass from '../assets/svg/instruments/bass.svg'
import drums from '../assets/svg/instruments/drums.svg'
import electricGuitar from '../assets/svg/instruments/electricGuitar.svg'
import maschine from '../assets/svg/instruments/maschine.svg'
import piano from '../assets/svg/instruments/piano.svg'

export const instrumentIcons: Record<string, string> = {
  electricGuitar,
  acousticGuitar,
  bass,
  drums,
  piano,
  maschine
}

export const getInstrumentIcon = (slug: string): string | undefined => {
  return instrumentIcons[slug]
}
