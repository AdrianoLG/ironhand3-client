const chosenOpacity = (value: number): number => {
  if (value === 0) {
    return 0
  }
  if (value > 0 && value <= 1) {
    return 0.25
  }
  if (value > 1 && value <= 2) {
    return 0.5
  }
  if (value > 2 && value <= 3) {
    return 0.75
  }
  return 1
}

export default chosenOpacity
