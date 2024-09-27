import BigLogo from '../components/BigLogo'
import NavButtons from '../components/NavButtons'

const Home = () => (
  <main>
    <section className='flex justify-center bg-bg-pattern bg-100 bg-repeat py-8'>
      <div className='max-w-screen-md'>
        <div className='flex flex-col items-center gap-0'>
          <BigLogo />
        </div>
        <NavButtons />
      </div>
    </section>
  </main>
)

export default Home
