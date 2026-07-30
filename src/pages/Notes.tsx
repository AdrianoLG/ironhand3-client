import { useMemo, useState } from 'react'

import { useMutation } from '@apollo/client'

import { Button } from '../components/atoms'
import ErrorMessage from '../components/molecules/ErrorMessage'
import Heading from '../components/molecules/Heading'
import Spinner from '../components/molecules/Spinner'
import { FormSelect } from '../components/organisms/forms'
import NotesGrid from '../feature/note/components/NotesGrid'
import NotesHeaderButtons from '../feature/note/components/NotesHeaderButtons'
import { CREATE_NOTE } from '../feature/note/gql/noteMutations'
import { NOTE_INFO } from '../feature/note/gql/noteQueries'
import useFilterNotes from '../feature/note/hooks/useFilterNotes'
import { useNoteForm } from '../feature/note/hooks/useNoteForm'
import { buildCreateNoteInput } from '../feature/note/utils/noteForm'
import Header from '../layouts/header/Header'

const Notes = () => {
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const { data, loading, error } = useFilterNotes()
  const [createNote, { loading: isCreatingNote }] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: NOTE_INFO }]
  })

  const noteFormProps = useNoteForm({
    noteCategories: data?.noteCategories ?? [],
    isSubmitting: isCreatingNote,
    mode: 'create',
    onSubmitNote: formData =>
      createNote({
        variables: {
          createNoteInput: buildCreateNoteInput(formData)
        }
      }),
    onSubmitSuccess: () => setIsCreateNoteOpen(false)
  })

  const noteCategories = useMemo(
    () =>
      (data?.noteCategories ?? []).map(category => ({
        value: category,
        name: category
      })),
    [data?.noteCategories]
  )

  const noteTags = useMemo(() => {
    const tags = Array.from(
      new Set((data?.notes ?? []).flatMap(note => note.tags ?? []))
    ).sort()

    return tags.map(tag => ({ value: tag, name: `#${tag}` }))
  }, [data?.notes])

  const filteredNotes = useMemo(() => {
    const notes = data?.notes ?? []

    return notes.filter(note => {
      const matchesCategory =
        !selectedCategory || note.category === selectedCategory
      const matchesTag = !selectedTag || (note.tags ?? []).includes(selectedTag)

      return matchesCategory && matchesTag
    })
  }, [data?.notes, selectedCategory, selectedTag])

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedTag('')
  }

  const hasActiveFilters = selectedCategory.length > 0 || selectedTag.length > 0

  if (loading)
    return (
      <Spinner classes='my-7 flex w-full justify-center px-8' widthInRem={2} />
    )

  if (error)
    return (
      <ErrorMessage
        message={'No conectado a la base de datos'}
        errorMessage={error.message}
        containerClasses='my-7 flex w-full justify-center px-8 text-secondary'
      />
    )

  return (
    <>
      <Header isMain={false} headers={data?.headers} />
      <Heading title='Notas' />
      <NotesHeaderButtons
        noteFormProps={noteFormProps}
        isOpen={isCreateNoteOpen}
        setIsOpen={setIsCreateNoteOpen}
      />
      <div className='xl:max-w-screen-content mx-auto mb-4 flex flex-wrap items-end gap-3 px-12'>
        <div className='w-fit min-w-[220px]'>
          <FormSelect
            key={`category-filter-${selectedCategory || 'empty'}`}
            selectName=''
            placeholder='Todas las categorías'
            value={selectedCategory || undefined}
            options={noteCategories}
            tag='note-category-filter'
            onChange={value => {
              setSelectedCategory(value)
              if (value) {
                setSelectedTag('')
              }
            }}
          />
        </div>
        <div className='w-fit min-w-[220px]'>
          <FormSelect
            key={`tag-filter-${selectedTag || 'empty'}`}
            selectName=''
            placeholder='Todos los tags'
            value={selectedTag || undefined}
            options={noteTags}
            tag='note-tag-filter'
            onChange={value => {
              setSelectedTag(value)
              if (value) {
                setSelectedCategory('')
              }
            }}
          />
        </div>
        {hasActiveFilters && (
          <Button
            text='Borrar filtros'
            outline
            isFit
            xsmall
            type='button'
            onMouseClick={clearFilters}
          />
        )}
      </div>
      <NotesGrid
        notes={filteredNotes}
        noteCategories={data?.noteCategories ?? []}
      />
    </>
  )
}
export default Notes
