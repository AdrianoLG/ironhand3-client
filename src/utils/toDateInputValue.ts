const toDateInputValue = (dateObject: Date) => {
  const local = new Date(dateObject)
  local.setMinutes(dateObject.getMinutes() - dateObject.getTimezoneOffset())
  return local.toJSON().slice(0, 10)
}

export default toDateInputValue
