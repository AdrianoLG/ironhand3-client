import { useState } from 'react'

import ErrorMessage from '../components/molecules/ErrorMessage'
import Heading from '../components/molecules/Heading'
import Spinner from '../components/molecules/Spinner'
import { Dialog } from '../components/organisms/dialogs'
import BookCard from '../feature/catalog/components/BookCard'
import CatalogSectionHeader, {
  SortValue
} from '../feature/catalog/components/CatalogSectionHeader'
import MovieCard from '../feature/catalog/components/MovieCard'
import SerieCard from '../feature/catalog/components/SerieCard'
import BookFormContainer from '../feature/catalog/forms/BookFormContainer'
import MovieFormContainer from '../feature/catalog/forms/MovieFormContainer'
import SerieFormContainer from '../feature/catalog/forms/SerieFormContainer'
import useFilterCatalog from '../feature/catalog/hooks/useFilterCatalog'
import {
  iCatalogBook,
  iCatalogMovie,
  iCatalogSerie
} from '../feature/catalog/types/types'
import { getFullName } from '../feature/catalog/utils/catalogPeople'
import ThirdsLayout from '../layouts/body/ThirdsLayout'
import Header from '../layouts/header/Header'

const normalize = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

const collectTags = (items: { tags?: string[] }[]) =>
  Array.from(new Set(items.flatMap(item => item.tags ?? []))).sort()

const applyBookSort = (books: iCatalogBook[], sort: SortValue) => {
  const sorted = [...books]
  if (sort.field === 'title') {
    sorted.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sort.field === 'person') {
    sorted.sort((a, b) => {
      const aName = a.author?.[0] ? getFullName(a.author[0]) : ''
      const bName = b.author?.[0] ? getFullName(b.author[0]) : ''
      return aName.localeCompare(bName)
    })
  } else {
    sorted.sort((a, b) => (b.publishedYear ?? 0) - (a.publishedYear ?? 0))
  }
  return sort.dir === 'asc' ? sorted : sorted.reverse()
}

const applySerieSort = (series: iCatalogSerie[], sort: SortValue) => {
  const sorted = [...series]
  if (sort.field === 'title') {
    sorted.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sort.field === 'person') {
    sorted.sort((a, b) => {
      const aName = a.director?.[0] ? getFullName(a.director[0]) : ''
      const bName = b.director?.[0] ? getFullName(b.director[0]) : ''
      return aName.localeCompare(bName)
    })
  } else {
    sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
  }
  return sort.dir === 'asc' ? sorted : sorted.reverse()
}

const applyMovieSort = (movies: iCatalogMovie[], sort: SortValue) => {
  const sorted = [...movies]
  if (sort.field === 'title') {
    sorted.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sort.field === 'person') {
    sorted.sort((a, b) => {
      const aName = a.director?.[0] ? getFullName(a.director[0]) : ''
      const bName = b.director?.[0] ? getFullName(b.director[0]) : ''
      return aName.localeCompare(bName)
    })
  } else {
    sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
  }
  return sort.dir === 'asc' ? sorted : sorted.reverse()
}

const Catalog = () => {
  const { data, loading, error } = useFilterCatalog()

  const [bookSearch, setBookSearch] = useState('')
  const [serieSearch, setSerieSearch] = useState('')
  const [movieSearch, setMovieSearch] = useState('')

  const [bookSort, setBookSort] = useState<SortValue>({
    field: 'recent',
    dir: 'desc'
  })
  const [serieSort, setSerieSort] = useState<SortValue>({
    field: 'recent',
    dir: 'desc'
  })
  const [movieSort, setMovieSort] = useState<SortValue>({
    field: 'recent',
    dir: 'desc'
  })

  const [bookTag, setBookTag] = useState<string | null>(null)
  const [serieTag, setSerieTag] = useState<string | null>(null)
  const [movieTag, setMovieTag] = useState<string | null>(null)

  const [bookFormOpen, setBookFormOpen] = useState(false)
  const [serieFormOpen, setSerieFormOpen] = useState(false)
  const [movieFormOpen, setMovieFormOpen] = useState(false)

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

  const bookTerm = normalize(bookSearch.trim())
  const serieTerm = normalize(serieSearch.trim())
  const movieTerm = normalize(movieSearch.trim())

  const allBooks = data?.books ?? []
  const allSeries = data?.series ?? []
  const allMovies = data?.movies ?? []

  const filteredBooks = applyBookSort(
    allBooks.filter(book => {
      if (bookTag && !book.tags?.includes(bookTag)) return false
      if (bookTerm.length < 2) return true
      const title = normalize(book.title)
      const authors =
        book.author?.map(a => normalize(getFullName(a))).join(' ') ?? ''
      return title.includes(bookTerm) || authors.includes(bookTerm)
    }),
    bookSort
  )

  const filteredSeries = applySerieSort(
    allSeries.filter(serie => {
      if (serieTag && !serie.tags?.includes(serieTag)) return false
      if (serieTerm.length < 2) return true
      const title = normalize(serie.title)
      const directors =
        serie.director?.map(d => normalize(getFullName(d))).join(' ') ?? ''
      const country = normalize(serie.country?.name ?? '')
      return (
        title.includes(serieTerm) ||
        directors.includes(serieTerm) ||
        country.includes(serieTerm)
      )
    }),
    serieSort
  )

  const filteredMovies = applyMovieSort(
    allMovies.filter(movie => {
      if (movieTag && !movie.tags?.includes(movieTag)) return false
      if (movieTerm.length < 2) return true
      const title = normalize(movie.title)
      const directors =
        movie.director?.map(d => normalize(getFullName(d))).join(' ') ?? ''
      const country = normalize(movie.country?.name ?? '')
      return (
        title.includes(movieTerm) ||
        directors.includes(movieTerm) ||
        country.includes(movieTerm)
      )
    }),
    movieSort
  )

  return (
    <>
      <Header isMain={false} headers={data?.headers} />
      <Heading title='Catálogo' />
      <ThirdsLayout>
        <div className='px-4'>
          <CatalogSectionHeader
            title='Libros'
            personLabel='Autor'
            onAdd={() => setBookFormOpen(true)}
            sortValue={bookSort}
            onSortChange={setBookSort}
            tags={collectTags(allBooks)}
            activeTag={bookTag}
            onTagClick={setBookTag}
            searchPlaceholder='Buscar por título o autor...'
            searchValue={bookSearch}
            onSearchChange={e => setBookSearch(e.target.value)}
          />
          <div className='flex flex-col gap-4'>
            {filteredBooks.map(book => (
              <BookCard book={book} key={book._id} />
            ))}
          </div>
        </div>
        <div className='px-4'>
          <CatalogSectionHeader
            title='Series'
            personLabel='Director'
            onAdd={() => setSerieFormOpen(true)}
            sortValue={serieSort}
            onSortChange={setSerieSort}
            tags={collectTags(allSeries)}
            activeTag={serieTag}
            onTagClick={setSerieTag}
            searchPlaceholder='Buscar por título, director o país...'
            searchValue={serieSearch}
            onSearchChange={e => setSerieSearch(e.target.value)}
          />
          <div className='flex flex-col gap-4'>
            {filteredSeries.map(serie => (
              <SerieCard serie={serie} key={serie._id} />
            ))}
          </div>
        </div>
        <div className='px-4'>
          <CatalogSectionHeader
            title='Películas'
            personLabel='Director'
            onAdd={() => setMovieFormOpen(true)}
            sortValue={movieSort}
            onSortChange={setMovieSort}
            tags={collectTags(allMovies)}
            activeTag={movieTag}
            onTagClick={setMovieTag}
            searchPlaceholder='Buscar por título, director o país...'
            searchValue={movieSearch}
            onSearchChange={e => setMovieSearch(e.target.value)}
          />
          <div className='flex flex-col gap-4'>
            {filteredMovies.map(movie => (
              <MovieCard movie={movie} key={movie._id} />
            ))}
          </div>
        </div>
      </ThirdsLayout>

      <Dialog
        buttonText='Añadir libro'
        title='Añadir libro'
        description='Introduce los datos del libro'
        image='book-bg'
        child={<BookFormContainer setIsOpen={setBookFormOpen} />}
        isOpen={bookFormOpen}
        setIsOpen={setBookFormOpen}
        hideTrigger
      />
      <Dialog
        buttonText='Añadir serie'
        title='Añadir serie'
        description='Introduce los datos de la serie'
        image='serie-bg'
        child={<SerieFormContainer setIsOpen={setSerieFormOpen} />}
        isOpen={serieFormOpen}
        setIsOpen={setSerieFormOpen}
        hideTrigger
      />
      <Dialog
        buttonText='Añadir película'
        title='Añadir película'
        description='Introduce los datos de la película'
        image='movie-bg'
        child={<MovieFormContainer setIsOpen={setMovieFormOpen} />}
        isOpen={movieFormOpen}
        setIsOpen={setMovieFormOpen}
        hideTrigger
      />
    </>
  )
}

export default Catalog
