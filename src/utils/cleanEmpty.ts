/* eslint-disable  @typescript-eslint/no-explicit-any */
export const cleanEmpty = (
  obj: any,
  defaults: any[] = [undefined, null, NaN, '']
): any => {
  if (defaults.includes(obj)) return

  if (Array.isArray(obj))
    return obj
      .map(v => (v && typeof v === 'object' ? cleanEmpty(v, defaults) : v))
      .filter(v => !defaults.includes(v))

  return Object.entries(obj).length
    ? Object.entries(obj)
        .map(([k, v]) => [
          k,
          v && typeof v === 'object' ? cleanEmpty(v, defaults) : v
        ])
        .reduce(
          (a, [k, v]) => (defaults.includes(v) ? a : { ...a, [k]: v }),
          {}
        )
    : obj
}
