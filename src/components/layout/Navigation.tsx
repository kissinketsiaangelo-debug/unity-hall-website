'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';

const navItems = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'About', href: '/about', icon: '📜' },
  { label: 'Facilities', href: '/facilities', icon: '🏢' },
  { label: 'Traditions', href: '/traditions', icon: '🎭' },
  { label: 'Rivalry', href: '/rivalry', icon: '⚔️' },
  { label: 'Alumni', href: '/alumni', icon: '👥' },
  { label: 'News', href: '/news', icon: '📰' },
  { label: 'Admissions', href: '/admissions', icon: '🎓' },
  { label: 'Portal', href: '/portal', icon: '🔐' },
];


export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-elevation-1'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex h-18 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            aria-label="Unity Hall Home"
          >
            <motion.div
              className="relative h-11 w-11"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
            >
              <img src="/images/unity-hall-logo.jpeg" alt="Unity Hall Crest" className="h-full w-full object-contain" />
            </motion.div>
            <span className="font-display font-bold text-headline-sm hidden sm:block gradient-text">
              Unity Hall
            </span>
            <span className="font-display font-bold text-headline-sm sm:hidden gradient-text">
              Conti
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-hide flex-nowrap">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={cn(
                  'relative flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap',
                  pathname === item.href
                    ? 'text-knust-lust bg-knust-lust/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
            >
              <Link href="/login">Login</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="h-10"
            >
              <span className="text-xl">
                {mounted ? (resolvedTheme === 'dark' ? '☀️' : '🌙') : '🌙'}
              </span>
            </Button>

            <Button
              asChild
              variant="default"
              size="sm"
              className="hidden sm:inline-flex"
            >
               <a href="https://apps.knust.edu.gh/admissions/" target="_blank" rel="noopener noreferrer">Apply Now</a>
            </Button>

            <Button
              asChild
              variant="secondary"
              size="sm"
              className="hidden sm:inline-flex"
            >
               <a href="https://alumni.knust.edu.gh/" target="_blank" rel="noopener noreferrer">Donate</a>
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <span className="text-xl">
                {mounted ? (resolvedTheme === 'dark' ? '☀️' : '🌙') : '🌙'}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ☰
              </motion.span>
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all',
                      pathname === item.href
                        ? 'text-knust-lust bg-knust-lust/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => setMobileOpen(false)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span aria-hidden="true" className="text-xl">{item.icon}</span>
                    {item.label}
                  </motion.a>
                ))}
                <Separator className="my-4" />
                <div className="flex flex-col gap-2 px-4 pt-2">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild variant="default" size="lg">
                    <a href="https://apps.knust.edu.gh/admissions/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                      Apply Now
                    </a>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <a href="https://alumni.knust.edu.gh/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                      Donate
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
