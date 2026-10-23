import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { NoteFormProps } from '../forms/NoteForm'
import { NoteFormInput, NoteListItem } from '../types/types'
import {
  buildNoteCategoryOptions,
  hasMeaningfulContent,
  NEW_CATEGORY_OPTION_VALUE
} from '../utils/noteForm'
import { NOTE_FORM_TEXT, NOTE_FORM_VALIDATION } from '../utils/noteFormMessages'

const buildFormDefaults = (note?: NoteListItem | null): NoteFormInput => ({
  title: note?.title ?? '',
  category: note?.category ?? '',
  tags: note?.tags ?? [],
  images: note?.images ?? [],
  content: note?.content ?? '',
  shared: note?.shared ?? false
})

interface UseNoteFormParams {
  noteCategories: string[]
  isSubmitting: boolean
  mode: 'create' | 'edit'
  initialNote?: NoteListItem | null
  onSubmitNote: (formData: NoteFormInput) => Promise<unknown>
  onSubmitSuccess?: () => void
}

export const useNoteForm = ({
  noteCategories,
  isSubmitting,
  mode,
  initialNote,
  onSubmitNote,
  onSubmitSuccess
}: UseNoteFormParams): NoteFormProps => {
  const [imagesUploadError, setImagesUploadError] = useState('')
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const [editorResetKey, setEditorResetKey] = useState(0)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<NoteFormInput>({
    mode: 'onChange',
    defaultValues: buildFormDefaults(initialNote)
  })

  useEffect(() => {
    if (mode === 'edit') {
      reset(buildFormDefaults(initialNote))
      setEditorResetKey(current => current + 1)
    }
  }, [initialNote, mode, reset])

  const images = watch('images')
  const tags = watch('tags')
  const titleValue = watch('title')
  const categoryValue = watch('category')
  const contentValue = watch('content')
  const sharedValue = watch('shared')

  const isSubmitDisabled =
    isSubmitting ||
    titleValue.trim().length === 0 ||
    categoryValue.trim().length === 0 ||
    !hasMeaningfulContent(contentValue)

  const noteCategoryOptions = useMemo(
    () => buildNoteCategoryOptions(noteCategories),
    [noteCategories]
  )

  const onSubmit: SubmitHandler<NoteFormInput> = async formData => {
    if (!hasMeaningfulContent(formData.content)) {
      setError('content', {
        message: NOTE_FORM_VALIDATION.contentBeforeSave
      })
      return
    }

    clearErrors('content')
    clearErrors('root')

    try {
      await onSubmitNote(formData)

      if (mode === 'create') {
        reset(buildFormDefaults())
        setIsCreatingCategory(false)
        setImagesUploadError('')
        setEditorResetKey(current => current + 1)
      }

      if (onSubmitSuccess) {
        onSubmitSuccess()
      }
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : NOTE_FORM_VALIDATION.saveErrorFallback

      setError('root.serverError', {
        type: 'server',
        message
      })
    }
  }

  const onRemoveImage = (imageName: string) => {
    const nextImages = images.filter(image => image !== imageName)
    setValue('images', nextImages)
  }

  const onCategorySelect = (value: string) => {
    if (value === NEW_CATEGORY_OPTION_VALUE) {
      setIsCreatingCategory(true)
      setValue('category', '', { shouldValidate: true })
      return
    }

    setValue('category', value, { shouldValidate: true })
    clearErrors('category')
  }

  const onCategoryInputChange = (value: string) => {
    setValue('category', value, {
      shouldValidate: true
    })
    clearErrors('category')
  }

  const onToggleCategoryMode = (isCreating: boolean) => {
    setIsCreatingCategory(isCreating)

    if (!isCreating) {
      setValue('category', '', { shouldValidate: true })
    }
  }

  const onTagsChange = (nextTags: string[]) => setValue('tags', nextTags)

  const onImageUpload = (value: string) => {
    const nextImages = [...images, value]
    setValue('images', nextImages)
    setImagesUploadError('')
    clearErrors('images')
  }

  const onImageUploadError = (uploadError: string) => {
    setImagesUploadError(uploadError)
    if (uploadError) {
      setError('images', { message: uploadError })
    } else {
      clearErrors('images')
    }
  }

  const onContentChange = (value: string) => {
    setValue('content', value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
    clearErrors('content')
  }

  const onSharedChange = (value: boolean) => setValue('shared', value)

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isCreatingCategory,
    categoryValue,
    noteCategoryOptions,
    tags,
    images,
    contentValue,
    imagesUploadError,
    editorResetKey,
    isSubmitting,
    isSubmitDisabled,
    submitButtonText:
      mode === 'edit' ? NOTE_FORM_TEXT.updateButton : NOTE_FORM_TEXT.saveButton,
    submittingButtonText:
      mode === 'edit'
        ? NOTE_FORM_TEXT.updatingButton
        : NOTE_FORM_TEXT.savingButton,
    onCategoryInputChange,
    onCategorySelect,
    onToggleCategoryMode,
    onTagsChange,
    onImageUpload,
    onImageUploadError,
    onRemoveImage,
    onContentChange,
    shared: sharedValue,
    onSharedChange
  }
}
