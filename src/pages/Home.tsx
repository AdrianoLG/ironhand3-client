import { useQuery } from '@apollo/client'

import BigLogo from '../components/molecules/BigLogo'
import NavButtons from '../components/molecules/NavButtons'
import Header from '../components/organisms/header/Header'
import Shortcuts from '../feature/home/Shortcuts'
import { SHORTCUT_CATEGORIES_AND_HEADERS } from '../gql/homeQueries'
import { iShortcutCategoriesAndHeaders, iShortcuts } from '../utils/types'

const Home = () => {
  const { data, loading, error } = useQuery<iShortcutCategoriesAndHeaders>(
    SHORTCUT_CATEGORIES_AND_HEADERS
  )

  if (loading) return 'Cargando...'
  if (error) return <pre>{error.message}</pre>

  return (
    <>
      <Header isMain={true} />
      <main>
        <section className='flex justify-center bg-bg-pattern bg-100 bg-repeat py-8'>
          <div className='relative mx-8 w-full max-w-secondaryHeader'>
            <div className='mb-8 flex flex-col items-center gap-2'>
              <BigLogo />
            </div>
            <NavButtons headers={data?.headers ?? []} />
          </div>
        </section>
        {data &&
          data.shortcutCategories.map((shortcutCategory: iShortcuts) => (
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
    </>
  )
}

export default Home
