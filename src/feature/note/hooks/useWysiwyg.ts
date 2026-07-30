import { useMemo, useRef, useState } from 'react'

import { buildBlockData, createYooptaEditor } from '@yoopta/editor'
import { withMath } from '@yoopta/math'

import { initialValue, marks, plugins } from '../utils/wysiwyg'
import { useWysiwygMath } from './useWysiwygMath'
import { useWysiwygMedia } from './useWysiwygMedia'

import type { YooptaContentValue } from '@yoopta/editor'

const parseInitialContent = (content?: string): YooptaContentValue => {
  if (!content?.trim()) {
    return initialValue
  }

  try {
    const parsed = JSON.parse(content) as YooptaContentValue
    if (Object.keys(parsed || {}).length > 0) {
      return parsed
    }
  } catch {
    const fallbackBlock = buildBlockData({
      value: [
        {
          id: 'fallback-text',
          type: 'paragraph',
          children: [{ text: content }],
          props: {}
        }
      ]
    })

    return {
      [fallbackBlock.id]: fallbackBlock
    } as YooptaContentValue
  }

  return initialValue
}

export const useWysiwyg = (initialContent?: string) => {
  const [color, setColor] = useState('#111111')

  const initialEditorValueRef = useRef<YooptaContentValue>(
    parseInitialContent(initialContent)
  )

  const editor = useMemo(
    () =>
      withMath(
        createYooptaEditor({
          plugins,
          marks,
          value: initialEditorValueRef.current
        })
      ),
    []
  )

  const media = useWysiwygMedia(editor)
  const math = useWysiwygMath(editor)

  const focusTextModeInColorPicker = () => {
    window.setTimeout(() => {
      const textModeButton = document.querySelector(
        '.yoopta-ui-highlight-color-picker-mode-btn[aria-label="Text color"]'
      ) as HTMLButtonElement | null

      textModeButton?.dispatchEvent(
        new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true
        })
      )
    }, 0)
  }

  return {
    editor,
    color,
    setColor,
    ...media,
    ...math,
    handlePathChange: media.handlePathChange,
    deleteActiveEmbed: media.deleteActiveEmbed,
    deleteActiveImage: media.deleteActiveImage,
    openMediaDialog: media.openMediaDialog,
    handleInsertMedia: media.handleInsertMedia,
    handleMediaDialogKeyDown: media.handleMediaDialogKeyDown,
    focusTextModeInColorPicker,
    selectedEmbedStyle: media.selectedEmbedStyle,
    selectedImageStyle: media.selectedImageStyle
  }
}
