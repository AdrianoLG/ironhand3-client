import { Marks } from '@yoopta/editor'
import { HighlightColorPicker } from '@yoopta/ui'

import ColorPicker from '../../../assets/svgs/ColorPicker'
import { highlightPresetColors } from '../utils/wysiwyg'

import type { Dispatch, MouseEvent, SetStateAction } from 'react'
import type { YooEditor } from '@yoopta/editor'
import type { MediaDialogType } from '../types/wysiwyg'

interface WysiwygToolbarProps {
  editor: YooEditor
  color: string
  setColor: Dispatch<SetStateAction<string>>
  activeEmbedId: string | null
  activeImageId: string | null
  openMediaDialog: (type: MediaDialogType) => void
  openMathEditor: () => void
  focusTextModeInColorPicker: () => void
  deleteActiveEmbed: () => void
  deleteActiveImage: () => void
}

const WysiwygToolbar = ({
  editor,
  color,
  setColor,
  activeEmbedId,
  activeImageId,
  openMediaDialog,
  openMathEditor,
  focusTextModeInColorPicker,
  deleteActiveEmbed,
  deleteActiveImage
}: WysiwygToolbarProps) => (
  <div className='flex flex-wrap gap-2'>
    <button
      type='button'
      className='border-secondary text-secondary hover:bg-secondary hover:text-accent rounded-md border px-3 py-1 text-sm'
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        Marks.toggle(editor, { type: 'bold' })
      }}
    >
      B
    </button>
    <button
      type='button'
      className='border-secondary text-secondary hover:bg-secondary hover:text-accent rounded-md border px-3 py-1 text-sm'
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        Marks.toggle(editor, { type: 'italic' })
      }}
    >
      I
    </button>
    <HighlightColorPicker
      placement='bottom'
      presets={highlightPresetColors}
      value={{ color, backgroundColor: color }}
      onChange={({ color }: { color?: string }) => {
        if (color) {
          setColor(color)
          Marks.add(editor, {
            type: 'highlight',
            value: { color }
          })
        }
      }}
    >
      <button
        type='button'
        className='border-secondary text-secondary hover:bg-secondary hover:text-accent rounded-md border px-3 py-1 text-sm'
        title='Color de fuente'
        onClick={focusTextModeInColorPicker}
      >
        <ColorPicker strokeColor='var(--text-primary)' />
      </button>
    </HighlightColorPicker>
    <button
      type='button'
      className='border-secondary text-secondary hover:bg-secondary hover:text-accent rounded-md border px-3 py-1 text-sm'
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        openMediaDialog('link')
      }}
    >
      Enlace
    </button>
    <button
      type='button'
      className='border-secondary text-secondary hover:bg-secondary hover:text-accent rounded-md border px-3 py-1 text-sm'
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        openMediaDialog('image')
      }}
    >
      Imagen
    </button>
    <button
      type='button'
      className='border-secondary text-secondary hover:bg-secondary hover:text-accent rounded-md border px-3 py-1 text-sm'
      title='Insertar expresión matemática'
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        openMathEditor()
      }}
    >
      Math
    </button>
    <button
      type='button'
      className='border-secondary text-secondary hover:bg-secondary hover:text-accent rounded-md border px-3 py-1 text-sm'
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        openMediaDialog('embed')
      }}
    >
      Insertar
    </button>
    {activeEmbedId && (
      <button
        type='button'
        className='border-warn text-warn rounded-md border px-3 py-1 text-sm'
        onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
          event.preventDefault()
          deleteActiveEmbed()
        }}
      >
        Borrar insertado
      </button>
    )}
    {activeImageId && (
      <button
        type='button'
        className='border-warn text-warn rounded-md border px-3 py-1 text-sm'
        onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
          event.preventDefault()
          deleteActiveImage()
        }}
      >
        Borrar imagen
      </button>
    )}
  </div>
)

export default WysiwygToolbar
