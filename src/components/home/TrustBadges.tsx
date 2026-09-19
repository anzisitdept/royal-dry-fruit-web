import React from 'react';
import { Leaf, ShieldCheck, Truck, Gift } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TrustBadges() {
  const { t } = useLanguage();
  const badges = [
    { id: 1, title: t('trust.freshTitle'), subtitle: t('trust.freshSub'), icon: Leaf },
    { id: 2, title: t('trust.qualityTitle'), subtitle: t('trust.qualitySub'), icon: ShieldCheck },
    { id: 3, title: t('trust.deliveryTitle'), subtitle: t('trust.deliverySub'), icon: Truck },
    { id: 4, title: t('trust.giftTitle'), subtitle: t('trust.giftSub'), icon: Gift },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center text-center group">
              <div className="w-32 h-32 rounded-full border-[3px] border-wine p-4 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-sm bg-sand">
                <badge.icon className="w-12 h-12 text-wine" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-charcoal text-sm leading-snug">
                {badge.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{badge.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}