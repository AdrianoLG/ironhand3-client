import type { SlateEditor } from '@yoopta/editor'

export type MediaDialogType = 'link' | 'image' | 'embed'

export type MediaDialogContent = Record<
  MediaDialogType,
  {
    title: string
    description: string
    placeholder: string
    buttonText: string
  }
>

export type LinkSelection = SlateEditor['selection'] | null
