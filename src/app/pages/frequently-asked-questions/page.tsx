'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import PageHeader from '@/components/layout/PageHeader';

const FAQS = [
  {
    q: 'How can I place an order on Royal Dry Fruits?',
    a: 'You can easily place an order by browsing our website, clicking "ADD TO CART" or "BUY IT NOW" on any product, and filling out your Cash on Delivery (COD) shipping address at checkout. You can also order directly via WhatsApp at 0347-3811510.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We offer Cash on Delivery (COD) across all cities in Pakistan. You only pay cash to the courier representative when the parcel is delivered to your doorstep.'
  },
  {
    q: 'How long does delivery take across Pakistan?',
    a: 'Orders shipped to major cities (Lahore, Islamabad, Rawalpindi, Karachi, Faisalabad, Multan) take 2 to 3 working days. Other remote areas take 3 to 4 working days.'
  },
  {
    q: 'How do you ensure the quality and freshness of your dry fruits?',
    a: 'All Royal Dry Fruits products are handpicked from trusted orchards worldwide — including California almonds, Iranian pistachios, and Medjool dates — then hygienically sorted, vacuum-sealed, and packed in airtight moisture-proof packaging to lock in freshness. No artificial colors or synthetic chemical preservatives are ever used.'
  },
  {
    q: 'What is your shipping charge policy?',
    a: 'Standard delivery charges are Rs. 200 nationwide. However, all orders over Rs. 3,000 qualify for 100% FREE Home Delivery!'
  },
  {
    q: 'What if my parcel arrives damaged during transit?',
    a: 'We package every order in heavy-duty protective packaging with reinforced corrugated boxes. If your parcel arrives damaged or any item is not in perfect condition, simply send us a photo on WhatsApp (0347-3811510) within 24 hours and we will dispatch a FREE replacement immediately!'
  }
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      <TopBar />
      <Header />

      <PageHeader titleKey="pages.faq" />

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12">
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="font-bold text-xs md:text-sm text-gray-900 flex items-center space-x-3">
                  <HelpCircle className="w-4 h-4 text-wine flex-shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIdx === idx ? 'transform rotate-180 text-wine' : ''
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="p-5 text-xs md:text-sm text-gray-700 leading-relaxed border-t border-gray-200 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
