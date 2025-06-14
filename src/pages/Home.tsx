import { useQuery } from '@apollo/client'

import BigLogo from '../components/molecules/BigLogo'
import ErrorMessage from '../components/molecules/ErrorMessage'
import Spinner from '../components/molecules/Spinner'
import { SHORTCUT_CATEGORIES_AND_HEADERS } from '../feature/home/gql/homeQueries'
import Shortcuts from '../feature/home/Shortcuts'
import Header from '../layouts/header/Header'
import NavButtons from '../layouts/header/NavButtons'
import { iShortcutCategoriesAndHeaders, iShortcuts } from '../types/types'

const Home = () => {
  const { data, loading, error } = useQuery<iShortcutCategoriesAndHeaders>(
    SHORTCUT_CATEGORIES_AND_HEADERS
  )

  if (loading)
    return (
      <Spinner classes='my-7 flex w-full justify-center px-8' widthInRem={2} />
    )

  if (error)
    return (
      <ErrorMessage
        message={error.message}
        containerClasses='my-7 flex w-full justify-center px-8 text-warn'
      />
    )

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
