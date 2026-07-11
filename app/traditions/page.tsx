'use client';

import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { TraditionsSection } from '@/components/sections/TraditionsSection';

export default function TraditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/conti-hall-week-1.jpg" className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          </div>
          <div className="relative z-10 text-center">
            <h1 className="font-display text-5xl font-bold text-white">Traditions</h1>
            <p className="text-white/70 mt-4">The cherished customs and culture of Unity Hall</p>
          </div>
        </section>
        <TraditionsSection />
      </main>
      <Footer />
    </div>
  );
}
