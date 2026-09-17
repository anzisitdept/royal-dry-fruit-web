import React from 'react';
import { Leaf, ShieldCheck, Truck, Gift } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    { id: 1, title: 'Freshly Packed', subtitle: 'Sealed to lock in freshness', icon: Leaf },
    { id: 2, title: 'Premium Quality', subtitle: 'Handpicked finest nuts', icon: ShieldCheck },
    { id: 3, title: 'Nationwide Delivery', subtitle: 'Serving all of Pakistan', icon: Truck },
    { id: 4, title: 'Perfect for Gifting', subtitle: 'Elegant boxes & hampers', icon: Gift },
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