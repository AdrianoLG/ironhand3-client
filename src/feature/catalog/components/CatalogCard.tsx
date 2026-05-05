import { ReactNode, useState } from 'react'

import { Button } from '../../../components/atoms'

type CatalogCardProps = {
  title: string
  imageSrc?: string
  imageAlt: string
  summary: ReactNode
  details?: ReactNode
}

const CatalogCard = ({
  title,
  imageSrc,
  imageAlt,
  summary,
  details
}: CatalogCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className='border-secondaryLight overflow-hidden rounded border'
      onClick={() => setIsExpanded(current => !current)}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setIsExpanded(current => !current)
        }
      }}
      role='button'
      tabIndex={0}
    >
      <div className='flex'>
        <div className='bg-primary/30 flex w-36 shrink-0 items-center justify-center'>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className='mr-4 h-full w-32 object-cover'
            />
          ) : (
            <span className='px-3 text-center text-xs font-semibold'>
              {title}
            </span>
          )}
        </div>
        <div className='flex-1 px-0 py-4 pr-4'>{summary}</div>
      </div>
      {details && (
        <div
          className={`transition-all duration-300 ease-out ${isExpanded ? 'max-h-80 overflow-y-auto opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
        >
          <div className='border-secondaryLight bg-primary/40 mx-4 mb-4 space-y-2 pt-4'>
            {details}
            <div className='mt-8 flex gap-2'>
              <Button
                text='Actualizar'
                type='button'
                xsmall
                isFit
                onMouseClick={event => event.stopPropagation()}
              />
              <Button
                text='Borrar'
                type='button'
                xsmall
                isFit
                outline
                secondary
                onMouseClick={event => event.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CatalogCard
