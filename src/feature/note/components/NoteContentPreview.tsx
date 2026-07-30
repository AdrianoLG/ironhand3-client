import { useMemo } from 'react';

import YooptaEditor, {
    buildBlockData, createYooptaEditor, YooptaContentValue
} from '@yoopta/editor';

import { initialValue, marks, notesEditorStyles, plugins } from '../utils/wysiwyg';

interface NoteContentPreviewProps {
  content: string
}

const parseContent = (content: string): YooptaContentValue => {
  if (!content.trim()) {
    return initialValue
  }

  try {
    const parsed = JSON.parse(content) as YooptaContentValue
    const keys = Object.keys(parsed || {})

    if (keys.length === 0) {
      return initialValue
    }

    return parsed
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
}

const NoteContentPreview = ({ content }: NoteContentPreviewProps) => {
  const value = useMemo(() => parseContent(content), [content])

  const editor = useMemo(
    () =>
      createYooptaEditor({
        plugins,
        marks,
        value,
        readOnly: true
      }),
    [value]
  )

  return (
    <div className='bg-secondaryLightest border-secondaryLighter rounded-md border p-3'>
      <YooptaEditor
        editor={editor}
        className='notes-editor note-detail-editor rounded-md py-2'
      />
      <style>{notesEditorStyles}</style>
      <style>{`.note-detail-editor { min-height: auto; } .note-detail-editor [data-slate-editor="true"] { padding: 0; }`}</style>
    </div>
  )
}

export default NoteContentPreview
