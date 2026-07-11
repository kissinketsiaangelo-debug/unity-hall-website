'use client';

import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { RivalrySection } from '@/components/sections/RivalrySection';

export default function RivalryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/conti-students-proce.jpg" className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          </div>
          <div className="relative z-10 text-center">
            <h1 className="font-display text-5xl font-bold text-white">The Rivalry</h1>
            <p className="text-white/70 mt-4">The legendary Sarbah vs Conti showdown</p>
          </div>
        </section>
        <RivalrySection />
      </main>
      <Footer />
    </div>
  );
}
