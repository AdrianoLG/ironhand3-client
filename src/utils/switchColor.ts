const switchColor = (color: string) => {
  switch (color) {
    case 'primary':
      return 'var(--primary)'
    case 'secondary':
      return 'var(--secondary)'
    case 'accent':
      return 'var(--accent)'
    case 'secondaryLight':
      return 'var(--secondaryLight)'
    default:
      return 'var(--primary)'
  }
}

export default switchColor
