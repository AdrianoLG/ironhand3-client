export const difInDays = (date: Date) => {
  const today = new Date()
  const pastDate = new Date(date)
  const dif = today.getTime() - pastDate.getTime()
  const difInDays = Math.round(dif / (1000 * 3600 * 24))
  if (difInDays >= 0 && difInDays < 2) return 'HOY'
  if (difInDays >= 2 && difInDays < 3) return 'AYER'
  if (difInDays >= 3 && difInDays < 4) return 'ANTEAYER'
  return Intl.DateTimeFormat('es-ES', { dateStyle: 'short' }).format(pastDate)
}
