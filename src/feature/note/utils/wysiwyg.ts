import { buildBlockData } from '@yoopta/editor'
import Embed from '@yoopta/embed'
import Image from '@yoopta/image'
import Link from '@yoopta/link'
import { Bold, Highlight, Italic } from '@yoopta/marks'
import { MathBlock, MathInline } from '@yoopta/math'
import Paragraph from '@yoopta/paragraph'

import type {
  SlateEditor,
  YooEditor,
  YooptaContentValue as YooptaEditorContentValue
} from '@yoopta/editor'
import type { MediaDialogContent } from '../types/wysiwyg'

export const plugins = [Paragraph, Link, Image, Embed, MathInline, MathBlock]
export const marks = [Bold, Italic, Highlight]

const initialBlock = buildBlockData()
export const initialValue = {
  [initialBlock.id]: initialBlock
} as YooptaEditorContentValue

export const highlightPresetColors = [
  'var(--secondary)',
  'var(--secondaryLight)',
  'var(--secondaryLighter)',
  'var(--accent)',
  'var(--accentLight)',
  'var(--success)',
  'var(--warn)',
  'var(--category1)',
  'var(--category2)'
]

export const mediaDialogContent: MediaDialogContent = {
  link: {
    title: 'Insertar enlace',
    description:
      'Escribe una URL para crear el enlace en el texto seleccionado.',
    placeholder: 'https://ejemplo.com',
    buttonText: 'Insertar enlace'
  },
  image: {
    title: 'Insertar imagen',
    description: 'Escribe la URL de una imagen para crear un bloque de imagen.',
    placeholder: 'https://dominio.com/imagen.jpg',
    buttonText: 'Insertar imagen'
  },
  embed: {
    title: 'Insertar embed',
    description: 'Pega una URL compatible (YouTube, Vimeo, etc.).',
    placeholder: 'https://www.youtube.com/watch?v=...',
    buttonText: 'Insertar embed'
  }
}

export const getActiveSlate = (editor: YooEditor): SlateEditor | null => {
  const currentOrder = editor.path.current
  if (currentOrder === null) return null

  const block = Object.values(editor.children).find(
    candidate => candidate.meta.order === currentOrder
  )

  if (!block) return null

  return editor.blockEditorsMap[block.id] || null
}

export const getEmbedUrlFromBlock = (block: {
  value: unknown[]
}): string | null => {
  const stack: unknown[] = [...block.value]

  while (stack.length > 0) {
    const node = stack.pop()
    if (!node || typeof node !== 'object') continue

    const recordNode = node as Record<string, unknown>
    const props = recordNode.props as
      | { provider?: { embedUrl?: string; url?: string } }
      | undefined

    if (recordNode.type === 'embed') {
      const embedUrl = props?.provider?.embedUrl || props?.provider?.url
      if (typeof embedUrl === 'string' && embedUrl.length > 0) {
        return embedUrl
      }
    }

    const children = recordNode.children
    if (Array.isArray(children)) {
      stack.push(...children)
    }
  }

  return null
}

export const hasImageElementInBlock = (block: {
  value: unknown[]
}): boolean => {
  const stack: unknown[] = [...block.value]

  while (stack.length > 0) {
    const node = stack.pop()
    if (!node || typeof node !== 'object') continue

    const recordNode = node as Record<string, unknown>
    if (recordNode.type === 'image') {
      return true
    }

    const children = recordNode.children
    if (Array.isArray(children)) {
      stack.push(...children)
    }
  }

  return false
}

export const buildSelectedEmbedStyle = (
  activeEmbedId: string | null
): string =>
  activeEmbedId
    ? `[data-yoopta-block-id="${activeEmbedId}"] [contenteditable="false"][data-element-type="embed"] { opacity: 0.75; }`
    : ''

export const buildSelectedImageStyle = (
  activeImageId: string | null
): string =>
  activeImageId
    ? `[data-yoopta-block-id="${activeImageId}"] [contenteditable="false"][data-element-type="image"] { opacity: 0.75; }`
    : ''

export const notesEditorStyles = `
  .notes-editor { min-height: 6rem; cursor: text; }
  .notes-editor [data-slate-editor="true"] {
    padding: 0 1rem;
  }
  .notes-editor .yoopta-slate { min-height: 0; }
  .yoopta-ui-highlight-color-picker-mode-toggle {
    flex-direction: row-reverse;
  }
  .yoopta-ui-highlight-color-picker-mode-btn {
    position: relative;
    color: transparent;
    font-size: 0;
    min-width: 4.75rem;
    padding: 0.45rem 1rem;
  }
  .yoopta-ui-highlight-color-picker-mode-btn::after {
    align-items: center;
    color: hsl(var(--yoopta-ui-muted-foreground));
    content: '';
    display: flex;
    font-size: 11px;
    inset: 0;
    justify-content: center;
    line-height: 1.2;
    position: absolute;
    padding: 0 0.5rem;
  }
  .yoopta-ui-highlight-color-picker-mode-btn[data-active="true"]::after {
    color: hsl(var(--yoopta-ui-foreground));
  }
  .yoopta-ui-highlight-color-picker-mode-btn[aria-label="Background color"]::after {
    content: 'Fondo';
  }
  .yoopta-ui-highlight-color-picker-mode-btn[aria-label="Text color"]::after {
    content: 'Texto';
  }
`
