const chosenColor = (value: number, type: string): string => {
  if (type === 'strength') {
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
  if (type === 'stretch') {
    if (value == 0) {
      return 'var(--value0)'
    }
    if (value == 1) {
      return 'var(--value3)'
    }
    if (value == 2) {
      return 'var(--value5)'
    }
    if (value == 3) {
      return 'var(--value6)'
    }
    if (value == 4) {
      return 'var(--value7)'
    }
    if (value == 5) {
      return 'var(--value8)'
    }
    if (value == 6) {
      return 'var(--value9)'
    }
    if (value == 7) {
      return 'var(--value10)'
    }
    return 'var(--value0)'
  }
  if (type === 'cardio') {
    if (value == 0) {
      return 'var(--value0)'
    }
    if (value == 1) {
      return 'var(--value3)'
    }
    if (value == 2) {
      return 'var(--value5)'
    }
    if (value == 3) {
      return 'var(--value6)'
    }
    if (value == 4) {
      return 'var(--value7)'
    }
    if (value == 5) {
      return 'var(--value8)'
    }
    if (value == 6) {
      return 'var(--value9)'
    }
    if (value == 7) {
      return 'var(--value10)'
    }
    return 'var(--value0)'
  }
  return ''
}

export default chosenColor
