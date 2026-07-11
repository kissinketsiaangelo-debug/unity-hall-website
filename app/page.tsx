"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';

const quickLinks = [
  { title: 'About Us', desc: 'Learn about Unity Hall\'s history and legacy', href: '/about', icon: '📜' },
  { title: 'Facilities', desc: 'Explore our twin towers and amenities', href: '/facilities', icon: '🏢' },
  { title: 'Traditions', desc: 'Our cherished customs and culture', href: '/traditions', icon: '🎭' },
  { title: 'Rivalry', desc: 'The legendary Conti vs. Vienna spirit', href: '/rivalry', icon: '⚔️' },
  { title: 'Alumni', desc: 'Connect with fellow Continentals', href: '/alumni', icon: '👥' },
  { title: 'News & Events', desc: 'Latest updates and upcoming events', href: '/news', icon: '📰' },
  { title: 'Admissions', desc: 'Apply to join Unity Hall', href: '/admissions', icon: '🎓' },
  { title: 'Student Portal', desc: 'Helpdesk, forum, and more', href: '/portal', icon: '🔐' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-18">
        <Hero />
        
        <section className="container-custom py-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-headline-xl mb-4 gradient-text">
              Explore Unity Hall
            </h2>
            <p className="text-body-md text-muted-foreground max-w-2xl mx-auto">
              Discover everything about the largest hall of residence in West Africa.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {quickLinks.map((link) => (
              <motion.div key={link.href} variants={item}>
                <Link
                  href={link.href}
                  className="block p-6 rounded-xl bg-card border border-border hover:border-knust-lust/30 hover:shadow-glow transition-all duration-300 h-full"
                >
                  <span className="text-3xl mb-3 block">{link.icon}</span>
                  <h3 className="font-display font-semibold text-headline-sm mb-1">{link.title}</h3>
                  <p className="text-body-sm text-muted-foreground">{link.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}