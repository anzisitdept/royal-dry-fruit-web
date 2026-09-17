import React from 'react';
import Link from 'next/link';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import {
  Award, Leaf, Truck, Gift, HeartHandshake, MapPin, Clock, Wallet, Sparkles,
} from 'lucide-react';

const STATS = [
  { value: '20+', label: 'Premium Products' },
  { value: '15+', label: 'Cities Served' },
  { value: '10k+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Average Rating' },
];

const JOURNEY = [
  {
    year: 'The Idea',
    title: 'A passion for quality nuts',
    text: 'Founded on a simple frustration — good dry fruits were hard to find at fair prices. We set out to change that.',
  },
  {
    year: 'First Outlet',
    title: 'Serving our community',
    text: 'We opened our first store in Sukkur with a tasting counter and honest, wholesale-sourced quality.',
  },
  {
    year: 'Going Online',
    title: 'Nationwide COD delivery',
    text: 'Launched a full online store with Cash on Delivery to every city in Pakistan — freshness at your doorstep.',
  },
  {
    year: 'Today',
    title: 'The Royal Dry Fruits standard',
    text: '20+ curated products, gift hampers, custom baskets, and thousands of happy customers across Pakistan.',
  },
];

const VALUES = [
  {
    icon: Award,
    title: 'Premium Quality',
    text: 'Handpicked, hand-sorted produce — no artificial colours, flavours, or preservatives. Ever.',
  },
  {
    icon: Leaf,
    title: 'Freshness Guaranteed',
    text: 'Vacuum-sealed, airtight moisture-proof packaging locks in harvest-fresh taste and crunch.',
  },
  {
    icon: Wallet,
    title: 'Honest Pricing',
    text: 'Fair prices sourced close to the orchard — transparent delivery, no hidden charges.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer First',
    text: 'Dedicated WhatsApp support, 7 days a week, plus a 7-day easy return promise.',
  },
];

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <Header />

      <main className="bg-ivory">
        {/* Hero */}
        <section className="bg-wine-deep text-ivory relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-wine/40 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-sand/10 blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center relative">
            <p className="text-sand text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Our Story · Our Journey · Our Promise
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-5 leading-tight">
              The Royal Standard in
              <span className="block text-sand">Every Handful</span>
            </h1>
            <p className="max-w-2xl mx-auto text-ivory/80 text-sm md:text-base leading-relaxed">
              Royal Dry Fruits (RDF) was born from one belief: everyone deserves access to the
              finest nuts and dried fruits — sourced from trusted orchards, packed with care, and
              delivered fresh. What began as a passion for healthy snacking has grown into a
              nationwide favourite.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                href="/collections/all-products"
                className="inline-block bg-sand text-dryfruit font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-white transition shadow-md"
              >
                Shop Premium Dry Fruits
              </Link>
              <Link
                href="/pages/outlets"
                className="inline-block border-2 border-ivory/60 text-ivory font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-wine-deep transition"
              >
                Visit Our Outlets
              </Link>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-y border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl md:text-4xl font-bold text-wine">{stat.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story two-column */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-sand rounded-3xl rotate-2" />
              <img
                src="https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?auto=format&fit=crop&w=1000&q=80"
                alt="Premium dry fruits selection"
                className="relative rounded-3xl w-full h-[360px] md:h-[440px] object-cover shadow-xl"
              />
              <div className="absolute -bottom-6 left-6 bg-wine text-ivory rounded-2xl px-5 py-4 shadow-lg">
                <p className="font-serif text-2xl font-bold">Est. Sukkur</p>
                <p className="text-[11px] text-sand uppercase tracking-wider">Proudly Pakistani</p>
              </div>
            </div>

            <div>
              <p className="text-wine text-xs font-bold uppercase tracking-[0.25em] mb-3">Who We Are</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-5 leading-tight">
                From Small Shop to a Member of Every Household
              </h2>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  We started in <strong className="text-charcoal">Sukkur, Sindh</strong>, with one ambition —
                  to make premium dry fruits honest, accessible, and genuinely fresh. Today we curate a
                  collection of handpicked <strong className="text-charcoal">California almonds</strong>,{' '}
                  <strong className="text-charcoal">Iranian pistachios</strong>,{' '}
                  <strong className="text-charcoal">Medjool dates</strong>, Hunza apricots, cashews, walnuts,
                  and beautifully crafted gift hampers.
                </p>
                <p>
                  We partner directly with trusted growers and exporters around the world. Every batch is
                  inspected, hygienically sorted, vacuum-sealed, and packed in airtight moisture-proof
                  packaging — so the freshness you taste is the freshness we packed.
                </p>
                <p>
                  Whether it&apos;s a daily snacking staple, an Eid gift, a corporate hamper, or a custom
                  basket built your way, we deliver with care to every city in Pakistan.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-7">
                <span className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-bold text-charcoal">
                  <Truck className="w-4 h-4 text-wine" /> Nationwide COD
                </span>
                <span className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-bold text-charcoal">
                  <Gift className="w-4 h-4 text-wine" /> Gift Hampers
                </span>
                <span className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-bold text-charcoal">
                  <Clock className="w-4 h-4 text-wine" /> 7-Day Returns
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Journey timeline */}
        <section className="bg-sand/50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
            <div className="text-center mb-12">
              <p className="text-wine text-xs font-bold uppercase tracking-[0.25em] mb-3">The Journey</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">How We Got Here</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {JOURNEY.map((step, i) => (
                <div key={step.title} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-wine text-white flex items-center justify-center font-serif font-bold text-sm">
                      {i + 1}
                    </span>
                    <span className="text-wine text-xs font-bold uppercase tracking-widest">{step.year}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-charcoal mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <div className="text-center mb-12">
            <p className="text-wine text-xs font-bold uppercase tracking-[0.25em] mb-3">What We Stand For</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="bg-white rounded-2xl border border-gray-200 p-7 text-center hover:border-wine/30 hover:shadow-xl transition-all duration-300">
                  <span className="w-14 h-14 mx-auto bg-sand rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-dryfruit" />
                  </span>
                  <h3 className="font-serif text-lg font-bold text-charcoal mb-2">{value.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{value.text}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Quality sourcing band */}
        <section className="bg-wine-deep text-ivory py-14 md:py-20 relative overflow-hidden">
          <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-wine/40 blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative">
            <div>
              <p className="text-sand text-xs font-bold uppercase tracking-[0.25em] mb-3">Quality Sourcing</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5 leading-tight">
                Sourced From The World&apos;s Best Orchards
              </h2>
              <p className="text-ivory/80 text-sm leading-relaxed mb-6">
                Great dry fruits begin at the source. We travel to the growers, taste the harvest, and
                only ever stock what passes our own bar for size, flavour, and freshness.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-bold text-sand mb-1">California Almonds</p>
                  <p className="text-xs text-ivory/70">Plump, crunchy, hand-sorted for size and sweetness.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-bold text-sand mb-1">Medjool Dates</p>
                  <p className="text-xs text-ivory/70">Naturally soft and juicy from sun-drenched groves.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-bold text-sand mb-1">Iranian Pistachios</p>
                  <p className="text-xs text-ivory/70">Rich, buttery, renowned as the world&apos;s finest.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-bold text-sand mb-1">Hunza Apricots</p>
                  <p className="text-xs text-ivory/70">Locally sourced gems packed with natural sweetness.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 bg-sand/20 rounded-3xl -rotate-2" />
              <img
                src="https://images.unsplash.com/photo-1608050804532-e7f4f5d25d01?auto=format&fit=crop&w=1000&q=80"
                alt="Assorted premium dry fruits"
                className="relative rounded-3xl w-full h-[360px] md:h-[420px] object-cover shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20 text-center">
          <div className="bg-wine text-ivory rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-wine-deep/50 blur-2xl" />
            <Sparkles className="w-8 h-8 mx-auto text-sand mb-4 relative" />
            <h2 className="font-serif text-2xl md:text-4xl font-bold mb-3 relative">
              Experience Royal Quality Today
            </h2>
            <p className="text-ivory/80 text-sm max-w-xl mx-auto mb-7 relative">
              Discover our full range of premium nuts, dried fruits, and gift hampers — delivered fresh
              to your doorstep anywhere in Pakistan with Cash on Delivery.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              <Link
                href="/collections/all-products"
                className="inline-block bg-white text-wine font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-sand transition shadow-md"
              >
                Shop All Products
              </Link>
              <Link
                href="/pages/outlets"
                className="inline-block border-2 border-white text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-wine-deep transition"
              >
                <MapPin className="inline w-3.5 h-3.5 mr-1" />
                Find Our Outlets
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}