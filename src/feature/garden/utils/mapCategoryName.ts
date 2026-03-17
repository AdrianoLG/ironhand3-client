const mapCategoryName = (category: string) => {
  switch (category.toLowerCase()) {
    case 'vegetables':
      return 'Vegetales'
    case 'fruits':
      return 'Frutales'
    case 'herbs':
      return 'Plantas'
    case 'medicinal':
      return 'Medicinales'
    default:
      return 'Otros'
  }
}
export default mapCategoryName
