import Image from './Image'

interface iCard {
  imageAlt: string
  imageSrc: string
  title: string
  type: string
  onClick: () => void
}

const Card = ({ imageAlt, imageSrc, title, type, onClick }: iCard) => {
  return (
    <div
      onClick={onClick}
      className='min-w-xs-card rounded-card hover:shadow-warn md:min-w-sm-card lg:min-w-md-card content:min-w-card w-auto basis-1/6 items-center overflow-clip transition-all duration-100 ease-in hover:scale-95 hover:cursor-pointer hover:brightness-75'
    >
      <Image imageSrc={imageSrc} type={type} imageAlt={imageAlt} />
      <h3 className='bg-secondary text-textInv text-center'>{title}</h3>
    </div>
  )
}

export default Card
