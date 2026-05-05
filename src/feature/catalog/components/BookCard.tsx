import { upperLower } from '../../../utils/upperLower'
import {
  BookCardProps,
  bookFormatLabels,
  coverMaterialLabels
} from '../types/types'
import { getFullNames } from '../utils/catalogPeople'
import CatalogCard from './CatalogCard'
import RatingBar from './RatingBar'

const renderSynopsis = (synopsis: string) => synopsis.replace(/\\n/g, '\n')

const BookCard = ({ book }: BookCardProps) => {
  return (
    <CatalogCard
      title={book.title}
      imageSrc={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/catalog/covers/books/${book.cover}`}
      imageAlt={`Portada de ${book.title}`}
      summary={
        <>
          <p className='text-xs'>{getFullNames(book.author ?? [])}</p>
          <h3 className='mb-4 text-xl font-semibold'>{book.title}</h3>
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
                <span className='font-semibold'>Año</span>: {book.publishedYear}
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
  )
}

export default BookCard
