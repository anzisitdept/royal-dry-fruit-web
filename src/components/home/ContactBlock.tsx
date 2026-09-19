import React from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactBlock() {
  const { t } = useLanguage();
  const contactItems = [
    {
      href: 'mailto:hello@royaldryfruits.com',
      icon: Mail,
      alt: 'Email',
      label: t('contactBlock.email'),
    },
    {
      href: 'https://wa.me/923473811510',
      icon: MessageCircle,
      alt: 'WhatsApp',
      label: t('contactBlock.whatsapp'),
    },
    {
      href: 'tel:03473811510',
      icon: Phone,
      alt: 'Phone',
      label: t('contactBlock.call'),
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white w-full">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">{t('contactBlock.heading')}</h2>
        <p className="text-charcoal/70 mb-8 md:mb-10 text-base md:text-lg">{t('contactBlock.subtitle')}</p>

        <div className="flex flex-row justify-center items-stretch gap-3 sm:gap-4 md:gap-6">
          {contactItems.map((item) => (
            <a
              key={item.alt}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex-1 min-w-0 bg-sand hover:bg-gray-100 active:scale-95 transition-all p-4 md:p-6 rounded-xl flex flex-col items-center justify-center gap-2 md:gap-4 cursor-pointer no-underline"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-wine text-white flex items-center justify-center">
                <item.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </div>
              <span className="font-semibold text-charcoal text-sm md:text-base">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}