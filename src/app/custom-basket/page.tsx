'use client'

import { useMemo, useState } from 'react'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { useStoreData } from '@/context/StoreDataContext'
import { useCart } from '@/context/CartContext'
import { getProductEffectivePrice } from '@/lib/productPrice'
import { Plus, Minus, Trash2, ShoppingBag, MessageCircle, Scale, CheckCircle2 } from 'lucide-react'

interface BasketEntry {
  productId: string
  weight: string
  quantity: number
}

const BASKET_SIZES = [
  { id: 'small', label: 'Small', weight: 500, desc: 'Perfect trial pack' },
  { id: 'medium', label: 'Medium', weight: 1000, desc: 'Best for family' },
  { id: 'large', label: 'Large', weight: 2000, desc: 'Great for gifting' },
]

const parseGrams = (w: string) => {
  const m = w.match(/([\d.]+)\s*(g|kg)/i)
  if (!m) return 0
  return parseFloat(m[1]) * (m[2].toLowerCase() === 'kg' ? 1000 : 1)
}

const formatNumber = (n: number) => n.toLocaleString()

export default function CustomBasketPage() {
  const { products } = useStoreData()
  const { addToCart, setIsCartOpen } = useCart()

  const [activeCategory, setActiveCategory] = useState('')
  const [entries, setEntries] = useState<BasketEntry[]>([])
  const [targetSize, setTargetSize] = useState(BASKET_SIZES[1])

  const categories = useMemo(() => {
    const map = new Map<string, string>()
    products.forEach((p) => {
      if (p.category === 'combos' || p.category === 'gift-boxes') return
      if (!map.has(p.category)) map.set(p.category, p.categoryName || p.category)
    })
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }))
  }, [products])

  const currentCat = activeCategory || categories[0]?.id || ''
  const categoryProducts = products.filter(
    (p) => p.category === currentCat && p.inStock !== false
  )

  const selectedItems = entries
    .map((e) => {
      const product = products.find((p) => p.id === e.productId)
      if (!product) return null
      const unitPrice = getProductEffectivePrice(product, e.weight)
      return { product, ...e, unitPrice, lineTotal: unitPrice * e.quantity }
    })
    .filter((x) => x !== null)

  const totalPrice = selectedItems.reduce((sum, x) => sum + x.lineTotal, 0)
  const totalGrams = selectedItems.reduce((sum, x) => {
    const g = parseGrams(x.weight)
    return sum + (g > 0 ? g * x.quantity : 0)
  }, 0)
  const fillPercent = Math.min(100, Math.round((totalGrams / targetSize.weight) * 100))
  const targetReached = totalGrams >= targetSize.weight

  const addToBasket = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return
    const weight = product.weights?.[0] || '1kg'
    setEntries((prev) => {
      const existing = prev.find((e) => e.productId === productId && e.weight === weight)
      if (existing) {
        return prev.map((e) =>
          e.productId === productId && e.weight === weight ? { ...e, quantity: e.quantity + 1 } : e
        )
      }
      return [...prev, { productId, weight, quantity: 1 }]
    })
  }

  const updateWeight = (productId: string, weight: string) => {
    setEntries((prev) => prev.map((e) => (e.productId === productId ? { ...e, weight } : e)))
  }

  const changeQty = (productId: string, delta: number) => {
    setEntries((prev) =>
      prev
        .map((e) => (e.productId === productId ? { ...e, quantity: Math.max(1, e.quantity + delta) } : e))
        .filter((e) => e.quantity > 0)
    )
  }

  const removeEntry = (productId: string) => {
    setEntries((prev) => prev.filter((e) => e.productId !== productId))
  }

  const handleAddAllToCart = () => {
    selectedItems.forEach((x) => addToCart(x.product, x.weight, x.quantity))
    setIsCartOpen(true)
  }

  const handleWhatsAppOrder = () => {
    const lines = selectedItems.map(
      (x) => `• ${x.product.name} (${x.weight}) x${x.quantity} = Rs.${formatNumber(x.lineTotal)}`
    )
    const message = encodeURIComponent(
      `Hello Royal Dry Fruits! I'd like to order a custom basket (${targetSize.label}/${targetSize.weight}g):\n\n${lines.join('\n')}\n\nTotal: Rs.${formatNumber(totalPrice)}`
    )
    window.open(`https://wa.me/923473811510?text=${message}`, '_blank')
  }

  return (
    <>
      <TopBar />
      <Header />

      <main className="bg-ivory">
        {/* Hero */}
        <section className="bg-wine-deep text-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
            <p className="text-sand text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Build Your Own
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
              Custom Gift Basket
            </h1>
            <p className="max-w-2xl mx-auto text-ivory/80 text-sm md:text-base">
              Pick your favourite dry fruits and nuts, choose how much you want, and we&apos;ll pack
              it into a beautifully curated basket for you, your family, or as a gift.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
            {/* Left: Picker */}
            <div>
              {/* Basket size step */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Scale className="w-5 h-5 text-wine" />
                  <h2 className="font-serif text-lg font-bold text-charcoal">1. Choose Your Basket Size</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {BASKET_SIZES.map((size) => {
                    const active = targetSize.id === size.id
                    return (
                      <button
                        key={size.id}
                        onClick={() => setTargetSize(size)}
                        className={`rounded-xl border-2 px-4 py-3 text-left transition cursor-pointer ${
                          active
                            ? 'border-wine bg-wine/5 shadow-sm'
                            : 'border-gray-200 bg-white hover:border-wine/40'
                        }`}
                      >
                        <p className={`font-bold text-sm ${active ? 'text-wine' : 'text-charcoal'}`}>
                          {size.label} <span className="font-normal text-gray-500">({size.weight / 1000}kg)</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{size.desc}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Category tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition cursor-pointer ${
                      currentCat === cat.id
                        ? 'bg-wine text-white'
                        : 'bg-white text-charcoal/70 border border-gray-200 hover:border-wine/40 hover:text-wine'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categoryProducts.map((product) => {
                  const weight = product.weights?.[0] || '1kg'
                  const price = getProductEffectivePrice(product, weight)
                  const inBasket = entries.find((e) => e.productId === product.id)
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border overflow-hidden transition hover:shadow-lg hover:border-wine/30 flex flex-col"
                    >
                      <div className="aspect-square overflow-hidden bg-ivory relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {inBasket && (
                          <span className="absolute top-2 right-2 bg-wine text-white text-[10px] font-bold px-2 py-1 rounded-full">
                            +{inBasket.quantity}
                          </span>
                        )}
                      </div>
                      <div className="p-3 flex flex-col flex-1">
                        <p className="text-xs font-bold text-charcoal line-clamp-2 mb-1">{product.name}</p>
                        <p className="text-[11px] text-gray-400 mb-2">{product.urduName}</p>
                        <div className="flex items-center gap-1 text-xs mb-3">
                          <span className="text-gray-500">{weight}:</span>
                          <span className="text-wine font-extrabold">Rs.{formatNumber(price)}</span>
                        </div>
                        <button
                          onClick={() => addToBasket(product.id)}
                          className="mt-auto w-full bg-sand hover:bg-wine hover:text-white text-dryfruit font-bold text-[11px] uppercase tracking-wider py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          {inBasket ? 'Add More' : 'Add to Basket'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right: Sticky Basket Summary */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-wine text-white px-5 py-4 flex items-center justify-between">
                  <h2 className="font-serif text-lg font-bold">Your Basket</h2>
                  <ShoppingBag className="w-5 h-5" />
                </div>

                {/* Progress */}
                <div className="px-5 pt-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-600 font-semibold">Weight progress</span>
                    <span className="text-wine font-bold">
                      {totalGrams}g / {targetSize.weight}g
                    </span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${targetReached ? 'bg-wine' : 'bg-dryfruit'}`}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                  {targetReached ? (
                    <p className="flex items-center gap-1 text-xs text-wine font-semibold mt-2">
                      <CheckCircle2 className="w-4 h-4" /> Target reached — your basket is ready!
                    </p>
                  ) : (
                    <p className="text-[11px] text-gray-400 mt-2">
                      Add {Math.max(0, targetSize.weight - totalGrams)}g more to reach your {targetSize.label} basket.
                    </p>
                  )}
                </div>

                {/* Items */}
                <div className="px-5 py-4 space-y-4 max-h-[360px] overflow-y-auto">
                  {selectedItems.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-6">
                      Your basket is empty. Pick some dry fruits to get started!
                    </p>
                  )}
                  {selectedItems.map((item) => (
                    <div key={item.productId} className="flex gap-3 border-b border-gray-100 pb-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-charcoal truncate mb-1">{item.product.name}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <select
                            value={item.weight}
                            onChange={(e) => updateWeight(item.productId, e.target.value)}
                            className="text-[11px] border border-gray-200 rounded-md px-1.5 py-1 bg-white text-gray-700"
                          >
                            {(item.product.weights || ['1kg']).map((w) => (
                              <option key={w} value={w}>{w}</option>
                            ))}
                          </select>
                          <span className="text-[11px] text-gray-500 font-semibold">
                            Rs.{formatNumber(item.unitPrice)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-200 rounded-md">
                            <button
                              onClick={() => changeQty(item.productId, -1)}
                              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-50 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-charcoal">{item.quantity}</span>
                            <button
                              onClick={() => changeQty(item.productId, 1)}
                              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-50 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeEntry(item.productId)}
                            className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total + CTAs */}
                <div className="px-5 pb-5 pt-1">
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 mb-4">
                    <span className="text-sm font-semibold text-gray-600">Estimated Total</span>
                    <span className="font-serif text-xl font-bold text-wine">
                      Rs.{formatNumber(totalPrice)}
                    </span>
                  </div>

                  <button
                    onClick={handleAddAllToCart}
                    disabled={selectedItems.length === 0}
                    className="w-full bg-wine hover:bg-wine-deep text-white font-bold text-sm uppercase tracking-wide py-3.5 rounded-xl transition flex items-center justify-center gap-2 mb-3 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add All to Cart
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    disabled={selectedItems.length === 0}
                    className="w-full bg-[#25d366] hover:bg-[#1fb758] text-white font-bold text-sm uppercase tracking-wide py-3.5 rounded-xl transition flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}