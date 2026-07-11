'use client';

import * as React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/unity-hall-entrance.jpg" className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          </div>
          <div className="relative z-10 text-center">
            <h1 className="font-display text-5xl font-bold text-white">Accessibility</h1>
            <p className="text-white/70 mt-4">Our commitment to accessibility</p>
          </div>
        </section>
        <div className="container-custom py-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-body-lg text-muted-foreground">
              This is a placeholder for the Unity Hall Accessibility statement. Please check back later for the complete policy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
