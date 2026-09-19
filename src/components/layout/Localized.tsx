'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface LocalizedProps {
  k: string;
  vars?: Record<string, string | number>;
}

export default function Localized({ k, vars }: LocalizedProps) {
  const { t } = useLanguage();
  return <>{t(k, vars)}</>;
}