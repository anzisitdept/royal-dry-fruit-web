'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

interface AuthContextValue {
  user: User | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signInWithEmail = async (email: string, password: string) => {
    setError(null)
    try {
      if (!auth) throw new Error('Firebase auth is not configured')
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    }
  }

  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    setError(null)
    try {
      if (!auth) throw new Error('Firebase auth is not configured')
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(newUser, { displayName })
        setUser(newUser)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create account')
    }
  }

  const signInWithGoogle = async () => {
    setError(null)
    try {
      if (!auth) throw new Error('Firebase auth is not configured')
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google')
    }
  }

  const logout = async () => {
    setError(null)
    try {
      if (!auth) throw new Error('Firebase auth is not configured')
      await signOut(auth)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign out')
    }
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
