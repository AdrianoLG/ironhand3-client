import CloseButton from '../../../assets/svgs/CloseButton';
import { Button } from '../../../components/atoms';
import {
    FormInput, FormInputFile, FormInputTagChips, FormSelect
} from '../../../components/organisms/forms';
import Wysiwyg from '../components/Wysiwyg';
import { NOTE_FORM_TEXT, NOTE_FORM_VALIDATION } from '../utils/noteFormMessages';

import type { ChangeEvent } from 'react'
import type {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister
} from 'react-hook-form'
import type { NoteFormInput, NoteCategoryOption } from '../types/types'

export interface NoteFormProps {
  handleSubmit: UseFormHandleSubmit<NoteFormInput>
  onSubmit: SubmitHandler<NoteFormInput>
  register: UseFormRegister<NoteFormInput>
  errors: FieldErrors<NoteFormInput>
  isCreatingCategory: boolean
  categoryValue: string
  noteCategoryOptions: NoteCategoryOption[]
  tags: string[]
  images: string[]
  contentValue: string
  imagesUploadError: string
  editorResetKey: number
  isSubmitting: boolean
  isSubmitDisabled: boolean
  submitButtonText: string
  submittingButtonText: string
  onCategoryInputChange: (value: string) => void
  onCategorySelect: (value: string) => void
  onToggleCategoryMode: (isCreating: boolean) => void
  onTagsChange: (tags: string[]) => void
  onImageUpload: (value: string) => void
  onImageUploadError: (uploadError: string) => void
  onRemoveImage: (imageName: string) => void
  onContentChange: (value: string) => void
}

const NoteForm = ({
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
  submitButtonText,
  submittingButtonText,
  onCategoryInputChange,
  onCategorySelect,
  onToggleCategoryMode,
  onTagsChange,
  onImageUpload,
  onImageUploadError,
  onRemoveImage,
  onContentChange
}: NoteFormProps) => {
  const getImageSrc = (image: string) => {
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image
    }

    return `${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/${image}`
  }

  return (
    <form
      className='xl:max-w-screen-content mx-auto my-7 flex w-full flex-col gap-4 px-12'
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type='hidden'
        {...register('category', {
          required: {
            value: true,
            message: NOTE_FORM_VALIDATION.categoryRequired
          },
          maxLength: {
            value: 50,
            message: NOTE_FORM_VALIDATION.maxLength50
          }
        })}
      />
      <input
        type='hidden'
        {...register('content', {
          required: {
            value: true,
            message: NOTE_FORM_VALIDATION.contentRequired
          }
        })}
      />
      <div className='grid grid-cols-1 gap-4'>
        <FormInput
          {...register('title', {
            required: {
              value: true,
              message: NOTE_FORM_VALIDATION.titleRequired
            },
            maxLength: {
              value: 50,
              message: NOTE_FORM_VALIDATION.maxLength50
            }
          })}
          label={NOTE_FORM_TEXT.titleLabel}
          error={errors.title?.message}
          required
        />
        {isCreatingCategory ? (
          <div className='flex items-center gap-2'>
            <FormInput
              label={NOTE_FORM_TEXT.categoryLabel}
              placeholder={NOTE_FORM_TEXT.categoryNewPlaceholder}
              value={categoryValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onCategoryInputChange(event.target.value)
              }
              error={errors.category?.message}
              required
            />
            <button
              type='button'
              className='border-secondaryLighter hover:bg-secondaryLightest relative top-0.5 mb-px inline-flex h-7.5 w-7.5 items-center justify-center rounded-md border p-0 [&_svg]:h-4 [&_svg]:w-4'
              onClick={() => onToggleCategoryMode(false)}
              title={NOTE_FORM_TEXT.categoryBackToSelect}
              aria-label={NOTE_FORM_TEXT.categoryBackToSelect}
            >
              <CloseButton strokeColor='var(--secondary)' />
            </button>
          </div>
        ) : (
          <FormSelect
            tag='category'
            selectName={NOTE_FORM_TEXT.categoryLabel}
            placeholder={NOTE_FORM_TEXT.categoryPlaceholder}
            value={categoryValue}
            options={noteCategoryOptions}
            isRequired
            error={errors.category?.message}
            onChange={onCategorySelect}
          />
        )}
      </div>

      <FormInputTagChips
        label={NOTE_FORM_TEXT.tagsLabel}
        placeholder={NOTE_FORM_TEXT.tagsPlaceholder}
        onChange={onTagsChange}
        error={errors.tags?.message as string}
        data={tags}
      />

      <div className='flex flex-col gap-2'>
        <FormInputFile
          label={NOTE_FORM_TEXT.imagesLabel}
          uploadButtonLabel={
            images.length > 0
              ? NOTE_FORM_TEXT.addImageButton
              : NOTE_FORM_TEXT.uploadImageButton
          }
          sublabel={NOTE_FORM_TEXT.imagesSublabel}
          type='file'
          acceptedTypes='image/avif,image/webp,image/jpeg,image/png'
          error={imagesUploadError}
          onUpload={onImageUpload}
          setError={onImageUploadError}
          path='notes'
          previewBelow
        />
        {images.length > 0 && (
          <div className='mt-1 flex flex-wrap gap-2'>
            {images.map(image => (
              <div
                key={image}
                className='border-secondaryLighter bg-secondaryLightest rounded-md border p-1'
              >
                <img
                  src={getImageSrc(image)}
                  alt='Note uploaded image'
                  className='mb-1 h-16 w-16 rounded object-cover'
                />
                <button
                  type='button'
                  className='border-secondaryLighter bg-primary text-secondary hover:bg-secondary hover:text-accent w-full rounded border px-1 py-0.5 text-[10px]'
                  onClick={() => onRemoveImage(image)}
                  title={NOTE_FORM_TEXT.removeImageTitle}
                >
                  {NOTE_FORM_TEXT.removeImageTitle}
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.images?.message && (
          <p className='text-warn text-xs'>{errors.images.message}</p>
        )}
      </div>

      <Wysiwyg
        key={editorResetKey}
        label={NOTE_FORM_TEXT.contentLabel}
        initialContent={contentValue}
        error={errors.content?.message}
        onContentChange={onContentChange}
      />

      {errors.root?.serverError?.message && (
        <p className='text-warn text-sm'>{errors.root.serverError.message}</p>
      )}

      <div className='flex justify-end'>
        <Button
          text={isSubmitting ? submittingButtonText : submitButtonText}
          isFit
          small
          type='submit'
          disabled={isSubmitDisabled}
        />
      </div>
    </form>
  )
}

export default NoteForm
