import { useState } from 'react'

import { MathInlineCommands } from '@yoopta/math'

import { getActiveSlate } from '../utils/wysiwyg'

import type { SlateEditor, YooEditor } from '@yoopta/editor'

export const useWysiwygMath = (editor: YooEditor) => {
  const [isMathEditorOpen, setIsMathEditorOpen] = useState(false)
  const [mathLatex, setMathLatex] = useState('x^2 + y^2')
  const [mathSlate, setMathSlate] = useState<SlateEditor | null>(null)

  const openMathEditor = () => {
    const slate = getActiveSlate(editor)
    if (!slate) {
      window.alert(
        'Coloca el cursor dentro del editor antes de escribir una fórmula'
      )
      return
    }

    setMathSlate(slate)
    setMathLatex('x^2 + y^2')
    setIsMathEditorOpen(true)
  }

  const closeMathEditor = () => {
    setIsMathEditorOpen(false)
    setMathSlate(null)
    setMathLatex('x^2 + y^2')
  }

  const insertMathExpression = () => {
    const latex = mathLatex.trim()
    if (!latex) {
      window.alert('Escribe una fórmula antes de insertarla')
      return
    }

    const slate = mathSlate || getActiveSlate(editor)
    if (!slate) {
      window.alert('No se pudo ubicar el cursor del editor')
      return
    }

    MathInlineCommands.insertMathInline(editor, latex, {
      slate,
      focus: true
    })

    closeMathEditor()
  }

  return {
    isMathEditorOpen,
    mathLatex,
    setMathLatex,
    openMathEditor,
    closeMathEditor,
    insertMathExpression
  }
}
