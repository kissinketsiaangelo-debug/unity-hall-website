'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/ScrollAnimations';

const contactMethods = [
  { icon: '📍', title: 'Location', detail: 'Unity Hall, KNUST, Kumasi, Ghana' },
  { icon: '📞', title: 'Hall Office', detail: '+233 3220 60021' },
  { icon: '📧', title: 'Email', detail: 'unityhall@knust.edu.gh' },
  { icon: '📻', title: 'Continental Radio', detail: '96.1 FM' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/unity-hall-entrance.jpg" className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          </div>
          <div className="relative z-10 text-center">
            <h1 className="font-display text-5xl font-bold text-white">Contact & Support</h1>
            <p className="text-white/70 mt-4">Get in touch with the hall administration</p>
          </div>
        </section>
        <section className="relative section-padding">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--knust-lust)/5,transparent_60%)] pointer-events-none" />
          <div className="container-custom relative z-10">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 rounded-full bg-knust-lust/10 border border-knust-lust/20 px-4 py-2 mb-6">
                  <span className="text-sm font-semibold text-knust-lust">📞 Get in Touch</span>
                </div>
                <h2 className="font-display text-display-xl font-bold tracking-tight mb-4 gradient-text">
                  Contact & Support
                </h2>
                <p className="text-body-lg text-muted-foreground">
                  Reach out to the hall administration, report maintenance issues, or send us your feedback.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, i) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="gradient" className="text-center p-6">
                    <div className="text-4xl mb-4">{method.icon}</div>
                    <h3 className="font-display font-bold text-headline-sm mb-2">{method.title}</h3>
                    <p className="text-body-sm text-muted-foreground">{method.detail}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <h2 className="font-display text-display-md font-bold mb-6 gradient-text">Send Us a Message</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-field" htmlFor="name">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="label-field" htmlFor="email">Email</label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="label-field" htmlFor="subject">Subject</label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="label-field" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
