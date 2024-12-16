import { gql, useQuery } from '@apollo/client'

import BigLogo from '../components/BigLogo'
import NavButtons from '../components/NavButtons'
import Shortcuts from '../components/Shortcuts'
import { iShortcuts } from '../utils/types'

const Home = () => {
  const QUERY = gql`
    query ShortcutCategories {
      shortcutCategories {
        _id
        title
        shortcuts {
          _id
          title
          image
          action
        }
      }
    }
  `

  const { data, loading, error } = useQuery(QUERY)

  if (loading) return 'Loading...'
  if (error) return <pre>{error.message}</pre>

  console.log(data)

  return (
    <main>
      <section className='flex justify-center bg-bg-pattern bg-100 bg-repeat py-8'>
        <div className='relative mx-8 w-full max-w-secondaryHeader'>
          <div className='mb-8 flex flex-col items-center gap-2'>
            <BigLogo />
          </div>
          <NavButtons />
        </div>
      </section>
      {data.shortcutCategories.map((shortcutCategory: iShortcuts) => (
        <section
          key={shortcutCategory._id}
          className='mx-auto mb-16 mt-8 max-w-screen-content px-8'
        >
          <Shortcuts
            title={shortcutCategory.title}
            shortcuts={[...shortcutCategory.shortcuts]}
          />
        </section>
      ))}
    </main>
  )
}

export default Home
