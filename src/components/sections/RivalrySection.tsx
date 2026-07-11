'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tilt, Magnetic } from '@/components/animations/ScrollAnimations';
import { KineticText } from '@/components/animations/KineticText';

const rivalryDimensions = [
  {
    icon: '👥',
    dim: 'Population',
    conti: 'Home to over 2,000 residents — the largest hall in West Africa with a massive Continental family spanning every region of Ghana.',
    katanga: 'Approximately 900 residents. Smaller in size but fiercely proud of their tight-knit community and exclusivity.',
  },
  {
    icon: '📜',
    dim: 'Tradition',
    conti: 'Aboagyewaa shrine, Friday Jama sessions, the Subana mentorship system, and the iconic Continental anthem. Traditions run deep and sacred.',
    katanga: 'Father John statue, Zombie Day, Zulu Day celebrations, and the Katanga anthem. A distinct cultural identity built around mining and endurance themes.',
  },
  {
    icon: '📚',
    dim: 'Academics',
    conti: 'Organised study circles, peer tutoring programmes, academic counselling through the Subana system, and well-stocked hall library. Continentals take academics seriously.',
    katanga: 'The "Reading Statues" culture where students study in outdoor spaces at all hours. Academic shrines and departmental study groups maintain high standards.',
  },
  {
    icon: '⚽',
    dim: 'Sports',
    conti: 'Dominant indoor basketball court between the Twin Towers. Strong football tradition with the Continental FC. Year-round inter-hall sports competitions.',
    katanga: 'Outdoor track and field excellence. Known for producing top athletes in athletics and field events. Strong presence in university sports meets.',
  },
  {
    icon: '🗳️',
    dim: 'Politics',
    conti: 'Strong alumni mobilisation network that influences SRC elections. Continentals hold significant positions in student governance year after year.',
    katanga: 'Historical political influence with a reputation for strategic campaigning and producing student leaders who ascend to national politics.',
  },
  {
    icon: '🔥',
    dim: 'Spirit',
    conti: '"The ONLY Gateway to KNUST" — a rallying cry that echoes at every gathering. Continental pride is unmatched, visible, and unapologetically loud.',
    katanga: '"Mine the Gold" — the battle cry of Katanga. A spirit forged in competition and the belief that their hall produces the finest graduates.',
  },
];

const incidents = [
  {
    year: '1970',
    event: 'Katanga Hall established as the second traditional hall on KNUST campus, immediately sparking a friendly but intense rivalry with Unity Hall that would define campus life for decades.',
    severity: 'Foundational',
  },
  {
    year: '1990s',
    event: 'Hall Week celebrations escalate as both halls compete to host the most elaborate events. Clashes during joint events lead to increased security measures and hall master interventions.',
    severity: 'Elevated',
  },
  {
    year: '2000s',
    event: 'SRC elections become a battleground for Continental and Katanga candidates. The political rivalry reaches new heights with both halls mobilising massive voter turnout campaigns.',
    severity: 'High',
  },
  {
    year: '2014',
    event: 'Vice-Chancellor threatens to convert both halls into mixed-gender residences following major clashes during hall week celebrations. The announcement sends shockwaves through both communities.',
    severity: 'High',
  },
  {
    year: '2015–2017',
    event: 'A stabbing incident between members of both halls escalates tensions to a critical level. University authorities impose curfews and increase security patrols around both halls.',
    severity: 'Critical',
  },
  {
    year: '2018',
    event: 'Both Unity Hall and Katanga Hall are officially converted from single-gender to mixed-gender residences amid legal battles and protests. The conversion transforms the social dynamics of both halls forever.',
    severity: 'Transformative',
  },
];

export function RivalrySection() {

  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={sectionRef}
      id="rivalry"
      className="section-padding relative overflow-hidden"
      aria-labelledby="rivalry-heading"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/conti-students-proce.jpg)', y: backgroundY }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--knust-lust)/8,transparent_60%),radial-gradient(ellipse_at_bottom_left,var(--knust-gold)/8,transparent_60%)] pointer-events-none" />

      <div className="container-custom relative">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="destructive" className="mb-4">
            Rivalry
          </Badge>
          <KineticText as="h2" id="rivalry-heading" variant="headline" className="font-display text-display-xl font-bold gradient-text mb-4">
            The Legendary Rivalry
          </KineticText>
          <p className="text-body-lg text-knust-cream/80 leading-relaxed">
            Two super-powers. One campus. Generations of legends. The Continental-Katanga rivalry forged an identity that transcends mere competition.
          </p>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display font-bold text-headline-lg text-knust-cream text-center mb-8">Conti vs Katanga: A Tale of Two Titans</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rivalryDimensions.map((dim, index) => (
              <Magnetic key={dim.dim} strength={0.15}>
                <Tilt maxTilt={5} scale={1.01}>
                  <Card className="h-full bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-knust-lust/20 flex items-center justify-center text-xl">
                          {dim.icon}
                        </div>
                        <h3 className="font-display font-bold text-headline-md text-knust-cream">{dim.dim}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-knust-lust/10 border border-knust-lust/20">
                          <div className="font-mono text-[10px] text-knust-lust uppercase tracking-wider mb-1">CONTI</div>
                          <div className="text-xs text-knust-cream/90 leading-relaxed">{dim.conti}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-knust-gold/10 border border-knust-gold/20">
                          <div className="font-mono text-[10px] text-knust-gold uppercase tracking-wider mb-1">KATANGA</div>
                          <div className="text-xs text-knust-cream/90 leading-relaxed">{dim.katanga}</div>
                        </div>
                      </div>
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
          <h3 className="font-display font-bold text-headline-lg gradient-text text-center mb-8">Key Moments in the Rivalry</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {incidents.map((incident, index) => (
              <motion.div
                key={incident.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
                  <CardContent className="p-6">
                    <div className="font-display font-bold text-headline-sm gradient-text mb-2">{incident.year}</div>
                    <p className="text-body-sm text-knust-cream/80 mb-3 leading-relaxed">{incident.event}</p>
                    <Badge
                      variant={incident.severity === 'Critical' ? 'destructive' : incident.severity === 'High' || incident.severity === 'Elevated' ? 'default' : incident.severity === 'Transformative' ? 'primary' : 'secondary'}
                      className="text-[10px]"
                    >
                      {incident.severity}
                    </Badge>
                  </CardContent>
                </Card>
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
          <h3 className="font-display font-bold text-headline-lg text-knust-cream text-center mb-8">A Healthy Competition</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">🏆</div>
                <h4 className="font-display font-bold text-headline-sm text-knust-cream mb-2">Academic Excellence</h4>
                <p className="text-body-sm text-knust-cream/70 leading-relaxed">
                  The rivalry pushes both halls to achieve higher academic standards. Continentals and Katangans alike strive to top the merit list, knowing their hall&apos;s reputation is on the line.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">🎭</div>
                <h4 className="font-display font-bold text-headline-sm text-knust-cream mb-2">Cultural Enrichment</h4>
                <p className="text-body-sm text-knust-cream/70 leading-relaxed">
                  Competition in cultural performances has led to the preservation and celebration of Ghanaian traditions. Both halls have developed rich artistic traditions that enrich campus life.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">🤝</div>
                <h4 className="font-display font-bold text-headline-sm text-knust-cream mb-2">Mutual Respect</h4>
                <p className="text-body-sm text-knust-cream/70 leading-relaxed">
                  Beneath the rivalry lies deep mutual respect. When crisis strikes, Continentals and Katangans stand together. The rivalry has forged a unique bond that defines KNUST student life.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="flex justify-center mb-8">
          <img src="/images/conti-katanga-jama-myjoyonline.jpg" alt="Conti and Katanga students united" className="rounded-xl w-full max-w-3xl h-72 object-cover shadow-2xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-knust-lust/20 via-transparent to-knust-gold/20 border-knust-lust/30 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--knust-lust)/8,transparent_70%)] pointer-events-none" />
            <CardContent className="p-10 relative">
              <div className="text-6xl mb-4">⚔️</div>
              <h3 className="font-display font-bold text-display-sm gradient-text mb-3">
                Two Halls, One KNUST Family
              </h3>
              <p className="text-body-md text-knust-cream/80 leading-relaxed mb-6">
                The Continental-Katanga rivalry is the heartbeat of KNUST campus life. It has produced leaders, built character, and created memories that last a lifetime. While we compete fiercely, we are united by our love for this great institution. The rivalry continues — and so does the legacy.
              </p>
              <div className="flex gap-4 justify-center">
                <Badge variant="destructive" size="lg">#ContiSpirit</Badge>
                <Badge variant="secondary" size="lg">#KatangaPride</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
