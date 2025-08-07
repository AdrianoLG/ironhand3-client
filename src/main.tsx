import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  makeVar
} from '@apollo/client'

import App from './App.tsx'

const uri = import.meta.env.VITE_GRAPHQL_URI as string
const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache()
})

export const mode = makeVar(sessionStorage.getItem('mode') || 'light')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
)
