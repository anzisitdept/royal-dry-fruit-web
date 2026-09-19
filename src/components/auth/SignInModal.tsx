'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'signin' | 'signup'
}

export function SignInModal({ isOpen, onClose, initialMode = 'signin' }: SignInModalProps) {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { user, signInWithEmail, signUpWithEmail, signInWithGoogle, error, clearError } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
      setEmail('')
      setPassword('')
      setName('')
      clearError()
    }
  }, [isOpen, initialMode, clearError])

  useEffect(() => {
    if (user && isOpen) {
      onClose()
    }
  }, [user, isOpen, onClose])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await signInWithEmail(email, password)
    setSubmitting(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await signUpWithEmail(email, password, name || undefined)
    setSubmitting(false)
  }

  const handleGoogle = async () => {
    setSubmitting(true)
    await signInWithGoogle()
    setSubmitting(false)
  }

  const handleModeSwitch = (newMode: 'signin' | 'signup') => {
    setMode(newMode)
    clearError()
    setEmail('')
    setPassword('')
    setName('')
  }

  if (!isOpen || !mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-xl my-8"
        style={{
          animation: isOpen ? 'scaleIn 0.2s ease-out' : 'scaleOut 0.2s ease-in',
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
          aria-label={t('auth.closeLabel')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="mb-6 flex justify-center">
          <img src="/RDF-logo.png" alt="Royal Dry Fruits" className="h-12" />
        </div>

        <div className="mb-6 flex border-b border-gray-200">
          <button
            onClick={() => handleModeSwitch('signin')}
            className={`flex-1 pb-3 text-sm font-semibold transition ${
              mode === 'signin'
                ? 'border-b-2 border-wine text-wine'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('auth.signIn')}
          </button>
          <button
            onClick={() => handleModeSwitch('signup')}
            className={`flex-1 pb-3 text-sm font-semibold transition ${
              mode === 'signup'
                ? 'border-b-2 border-wine text-wine'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('auth.signUp')}
          </button>
        </div>

        {mode === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="signin-email" className="mb-1 block text-sm font-medium text-gray-700">
                {t('auth.email')}
              </label>
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-wine outline-none"
                placeholder={t('auth.emailPlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="signin-password" className="mb-1 block text-sm font-medium text-gray-700">
                {t('auth.password')}
              </label>
              <input
                id="signin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-wine outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-wine hover:bg-wine-deep text-white font-bold text-sm py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : null}
              {t('auth.signIn')}
            </button>

            <button
              type="button"
              onClick={clearError}
              className="w-full text-center text-xs text-gray-500 hover:text-wine transition"
            >
              {t('auth.forgotPassword')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="signup-name" className="mb-1 block text-sm font-medium text-gray-700">
                {t('auth.name')}
              </label>
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-wine outline-none"
                placeholder={t('auth.namePlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="mb-1 block text-sm font-medium text-gray-700">
                {t('auth.email')}
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-wine outline-none"
                placeholder={t('auth.emailPlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="mb-1 block text-sm font-medium text-gray-700">
                {t('auth.password')}
              </label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-wine outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-wine hover:bg-wine-deep text-white font-bold text-sm py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : null}
              {t('auth.createAccount')}
            </button>
          </form>
        )}

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">{t('auth.or')}</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          onClick={handleGoogle}
          disabled={submitting}
          className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm py-3 rounded-xl transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {t('auth.continueWithGoogle')}
        </button>

        <p className="mt-6 text-center text-xs text-gray-400">
          {t('auth.termsNote', { link: '' })}
          <a href="/pages/terms-conditions" className="text-wine hover:underline">
            {t('auth.termsLink')}
          </a>
        </p>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>,
    document.body
  )
}
