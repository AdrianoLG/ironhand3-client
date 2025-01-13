const Heading = ({ title }: { title: string }) => (
  <div className='bg-bg-pattern bg-100 bg-repeat'>
    <div className='mx-auto my-16 max-w-screen-content px-8 py-4'>
      <h1 className='text-5xl text-text'>{title}</h1>
    </div>
  </div>
)

export default Heading
