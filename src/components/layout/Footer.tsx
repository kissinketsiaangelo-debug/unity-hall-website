'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  quick: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Traditions', href: '/traditions' },
    { label: 'Rivalry', href: '/rivalry' },
    { label: 'Alumni', href: '/alumni' },
    { label: 'News', href: '/news' },
    { label: 'Admissions', href: '/admissions' },
  ],
  resources: [
    { label: 'Helpdesk', href: '/helpdesk' },
    { label: 'Suggestions', href: '/suggestions' },
    { label: 'Lost & Found', href: '/lost-and-found' },
    { label: 'Forum', href: '/forum' },
    { label: 'Semester Check-in', href: '/semester-checkin' },
    { label: 'Past Questions', href: '/past-questions' },
    { label: 'Emergency', href: '/emergency' },
    { label: 'Conti Score', href: '/conti-score' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Cookies', href: '/cookies' },
  ],
  social: [
    { label: 'Facebook', href: 'https://facebook.com/UnityHallKNUST', icon: '📘' },
    { label: 'Twitter/X', href: 'https://twitter.com/UnityHallKNUST', icon: '🐦' },
    { label: 'Instagram', href: 'https://instagram.com/unityhallknust', icon: '📷' },
    { label: 'YouTube', href: 'https://youtube.com/@UnityHallKNUST', icon: '📺' },
    { label: 'WhatsApp', href: 'https://wa.me/233244000000', icon: '💬' },
    { label: 'Continental Radio', href: 'https://focusfmknust.com', icon: '📻' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-knust-charcoal text-knust-cream overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Quick Links
      </h2>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--knust-lust)/10,transparent_60%),radial-gradient(ellipse_at_bottom_left,var(--knust-gold)/10,transparent_60%)]" />
      <div className="absolute inset-0 bg-grain opacity-5" />

      <div className="container-custom relative py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="Unity Hall Home">
              <div className="h-14 w-14">
                <img src="/images/unity-hall-logo.jpeg" alt="Unity Hall Crest" className="h-full w-full object-contain" />
              </div>
              <span className="font-display font-bold text-headline-lg gradient-text">
                Unity Hall
              </span>
            </Link>
            <p className="text-muted-foreground text-body-md max-w-xs mb-6 leading-relaxed">
              The Twin Towers of KNUST — home of the Continentals. Unity, tradition, and excellence since 1968.
            </p>
            <p className="text-caption text-muted-foreground/70 max-w-sm">
              Built with pride by the Continental community.
            </p>

            <div className="flex items-center gap-4 mt-8">
              {footerLinks.social.slice(0, 5).map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-xl bg-knust-black/50 border border-knust-lust/20 flex items-center justify-center text-xl transition-all duration-300 hover:bg-knust-lust hover:border-knust-lust hover:scale-110"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-display font-semibold text-headline-sm mb-4">Quick Links</h3>
            <nav aria-label="Quick links">
              <ul className="space-y-3">
                {footerLinks.quick.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.03 }}
                  >
                    <Link
                      href={link.href}
                      className="text-body-sm text-muted-foreground hover:text-knust-lust transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="font-display font-semibold text-headline-sm mb-4">Resources</h3>
            <nav aria-label="Resources">
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.03 }}
                  >
                    <Link
                      href={link.href}
                      className="text-body-sm text-muted-foreground hover:text-knust-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display font-semibold text-headline-sm mb-4">Newsletter</h3>
            <p className="text-body-sm text-muted-foreground mb-4 max-w-xs">
              Stay updated with Unity Hall news, events, and alumni stories.
            </p>
            <form className="flex flex-col gap-2" action="/api/newsletter" method="POST">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="input-field pr-12"
                  required
                  aria-label="Email address"
                />
                <Button type="submit" variant="default" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8">
                  →
                </Button>
              </div>
              <p className="text-caption text-muted-foreground/70">
                No spam. Unsubscribe anytime.
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-knust-black/50">
              <h4 className="font-medium text-body-sm mb-3">Connect</h4>
              <div className="flex flex-wrap gap-2">
                {footerLinks.social.slice(5).map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-caption text-muted-foreground hover:text-knust-lust transition-colors flex items-center gap-1"
                    aria-label={social.label}
                  >
                    {social.icon} {social.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 lg:mt-16 pt-8 border-t border-knust-black/50 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p className="text-body-sm text-muted-foreground">
              © {currentYear} Unity Hall KNUST. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-caption text-muted-foreground/70">
              <a href="/privacy" className="hover:text-knust-lust transition-colors">
                Privacy
              </a>
              <span aria-hidden="true">·</span>
              <a href="/terms" className="hover:text-knust-lust transition-colors">
                Terms
              </a>
              <span aria-hidden="true">·</span>
              <a href="/accessibility" className="hover:text-knust-lust transition-colors">
                Accessibility
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="glass" className="text-caption">
              <span className="mr-1">🏆</span>
              Largest Hall in West Africa
            </Badge>
            <Badge variant="glass" className="text-caption">
              <span className="mr-1">📻</span>
              Continental Radio 96.1FM
            </Badge>
            <Badge variant="glass" className="text-caption">
              <span className="mr-1">🏛️</span>
              Est. 1968
            </Badge>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
