import BigLogo from '../components/BigLogo'
import NavButtons from '../components/NavButtons'

const Home = () => (
  <main>
    <section className='flex justify-center bg-bg-pattern bg-100 bg-repeat py-8'>
      <div className='max-w-secondaryHeader relative mx-8 w-full'>
        <div className='mb-8 flex flex-col items-center gap-2'>
          <BigLogo />
        </div>
        <NavButtons />
      </div>
    </section>
    <section></section>
  </main>
)

export default Home
