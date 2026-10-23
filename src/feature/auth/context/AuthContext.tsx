import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useApolloClient, useMutation } from '@apollo/client';

import { LOGIN, LOGOUT, ME } from '../gql/authQueries';

export interface iAuthUser {
  _id: string
  name?: string
  email: string
}

interface iAuthContext {
  user: iAuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<iAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const apolloClient = useApolloClient()
  const [user, setUser] = useState<iAuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [loginMutation] = useMutation(LOGIN)
  const [logoutMutation] = useMutation(LOGOUT)

  // user y loading se actualizan juntos para que ProtectedRoute no redirija antes de tiempo
  useEffect(() => {
    let cancelled = false
    apolloClient
      .query({ query: ME, fetchPolicy: 'network-only' })
      .then(({ data }) => {
        if (!cancelled) setUser(data?.me ?? null)
      })
      .catch(() => {
        if (!cancelled) setUser(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [apolloClient])

  const login = async (email: string, password: string) => {
    const { data } = await loginMutation({
      variables: { loginInput: { email, password } }
    })
    await apolloClient.clearStore()
    setUser(data?.login ?? null)
  }

  const logout = async () => {
    await logoutMutation()
    await apolloClient.clearStore()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
