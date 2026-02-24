const DEFAULT_ORDERED_CATEGORIES = [
  'Vegetables',
  'Fruits',
  'Herbs',
  'Medicinal'
]

export const getCategoryOrder = (
  grouped: Record<string, unknown[]>,
  orderedCategories: string[] = DEFAULT_ORDERED_CATEGORIES
) => [
  ...orderedCategories.filter(category => grouped[category]?.length),
  ...Object.keys(grouped).filter(
    category => !orderedCategories.includes(category)
  )
]
