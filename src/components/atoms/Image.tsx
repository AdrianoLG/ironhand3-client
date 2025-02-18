interface iImage {
  imageAlt: string
  imageSrc: string
  type: string
}

const Image = ({ imageSrc, type, imageAlt }: iImage) => {
  return (
    <img
      srcSet={`${imageSrc}.${type}, ${imageSrc}@2x.${type}`}
      src={imageSrc}
      alt={imageAlt}
      className='w-full'
    />
  )
}

export default Image
