'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal, Tilt, Magnetic } from '@/components/animations/ScrollAnimations';
import { GradientText, KineticText, MarqueeText } from '@/components/animations/KineticText';

const colorGradients: Record<string, string> = {
  'knust-forest': 'from-knust-forest/20 to-knust-forest/5',
  'knust-gold': 'from-knust-gold/20 to-knust-gold/5',
  'knust-lust': 'from-knust-lust/20 to-knust-lust/5',
};

const roomTypes = [
  {
    name: 'Standard Single',
    desc: 'Original design — one student per room. Now rare due to overcrowding.',
    capacity: '1 student',
    features: ['Built-in wardrobe', 'Study desk', 'Ceiling fan', 'Window'],
    price: 'GHS 1,200/semester',
    icon: '🚪',
    color: 'knust-forest',
    available: true,
  },
  {
    name: 'Standard Double',
    desc: 'Two students sharing. Most common original configuration.',
    capacity: '2 students',
    features: ['Two wardrobes', 'Two study desks', 'Ceiling fan', 'Window', 'Bunk beds optional'],
    price: 'GHS 800/semester per student',
    icon: '🛏️',
    color: 'knust-gold',
    available: true,
  },
  {
    name: 'Triple/Quad (Current Reality)',
    desc: '3-4 students per room due to 500% overcrowding. Bunk beds, shared desks.',
    capacity: '3-4 students',
    features: ['Bunk beds', 'Shared wardrobe', 'Shared desk', 'Ceiling fan', 'High demand'],
    price: 'GHS 600/semester per student',
    icon: '🛏️🛏️',
    color: 'knust-lust',
    available: true,
    note: 'Perching common — unofficial 5th/6th occupants',
  },
  {
    name: 'Extra Flat (Self-Contained)',
    desc: '36 premium flats for senior students, visiting scholars, hall executives.',
    capacity: '1-2 students',
    features: ['Private bathroom', 'Kitchenette', 'Living area', 'AC', 'WiFi', 'Premium security'],
    price: 'GHS 2,500/semester',
    icon: '🏠',
    color: 'knust-lust',
    available: false,
    note: 'Limited — priority to final years & executives',
  },
];

const admissionSteps = [
  {
    step: 1,
    title: 'Accept Admission Offer',
    desc: 'Receive KNUST admission letter. Accept offer on admissions portal.',
    icon: '✅',
    details: ['Check admission status at apps.knust.edu.gh/admissions/check', 'Print admission letter', 'Note your Application Number & PIN'],
  },
  {
    step: 2,
    title: 'Pay Academic Fees',
    desc: 'Full academic fees must be paid before accommodation application.',
    icon: '💳',
    details: ['Pay via pay.knust.edu.gh or USSD *415*55#', 'Select "ACADEMIC FEES"', 'Wait 30 mins for system update', 'Keep receipt'],
  },
  {
    step: 3,
    title: 'Reserve Accommodation',
    desc: 'Make a reservation on the accommodation portal — generates reservation code.',
    icon: '🔖',
    details: ['Login at accommodation.knust.edu.gh (or kohs.knust.edu.gh)', 'Click "Make a Reservation"', 'Read & accept instructions', 'Select Unity Hall from list', 'Get reservation code'],
  },
  {
    step: 4,
    title: 'Pay Residential Fees',
    desc: 'Pay hall fees at paypoint using reservation code.',
    icon: '💰',
    details: ['Use same payment methods', 'Select "RESIDENTIAL FEES"', 'Keep receipt for room selection'],
  },
  {
    step: 5,
    title: 'Choose Your Room',
    desc: 'Login to select specific room based on reservation.',
    icon: '🔑',
    details: ['Login at accommodation.knust.edu.gh (or kohs.knust.edu.gh)', 'Select room from available options', 'Print room allocation slip', 'Report to hall on arrival'],
  },
];

const faqs = [
  {
    q: 'When does the accommodation portal open for freshers?',
    a: 'Typically 2-4 weeks after admission lists are released. Check uits.knust.edu.gh for exact dates.',
  },
  {
    q: 'Can I choose Unity Hall specifically?',
    a: 'Yes, if spaces are available. Unity Hall is highly demanded — apply early. Reservation is first-come, first-served.',
  },
  {
    q: 'What if I\'m a continuing student?',
    a: 'Continuing students apply during the continuing student window (usually June-July). Priority given to those with good disciplinary records.',
  },
  {
    q: 'Are there gender-specific floors now?',
    a: 'Yes, since 2018 conversion, Unity Hall is mixed. Male and female students are allocated to different floors/wings with separate washrooms.',
  },
  {
    q: 'What is "perching" and is it allowed?',
    a: 'Perching = unofficial extra occupants beyond room capacity. Not officially allowed but widespread due to 500% overcrowding. Hall admin tries to manage.',
  },
  {
    q: 'Can I visit before applying?',
    a: 'Yes! Book a visit via the contact page. Virtual tour also available. Best during Hall Week (August) or Orientation Week (September).',
  },
  {
    q: 'What are the payment deadlines?',
    a: 'Academic fees: before accommodation application. Residential fees: within 2 weeks of reservation. Late payment = reservation cancelled.',
  },
  {
    q: 'Is there WiFi in rooms?',
    a: 'Study room has WiFi. Rooms use mobile data (MTN, AirtelTigo, Vodafone). KNUST expanding campus-wide WiFi.',
  },
];

export function AdmissionsSection() {


  return (
    <section id="admissions" className="section-padding bg-background relative overflow-hidden" aria-labelledby="admissions-heading">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--knust-lust)/2,transparent_70%)] pointer-events-none" />
      
      <div className="container-custom relative">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="secondary" className="mb-4">
            Admissions
          </Badge>
          <KineticText as="h2" id="admissions-heading" variant="headline" className="font-display text-display-xl font-bold gradient-text mb-4">
            Become a Continental
          </KineticText>
          <p className="text-body-lg text-muted-foreground leading-relaxed">
            Join 2,000+ Continentals in the Twin Towers. Here\'s everything you need to know 
            about securing your place in West Africa\'s largest hall.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <img src="/images/unity-hall-entrance.jpg" alt="Unity Hall main entrance" className="rounded-xl w-full max-w-5xl h-64 object-cover shadow-2xl" />
        </div>

        <MarqueeText className="mb-12 px-4 py-4 bg-knust-lust/5 dark:bg-knust-lust/10 rounded-xl border border-knust-lust/20" speed={30}>
          <span className="px-4 font-mono text-sm font-medium text-knust-lust">
            🎓 FRESHERS  🔑 ROOM SELECTION  💳 FEE PAYMENT  🏠 TWIN TOWERS  📋 RESERVATION  🌐 KNUST PORTAL  📅 DEADLINES  ❓ FAQ
          </span>
        </MarqueeText>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display font-bold text-headline-lg gradient-text text-center mb-8">
            5 Steps to Your Room
          </h3>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-knust-lust via-knust-gold to-knust-forest -translate-x-1/2" />
            {admissionSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className={cn('relative flex gap-8 mb-12', index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={cn('flex-shrink-0 w-1/2 md:w-[calc(50%-2rem)]', index % 2 === 0 ? 'md:pr-8 text-right' : 'md:pl-8')}>
                  <Card variant="interactive" className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4 justify-end md:justify-start">
                        <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0', 'bg-knust-lust/20')}>
                          {step.icon}
                        </div>
                        <div className="text-right md:text-left">
                          <div className="font-display font-bold text-headline-lg gradient-text">Step {step.step}</div>
                          <div className="font-semibold text-headline-sm">{step.title}</div>
                        </div>
                      </div>
                      <p className="text-body-sm text-muted-foreground mb-4">{step.desc}</p>
                      <ul className="space-y-1">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-caption text-muted-foreground">
                            <span className="text-knust-lust">▸</span> {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="relative z-10">
                    <div className="h-4 w-4 rounded-full border-4 border-white dark:border-knust-charcoal bg-knust-lust shadow-elevation-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display font-bold text-headline-lg gradient-text text-center mb-8">
            Room Types & Rates (2026/2027)
          </h3>
          <p className="text-body-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Original capacity: 448 rooms. Current reality: 500% overcrowding. Rates shown are estimates — check KNUST portal for official fees.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roomTypes.map((room, index) => (
              <Magnetic key={room.name} strength={0.1}>
                <Tilt maxTilt={4} scale={1.01}>
                  <Card variant={room.available ? 'interactive' : 'outlined'} className="h-full relative overflow-hidden">
                    <div className={cn('h-24 relative overflow-hidden bg-gradient-to-br', colorGradients[room.color] ?? 'from-knust-lust/20 to-knust-lust/5')}>
                      <div className="absolute inset-0 flex items-center justify-center text-4xl">
                        {room.icon}
                      </div>
                      {!room.available && (
                        <div className="absolute inset-0 bg-knust-charcoal/70 flex items-center justify-center">
                          <Badge variant="destructive">Limited Availability</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h4 className="font-display font-semibold text-headline-sm mb-1">{room.name}</h4>
                      <p className="text-body-sm text-muted-foreground mb-3 line-clamp-2">{room.desc}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={room.color === 'knust-lust' ? 'default' : room.color === 'knust-gold' ? 'secondary' : 'success'} className="text-[10px]">
                          {room.capacity}
                        </Badge>
                        <span className="text-caption text-muted-foreground">• {room.price}</span>
                      </div>
                      <ul className="space-y-1 mb-4">
                        {room.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-caption text-muted-foreground">
                            <span className="text-knust-lust">✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                      {room.note && (
                        <p className="text-[10px] text-destructive/80 bg-destructive/10 p-2 rounded-lg">
                          ⚠️ {room.note}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Tilt>
              </Magnetic>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display font-bold text-headline-lg gradient-text text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Magnetic key={index} strength={0.05}>
                <Tilt maxTilt={2} scale={1.005}>
                  <Card variant="glass">
                    <CardContent className="p-5">
                      <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-foreground">
                          {faq.q}
                          <motion.span
                            className="text-knust-lust transition-transform duration-300"
                            animate={{ rotate: 0 }}
                          >
                            +
                          </motion.span>
                        </summary>
                        <div className="mt-3 text-body-sm text-muted-foreground leading-relaxed">
                          {faq.a}
                        </div>
                      </details>
                    </CardContent>
                  </Card>
                </Tilt>
              </Magnetic>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card variant="gradient" className="md:col-span-2">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-14 w-14 rounded-xl bg-knust-lust/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-knust-lust text-2xl">🌐</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-headline-lg gradient-text">Official KNUST Accommodation Portal</h3>
                  <p className="text-body-md text-knust-cream/80">All applications go through the university system</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <Button asChild variant="default" size="lg" className="w-full">
                  <a href="https://kohs.knust.edu.gh" target="_blank" rel="noopener noreferrer">
                    🏠 Accommodation Portal
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full border-knust-gold text-knust-gold hover:bg-knust-gold/10">
                  <a href="https://apps.knust.edu.gh/admissions/check" target="_blank" rel="noopener noreferrer">
                    🔍 Check Admission Status
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full border-knust-gold text-knust-gold hover:bg-knust-gold/10">
                  <a href="https://pay.knust.edu.gh" target="_blank" rel="noopener noreferrer">
                    💳 Pay Fees Online
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full border-knust-gold text-knust-gold hover:bg-knust-gold/10">
                  <a href="https://uits.knust.edu.gh" target="_blank" rel="noopener noreferrer">
                    📱 KNUST AIM App
                  </a>
                </Button>
              </div>
              <p className="text-caption text-knust-cream/60">
                Redirects to official KNUST sites • Have your Application Number & PIN ready
              </p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-knust-lust to-knust-gold flex items-center justify-center">
                  <span className="text-white text-lg">📞</span>
                </div>
                <h4 className="font-display font-semibold text-headline-md gradient-text">Need Help?</h4>
              </div>
              <div className="space-y-3 text-sm">
                <a href="/contact" className="flex items-center gap-2 text-muted-foreground hover:text-knust-lust transition-colors">
                  <span>📧</span> Email Hall Admin
                </a>
                <a href="/contact#maintenance" className="flex items-center gap-2 text-muted-foreground hover:text-knust-lust transition-colors">
                  <span>🔧</span> Report Issue
                </a>
                <a href="tel:+233322062975" className="flex items-center gap-2 text-muted-foreground hover:text-knust-lust transition-colors">
                  <span>📞</span> +233 322 062 975
                </a>
                <a href="tel:+233322062976" className="flex items-center gap-2 text-muted-foreground hover:text-knust-lust transition-colors">
                  <span>📞</span> +233 322 062 976
                </a>
              </div>
              <div className="mt-6 p-4 bg-knust-lust/5 rounded-xl border border-knust-lust/20">
                <p className="text-caption text-knust-lust font-medium">Pro Tip:</p>
                <p className="text-caption text-muted-foreground mt-1">
                  Apply the moment portal opens. Unity Hall fills in hours. Have fees ready!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}