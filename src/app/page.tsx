'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (headingRef.current) {
      const rect = headingRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      setMousePos({ x, y });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setMessage('Please enter a valid email address.');
      return;
    }
    setMessage("Thank you — we'll email you the moment we open.");
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #7F011F 0%, #52010f 100%)' }}>

      {/* Decorative dot pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #F5EBD0 1.4px, transparent 1.6px)',
          backgroundSize: '34px 34px',
        }} />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              background: 'linear-gradient(135deg, #F5EBD0, #6B4B2E)',
              width: `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `float${i % 3} ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <main className="animate-entrance relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 max-w-5xl w-full">

        {/* Logo */}
        <div className="mb-8 relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-900/20 via-amber-600/10 to-amber-900/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <Image
            src="/RDF-logo.png"
            alt="Royal Dry Fruits Logo"
            width={140}
            height={140}
            className="relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </div>

        {/* COMING SOON heading - full width & interactive */}
        <h1
          ref={headingRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="font-serif font-bold text-[#FAFAF8] mb-4 cursor-default select-none transition-transform duration-300 ease-out"
          style={{
            fontSize: 'clamp(3.5rem, 14vw, 10rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            transform: `perspective(800px) rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
            textShadow: '0 4px 30px rgba(127, 1, 31, 0.5), 0 0 80px rgba(245, 235, 208, 0.15)',
          }}
        >
          COMING
          <br />
          <span className="bg-gradient-to-r from-[#F5EBD0] via-[#D4B896] to-[#F5EBD0] bg-clip-text text-transparent"
            style={{
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s ease-in-out infinite',
            }}>
            SOON
          </span>
        </h1>

        {/* Decorative line */}
        <div className="flex items-center gap-4 my-8 opacity-60">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#F5EBD0]" />
          <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#F5EBD0]">
            <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" fill="currentColor" />
          </svg>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#F5EBD0]" />
        </div>

        {/* Brand name */}
        <h2 className="font-serif text-[#F5EBD0] mb-6 tracking-[0.15em] uppercase"
          style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}>
          Royal Dry Fruits
        </h2>

        {/* Tagline */}
        <p className="text-[#F5EBD0]/80 max-w-lg mx-auto mb-10 leading-relaxed"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
          A new home for premium dry fruits, curated with care and dressed in the same craft as what&apos;s inside the box.
        </p>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 justify-center w-full max-w-md mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 min-w-[220px] px-5 py-4 rounded-lg border border-[#6B4B2E]/50 bg-[#FAFAF8] text-[#1E1E1E] text-sm font-sans placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F5EBD0]/50 focus:border-[#F5EBD0] transition-all duration-300"
          />
          <button
            type="submit"
            className="px-7 py-4 rounded-lg bg-[#1E1E1E] text-[#FAFAF8] font-semibold text-sm tracking-wide border border-[#1E1E1E] hover:bg-[#F5EBD0] hover:text-[#1E1E1E] hover:border-[#F5EBD0] transition-all duration-300 cursor-pointer"
          >
            Notify Me
          </button>
        </form>

        {message && (
          <p className="text-[#F5EBD0] text-sm mt-3 animate-[rise_0.4s_ease-out]">{message}</p>
        )}

        {/* Social links */}
        <nav className="flex gap-8 mt-12" aria-label="Social links">
          {['Instagram', 'Facebook', 'WhatsApp'].map((platform) => (
            <a
              key={platform}
              href="#"
              className="text-[#F5EBD0]/70 text-xs tracking-wider uppercase hover:text-[#FAFAF8] transition-colors duration-300 relative group/link"
            >
              {platform}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#F5EBD0] group-hover/link:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-[#F5EBD0]/40 text-xs">
        &copy; 2026 Royal Dry Fruits (RDF). All rights reserved.
      </footer>

      <style jsx>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(10px); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(-15px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(8px); }
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
