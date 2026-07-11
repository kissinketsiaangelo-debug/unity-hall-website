'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tilt, Magnetic, Floating } from '@/components/animations/ScrollAnimations';
import { KineticText } from '@/components/animations/KineticText';

const milestones = [
  {
    year: '1968',
    title: 'Founded',
    icon: '🏛️',
    description: 'Unity Hall opened its doors on October 16, 1968 as Continental Unity Hall, the first traditional hall on the KNUST campus. Its founding marked the beginning of a legacy that would shape student life for generations.',
    color: 'from-knust-lust/20 to-knust-gold/10',
  },
  {
    year: '1970s',
    title: 'The Golden Age',
    icon: '🌟',
    description: 'The hall established its identity as "The ONLY Gateway to KNUST" with the founding of iconic traditions including the Friday Jama sessions, the Aboagyewaa shrine, and the hall anthem that still echoes through the corridors today.',
    color: 'from-knust-gold/20 to-knust-lust/10',
  },
  {
    year: '1990s',
    title: 'Continental Radio',
    icon: '📻',
    description: 'Continental Radio was established, becoming the first and only hall-owned radio station on any Ghanaian university campus. It gave Continentals a voice and a platform to broadcast hall pride, news, and entertainment.',
    color: 'from-knust-lust/20 to-knust-forest/10',
  },
  {
    year: '2000s',
    title: 'Expansion Era',
    icon: '🏗️',
    description: 'New annex blocks were constructed to accommodate the growing student population, including the iconic twin towers that now dominate the KNUST skyline. Unity Hall solidified its position as the largest hall on campus.',
    color: 'from-knust-forest/20 to-knust-gold/10',
  },
  {
    year: '2017',
    title: 'Hall Week Revival',
    icon: '🎭',
    description: 'The annual Conti Week celebration was revived with unprecedented pomp and pageantry, drawing alumni from across the globe. The event featured cultural displays, sports competitions, and the legendary Jama night.',
    color: 'from-knust-gold/20 to-knust-lust/10',
  },
  {
    year: '2018',
    title: 'Converted to Mixed Hall',
    icon: '🔄',
    description: 'In a landmark decision by the university, Unity Hall was converted from all-male to mixed-gender residence. The transition brought new energy and diversity to the hall while preserving its cherished traditions.',
    color: 'from-knust-lust/20 to-knust-gold/10',
  },
  {
    year: '2019',
    title: '50th Golden Jubilee',
    icon: '🥇',
    description: 'Unity Hall celebrated its Golden Jubilee with a year-long series of events honouring five decades of Continental excellence, including a grand dinner, academic lectures, and the commissioning of new hall projects.',
    color: 'from-knust-gold/20 to-knust-forest/10',
  },
  {
    year: 'Present Day',
    title: 'Largest in West Africa',
    icon: '🌍',
    description: 'With over 2,000 residents across multiple blocks, Unity Hall stands as the largest residence hall in West Africa. Its legacy continues to grow, producing leaders who shape Ghana and beyond.',
    color: 'from-knust-lust/20 to-knust-gold/10',
  },
];

const architects = [
  {
    name: 'Dr. Joseph K. Mensah',
    role: 'First Hall Master (1968–1975)',
    achievements: [
      'Led the foundational vision of Unity Hall as a "home away from home" for students from all regions of Ghana',
      'Established the hall\'s first constitution, governance structures, and disciplinary framework',
      'Pioneered the mentorship culture known as the Subana system that pairs senior and junior students',
      'Secured government funding for the construction of the iconic Twin Towers that define the KNUST skyline',
      'Launched academic support programmes including tutorial nights and the hall library initiative',
    ],
    quote: 'Unity Hall was conceived not merely as a residential facility, but as a forge of character, discipline, and the undying Continental spirit that binds generations together.',
  },
  {
    name: 'Prof. E. A. Addo',
    role: 'Second Hall Master (1975–1982)',
    achievements: [
      'Oversaw the expansion of hall facilities including the construction of the JCR and dining hall complex',
      'Established Continental Radio as the hall\'s media voice, the first hall-owned radio station in Ghana',
      'Strengthened ties between Unity Hall and the broader university community through inter-hall collaborations',
      'Introduced the annual Hall Week celebrations which evolved into the vibrant Conti Week tradition',
      'Mentored a generation of Continental leaders who went on to become prominent figures in Ghanaian society',
    ],
    quote: 'The Continental spirit is not taught — it is caught. It lives in every chant, every song, and every act of solidarity that defines who we are.',
  },
];

export function AboutSection() {

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden" aria-labelledby="about-heading">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src="/images/unity-hall-drone.jpg" alt="" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />

      <div className="container-custom relative z-10 py-24">
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="primary" className="mb-4">
            About
          </Badge>
          <KineticText as="h2" id="about-heading" variant="headline" className="font-display text-display-xl font-bold text-white mb-4">
            About Unity Hall
          </KineticText>
          <p className="text-body-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
            From its founding in 1968 to becoming the largest residence hall in West Africa — a legacy of excellence, tradition, and Continental pride.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Tilt maxTilt={4} scale={1.01}>
                <Card className={cn('h-full backdrop-blur-sm bg-white/10 border-white/20 text-center overflow-hidden', milestone.color)}>
                  <CardContent className="p-6 flex flex-col items-center h-full">
                    <Floating amplitude={5} frequency={0.8} delay={index * 0.2}>
                      <div className="text-5xl mb-3">{milestone.icon}</div>
                    </Floating>
                    <div className="font-display font-bold text-display-lg text-white mb-1">{milestone.year}</div>
                    <div className="font-display font-semibold text-headline-sm text-white/90 mb-2">{milestone.title}</div>
                    <p className="text-body-sm text-white/70 leading-relaxed">{milestone.description}</p>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          ))}
          </div>

        <div className="flex justify-center my-12">
          <img src="/images/unity-hall-transnational-arch-group.jpg" alt="Unity Hall architectural legacy" className="rounded-xl w-full max-w-4xl h-64 object-cover shadow-2xl" />
        </div>

        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display font-bold text-display-md text-white text-center mb-12">
            The Architects of Continental Legacy
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {architects.map((architect, index) => (
              <motion.div
                key={architect.name}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Magnetic strength={0.1}>
                  <Card className="backdrop-blur-sm bg-white/10 border-white/20 h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-knust-lust to-knust-gold flex items-center justify-center text-white text-2xl font-bold shrink-0">
                          {architect.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-headline-md text-white">{architect.name}</h4>
                          <p className="text-body-sm text-white/60">{architect.role}</p>
                        </div>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {architect.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 text-body-sm text-white/80">
                            <span className="text-knust-gold mt-0.5 shrink-0">✦</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-white/10 pt-4 mt-auto">
                        <p className="text-body-sm text-knust-gold/80 italic leading-relaxed">
                          &ldquo;{architect.quote}&rdquo;
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Magnetic>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
