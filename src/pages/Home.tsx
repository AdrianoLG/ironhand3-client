import IconLogo from '../components/icons/logo'

function Home() {
  return (
    <main>
      <section className='flex py-8 justify-center bg-bg-pattern bg-repeat bg-100'>
        <div className='max-w-screen-md'>
          <div className='flex flex-col gap-0 items-center'>
            <IconLogo />
            <h1 className='text-secondary text-title font-semibold'>
              Iron Hand
            </h1>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
