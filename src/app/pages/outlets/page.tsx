'use client'

import { useState } from 'react'
import Link from 'next/link'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { useLanguage } from '@/context/LanguageContext'
import {
  MapPin, Phone, Clock, ChevronDown, Navigation, MessageCircle, Store, Building2, ShoppingBag,
} from 'lucide-react'

interface Outlet {
  id: string
  city: string
  name: string
  type: 'Flagship Store' | 'Market Outlet' | 'Opening Soon'
  typeIcon: typeof Store
  address: string
  landmark: string
  phone: string
  hours: string
  services: string[]
  mapQuery: string
  status: 'open' | 'soon'
}

const OUTLETS: Outlet[] = [
  {
    id: 'sukkur-flagship',
    city: 'Sukkur',
    name: 'RDF Flagship Store — Sukkur',
    type: 'Flagship Store',
    typeIcon: Building2,
    address: 'Energy Square, Main Gari Khata Road, Sukkur, Sindh',
    landmark: 'Opposite Sukkur Chamber of Commerce',
    phone: '0347-3811510',
    hours: 'Mon – Sat: 10:00 AM – 10:00 PM · Sun: 12:00 PM – 9:00 PM',
    services: ['Premium dry fruits tasting counter', 'Gift hampers & custom baskets', 'Bulk / wholesale orders', 'Cash on Delivery pick-up point'],
    mapQuery: 'Energy Square Main Gari Khata Road Sukkur',
    status: 'open',
  },
  {
    id: 'sukkur-market',
    city: 'Sukkur',
    name: 'RDF Market Outlet — Sukkur',
    type: 'Market Outlet',
    typeIcon: Store,
    address: 'Shop #12, Fruit & Vegetable Market, Sukkur, Sindh',
    landmark: 'Near Al-Falah Plaza, 5 min from Railway Station',
    phone: '0347-3811510',
    hours: 'Mon – Sat: 9:00 AM – 9:00 PM · Sunday closed',
    services: ['Fresh daily stock', 'Retail & loose-packing options', 'Corporate & event orders', 'Nationwide courier dispatch'],
    mapQuery: 'Fruit Market Sukkur near Al Falah Plaza',
    status: 'open',
  },
  {
    id: 'karachi-coming',
    city: 'Karachi',
    name: 'RDF Karachi Boutique',
    type: 'Opening Soon',
    typeIcon: ShoppingBag,
    address: 'Clifton, Karachi, Sindh',
    landmark: 'Premier location — launching soon',
    phone: '0347-3811510',
    hours: 'Opening hours TBA on launch',
    services: ['Boutique gift experience', 'Premium hampers', 'Order ahead & delivery'],
    mapQuery: 'Clifton Karachi',
    status: 'soon',
  },
]

const CITIES = ['All', 'Sukkur', 'Karachi']

export default function OutletsPage() {
  const { t } = useLanguage()
  const [activeCity, setActiveCity] = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = OUTLETS.filter((o) => activeCity === 'All' || o.city === activeCity)

  return (
    <>
      <TopBar />
      <Header />

      <main className="bg-ivory">
        {/* Hero */}
        <section className="bg-wine-deep text-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
            <p className="text-sand text-xs font-bold uppercase tracking-[0.25em] mb-3">
              {t('pages.outlets.kicker')}
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
              {t('pages.outlets.title')}
            </h1>
            <p className="max-w-2xl mx-auto text-ivory/80 text-sm md:text-base">
              {t('outletsPage.heroSubtitle')}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          {/* City filters */}
          <div className="flex justify-center gap-2 mb-10">
            {CITIES.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide transition cursor-pointer ${
                  activeCity === city
                    ? 'bg-wine text-white shadow-md shadow-wine/20'
                    : 'bg-white text-charcoal/70 border border-gray-200 hover:border-wine/40 hover:text-wine'
                }`}
              >
                <MapPin className="inline w-3.5 h-3.5 mr-1" />
                {city === 'All' ? t('outletsPage.filterAll') : city}
              </button>
            ))}
          </div>

          {/* Outlet cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((outlet) => {
              const Icon = outlet.typeIcon
              const isOpen = expanded === outlet.id
              const soon = outlet.status === 'soon'
              const typeKey = outlet.id === 'sukkur-flagship' ? 'outletsPage.typeFlagship' : outlet.id === 'sukkur-market' ? 'outletsPage.typeMarket' : 'outletsPage.typeSoon'
              const localName = t(`outletsPage.${outlet.id}Name`)
              const localAddress = t(`outletsPage.${outlet.id}Address`)
              const localLandmark = t(`outletsPage.${outlet.id}Landmark`)
              const localHours = t(`outletsPage.${outlet.id}Hours`)
              const localServices = outlet.services.map((s, i) => t(`outletsPage.${outlet.id}Service${i}`))
              return (
                <div
                  key={outlet.id}
                  className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                    soon ? 'border-dashed border-wine/40 opacity-90' : 'border-gray-200 hover:shadow-xl hover:border-wine/30'
                  }`}
                >
                  {/* Card header */}
                  <div className={`px-5 py-5 ${soon ? 'bg-sand/40' : 'bg-wine'} text-ivory`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${soon ? 'bg-wine/10 text-wine' : 'bg-white/15'}`}>
                          <Icon className="w-5 h-5" />
                        </span>
                        <div>
                          <p className={`text-[10px] uppercase tracking-[0.2em] font-bold ${soon ? 'text-wine' : 'text-sand'}`}>
                            {t(typeKey)}
                          </p>
                          <h2 className="font-serif text-lg font-bold leading-tight mt-0.5">{localName}</h2>
                        </div>
                      </div>
                      {soon && (
                        <span className="bg-wine text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full whitespace-nowrap">
                          {t('outletsPage.comingSoon')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-3 text-sm">
                    <div className="flex gap-2.5 text-gray-600">
                      <MapPin className="w-4 h-4 text-wine flex-shrink-0 mt-0.5" />
                      <div>
                        <p>{localAddress}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{localLandmark}</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 text-gray-600 items-start">
                      <Phone className="w-4 h-4 text-wine flex-shrink-0 mt-0.5" />
                      <a href={`tel:${outlet.phone.replace(/-/g, '')}`} className="hover:text-wine transition font-medium">
                        {outlet.phone}
                      </a>
                    </div>

                    <div className="flex gap-2.5 text-gray-600 items-start">
                      <Clock className="w-4 h-4 text-wine flex-shrink-0 mt-0.5" />
                      <p className="text-xs leading-relaxed">{localHours}</p>
                    </div>

                    {/* Expandable services */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : outlet.id)}
                      className="w-full flex items-center justify-between bg-sand/50 hover:bg-sand rounded-xl px-4 py-2.5 text-xs font-bold text-dryfruit transition cursor-pointer"
                    >
                      <span>{isOpen ? t('outletsPage.hideServices') : t('outletsPage.whatWeOffer')}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <ul className="space-y-1.5 pl-1.5">
                        {localServices.map((s) => (
                          <li key={s} className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-wine flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(outlet.mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-wine hover:bg-wine-deep text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        {t('outletsPage.directions')}
                      </a>
                      <a
                        href={`https://wa.me/923473811510?text=${encodeURIComponent(`Hi Royal Dry Fruits! I'd like to know more about your outlet at ${outlet.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:border-wine hover:text-wine text-charcoal text-xs font-bold py-2.5 rounded-xl transition cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        {t('outletsPage.whatsapp')}
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Franchise / wholesale CTA */}
          <div className="mt-12 bg-wine text-ivory rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-wine-deep/50 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-sand/10 blur-2xl" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2 relative">
              {t('outletsPage.ctaTitle')}
            </h2>
            <p className="text-ivory/80 text-sm max-w-xl mx-auto mb-6 relative">
              {t('outletsPage.ctaBody')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative">
              <a
                href="https://wa.me/923473811510?text=Hi! I'm interested in becoming an RDF franchisee / distributor."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-wine font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-xl hover:bg-sand transition"
              >
                {t('outletsPage.ctaFranchise')}
              </a>
              <Link
                href="/pages/contact-us"
                className="inline-block border-2 border-white text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-xl hover:bg-wine-deep transition"
              >
                {t('outletsPage.ctaContact')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}