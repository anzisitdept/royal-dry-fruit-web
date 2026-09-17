'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

/* ─── Collapsible Footer Section (dropdown on mobile, always open on desktop) ─── */
function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:block">
      <button
        suppressHydrationWarning
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="lg:cursor-default w-full flex items-center justify-between lg:justify-start text-left"
      >
        <h3 className="font-bold text-xs tracking-widest uppercase mb-0 lg:mb-5 text-ivory font-sans">
          {title}
        </h3>
        <span className="lg:hidden text-ivory/80 transition-transform duration-300">
          <ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <div className={`${open ? 'block' : 'hidden'} lg:block mt-3 lg:mt-0`}>
        {children}
      </div>
    </div>
  );
}

/* ─── Professional SVG Social Icons ─────────────────── */
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.11V9.3a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.57a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-3.04-1.12c-.44-.36-.78-.83-1-1.35V6.69z" />
    </svg>
  );
}


const SHOP_LINKS = [
  { label: 'Premium Dry Fruits', href: '/collections/dry-fruits' },
  { label: 'Dates & Dried Fruits', href: '/collections/dates-dried-fruits' },
  { label: 'Roasted & Flavored', href: '/collections/roasted-flavored' },
  { label: 'Combos & Trail Packs', href: '/collections/combos' },
  { label: 'Gift Boxes & Hampers', href: '/collections/gift-boxes' },
  { label: 'Seeds & Superfoods', href: '/collections/superfoods' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'All Products', href: '/collections/all-products' },
];

export default function Footer() {
  return (
    <footer className="w-full font-sans">

      {/* Main Footer Content */}
      <div className="bg-wine text-white pt-14 pb-8">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1320px]">

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

            {/* Column 1: SHOP */}
            <div>
              <FooterSection title="SHOP">
                <ul className="space-y-2.5 text-xs font-normal text-ivory/80">
                  {SHOP_LINKS.map(link => (
                    <li key={link.href}><Link href={link.href} className="hover:underline hover:text-ivory">{link.label}</Link></li>
                  ))}
                </ul>
              </FooterSection>
            </div>

            {/* Column 2: INFORMATION */}
            <div>
              <FooterSection title="INFORMATION">
                <ul className="space-y-2.5 text-xs font-normal text-ivory/80">
                  <li><Link href="/pages/about" className="hover:underline hover:text-ivory">About Royal Dry Fruits</Link></li>
                  <li><Link href="/pages/outlets" className="hover:underline hover:text-ivory">Outlets & Store Locations</Link></li>
                  <li><Link href="/pages/returns-and-refund-policy" className="hover:underline hover:text-ivory">Returns And Refund Policy</Link></li>
                  <li><Link href="/pages/cancellation-policy" className="hover:underline hover:text-ivory">Cancellation Policy</Link></li>
                  <li><Link href="/pages/terms-conditions" className="hover:underline hover:text-ivory">Terms & Conditions</Link></li>
                  <li><Link href="/pages/shipping-policy" className="hover:underline hover:text-ivory">Shipping Policy</Link></li>
                  <li><Link href="/pages/privacy-policy" className="hover:underline hover:text-ivory">Privacy Policy</Link></li>
                  <li><Link href="/pages/cookie-policy" className="hover:underline hover:text-ivory">Cookie Policy</Link></li>
                  <li><Link href="/pages/frequently-asked-questions" className="hover:underline hover:text-ivory">FAQ&apos;s</Link></li>
                  <li><Link href="/pages/contact-us" className="hover:underline hover:text-ivory">Contact Us</Link></li>
                </ul>
              </FooterSection>
            </div>

            {/* Column 3: SIGN UP */}
            <div>
              <h3 className="font-bold text-xs tracking-wider uppercase mb-3 text-ivory leading-snug">
                SIGN UP AND SAVE 10%
              </h3>
              <p className="text-xs mb-4 text-ivory/80 leading-relaxed">
                Sign up for exclusive updates, new arrivals & member-only discounts on premium dry fruits.
              </p>

              <form onSubmit={e => { e.preventDefault(); alert('Subscribed successfully!'); }} className="flex gap-2 mb-5">
                <input
                  suppressHydrationWarning
                  type="email"
                  required
                  placeholder="Enter Your Email Address"
                  className="w-full px-3 py-2.5 bg-ivory text-wine text-xs font-medium focus:outline-none placeholder-gray-500 rounded-none"
                />
                <button
                  suppressHydrationWarning
                  type="submit"
                  className="bg-ivory text-wine font-bold text-xs tracking-wider uppercase px-4 py-2.5 hover:bg-sand transition rounded-none flex-shrink-0"
                >
                  SUBMIT
                </button>
              </form>

              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-ivory text-wine flex items-center justify-center transition-all duration-200 hover:bg-transparent hover:text-ivory hover:ring-2 hover:ring-ivory"
                  title="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-ivory text-wine flex items-center justify-center transition-all duration-200 hover:bg-transparent hover:text-ivory hover:ring-2 hover:ring-ivory"
                  title="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-ivory text-wine flex items-center justify-center transition-all duration-200 hover:bg-transparent hover:text-ivory hover:ring-2 hover:ring-ivory"
                  title="TikTok"
                >
                  <TiktokIcon />
                </a>

              </div>
            </div>

            {/* Column 4: CUSTOMER SERVICE */}
            <div>
              <h3 className="font-bold text-xs tracking-widest uppercase mb-5 text-ivory font-sans">CUSTOMER SERVICE</h3>
              <ul className="space-y-3 text-xs font-normal text-ivory/80 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span>📞</span>
                  <span>WhatsApp us on <strong className="text-ivory">+92 347 3811510</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📞</span>
                  <span>WhatsApp or ☎ Call us on <strong className="text-ivory">0347-3811510</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✉</span>
                  <span>hello@royaldryfruits.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🚚</span>
                  <span>Free Shipping Over Rs. 3,000 Order.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📣</span>
                  <span>7 Days Easy Returns & Exchange Available</span>
                </li>
              </ul>

              {/* Developed By ANZI & Co. */}
              <div className="mt-6 pt-5 border-t border-ivory/20">
                <p className="text-xs font-semibold text-ivory uppercase tracking-wider mb-2.5">Developed By</p>
                <a
                  href="https://www.anziandco.com?ref=royaldryfruits"
                  target="_blank"
                  rel="noopener"
                  className="inline-block text-lg font-display font-semibold text-ivory/90 hover:text-ivory transition-colors"
                  title="ANZI & Co."
                >
                  ANZI &amp; Co.
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & COD note */}
          <div className="border-t border-ivory/20 pt-6 flex flex-col md:flex-row items-center justify-between text-sm md:text-base text-ivory/70 font-medium gap-4">
            <p>Royal Dry Fruits © 2026. All Rights Reserved.</p>
            <span className="text-xs uppercase tracking-wider text-ivory/60">Cash on Delivery · Nationwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}