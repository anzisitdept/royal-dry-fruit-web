import React from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import PageHeader from '@/components/layout/PageHeader';

export default function CookiePolicyPage() {
  return (
    <>
      <TopBar />
      <Header />

      <PageHeader titleKey="pages.cookie" />

      <main className="container mx-auto px-4 lg:px-8 max-w-4xl py-12 text-xs md:text-sm text-gray-700 leading-relaxed space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
          <p>
            This Cookie Policy explains how Royal Dry Fruits (RDF) uses cookies and similar technologies when you visit our website. It tells you what cookies are, why we use them, and how you can control them.
          </p>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device (computer, tablet, or mobile phone) when you visit a website. They help the website remember your actions and preferences over a period of time, so you do not have to re-enter them whenever you return.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">2. How We Use Cookies</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To keep track of items in your shopping cart while you browse.</li>
              <li>To remember your preferences and wishlist items.</li>
              <li>To analyse site performance and improve the shopping experience.</li>
              <li>To show relevant offers and recommendations.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">3. Types of Cookies We Use</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Strictly necessary cookies</strong> — required for core site functions such as the shopping cart and checkout.</li>
              <li><strong>Performance cookies</strong> — help us understand how visitors use our site so we can improve it.</li>
              <li><strong>Functionality cookies</strong> — remember choices you make, such as your preferred currency or saved items.</li>
              <li><strong>Third-party cookies</strong> — set by trusted analytic and advertising services we use to measure and improve our marketing.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">4. Managing Cookies</h2>
            <p>
              You can control and/or delete cookies through your browser settings at any time. You can delete all cookies already stored on your device and set most browsers to block them. Please note that if you disable cookies, some parts of our website — such as the shopping cart — may not function correctly.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-gray-900 text-base uppercase mb-2">5. Contact Us</h2>
            <p>
              If you have any questions about this Cookie Policy or our use of cookies, please contact us at <strong>0347-3811510</strong>, WhatsApp <strong>+92 347 3811510</strong>, or email <strong>hello@royaldryfruits.com</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}