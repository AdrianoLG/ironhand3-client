export interface iHeaders {
  title: string
  url: string
}

export interface iShortcut {
  _id: string
  title: string
  image: string
  action: string
}

export interface iShortcuts {
  _id: string
  title: string
  shortcuts: iShortcut[]
  action: string
}
