import { useState } from 'react'

import { useMutation } from '@apollo/client'

import { Dialog } from '../../../components/organisms/dialogs'
import { upperLower } from '../../../utils/upperLower'
import BookFormContainer from '../forms/BookFormContainer'
import { REMOVE_BOOK } from '../gql/catalogMutations'
import { CATALOG_INFO } from '../gql/catalogQueries'
import {
  BookCardProps,
  bookFormatLabels,
  coverMaterialLabels
} from '../types/types'
import CatalogCard from './CatalogCard'
import { renderPeopleWithTooltip } from './PersonTooltip'
import RatingBar from './RatingBar'

const renderSynopsis = (synopsis: string) => synopsis.replace(/\\n/g, '\n')

const BookCard = ({ book, readOnly }: BookCardProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [removeBook, { loading: isDeleting }] = useMutation(REMOVE_BOOK, {
    refetchQueries: [{ query: CATALOG_INFO }]
  })

  const handleDelete = () => {
    if (window.confirm(`¿Borrar "${book.title}"?`)) {
      removeBook({ variables: { id: book._id } })
    }
  }

  return (
    <>
      <CatalogCard
        title={book.title}
        imageSrc={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/catalog/covers/books/${book.cover}`}
        imageAlt={`Portada de ${book.title}`}
        readOnly={readOnly}
        onEdit={() => setIsEditOpen(true)}
        onDelete={handleDelete}
        isDeleting={isDeleting}
        summary={
          <>
            <p className='mb-1 text-xs'>
              {book.author && book.author.length > 0
                ? renderPeopleWithTooltip(book.author, 'writers')
                : null}
            </p>
            <h3 className='mb-4 text-xl leading-none font-semibold'>
              {book.title}
            </h3>
            <div className='flex flex-col gap-1'>
              <p className='text-xs'>
                <span className='font-semibold'>Formato</span>:{' '}
                {upperLower(bookFormatLabels[book.format]) ??
                  upperLower(book.format)}
              </p>

              {book.genres && (
                <p className='text-xs'>
                  <span className='font-semibold'>Género</span>:{' '}
                  {book.genres.map(genre => genre.name).join(', ')}
                </p>
              )}
              <p className='text-xs'>
                <span className='font-semibold'>Páginas</span>: {book.pages}
              </p>
              {book.format === 'PAPER' && book.coverMaterial && (
                <p className='text-xs'>
                  <span className='font-semibold'>Tapa</span>:{' '}
                  {upperLower(coverMaterialLabels[book.coverMaterial]) ??
                    upperLower(book.coverMaterial)}
                </p>
              )}
              {book.editorial && (
                <p className='text-xs'>
                  <span className='font-semibold'>Editorial</span>:{' '}
                  {book.editorial}
                </p>
              )}
              {book.publishedYear && (
                <p className='text-xs'>
                  <span className='font-semibold'>Año</span>:{' '}
                  {book.publishedYear}
                </p>
              )}
            </div>
          </>
        }
        details={
          <>
            {book.synopsis && (
              <p className='text-xs whitespace-pre-line'>
                <span className='font-semibold'>Sinopsis</span>:
                <br /> {renderSynopsis(book.synopsis)}
              </p>
            )}
            {typeof book.rating === 'number' && (
              <RatingBar rating={book.rating} />
            )}
            {book.tags && book.tags.length > 0 && (
              <p className='text-xs'>
                {book.tags.map(tag => (
                  <span
                    className='bg-warn mr-2 rounded px-1 text-white'
                    key={tag}
                  >
                    #{tag}
                  </span>
                ))}
              </p>
            )}
          </>
        }
      />
      <Dialog
        buttonText='Editar libro'
        title='Editar libro'
        description='Actualiza los datos del libro'
        image='book-bg'
        child={<BookFormContainer setIsOpen={setIsEditOpen} book={book} />}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        hideTrigger
      />
    </>
  )
}

export default BookCard
