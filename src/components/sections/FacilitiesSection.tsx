'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tilt, Floating } from '@/components/animations/ScrollAnimations';
import { KineticText } from '@/components/animations/KineticText';

const facilityCategories = [
  {
    category: 'Residential',
    icon: '🏢',
    items: [
      { title: 'Twin Towers', desc: 'The iconic 12-storey towers that house over 1,500 residents. Each floor features communal spaces, study areas, and panoramic views of the KNUST campus and Kumasi city skyline.' },
      { title: 'Annex A & B', desc: 'Modern two-storey annex blocks providing additional accommodation for Continental students. Features include en-suite facilities and dedicated study rooms on each floor.' },
      { title: 'New Annex Block', desc: 'The newest addition to Unity Hall, equipped with contemporary furnishings, high-speed internet connectivity, and modern sanitation facilities to meet growing demand.' },
      { title: 'Senior Annex', desc: 'Accommodation designed for senior members and hall executives. Offers larger room configurations and private study spaces for academic focus.' },
    ],
  },
  {
    category: 'Sports & Recreation',
    icon: '⚽',
    items: [
      { title: 'Indoor Basketball Court', desc: 'A full-size indoor basketball court located between the Twin Towers. Hosts inter-hall competitions, evening pickup games, and serves as a venue for hall assemblies and events.' },
      { title: 'Volleyball Court', desc: 'Outdoor volleyball facility maintained for recreational play and hall team training. A popular spot for evening matches and social gatherings.' },
      { title: 'Table Tennis Arena', desc: 'Indoor table tennis facility equipped with professional-grade tables. A hub for friendly competition and home to the hall table tennis team.' },
      { title: 'Football Pitch', desc: 'Access to university football fields where Continental FC trains and competes. The team enjoys strong support from the hall community during matches.' },
    ],
  },
  {
    category: 'Media & Communication',
    icon: '📻',
    items: [
      { title: 'Continental Radio', desc: 'The first and only hall-owned radio station on any Ghanaian university campus. Broadcasting news, music, talk shows, and hall announcements 24/7 to the entire KNUST community.' },
      { title: 'Hall Library', desc: 'A well-stocked library with textbooks, reference materials, past examination papers, and a quiet reading room. Open to all Continentals for academic research and study.' },
      { title: 'ICT Centre', desc: 'A computer laboratory equipped with desktop computers, printing services, and high-speed internet. Essential for research, assignments, and online learning.' },
      { title: 'Printing Press', desc: 'On-demand printing and photocopying services for academic materials, project work, and hall publications. Run by students as part of the Conti Market enterprise.' },
    ],
  },
  {
    category: 'Commercial',
    icon: '🛒',
    items: [
      { title: 'Conti Market', desc: 'The vibrant internal marketplace of Unity Hall. A bustling hub where students purchase food, toiletries, clothing, and academic supplies without leaving the hall premises.' },
      { title: 'Food Court', desc: 'Multiple food vendors serving a variety of Ghanaian and continental dishes. From waakye and jollof to fried rice and light soup — the food court caters to every craving.' },
      { title: 'Barber Shop & Salon', desc: 'Full-service grooming facilities including barber shop and hair salon operated by skilled students and external professionals. Affordable rates for the hall community.' },
      { title: 'Provision Shop', desc: 'A well-stocked convenience store selling groceries, beverages, stationery, and everyday essentials. Open extended hours to serve the hall community.' },
    ],
  },
  {
    category: 'Spiritual & Cultural',
    icon: '🕯️',
    items: [
      { title: 'Aboagyewaa Grounds', desc: 'The sacred spiritual heart of Unity Hall. A protected area where annual rituals, libation pouring, and spiritual ceremonies are conducted. Revered by all Continentals as the hall\'s protective shrine.' },
      { title: 'Junior Common Room (JCR)', desc: 'The social nerve centre of the hall. Equipped with television, games, seating areas, and a relaxed atmosphere where Continentals gather to socialise, debate, and build lifelong friendships.' },
      { title: 'Prayer Grounds', desc: 'Dedicated spaces for Christian and Muslim prayers within the hall premises. Interfaith respect is a cornerstone of Continental values.' },
      { title: 'Conti Pavilion', desc: 'An open-air pavilion used for hall gatherings, cultural performances, and the legendary Friday Jama sessions. The pavilion echoes with the sounds of Continental chants.' },
    ],
  },
  {
    category: 'Infrastructure',
    icon: '⚡',
    items: [
      { title: '24/7 Electricity', desc: 'Reliable power supply to all hall facilities with backup generators ensuring uninterrupted lighting, study conditions, and appliance use throughout the academic year.' },
      { title: 'Water Supply', desc: 'Consistent water supply with storage tanks and borehole backup. Borehole water is treated and tested to ensure safe drinking water for all residents.' },
      { title: 'Security Post', desc: '24-hour security personnel and CCTV surveillance covering all entrances, common areas, and residential blocks. Access control ensures only authorised individuals enter the hall.' },
      { title: 'Waste Management', desc: 'Organised waste collection and disposal system. Colour-coded bins for recycling and general waste. Regular sanitation exercises keep the hall clean and hygienic.' },
    ],
  },
];

export function FacilitiesSection() {

  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="section-padding relative overflow-hidden"
      aria-labelledby="facilities-heading"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/conti-entrance-life.jpg)', y: backgroundY }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--knust-lust)/4,transparent_60%),radial-gradient(ellipse_at_bottom_right,var(--knust-gold)/4,transparent_60%)] pointer-events-none" />

      <div className="container-custom relative">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="secondary" className="mb-4 text-knust-cream border-knust-cream/30">
            Facilities
          </Badge>
          <KineticText as="h2" id="facilities-heading" variant="headline" className="font-display text-display-xl font-bold gradient-text mb-4">
            World-Class Facilities
          </KineticText>
          <p className="text-body-lg text-knust-cream/80 leading-relaxed">
            From Twin Towers to West Africa&apos;s first hall radio station — a campus within a campus.
          </p>
        </motion.div>

        <div className="flex justify-center mb-14">
          <img src="/images/unity-hall-exterior.jpg" alt="Unity Hall exterior" className="rounded-xl w-full max-w-5xl h-64 object-cover shadow-2xl" />
        </div>

        {facilityCategories.map((category, catIndex) => (
          <motion.div
            key={category.category}
            className="mb-14 last:mb-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{category.icon}</span>
              <h3 className="font-display font-bold text-headline-xl gradient-text">{category.category}</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-knust-lust/30 to-transparent" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {category.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Tilt maxTilt={5} scale={1.02}>
                    <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 group overflow-hidden">
                      <CardContent className="p-6 flex flex-col h-full">
                        <Floating amplitude={4} frequency={0.5} delay={index * 0.2}>
                          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-500">{item.title === 'Twin Towers' ? '🏢' : item.title === 'Annex A & B' ? '🏠' : item.title === 'New Annex Block' ? '🏗️' : item.title === 'Senior Annex' ? '🏛️' : item.title === 'Indoor Basketball Court' ? '🏀' : item.title === 'Volleyball Court' ? '🏐' : item.title === 'Table Tennis Arena' ? '🏓' : item.title === 'Football Pitch' ? '⚽' : item.title === 'Continental Radio' ? '📻' : item.title === 'Hall Library' ? '📚' : item.title === 'ICT Centre' ? '💻' : item.title === 'Printing Press' ? '🖨️' : item.title === 'Conti Market' ? '🛒' : item.title === 'Food Court' ? '🍽️' : item.title === 'Barber Shop & Salon' ? '💈' : item.title === 'Provision Shop' ? '🏪' : item.title === 'Aboagyewaa Grounds' ? '🗿' : item.title === 'Junior Common Room (JCR)' ? '🛋️' : item.title === 'Prayer Grounds' ? '🕌' : item.title === 'Conti Pavilion' ? '🎪' : item.title === '24/7 Electricity' ? '⚡' : item.title === 'Water Supply' ? '💧' : item.title === 'Security Post' ? '🛡️' : item.title === 'Waste Management' ? '♻️' : '📍'}</div>
                        </Floating>
                        <h4 className="font-display font-semibold text-headline-sm text-knust-cream mb-2">{item.title}</h4>
                        <p className="text-body-sm text-knust-cream/70 leading-relaxed flex-1">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
