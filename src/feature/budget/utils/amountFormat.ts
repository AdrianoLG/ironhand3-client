export const formatBudgetAmount = (value?: number | null) => {
  if (typeof value !== 'number' || Number.isNaN(value)) return '-'

  const rounded = Number(value.toFixed(2))
  const sign = rounded < 0 ? '-' : ''
  const absolute = Math.abs(rounded)
  const [integerPart, decimalPart] = absolute.toFixed(2).split('.')

  const integerWithGrouping = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  if (decimalPart === '00') return `${sign}${integerWithGrouping}`

  return `${sign}${integerWithGrouping},${decimalPart}`
}
