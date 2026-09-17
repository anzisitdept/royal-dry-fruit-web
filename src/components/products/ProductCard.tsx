'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { getProductEffectivePrice, getProductEffectiveOriginalPrice } from '@/lib/productPrice';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  // Available weights list
  const availableWeights = (product.weights && Array.isArray(product.weights) && product.weights.length > 0)
    ? product.weights
    : (product.weightPrices && typeof product.weightPrices === 'object' && Object.keys(product.weightPrices).length > 0)
    ? Object.keys(product.weightPrices)
    : ['250g', '500g', '1kg'];

  // Default to first weight or '250g'
  const [selectedWeight, setSelectedWeight] = useState<string>(availableWeights[0] || '250g');
  const [quantity, setQuantity] = useState<number>(1);

  // Dynamic price calculation based on selected weight
  const displayPrice = getProductEffectivePrice(product, selectedWeight);
  const originalPrice = getProductEffectiveOriginalPrice(product, displayPrice);
  const hasDiscount = originalPrice > displayPrice;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : 0;

  const primaryImage = product.image || (product.images && product.images[0]) || '';
  const hoverImage = product.hoverImage || primaryImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedWeight, quantity);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const ratingValue = product.rating !== undefined && product.rating !== null ? product.rating : 0;

  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden hover:shadow-xl hover:border-wine/20 transition-all duration-300 flex flex-col justify-between h-full group relative">
      
      {/* Top Image Zone — Full Width to Top Corners */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden block group bg-gray-100 flex-shrink-0">
        
        {/* Floating Discount Badge */}
        <div className="absolute top-2.5 left-2.5 z-30">
          {hasDiscount ? (
            <span className="bg-[#CCA262] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm tracking-tight inline-block">
              {discountPercent}%
            </span>
          ) : product.discountBadge ? (
            <span className="bg-[#CCA262] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm tracking-tight inline-block">
              {product.discountBadge}
            </span>
          ) : product.isBestSeller ? (
            <span className="bg-wine text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-tight inline-block shadow-sm">
              Best Seller
            </span>
          ) : null}
        </div>

        {/* Floating Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 z-30 w-8 h-8 rounded-lg border flex items-center justify-center transition shadow-sm cursor-pointer ${
            isWishlisted
              ? 'bg-wine text-white border-wine'
              : 'bg-white/90 text-gray-500 border-gray-200/80 hover:text-wine hover:bg-white'
          }`}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Product Images */}
        {primaryImage ? (
          <>
            <img
              src={primaryImage}
              alt={product.name || 'Product'}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-10"
            />
            {hoverImage && hoverImage !== primaryImage && (
              <img
                src={hoverImage}
                alt={`${product.name || 'Product'} Alternate`}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-20"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-medium">
            No Image
          </div>
        )}

        {/* Out of Stock Overlay */}
        {product.inStock === false && (
          <div className="absolute inset-0 bg-white/75 backdrop-blur-2xs flex items-center justify-center z-40">
            <span className="bg-charcoal text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-xs">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Bottom Content Area */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-white">
        
        {/* Product Name */}
        <div className="mb-3 text-center">
          <Link
            href={`/products/${product.slug}`}
            className="text-xs sm:text-sm font-bold text-gray-900 hover:text-wine transition-colors line-clamp-2 min-h-[38px] flex items-center justify-center leading-tight"
          >
            {product.name}
          </Link>
        </div>

        {/* Weight Selector & Quantity Stepper */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Weight Select Dropdown */}
          <select
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(e.target.value)}
            className="flex-1 bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 font-medium focus:outline-none focus:border-wine transition cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:9px_9px] bg-[right_8px_center] bg-no-repeat pr-6 truncate"
          >
            {availableWeights.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>

          {/* Quantity Stepper */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white text-xs flex-shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-2 py-1.5 hover:bg-gray-100 text-gray-600 font-bold transition cursor-pointer"
            >
              -
            </button>
            <span className="px-2 py-1.5 font-semibold text-gray-800 min-w-[20px] text-center select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="px-2 py-1.5 hover:bg-gray-100 text-gray-600 font-bold transition cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Price & Rating Badge Row */}
        <div className="flex items-center justify-between mb-3">
          {/* Price */}
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-wine font-extrabold text-sm sm:text-base md:text-lg">
              Rs. {displayPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-gray-400 line-through text-[11px] font-normal">
                Rs. {originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Rating Badge (Red) */}
          <div className="bg-red-50 text-wine text-[11px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1 flex-shrink-0 border border-wine/15">
            <Star className="w-3 h-3 fill-wine text-wine" />
            <span>{ratingValue}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.inStock === false}
          className="w-full bg-[#CCA262] hover:bg-wine text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer shadow-2xs disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{product.inStock === false ? 'OUT OF STOCK' : 'ADD TO CART'}</span>
        </button>

      </div>
    </div>
  );
}
