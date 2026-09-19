'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';

function Items({ texts }: { texts: string[] }) {
  return (
    <>
      {[...Array(4)].map((_, j) => (
        <React.Fragment key={j}>
          {texts.map((text, i) => (
            <div key={`${j}-${i}`} className="flex items-center space-x-8">
              <span>{text}</span>
              <span className="text-wine text-sm">⚡</span>
            </div>
          ))}
        </React.Fragment>
      ))}
    </>
  );
}

export default function Marquee() {
  const { t } = useLanguage();
  const texts = [t('marquee.t1'), t('marquee.t2'), t('marquee.t3'), t('marquee.t4')];
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const speedRef = useRef(0.6);
  const drag = useRef({ active: false, lastX: 0 });
  const [dragging, setDragging] = useState(false);

  const step = useCallback(() => {
    const track = trackRef.current;
    if (track) {
      const halfWidth = track.scrollWidth / 2;
      if (!drag.current.active) {
        posRef.current -= speedRef.current;
        if (posRef.current <= -halfWidth) posRef.current += halfWidth;
        track.style.transform = `translate3d(${posRef.current}px,0,0)`;
      }
    }
    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [step]);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current.active = true;
    drag.current.lastX = e.clientX;
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.lastX;
    drag.current.lastX = e.clientX;
    posRef.current += dx;
    const track = trackRef.current;
    if (track) track.style.transform = `translate3d(${posRef.current}px,0,0)`;
  };

  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  return (
    <div className="w-full overflow-hidden bg-white py-6">
      <div
        className={`relative flex overflow-hidden font-serif text-dryfruit text-xl md:text-2xl whitespace-nowrap tracking-wide select-none ${
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={trackRef} className="flex items-center space-x-8 px-4 will-change-transform">
          <Items texts={texts} />
          <Items texts={texts} />
        </div>
      </div>
    </div>
  );
}
