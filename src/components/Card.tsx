import Image from './Image'

interface iCard {
  imageAlt: string
  imageSrc: string
  title: string
  type: string
}

const Card = ({ imageAlt, imageSrc, title, type }: iCard) => {
  return (
    <div className='w-auto min-w-xs-card basis-1/6 items-center overflow-clip rounded-card hover:cursor-pointer hover:opacity-75 md:min-w-sm-card lg:min-w-md-card content:min-w-card'>
      <Image imageSrc={imageSrc} type={type} imageAlt={imageAlt} />
      <h3 className='bg-secondary text-center text-textInv'>{title}</h3>
    </div>
  )
}

export default Card
