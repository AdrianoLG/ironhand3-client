import nextIcon from '../../../assets/img/svg/next.svg'
import prevIcon from '../../../assets/img/svg/previous.svg'
import IconButton from '../../../components/atoms/IconButton'

type CatalogPaginationProps = {
  page: number
  totalItems: number
  pageSize: number
  onPrevious: () => void
  onNext: () => void
}

const CatalogPagination = ({
  page,
  totalItems,
  pageSize,
  onPrevious,
  onNext
}: CatalogPaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const isEmpty = totalItems === 0
  const currentPage = isEmpty ? 0 : Math.min(page, totalPages - 1)

  return (
    <div className='mt-6 flex items-center justify-center gap-2'>
      <IconButton
        img={prevIcon}
        isFit
        xsmall
        outline
        disabled={isEmpty || currentPage === 0}
        onMouseClick={onPrevious}
      />
      <p className='text-secondaryLight min-w-12 text-center text-xs font-semibold'>
        {isEmpty ? '0 / 0' : `${currentPage + 1} / ${totalPages}`}
      </p>
      <IconButton
        img={nextIcon}
        isFit
        xsmall
        outline
        disabled={isEmpty || currentPage >= totalPages - 1}
        onMouseClick={onNext}
      />
    </div>
  )
}

export default CatalogPagination
