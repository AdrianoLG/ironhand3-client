import BigLogo from '../components/BigLogo'
import CleaningShortcuts from '../components/CleaningShortcuts'
import NavButtons from '../components/NavButtons'
import Shortcuts from '../components/Shortcuts'

const Home = () => (
  <main>
    <section className='flex justify-center bg-bg-pattern bg-100 bg-repeat py-8'>
      <div className='relative mx-8 w-full max-w-secondaryHeader'>
        <div className='mb-8 flex flex-col items-center gap-2'>
          <BigLogo />
        </div>
        <NavButtons />
      </div>
    </section>
    <section className='mx-auto mb-16 mt-8 max-w-screen-content px-8'>
      <Shortcuts />
    </section>
    <section className='mx-auto mb-16 mt-8 max-w-screen-content px-8'>
      <CleaningShortcuts />
    </section>
  </main>
)

export default Home
