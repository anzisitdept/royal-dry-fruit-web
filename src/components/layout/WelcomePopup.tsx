'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { X, Gift, Sparkles } from 'lucide-react'

const VISIT_KEY = 'rdf_has_visited'

export default function WelcomePopup() {
  const [show, setShow] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof window !== 'undefined' && !localStorage.getItem(VISIT_KEY)) {
        localStorage.setItem(VISIT_KEY, '1')
        setShow(true)
      }
    }, 1600)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setLeaving(true)
    setTimeout(() => setShow(false), 200)
  }

  if (!show) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-wine-deep/70 backdrop-blur-sm p-4 transition-opacity duration-200 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{ animation: leaving ? 'popOut 0.2s ease-in' : 'popIn 0.3s ease-out' }}
      >
        {/* Decorative top band */}
        <div className="bg-wine text-ivory px-6 pt-8 pb-24 text-center relative">
          <button
            onClick={close}
            aria-label="Close welcome popup"
            className="absolute right-4 top-4 text-ivory/70 hover:text-ivory transition"
          >
            <X className="w-5 h-5" />
          </button>

          <img src="/RDF-logo.png" alt="Royal Dry Fruits" className="h-14 mx-auto mb-4 object-contain" />
          <p className="text-sand text-[11px] font-bold uppercase tracking-[0.3em] mb-1.5">Welcome to</p>
          <h2 className="font-serif text-3xl font-bold">Royal Dry Fruits</h2>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-32">
            <div className="w-full h-full rounded-full bg-wine-deep/40 blur-xl" />
          </div>
        </div>

        {/* Body overlapping the band */}
        <div className="bg-ivory rounded-t-3xl -mt-12 relative px-6 pb-8 text-center">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
            <div className="w-12 h-12 mx-auto bg-sand rounded-full flex items-center justify-center mb-3">
              <Gift className="w-6 h-6 text-dryfruit" />
            </div>
            <p className="text-xs text-gray-500 mb-2 leading-relaxed">
              Enjoy <strong className="text-wine">5% OFF</strong> your first order with code
            </p>
            <div className="inline-block bg-wine text-ivory font-serif font-bold tracking-[0.2em] px-6 py-2 rounded-lg">
              WELCOME5
            </div>
            <p className="flex items-center justify-center gap-1 text-[11px] mt-3">
              <Sparkles className="w-3.5 h-3.5 text-wine" />
              <span className="text-gray-400">Handpicked premium nuts &amp; dried fruits, nationwide COD delivery.</span>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/collections/all-products"
              onClick={close}
              className="w-full bg-wine hover:bg-wine-deep text-white font-bold text-sm uppercase tracking-wide py-3.5 rounded-xl transition cursor-pointer"
            >
              Shop Now
            </Link>
            <button
              onClick={close}
              className="w-full border border-gray-300 bg-white text-charcoal hover:border-wine hover:text-wine font-semibold text-sm py-3 rounded-xl transition cursor-pointer"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: translateY(24px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes popOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(24px) scale(0.92); }
        }
      `}</style>
    </div>,
    document.body
  )
}