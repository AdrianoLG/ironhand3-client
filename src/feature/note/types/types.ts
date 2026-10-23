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
  shared: boolean
  owner?: { _id: string; name?: string; email: string }
}

export type NoteFormInput = {
  title: string
  category: string
  tags: string[]
  images: string[]
  content: string
  shared: boolean
}

export type NoteCategoryOption = {
  value: string
  name: string
}
