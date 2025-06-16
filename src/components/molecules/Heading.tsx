const Heading = ({ title }: { title: string }) => (
  <div className='bg-pattern bg-size-[100px] bg-repeat'>
    <div className='max-w-screen-content mx-auto my-16 px-8 py-4'>
      <h1 className='text-text text-5xl'>{title}</h1>
    </div>
  </div>
)

export default Heading
