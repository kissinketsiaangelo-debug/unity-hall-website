'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tilt, Floating, Magnetic } from '@/components/animations/ScrollAnimations';
import { KineticText, MarqueeText } from '@/components/animations/KineticText';

const traditions = [
  {
    title: 'Aboagyewaa — The Spiritual Mother',
    desc: 'The sacred statue and holy ground at the heart of Unity Hall where annual rituals are performed. Aboagyewaa is believed to be the spiritual protector of all Continentals. Photography of the shrine is strictly prohibited and considered a grave offence. Students offer prayers and pour libations before examinations and major life events.',
    icon: '🗿',
    color: 'knust-lust',
    sacred: true,
  },
  {
    title: 'Morale Nights (Friday Jama)',
    desc: 'Weekly Friday night drumming, singing and chanting sessions that build the legendary Continental spirit. These electrifying gatherings feature traditional drumming, call-and-response chants, and the iconic Conti anthems that have been passed down through generations. Visitors from other halls often attend to witness the unmatched energy.',
    icon: '🥁',
    color: 'knust-gold',
    recurring: true,
  },
  {
    title: 'Lady in Red Taboo',
    desc: 'It is strictly forbidden to wear red attire anywhere within Unity Hall premises. This sacred taboo is tied to Aboagyewaa\'s red cloth and the belief that wearing red disrespects the hall\'s spiritual guardian. Students who accidentally wear red are required to perform a cleansing ritual before entering the hall.',
    icon: '🚫',
    color: 'destructive',
    taboo: true,
  },
  {
    title: 'Hall Anthem',
    desc: '"Conti (Unity Hall) — Anthem" is the official song of the Continentals. Composed by senior members decades ago, the anthem is sung at every major gathering, sporting event, and official ceremony. Every Continental is expected to know the lyrics by heart and sing with unwavering passion.',
    icon: '🎵',
    color: 'knust-lust',
    audio: true,
  },
  {
    title: 'Conti Market',
    desc: 'The internal economy of Unity Hall is a vibrant marketplace operating within the hall premises. It includes food vendors serving local cuisine, a printing press for academic materials, a supermarket for daily essentials, a barber shop, and various small businesses run by students and local entrepreneurs. It is the commercial heartbeat of the hall.',
    icon: '🛒',
    color: 'knust-gold',
    recurring: true,
  },
  {
    title: 'The Subana System',
    desc: 'A time-honoured mentorship system where senior students (Subanas) guide and support junior members through their academic journey. Subanas provide academic tutoring, career advice, and personal counselling. The bond between a Subana and their protégé often lasts well beyond graduation, creating lifelong Continental family ties.',
    icon: '🤝',
    color: 'knust-forest',
  },
  {
    title: 'I Am My Brother\'s Keeper',
    desc: 'The foundational philosophy of Unity Hall — a solemn commitment that every Continental looks out for their fellow hall member. This principle manifests in shared resources, group study sessions, financial support during emergencies, and the unwavering belief that a Continental never walks alone. It is the moral code that binds the hall together.',
    icon: '💪',
    color: 'knust-gold',
  },
  {
    title: 'Conti Week Celebrations',
    desc: 'The annual Hall Week is the biggest event on the Continental calendar. It features a week-long programme of academic lectures, cultural displays, sports competitions, a health walk, a grand dinner dance, and the legendary night of Jama that attracts thousands. Conti Week is when the entire Continental family — past and present — comes together.',
    icon: '🎉',
    color: 'knust-lust',
  },
  {
    title: 'The Continental Emblem',
    desc: 'The Unity Hall crest, featuring the Continental colours of lust and gold, is a symbol of identity worn with pride by every member. The emblem appears on hall attire, official documents, and is painted prominently at the hall entrance. It represents the values of unity, excellence, and the indomitable Continental spirit.',
    icon: '🔰',
    color: 'knust-forest',
  },
];

export function TraditionsSection() {

  return (
    <section id="traditions" className="section-padding relative overflow-hidden" aria-labelledby="traditions-heading">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/conti-hall-week-1.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="absolute inset-0 bg-grain opacity-3" />
      </div>

      <div className="container-custom relative z-10">
        <MarqueeText speed={25} className="mb-8 py-4 border-y border-knust-lust/20 bg-knust-lust/5">
          <div className="flex items-center gap-12 text-sm font-mono uppercase tracking-widest text-knust-lust/80">
            <span>✦ Aboagyewaa Protects ✦</span>
            <span>Lady in Red is Taboo ✦</span>
            <span>I Am My Brother&apos;s Keeper ✦</span>
            <span>The ONLY Gateway to KNUST ✦</span>
            <span>Once a Continental Always a Continental</span>
          </div>
        </MarqueeText>

        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="default" className="mb-4">
            Traditions
          </Badge>
          <KineticText as="h2" id="traditions-heading" variant="headline" className="font-display text-display-xl font-bold gradient-text mb-4">
            Living Heritage: Traditions
          </KineticText>
          <p className="text-body-lg text-muted-foreground leading-relaxed">
            Unity Hall isn&apos;t just a building — it&apos;s a living culture carried forward by every Continental.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {traditions.map((tradition, index) => (
            <Magnetic key={tradition.title} strength={0.15}>
              <Tilt maxTilt={6} scale={1.01} glare maxGlare={0.15}>
                <Card
                  variant={tradition.sacred ? 'gradient' : tradition.taboo ? 'outlined' : 'interactive'}
                  className={cn('h-full relative overflow-hidden', tradition.sacred && 'ring-1 ring-knust-lust/30', tradition.taboo && 'ring-1 ring-destructive/30')}
                >
                  <div className="flex items-center justify-center py-10">
                    <div className={cn(
                      'h-24 w-24 rounded-full flex items-center justify-center text-5xl',
                      tradition.color === 'knust-lust' && 'bg-knust-lust/20',
                      tradition.color === 'knust-gold' && 'bg-knust-gold/20',
                      tradition.color === 'destructive' && 'bg-destructive/20',
                      tradition.color === 'knust-forest' && 'bg-knust-forest/20',
                    )}>
                      <Floating amplitude={5} frequency={0.8} delay={index * 0.2}>
                        {tradition.icon}
                      </Floating>
                    </div>
                  </div>
                  <CardContent className="p-6 pt-0">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-display font-semibold text-headline-sm">
                        {tradition.title}
                      </h3>
                      {tradition.sacred && (
                        <Badge variant="destructive" className="text-[10px] shrink-0">SACRED</Badge>
                      )}
                      {tradition.taboo && (
                        <Badge variant="destructive" className="text-[10px] shrink-0">TABOO</Badge>
                      )}
                      {tradition.recurring && (
                        <Badge variant="secondary" className="text-[10px] shrink-0">RECURRING</Badge>
                      )}
                    </div>
                    <p className="text-body-sm text-muted-foreground leading-relaxed">
                      {tradition.desc}
                    </p>
                  </CardContent>
                </Card>
              </Tilt>
            </Magnetic>
          ))}
        </div>

        <div className="flex justify-center my-12">
          <img src="/images/conti-morale-night.jpg" alt="Continental morale night celebration" className="rounded-xl w-full max-w-4xl h-64 object-cover shadow-2xl" />
        </div>

        <motion.div
          className="mt-8 grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card variant="glass">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-knust-lust to-knust-gold flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl">🎵</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-headline-lg gradient-text">Hall Anthem</h3>
                  <p className="text-body-sm text-muted-foreground">The spirit of the Continentals</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-knust-lust/90 to-knust-gold/90 rounded-xl p-4">
                <audio controls className="w-full" style={{ height: '48px' }}>
                  <source src="/conti-anthem.mp3" type="audio/mpeg" />
                </audio>
              </div>
              <p className="text-caption text-muted-foreground/70 mt-4 text-center">
                "The ONLY Gateway to KNUST" — October 16, 1968
              </p>
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-knust-gold to-knust-lust flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl">▶</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-headline-lg gradient-text">Anthem Music Video</h3>
                  <p className="text-body-sm text-muted-foreground">On YouTube</p>
                </div>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden bg-black/50">
                <iframe
                  src="https://www.youtube.com/embed/pEZvq35ksDI"
                  title="Conti (Unity Hall) - Anthem"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card variant="gradient" className="ring-1 ring-knust-lust/30 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--knust-lust)/10,transparent_60%)] pointer-events-none" />
            <CardContent className="p-8 relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🗿</span>
                <div>
                  <h3 className="font-display font-bold text-headline-md gradient-text">Aboagyewaa — Respect the Sacred</h3>
                  <Badge variant="destructive" className="mt-1">SACRED TRADITION</Badge>
                </div>
              </div>
              <p className="text-body-sm text-muted-foreground leading-relaxed mb-4">
                Aboagyewaa is the spiritual mother of Unity Hall. The sacred grounds demand the utmost respect from every Continental. Photography is forbidden. Loud noise near the shrine is prohibited. Students are expected to approach the grounds with solemn reverence, especially during ritual periods.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-knust-lust/10 border border-knust-lust/20 text-center">
                  <div className="text-2xl mb-1">🚫</div>
                  <div className="text-caption font-semibold text-knust-lust">No Photography</div>
                </div>
                <div className="p-3 rounded-lg bg-knust-gold/10 border border-knust-gold/20 text-center">
                  <div className="text-2xl mb-1">🙏</div>
                  <div className="text-caption font-semibold text-knust-gold">Reverence Required</div>
                </div>
                <div className="p-3 rounded-lg bg-knust-lust/10 border border-knust-lust/20 text-center">
                  <div className="text-2xl mb-1">🔴</div>
                  <div className="text-caption font-semibold text-knust-lust">No Red Attire</div>
                </div>
                <div className="p-3 rounded-lg bg-knust-gold/10 border border-knust-gold/20 text-center">
                  <div className="text-2xl mb-1">🕯️</div>
                  <div className="text-caption font-semibold text-knust-gold">Annual Rituals</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
