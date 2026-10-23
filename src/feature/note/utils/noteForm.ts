import { NoteCategoryOption, NoteFormInput } from '../types/types'
import { NOTE_FORM_TEXT } from './noteFormMessages'

export const NEW_CATEGORY_OPTION_VALUE = '__new_category__'

export const hasMeaningfulContent = (content: string): boolean => {
  if (!content.trim()) return false

  try {
    const parsed = JSON.parse(content) as unknown
    const stack: unknown[] = [parsed]

    while (stack.length) {
      const node = stack.pop()

      if (!node || typeof node !== 'object') {
        continue
      }

      if (Array.isArray(node)) {
        stack.push(...node)
        continue
      }

      const entry = node as Record<string, unknown>
      if (typeof entry.text === 'string' && entry.text.trim().length > 0) {
        return true
      }

      if (entry.type === 'image' || entry.type === 'embed') {
        return true
      }

      Object.values(entry).forEach(value => {
        if (value && typeof value === 'object') {
          stack.push(value)
        }
      })
    }
  } catch {
    return content.trim().length > 0
  }

  return false
}

export const buildNoteCategoryOptions = (
  noteCategories: string[]
): NoteCategoryOption[] => {
  const categories = Array.from(
    new Set(noteCategories.map(category => category.trim()))
  )
    .filter(category => category.length > 0)
    .sort((a, b) => a.localeCompare(b, 'es'))

  return [
    ...categories.map(category => ({
      value: category,
      name: category
    })),
    {
      value: NEW_CATEGORY_OPTION_VALUE,
      name: NOTE_FORM_TEXT.newCategoryOption
    }
  ]
}

export const buildCreateNoteInput = (formData: NoteFormInput) => {
  const tags = (formData.tags ?? []).filter(Boolean)
  const images = (formData.images ?? []).filter(Boolean)

  return {
    title: formData.title.trim(),
    content: formData.content,
    category: formData.category.trim(),
    shared: formData.shared,
    ...(tags.length > 0 && { tags }),
    ...(images.length > 0 && { images })
  }
}
