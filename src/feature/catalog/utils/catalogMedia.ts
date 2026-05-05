const slugifyPersonName = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const getFlagSrc = (flag?: string): string | undefined => {
  if (!flag) return undefined

  const hasExtension = /\.[a-z0-9]+$/i.test(flag)
  return `${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/catalog/flags/${hasExtension ? flag : `${flag}.png`}`
}

export const getPersonImageCandidates = (
  img: string | undefined,
  fullName: string,
  imgFolder: 'actors' | 'directors' | 'writers'
): string[] => {
  const base = import.meta.env.VITE_UPLOAD_IMAGES_PATH
  const defaultImage = `${base}/catalog/${imgFolder}/no-image.avif`
  if (!img && !fullName) return []
  if (img && /^https?:\/\//i.test(img)) return [img, defaultImage]

  const normalizedPath = (img || '').replace(/\\/g, '/').replace(/^\/+/, '')
  const fileName = normalizedPath.split('/').pop() || normalizedPath
  const fallbackFileName = `${slugifyPersonName(fullName)}.avif`
  const hasExtension = /\.[a-z0-9]+$/i.test(fileName)

  const candidates = normalizedPath
    ? [
        `${base}/catalog/${imgFolder}/${normalizedPath}`,
        `${base}/${normalizedPath}`,
        `${base}/catalog/${normalizedPath}`,
        `${base}/catalog/${imgFolder}/${fileName}`
      ]
    : []

  if (fileName && !hasExtension) {
    candidates.push(`${base}/catalog/${imgFolder}/${fileName}.avif`)
  }

  candidates.push(`${base}/catalog/${imgFolder}/${fallbackFileName}`)
  candidates.push(defaultImage)

  return Array.from(new Set(candidates))
}

export const getRatingProgress = (rating: number): number =>
  Math.max(0, Math.min(100, ((rating + 1) / 10) * 100))
