import YooptaEditor from '@yoopta/editor'

import { useWysiwyg } from '../hooks/useWysiwyg'
import { notesEditorStyles } from '../utils/wysiwyg'
import MathDialog from './MathDialog'
import MediaDialog from './MediaDialog'
import WysiwygToolbar from './WysiwygToolbar'

import type { YooptaContentValue } from '@yoopta/editor'

interface WysiwygProps {
  label?: string
  error?: string
  initialContent?: string
  onContentChange?: (content: string) => void
}

const Wysiwyg = ({
  label = 'Contenido',
  error,
  initialContent,
  onContentChange
}: WysiwygProps) => {
  const {
    editor,
    color,
    setColor,
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
    isMathEditorOpen,
    mathLatex,
    setMathLatex,
    openMathEditor,
    closeMathEditor,
    insertMathExpression,
    focusTextModeInColorPicker,
    selectedEmbedStyle,
    selectedImageStyle
  } = useWysiwyg(initialContent)

  return (
    <>
      <div className='w-full'>
        <section className='flex flex-col gap-3'>
          <label className='text-text mb-1 block w-full text-sm'>
            {label} <span className='text-warn'>*</span>
          </label>
          <WysiwygToolbar
            editor={editor}
            color={color}
            setColor={setColor}
            activeEmbedId={activeEmbedId}
            activeImageId={activeImageId}
            openMediaDialog={openMediaDialog}
            openMathEditor={openMathEditor}
            focusTextModeInColorPicker={focusTextModeInColorPicker}
            deleteActiveEmbed={deleteActiveEmbed}
            deleteActiveImage={deleteActiveImage}
          />
          <YooptaEditor
            editor={editor}
            onPathChange={handlePathChange}
            onChange={(value: YooptaContentValue) => {
              onContentChange?.(JSON.stringify(value))
            }}
            autoFocus
            placeholder='Escribe una nota...'
            className='notes-editor border-secondary/25 bg-primary/20 rounded-md border py-4'
          />
          {error && <p className='text-warn mt-1 text-xs'>{error}</p>}
        </section>
      </div>
      <MediaDialog
        isOpen={isMediaDialogOpen}
        type={mediaDialogType}
        value={mediaUrl}
        setValue={setMediaUrl}
        onClose={() => setIsMediaDialogOpen(false)}
        onSubmit={() => {
          void handleInsertMedia()
        }}
        onKeyDownCapture={handleMediaDialogKeyDown}
      />
      <MathDialog
        isOpen={isMathEditorOpen}
        value={mathLatex}
        setValue={setMathLatex}
        onClose={closeMathEditor}
        onSubmit={insertMathExpression}
      />
      {selectedEmbedStyle && <style>{selectedEmbedStyle}</style>}
      {selectedImageStyle && <style>{selectedImageStyle}</style>}
      <style>{notesEditorStyles}</style>
    </>
  )
}

export default Wysiwyg
