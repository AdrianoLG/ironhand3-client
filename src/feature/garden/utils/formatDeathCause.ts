export const formatDeathCause = (cause: string) => {
  switch (cause) {
    case 'UNBORN':
      return 'No germinó'
    case 'IRRIGATION':
      return 'Falta/exceso de riego'
    case 'HARVESTED':
      return 'Cosechado'
    case 'OVERFERTILIZATION':
      return 'Sobre fertilización'
    case 'WEATHER':
      return 'Clima'
    case 'OTHER':
      return 'Otro'
    default:
      return 'Desconocida'
  }
}
