import { useEffect, useState } from 'react'

import { gql, useQuery } from '@apollo/client'

import Header from '../components/header/Header'

const Exercise = () => {
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
      headers {
        title
        url
      }
    }
  `

  const { data, loading, error } = useQuery(QUERY)
  const [headers, setHeaders] = useState([])

  useEffect(() => {
    if (data) {
      setHeaders(data?.headers)
    }
  }, [data])

  if (loading) return 'Loading...'
  if (error) return <pre>{error.message}</pre>
  return (
    <>
      <Header isMain={false} headers={headers} />
      <section className='my-16 bg-bg-pattern bg-100 bg-repeat py-4'>
        <h1 className='mx-auto max-w-screen-content text-3xl text-text'>
          Ejercicio
        </h1>
      </section>
    </>
  )
}

export default Exercise
