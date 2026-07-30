export interface iNoteInfo {
  headers: {
    title: string
    url: string
  }[]
  noteCategories: string[]
  notes: NoteListItem[]
}

export type NoteListItem = {
  _id: string
  title: string
  category?: string
  tags?: string[]
  images?: string[]
  content: string
}

export type NoteFormInput = {
  title: string
  category: string
  tags: string[]
  images: string[]
  content: string
}

export type NoteCategoryOption = {
  value: string
  name: string
}
