import { useQuery } from '@apollo/client';

import BigLogo from '../components/molecules/BigLogo';
import ErrorMessage from '../components/molecules/ErrorMessage';
import { SHORTCUT_CATEGORIES_AND_HEADERS } from '../feature/home/gql/homeQueries';
import Shortcuts from '../feature/home/Shortcuts';
import Header from '../layouts/header/Header';
import NavButtons from '../layouts/header/NavButtons';
import { iShortcutCategoriesAndHeaders, iShortcuts } from '../types/types';

const Home = () => {
  const { data, loading, error } = useQuery<iShortcutCategoriesAndHeaders>(
    SHORTCUT_CATEGORIES_AND_HEADERS
  )

  if (loading)
    return (
      <>
        <Header isMain={true} />
      </>
    )

  if (error)
    return (
      <>
        <ErrorMessage
          message={'No conectado a la base de datos'}
          errorMessage={error.message}
          containerClasses='my-7 flex w-full justify-center px-8 text-secondary'
        />
      </>
    )

  return (
    <>
      <Header isMain={true} />
      <main>
        <section className='bg-pattern flex justify-center bg-size-[100px] bg-repeat py-8'>
          <div className='max-w-secondaryHeader relative mx-8 w-full'>
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
              className='max-w-screen-content mx-auto mt-8 mb-16 px-8'
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
