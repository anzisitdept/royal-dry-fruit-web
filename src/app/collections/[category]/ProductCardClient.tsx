'use client';

import React from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';

export default function ProductCardClient({ product }: { product: Product }) {
  return <ProductCard product={product} />;
}