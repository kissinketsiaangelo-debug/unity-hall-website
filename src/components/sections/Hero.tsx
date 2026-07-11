'use client';

import * as React from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { KineticText } from '@/components/animations/KineticText';

interface StatItem {
  value: string;
  label: string;
  icon: string;
  suffix?: string;
  prefix?: string;
}

const stats: StatItem[] = [
  { value: '448', label: 'Original Rooms', icon: '🏠', suffix: '+' },
  { value: '36', label: 'Extra Flats', icon: '🏢' },
  { value: '2000', label: 'Current Students', icon: '👥', suffix: '+' },
  { value: '1968', label: 'Founded', icon: '📅' },
  { value: '#1', label: 'West Africa Rank', icon: '🏆' },
  { value: '500%', label: 'Overcapacity', icon: '📈' },
];

const ContiCrest = ({ className = "w-24 h-28 md:w-28 md:h-32 mx-auto" }: { className?: string }) => (
  <img src="/images/unity-hall-logo.jpeg" alt="Unity Hall Crest" className={className + " object-contain"} />
);

export function Hero() {
  const [showCrest, setShowCrest] = React.useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10">
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
          <motion.img
            src="/images/unity-hall-exterior-wiki.jpg"
            alt="Unity Hall exterior"
            className="w-full h-full object-cover"
            style={{ translateY: parallaxY }}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'easeOut' }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      <div className="container-custom relative z-10 py-20 px-4">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-6"
          >
            <button onClick={() => setShowCrest(true)} className="cursor-pointer">
              <ContiCrest />
            </button>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-knust-lust/10 border border-knust-lust/20 px-4 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span className="text-sm font-semibold text-knust-lust">🏆</span>
            <span className="text-sm font-medium text-knust-lust">
              The Pride of KNUST
            </span>
          </motion.div>

          <KineticText
            as="h1"
            id="hero-title"
            variant="hero"
            className="font-display text-display-2xl font-bold tracking-tight mb-12 gradient-text leading-[1.05]"
            delay={0.3}
          >
            Unity Hall
          </KineticText>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button asChild size="xl" variant="default">
              <a href="/about">Explore Unity Hall</a>
            </Button>
            <Button asChild size="xl" variant="outline">
              <a href="/admissions#tour">Virtual Tour</a>
            </Button>
            <Button asChild size="xl" variant="secondary">
              <a href="/alumni#giving">Support Conti</a>
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative p-6 rounded-2xl bg-white/50 dark:bg-knust-charcoal/50 backdrop-blur-xl border border-white/20 dark:border-knust-black/20 transition-all duration-500 hover:border-knust-lust/50 hover:shadow-glow"
                whileHover={{ y: -4, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display font-bold text-display-lg gradient-text">
                    {stat.prefix || ''}{stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="font-display font-bold text-display-lg gradient-text">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="text-caption text-muted-foreground mt-1 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-caption text-white/50 uppercase tracking-widest text-xs font-medium">
              Scroll
            </span>
            <svg
              className="w-5 h-5 text-knust-lust"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {showCrest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowCrest(false)}
        >
          <div className="relative" onClick={e => e.stopPropagation()}>
            <ContiCrest className="w-64 h-80" />
            <button
              onClick={() => setShowCrest(false)}
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
