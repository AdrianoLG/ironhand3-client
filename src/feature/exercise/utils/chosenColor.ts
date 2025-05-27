const chosenColor = (value: number, type: string): string => {
  if (type === 'strength') {
    if (value === 0) {
      return 'var(--value0)'
    }
    if (value > 0 && value <= 30) {
      return 'var(--value1)'
    }
    if (value > 30 && value <= 60) {
      return 'var(--value2)'
    }
    if (value > 60 && value <= 90) {
      return 'var(--value3)'
    }
    if (value > 90 && value <= 120) {
      return 'var(--value4)'
    }
    if (value > 120 && value <= 150) {
      return 'var(--value5)'
    }
    if (value > 150 && value <= 180) {
      return 'var(--value6)'
    }
    if (value > 180 && value <= 210) {
      return 'var(--value7)'
    }
    if (value > 210 && value <= 240) {
      return 'var(--value8)'
    }
    if (value > 240 && value <= 270) {
      return 'var(--value9)'
    }
    return 'var(--value10)'
  }
  if (type === 'stretch') {
    if (value > 9) {
      return 'var(--value10)'
    }
    switch (value) {
      case 0:
        return 'var(--value0)'
      case 1:
        return 'var(--value1)'
      case 2:
        return 'var(--value2)'
      case 3:
        return 'var(--value3)'
      case 4:
        return 'var(--value4)'
      case 5:
        return 'var(--value5)'
      case 6:
        return 'var(--value6)'
      case 7:
        return 'var(--value7)'
      case 8:
        return 'var(--value8)'
      case 9:
        return 'var(--value9)'
      default:
        return 'var(--value0)'
    }
  }
  if (type === 'cardio') {
    if (value > 9) {
      return 'var(--value10)'
    }
    switch (value) {
      case 0:
        return 'var(--value0)'
      case 1:
        return 'var(--value1)'
      case 2:
        return 'var(--value2)'
      case 3:
        return 'var(--value3)'
      case 4:
        return 'var(--value4)'
      case 5:
        return 'var(--value5)'
      case 6:
        return 'var(--value6)'
      case 7:
        return 'var(--value7)'
      case 8:
        return 'var(--value8)'
      case 9:
        return 'var(--value9)'
      default:
        return 'var(--value0)'
    }
  }
  return ''
}

export default chosenColor
