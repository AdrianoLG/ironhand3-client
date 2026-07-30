import { useState } from 'react'

import { EmbedCommands } from '@yoopta/embed'
import { ImageCommands } from '@yoopta/image'
import { LinkCommands } from '@yoopta/link'

import {
  buildSelectedEmbedStyle,
  buildSelectedImageStyle,
  getActiveSlate,
  getEmbedUrlFromBlock,
  hasImageElementInBlock
} from '../utils/wysiwyg'

import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import type { SlateEditor, YooEditor, YooptaPath } from '@yoopta/editor'
import type { LinkSelection, MediaDialogType } from '../types/wysiwyg'

export const useWysiwygMedia = (editor: YooEditor) => {
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false)
  const [mediaDialogType, setMediaDialogType] =
    useState<MediaDialogType>('link')
  const [mediaUrl, setMediaUrl] = useState('')
  const [insertAt, setInsertAt] = useState<number | null>(null)
  const [linkSlate, setLinkSlate] = useState<SlateEditor | null>(null)
  const [linkSelection, setLinkSelection] = useState<LinkSelection>(null)
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null)
  const [activeImageId, setActiveImageId] = useState<string | null>(null)

  const handlePathChange = (path: YooptaPath) => {
    const currentOrder = path.current
    if (currentOrder === null) {
      setActiveEmbedId(null)
      setActiveImageId(null)
      return
    }

    const activeBlock = Object.values(editor.children).find(
      candidate => candidate.meta.order === currentOrder
    )

    if (
      activeBlock &&
      getEmbedUrlFromBlock(activeBlock as { value: unknown[] })
    ) {
      setActiveEmbedId(activeBlock.id)
      setActiveImageId(null)
      return
    }

    if (
      activeBlock &&
      hasImageElementInBlock(activeBlock as { value: unknown[] })
    ) {
      setActiveImageId(activeBlock.id)
      setActiveEmbedId(null)
      return
    }

    setActiveEmbedId(null)
    setActiveImageId(null)
  }

  const deleteActiveEmbed = () => {
    if (!activeEmbedId) return
    EmbedCommands.deleteEmbed(editor, activeEmbedId)
    setActiveEmbedId(null)
  }

  const deleteActiveImage = () => {
    if (!activeImageId) return
    ImageCommands.deleteImage(editor, activeImageId)
    setActiveImageId(null)
  }

  const openMediaDialog = (type: MediaDialogType) => {
    setInsertAt(editor.path.current)

    if (type === 'link') {
      const slate = getActiveSlate(editor)
      setLinkSlate(slate)
      setLinkSelection(slate?.selection ?? null)
    }

    setMediaDialogType(type)
    setMediaUrl('')
    setIsMediaDialogOpen(true)
  }

  const handleInsertMedia = async () => {
    const url = mediaUrl.trim()
    if (!url) return

    if (mediaDialogType === 'link') {
      const slate = linkSlate || getActiveSlate(editor)
      const selection = slate?.selection ?? linkSelection

      if (!slate || !selection) {
        window.alert('Selecciona texto antes de insertar un enlace')
        return
      }

      LinkCommands.insertLink(editor, {
        slate,
        selection,
        props: {
          url,
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      })
    }

    if (mediaDialogType === 'image') {
      ImageCommands.insertImage(editor, {
        props: {
          id: null,
          src: url,
          alt: 'Imagen'
        },
        at: insertAt,
        focus: true
      })
    }

    if (mediaDialogType === 'embed') {
      const blockId = await EmbedCommands.insertEmbedFromUrl(editor, {
        url,
        at: insertAt,
        focus: true,
        fetchMeta: true
      })

      if (!blockId) {
        window.alert('No se pudo crear el embed con esa URL')
        return
      }
    }

    setIsMediaDialogOpen(false)
    setLinkSlate(null)
    setLinkSelection(null)
  }

  const handleMediaDialogKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      setIsMediaDialogOpen(false)
    }
  }

  return {
    isMediaDialogOpen,
    setIsMediaDialogOpen,
    mediaDialogType,
    mediaUrl,
    setMediaUrl,
    activeEmbedId,
    activeImageId,
    handlePathChange,
    deleteActiveEmbed,
    deleteActiveImage,
    openMediaDialog,
    handleInsertMedia,
    handleMediaDialogKeyDown,
    selectedEmbedStyle: buildSelectedEmbedStyle(activeEmbedId),
    selectedImageStyle: buildSelectedImageStyle(activeImageId)
  }
}
