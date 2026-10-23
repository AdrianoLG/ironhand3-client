import { useState } from 'react';

import { useMutation } from '@apollo/client';

import { Dialog } from '../../../components/organisms/dialogs';
import MovieFormContainer from '../forms/MovieFormContainer';
import { REMOVE_MOVIE } from '../gql/catalogMutations';
import { CATALOG_INFO } from '../gql/catalogQueries';
import { MovieCardProps } from '../types/types';
import { getFlagSrc } from '../utils/catalogMedia';
import CatalogCard from './CatalogCard';
import { renderPeopleWithTooltip } from './PersonTooltip';
import RatingBar from './RatingBar';

const MovieCard = ({ movie, readOnly }: MovieCardProps) => {
  const countryFlagSrc = getFlagSrc(movie.country?.flag)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [removeMovie, { loading: isDeleting }] = useMutation(REMOVE_MOVIE, {
    refetchQueries: [{ query: CATALOG_INFO }]
  })

  const handleDelete = () => {
    if (window.confirm(`¿Borrar "${movie.title}"?`)) {
      removeMovie({ variables: { id: movie._id } })
    }
  }

  return (
    <>
      <CatalogCard
        title={movie.title}
        imageSrc={`${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/catalog/covers/movies/${movie.cover}`}
        imageAlt={`Portada de ${movie.title}`}
        readOnly={readOnly}
        onEdit={() => setIsEditOpen(true)}
        onDelete={handleDelete}
        isDeleting={isDeleting}
        summary={
          <>
            <p className='mb-1 text-xs'>
              {movie.director && movie.director.length > 0
                ? renderPeopleWithTooltip(movie.director, 'directors')
                : null}
            </p>
            <h3 className='mb-4 text-xl leading-none font-semibold'>
              {movie.title}
            </h3>
            <div className='flex flex-col gap-1'>
              {movie.duration && (
                <p className='text-xs'>
                  <span className='font-semibold'>Duración</span>:{' '}
                  {movie.duration} min
                </p>
              )}
              {movie.year && (
                <p className='text-xs'>
                  <span className='font-semibold'>Año</span>: {movie.year}
                </p>
              )}
              {movie.country && (
                <p className='flex items-center text-xs leading-none'>
                  <span className='font-semibold'>País</span>:{' '}
                  {countryFlagSrc && (
                    <img
                      src={countryFlagSrc}
                      alt={`Bandera de ${movie.country.name}`}
                      className='mr-1 ml-2 inline-block w-4 object-cover align-middle'
                    />
                  )}
                  {movie.country.name}
                </p>
              )}
              {movie.genres && movie.genres.length > 0 && (
                <p className='text-xs'>
                  <span className='font-semibold'>Género</span>:{' '}
                  {movie.genres.map(genre => genre.name).join(', ')}
                </p>
              )}
            </div>
          </>
        }
        details={
          <>
            {movie.actors && movie.actors.length > 0 && (
              <p className='text-xs'>
                <span className='font-semibold'>Actores</span>:{' '}
                {renderPeopleWithTooltip(movie.actors, 'actors')}
              </p>
            )}
            {typeof movie.rating === 'number' && (
              <RatingBar rating={movie.rating} />
            )}
            {movie.tags && movie.tags.length > 0 && (
              <p className='text-xs'>
                {movie.tags.map(tag => (
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
        buttonText='Editar película'
        title='Editar película'
        description='Actualiza los datos de la película'
        image='movie-bg'
        child={<MovieFormContainer setIsOpen={setIsEditOpen} movie={movie} />}
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        hideTrigger
      />
    </>
  )
}

export default MovieCard
