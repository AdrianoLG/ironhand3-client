const chosenColor = (value: number): string => {
  if (value === 0) {
    return 'var(--value0)'
  }
  if (value > 0 && value <= 1) {
    return 'var(--value1)'
  }
  if (value > 1 && value <= 2) {
    return 'var(--value2)'
  }
  if (value > 2 && value <= 3) {
    return 'var(--value3)'
  }
  if (value > 3 && value <= 4) {
    return 'var(--value4)'
  }
  if (value > 4 && value <= 5) {
    return 'var(--value5)'
  }
  if (value > 5 && value <= 6) {
    return 'var(--value6)'
  }
  if (value > 6 && value <= 7) {
    return 'var(--value7)'
  }
  if (value > 7 && value <= 8) {
    return 'var(--value8)'
  }
  if (value > 8 && value <= 9) {
    return 'var(--value9)'
  }
  return 'var(--value10)'
}

export default chosenColor
