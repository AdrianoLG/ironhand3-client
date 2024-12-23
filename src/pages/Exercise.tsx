import { useEffect, useState } from 'react'

import { gql, useQuery } from '@apollo/client'

import Header from '../components/header/Header'
import Heading from '../components/header/Heading'

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
      <Heading title='Ejercicio' />
    </>
  )
}

export default Exercise
