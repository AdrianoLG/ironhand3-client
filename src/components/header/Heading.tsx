const Heading = ({ title }: { title: string }) => (
  <section className='bg-bg-pattern bg-100 bg-repeat'>
    <div className='mx-auto my-16 max-w-screen-content px-8 py-4'>
      <h1 className='text-3xl text-text'>{title}</h1>
    </div>
  </section>
)

export default Heading
