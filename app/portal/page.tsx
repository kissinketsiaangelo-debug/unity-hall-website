'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PortalFeature {
  title: string;
  href: string;
  icon: string;
  description: string;
}

const portalFeatures: PortalFeature[] = [
  {
    title: 'Helpdesk',
    href: '/helpdesk',
    icon: '🎫',
    description: 'Submit and track support tickets for hall-related issues',
  },
  {
    title: 'Suggestions',
    href: '/suggestions',
    icon: '💡',
    description: 'Share ideas and vote on ways to improve hall life',
  },
  {
    title: 'Lost & Found',
    href: '/lost-and-found',
    icon: '🔍',
    description: 'Report lost items or return found belongings',
  },
  {
    title: 'Roommate Matching',
    href: '/roommate-matching',
    icon: '🤝',
    description: 'Find compatible roommates based on preferences',
  },
  {
    title: 'Forum',
    href: '/forum',
    icon: '💬',
    description: 'Connect, discuss, and share with fellow Continentals',
  },
  {
    title: 'Semester Check-in',
    href: '/semester-checkin',
    icon: '📋',
    description: 'Complete your semester check-in and check-out',
  },
  {
    title: 'Past Questions',
    href: '/past-questions',
    icon: '📚',
    description: 'Access and share past examination papers',
  },
  {
    title: 'Emergency',
    href: '/emergency',
    icon: '🆘',
    description: 'Emergency headcount and safety alerts',
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: '🔔',
    description: 'View hall announcements and personal alerts',
  },
  {
    title: 'Conti Score',
    href: '/conti-score',
    icon: '🏆',
    description: 'Track your participation and hall engagement points',
  },
  {
    title: 'Verification',
    href: '/verification',
    icon: '✅',
    description: 'Verify your identity and hall affiliation',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function PortalPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative min-h-[35vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/conti-entrance-life.jpg" className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          </div>
          <div className="relative z-10 text-center px-4">
            <motion.h1
              className="font-display text-4xl md:text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Continental Portal
            </motion.h1>
            <motion.p
              className="text-white/70 mt-3 text-lg max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {session?.user
                ? `Welcome back, ${session.user.name || 'Continentals'}`
                : 'Sign in to access all portal features'}
            </motion.p>
            {!session?.user && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {portalFeatures.map((feature) => (
                <motion.div key={feature.href} variants={cardVariants}>
                  <Link href={feature.href} className="block h-full group">
                    <Card
                      variant="interactive"
                      className="h-full p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-elevation-3"
                    >
                      <CardContent className="p-0">
                        <span className="text-3xl mb-3 block">{feature.icon}</span>
                        <CardTitle className="font-display font-semibold text-headline-sm mb-1">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-body-sm">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
