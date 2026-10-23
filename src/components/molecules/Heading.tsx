const Heading = ({ title }: { title: string }) => (
  <div className='bg-pattern bg-primary bg-size-[100px] bg-repeat'>
    <div className='max-w-screen-content mx-auto my-8 px-4 py-4 sm:my-16 sm:px-8 lg:px-12'>
      <h1 className='text-text text-3xl sm:text-5xl'>{title}</h1>
    </div>
  </div>
)

export default Heading
