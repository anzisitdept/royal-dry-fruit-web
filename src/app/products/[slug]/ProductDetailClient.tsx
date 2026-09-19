'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

import { getProductEffectivePrice } from '@/lib/productPrice';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist, setIsCheckoutOpen } = useCart();
  const { t, isUr } = useLanguage();

  // Dynamic weights from Firestore
  const availableWeights = (product.weights && Array.isArray(product.weights) && product.weights.length > 0)
    ? product.weights
    : ['1kg'];

  // Prioritize 1kg as the default selected weight if available
  const defaultWeight = availableWeights.find(w => w.toLowerCase().replace(/\s+/g, '') === '1kg') || availableWeights[0] || '1kg';
  const [selectedWeight, setSelectedWeight] = useState<string>(defaultWeight);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'benefits'>('description');

  // Dynamic price calculation based on selected weight
  const currentPrice = getProductEffectivePrice(product, selectedWeight);

  const originalPrice = (typeof product.originalPrice === 'number' && product.originalPrice > currentPrice)
    ? product.originalPrice
    : 0;

  const subtotal = currentPrice * quantity;

  const initialImg = (product.image && product.image.trim() !== '')
    ? product.image
    : (product.images && product.images[0] && product.images[0].trim() !== '' ? product.images[0] : '');
  const [selectedImage, setSelectedImage] = useState(initialImg);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Sync state when product changes
  useEffect(() => {
    const weights = (product.weights && Array.isArray(product.weights) && product.weights.length > 0)
      ? product.weights
      : ['1kg'];
    const defaultW = weights.find(w => w.toLowerCase().replace(/\s+/g, '') === '1kg') || weights[0] || '1kg';
    setSelectedWeight(defaultW);
    const img = (product.image && product.image.trim() !== '')
      ? product.image
      : (product.images && product.images[0] && product.images[0].trim() !== '' ? product.images[0] : '');
    setSelectedImage(img);
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (product.inStock === false) {
      alert(t('productDetail.outOfStockAlert'));
      return;
    }
    addToCart(product, selectedWeight, quantity);
  };

  const handleBuyNow = () => {
    if (product.inStock === false) {
      alert(t('productDetail.outOfStockAlert'));
      return;
    }
    addToCart(product, selectedWeight, quantity);
    setIsCheckoutOpen(true);
  };

  const shareLink = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch {
        // User cancelled the native share sheet — do nothing
      }
      return;
    }

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for insecure contexts / older browsers
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      alert(t('productDetail.linkCopied'));
    } catch {
      alert(t('productDetail.copyFailed'));
    }
  };

  const headingAlign: React.CSSProperties = { textAlign: isUr ? 'right' : 'left' };

  return (
    <div style={{ color: '#222' }}>
      
      {/* Main Grid: Left Gallery | Right Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start px-4 md:px-0">
        
        {/* Left Column: Gallery */}
        <div>
          <div style={{ position: 'relative', width: '100%', minHeight: '300px', borderRadius: '4px', overflow: 'hidden', background: '#f9f9f9', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {selectedImage && selectedImage.trim() !== '' ? (
              <img
                src={selectedImage}
                alt={product.name || t('product.productAlt')}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ color: '#aaa', fontSize: '14px', fontWeight: 500, padding: '40px' }}>
                {t('productDetail.noImage')}
              </div>
            )}
            {/* Badges */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 2 }}>
              {product.inStock === false && (
                <span style={{ background: '#7F011F', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '2px' }}>
                  {t('product.outOfStock')}
                </span>
              )}
              {product.discountBadge && (
                <span style={{ background: '#7F011F', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '2px' }}>
                  {product.discountBadge}
                </span>
              )}
              {product.isBestSeller && (
                <span style={{ background: '#6B4B2E', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '2px' }}>
                  {t('product.bestSeller')}
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {(() => {
            const validImages = (product.images || []).filter(img => typeof img === 'string' && img.trim() !== '');
            if (validImages.length <= 1) return null;

            return (
              <div className="flex items-center gap-2.5 mt-4 overflow-x-auto pb-1">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 active:scale-95 transition flex-shrink-0 cursor-pointer shadow-2xs"
                  onClick={() => {
                    const idx = validImages.indexOf(selectedImage);
                    if (idx > 0) setSelectedImage(validImages[idx - 1]);
                  }}
                  aria-label={t('productDetail.previousImage')}
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex gap-2.5 overflow-x-auto">
                  {validImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden p-0 cursor-pointer bg-white transition-all duration-200 flex-shrink-0 ${
                        selectedImage === img ? 'ring-2 ring-wine shadow-xs' : 'border border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${t('product.productAlt')} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 active:scale-95 transition flex-shrink-0 cursor-pointer shadow-2xs"
                  onClick={() => {
                    const idx = validImages.indexOf(selectedImage);
                    if (idx < validImages.length - 1) setSelectedImage(validImages[idx + 1]);
                  }}
                  aria-label={t('productDetail.nextImage')}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            );
          })()}
        </div>

        {/* Right Column: Information & Controls */}
        <div className="w-full md:pl-4 lg:pl-6">
          
          {/* Title */}
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: '8px' }}>
            {product.name}
          </h1>

          {/* Rating & Urgency */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#555', marginBottom: '6px' }}>
            <span style={{ color: '#7F011F', fontSize: '15px' }}>★★★★★</span>
            <span style={{ fontWeight: 600, color: '#333' }}>{t('productDetail.reviewCount', { count: product.reviewsCount || 94 })}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#7F011F', fontWeight: 600, marginBottom: '14px' }}>
            <span>🔥</span> {t('productDetail.inHighDemand')}
          </div>

          <p style={{ fontSize: '12px', color: '#666', marginBottom: '14px', ...headingAlign }}>
            {t('productDetail.productType')} <span style={{ color: '#333', fontWeight: 500 }}>{product.categoryName || t('productDetail.dryFruitsFallback')}</span>
          </p>

          {/* Price Line */}
          <div className="flex items-center gap-3 mb-5">
            {originalPrice > currentPrice && (
              <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '16px' }}>
                Rs.{originalPrice.toLocaleString()}.00
              </span>
            )}
            <span style={{ color: '#7F011F', fontSize: '20px', fontWeight: 700 }}>
              Rs.{currentPrice.toLocaleString()}.00
            </span>
            {originalPrice > currentPrice && (
              <span className="bg-wine text-white text-xs font-extrabold px-2.5 py-1 rounded-full">
                {t('productDetail.off', { percent: Math.round(((originalPrice - currentPrice) / originalPrice) * 100) })}
              </span>
            )}
          </div>

          {/* Dynamic Weight Selection Grid */}
          <div className="mb-5">
            <p className="text-xs text-gray-600 mb-2">
              {t('productDetail.grossWeight')} <strong className="text-gray-900 font-bold">{selectedWeight}</strong>
            </p>
            <div className={`grid gap-2.5 ${availableWeights.length === 1 ? 'grid-cols-1 max-w-[200px]' : availableWeights.length === 2 ? 'grid-cols-2' : availableWeights.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'}`}>
              {availableWeights.map(w => {
                const active = selectedWeight === w;
                const weightPrice = getProductEffectivePrice(product, w);

                return (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`min-h-[46px] rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-0.5 px-3 py-2 active:scale-[0.98] cursor-pointer ${
                      active
                        ? 'bg-red-50/70 border-2 border-wine text-wine shadow-xs font-bold'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{w}</span>
                      {active && <span className="font-bold text-xs">✓</span>}
                    </div>
                    {weightPrice > 0 && (
                      <span className={`text-[10px] ${active ? 'text-wine' : 'text-gray-500'}`}>
                        Rs. {weightPrice.toLocaleString()}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtotal */}
          <p style={{ fontSize: '13px', color: '#333', marginBottom: '14px' }}>
            {t('productDetail.subtotal')} <strong>Rs.{subtotal.toLocaleString()}.00</strong>
          </p>

          {/* Action Controls: Quantity, Add to Cart, Wishlist, Share */}
          <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 items-stretch md:items-center mb-3">
            
            {/* Top controls on mobile (Quantity + Mobile Auxiliary buttons) / Left on desktop */}
            <div className="flex items-center justify-between md:justify-start gap-2.5">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-gray-300 rounded-lg bg-white h-[46px] md:h-[48px] px-1 shadow-2xs">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-full flex items-center justify-center text-base text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded transition font-bold cursor-pointer"
                  aria-label={t('productDetail.decreaseQuantity')}
                >
                  -
                </button>
                <span className="w-9 text-center text-sm font-bold text-gray-900 select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-full flex items-center justify-center text-base text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded transition font-bold cursor-pointer"
                  aria-label={t('productDetail.increaseQuantity')}
                >
                  +
                </button>
              </div>

              {/* Mobile-only Wishlist and Share buttons */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-[46px] h-[46px] rounded-lg border flex items-center justify-center transition active:scale-95 shadow-2xs cursor-pointer ${
                    isInWishlist(product.id)
                      ? 'border-red-300 bg-red-50 text-wine'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                  aria-label={t('productDetail.saveToWishlist')}
                  title={t('productDetail.saveToWishlist')}
                >
                  <Heart size={18} fill={isInWishlist(product.id) ? '#7F011F' : 'none'} color={isInWishlist(product.id) ? '#7F011F' : 'currentColor'} />
                </button>

                <button
                  onClick={shareLink}
                  className="w-[46px] h-[46px] rounded-lg border border-gray-300 bg-white text-gray-600 hover:border-gray-400 flex items-center justify-center transition active:scale-95 shadow-2xs cursor-pointer"
                  aria-label={t('productDetail.shareProduct')}
                  title={t('productDetail.shareProduct')}
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Add to Cart Main CTA Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.inStock === false}
              className={`w-full md:flex-1 h-[48px] px-4 rounded-lg font-bold text-xs md:text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition duration-200 shadow-sm active:scale-[0.99] cursor-pointer ${
                product.inStock === false
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-wine hover:bg-wine-deep text-white shadow-wine/20'
              }`}
            >
              {product.inStock === false ? (
                <span>{t('product.outOfStock')}</span>
              ) : (
                <>
                  <span>{t('product.addToCart')}</span>
                  <span className="font-normal text-[11px] opacity-90 tracking-normal">{t('productDetail.orderNowHint')}</span>
                </>
              )}
            </button>

            {/* Desktop/Tablet Wishlist and Share icons */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-[48px] h-[48px] rounded-lg border flex items-center justify-center transition active:scale-95 shadow-2xs cursor-pointer ${
                  isInWishlist(product.id)
                    ? 'border-red-300 bg-red-50 text-wine'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                }`}
                aria-label={t('productDetail.saveToWishlist')}
                title={t('productDetail.saveToWishlist')}
              >
                <Heart size={18} fill={isInWishlist(product.id) ? '#7F011F' : 'none'} color={isInWishlist(product.id) ? '#7F011F' : 'currentColor'} />
              </button>

              <button
                onClick={shareLink}
                className="w-[48px] h-[48px] rounded-lg border border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center transition active:scale-95 shadow-2xs cursor-pointer"
                aria-label={t('productDetail.shareProduct')}
                title={t('productDetail.shareProduct')}
              >
                <Share2 size={18} />
              </button>
            </div>

          </div>

          {/* Buy It Now Button */}
          <button
            onClick={handleBuyNow}
            disabled={product.inStock === false}
            className={`w-full min-h-[48px] sm:min-h-[50px] px-5 py-3.5 rounded-lg font-bold text-xs sm:text-sm tracking-wider uppercase transition duration-200 shadow-sm active:scale-[0.99] mb-6 flex items-center justify-center gap-2 cursor-pointer ${
              product.inStock === false
                ? 'bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-sand text-wine border-2 border-wine'
            }`}
          >
            <span>{product.inStock === false ? t('product.outOfStock') : t('productDetail.buyNow')}</span>
            {product.inStock !== false && <span className="font-normal text-[11px] sm:text-xs opacity-90 tracking-normal">{t('productDetail.buyNowHint')}</span>}
          </button>


        </div>
      </div>

      {/* RICH DESCRIPTION CONTENT SECTION BELOW PRODUCT DETAILS */}
      <div className="mt-10 md:mt-16 border-t border-gray-200 pt-8 md:pt-10 overflow-x-hidden">
        
        {/* Description Tabs Header */}
        <div className="flex justify-start gap-2 md:gap-4 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 px-3 md:px-4 font-serif text-base md:text-lg font-bold border-b-2 transition ${
              activeTab === 'description' ? 'border-wine text-wine' : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            {t('productDetail.description')}
          </button>
          {product.ingredients && (
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-3 px-3 md:px-4 font-serif text-base md:text-lg font-bold border-b-2 transition ${
                activeTab === 'ingredients' ? 'border-wine text-wine' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {t('productDetail.ingredients')}
            </button>
          )}
          {product.benefits && (
            <button
              onClick={() => setActiveTab('benefits')}
              className={`pb-3 px-3 md:px-4 font-serif text-base md:text-lg font-bold border-b-2 transition ${
                activeTab === 'benefits' ? 'border-wine text-wine' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {t('productDetail.benefits')}
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div style={{ maxWidth: '850px', fontSize: '14px', color: '#333', lineHeight: 1.7 }}>

          <p style={{ textAlign: isUr ? 'right' : 'left', fontWeight: 700, fontSize: '13px', background: '#fafafa', padding: '12px', borderRadius: '4px', border: '1px solid #eee', marginBottom: '28px' }}>
            {t('productDetail.note', { name: product.name, weights: availableWeights.join(', ') })}
          </p>

          {activeTab === 'description' && (
            <div style={headingAlign}>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111', marginBottom: '14px', lineHeight: 1.5 }}>
                {t('productDetail.buyOnlineTitle', { name: product.name })}
                {product.urduName ? ` – ${product.urduName}` : ''}
              </h3>
              <p style={{ color: '#555', marginBottom: '20px' }}>
                {product.description || t('productDetail.defaultDescription', { name: product.name })}
              </p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div style={headingAlign}>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>
                {t('productDetail.pureIngredients')}
              </h4>
              <p style={{ color: '#555', marginBottom: '20px' }}>
                {product.ingredients}
              </p>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div style={headingAlign}>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>
                {t('productDetail.keyBenefits')}
              </h4>
              <p style={{ color: '#555', marginBottom: '20px' }}>
                {product.benefits}
              </p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#22c55e', fontSize: '16px' }}>☑</span>
              <span><strong>{t('productDetail.checkHandpicked')}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#22c55e', fontSize: '16px' }}>☑</span>
              <span><strong>{t('productDetail.checkNatural')}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#22c55e', fontSize: '16px' }}>☑</span>
              <span><strong>{t('productDetail.checkEveryday')}</strong></span>
            </div>
          </div>

        </div>

      </div>

      {/* Sticky Purchase Bar at Bottom (Desktop & Tablet) */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-2.5 md:p-3 z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] hidden md:flex justify-between items-center">
          <div className="flex items-center gap-3">
            {selectedImage && (
              <img src={selectedImage} alt={product.name} className="w-10 h-10 object-cover rounded border border-gray-200" />
            )}
            <div>
              <p className="text-xs font-bold text-gray-900 m-0 max-w-md truncate">{product.name}</p>
              <p className="text-[11px] m-0">
                {originalPrice > currentPrice && (
                  <span className="line-through text-gray-400 mr-1.5">Rs.{originalPrice.toLocaleString()}</span>
                )}
                <span className="text-wine font-bold">Rs.{currentPrice.toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {availableWeights.length > 1 && (
              <select
                value={selectedWeight}
                onChange={e => setSelectedWeight(e.target.value)}
                className="border border-gray-300 rounded px-2.5 py-2 text-xs bg-white font-medium cursor-pointer focus:outline-none focus:border-wine"
              >
                {availableWeights.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.inStock === false}
              className="bg-wine hover:bg-wine-deep text-white font-bold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded disabled:bg-gray-300 disabled:cursor-not-allowed transition cursor-pointer active:scale-95 shadow-xs"
            >
              {product.inStock === false ? t('product.outOfStock') : t('product.addToCart')}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.inStock === false}
              className="bg-wine hover:bg-wine-deep text-white font-bold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded disabled:bg-gray-300 disabled:cursor-not-allowed transition cursor-pointer active:scale-95 shadow-xs"
            >
              {t('productDetail.buyNow')}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sticky Add to Cart Bar */}
      {showStickyBar && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-gray-900 m-0 truncate">{product.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-wine font-extrabold">Rs.{currentPrice.toLocaleString()}</span>
                <span className="text-[10px] text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded font-medium">{selectedWeight}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleAddToCart}
                disabled={product.inStock === false}
                className="bg-wine active:bg-wine-deep text-white font-bold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition flex-shrink-0 shadow-sm cursor-pointer"
              >
                {product.inStock === false ? t('product.outOfStock') : t('product.addToCart')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}