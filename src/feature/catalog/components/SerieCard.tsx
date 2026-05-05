import { SerieCardProps } from '../types/types'
import { getFlagSrc } from '../utils/catalogMedia'
import CatalogCard from './CatalogCard'
import { renderPeopleWithTooltip } from './PersonTooltip'
import RatingBar from './RatingBar'

const SerieCard = ({ serie }: SerieCardProps) => {
  const countryFlagSrc = getFlagSrc(serie.country?.flag)

  return (
    <CatalogCard
      title={serie.title}
      imageSrc={
        serie.cover
          ? `${import.meta.env.VITE_UPLOAD_IMAGES_PATH}/catalog/covers/series/${serie.cover}`
          : undefined
      }
      imageAlt={`Portada de ${serie.title}`}
      summary={
        <>
          <p className='mb-1 text-xs'>
            {serie.director && serie.director.length > 0
              ? renderPeopleWithTooltip(serie.director, 'directors')
              : null}
          </p>
          <h3 className='mb-4 text-xl leading-none font-semibold'>
            {serie.title}
          </h3>
          <div className='flex flex-col gap-1'>
            {serie.country && (
              <p className='flex items-center text-xs leading-none'>
                <span className='font-semibold'>País</span>:{' '}
                {countryFlagSrc && (
                  <img
                    src={countryFlagSrc}
                    alt={`Bandera de ${serie.country.name}`}
                    className='mr-1 ml-2 inline-block w-4 object-cover align-middle'
                  />
                )}
                {serie.country.name}
              </p>
            )}
            {serie.year && (
              <p className='text-xs'>
                <span className='font-semibold'>Año</span>: {serie.year}
              </p>
            )}
            {serie.episodeDuration && (
              <p className='text-xs'>
                <span className='font-semibold'>Duración</span>:{' '}
                {serie.episodeDuration} min
              </p>
            )}
            {serie.genres && serie.genres.length > 0 && (
              <p className='text-xs'>
                <span className='font-semibold'>Género</span>:{' '}
                {serie.genres.map(genre => genre.name).join(', ')}
              </p>
            )}
          </div>
        </>
      }
      details={
        <>
          {serie.actors && serie.actors.length > 0 && (
            <p className='text-xs'>
              <span className='font-semibold'>Actores</span>:{' '}
              {renderPeopleWithTooltip(serie.actors, 'actors')}
            </p>
          )}
          {typeof serie.rating === 'number' && (
            <RatingBar rating={serie.rating} />
          )}
          {serie.tags && serie.tags.length > 0 && (
            <p className='text-xs'>
              {serie.tags.map(tag => (
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

export default SerieCard
