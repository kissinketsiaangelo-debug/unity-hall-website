'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tilt, Magnetic } from '@/components/animations/ScrollAnimations';
import { KineticText } from '@/components/animations/KineticText';

const notableAlumni = [
  {
    name: 'Dr. Kwame Asante',
    role: 'Chief Executive Officer, Ghana National Petroleum Corporation',
    era: '1980s',
    initials: 'KA',
    quote: 'Unity Hall taught me that leadership is service. Every drumbeat at Jama reminded us that we are part of something bigger than ourselves.',
  },
  {
    name: 'Prof. Yaa Mensah-Bonsu',
    role: 'Vice-Chancellor, University of Cape Coast',
    era: '1990s',
    initials: 'YM',
    quote: 'The Continental spirit of excellence pushed me to pursue the highest academic heights. I owe my career to the foundation I built at Unity Hall.',
  },
  {
    name: 'Nana Akwasi Agyeman',
    role: 'Managing Director, Ghana Airways Corporation',
    era: '1980s',
    initials: 'NA',
    quote: 'From the Conti Market to the boardroom — the entrepreneurial spirit of Unity Hall prepared me for the business world.',
  },
  {
    name: 'Dr. Afua Serwaa Bonsu',
    role: 'Chief Medical Director, Korle Bu Teaching Hospital',
    era: '1990s',
    initials: 'AS',
    quote: 'The discipline and camaraderie of Unity Hall shaped my approach to medicine. Teamwork, compassion, and excellence — all Continental values.',
  },
  {
    name: 'Hon. Samuel Osei-Poku',
    role: 'Member of Parliament, Kumasi Central Constituency',
    era: '2000s',
    initials: 'SO',
    quote: 'The political debates in the JCR prepared me for the floor of Parliament. Continentals are born leaders.',
  },
  {
    name: 'Ing. Patricia Akua Owusu',
    role: 'Director of Engineering, Ghana Grid Company',
    era: '2000s',
    initials: 'PA',
    quote: 'As one of the first female engineers from Unity Hall, I carry the Continental banner with pride. The hall gave me confidence to break barriers.',
  },
];

const ocaExecutives = [
  { name: 'Nana Yaw Asare', role: 'National President', initials: 'NY' },
  { name: 'Akosua Manu', role: 'National Vice President', initials: 'AM' },
  { name: 'Dr. Kwasi Boakye', role: 'National Secretary', initials: 'KB' },
  { name: 'Mawusi Adjei', role: 'National Treasurer', initials: 'MA' },
];

export function AlumniSection() {

  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={sectionRef}
      id="alumni"
      className="section-padding relative overflow-hidden"
      aria-labelledby="alumni-heading"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/conti-courtyard.jpg)', y: backgroundY }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--knust-lust)/3,transparent_60%),radial-gradient(ellipse_at_bottom_right,var(--knust-gold)/3,transparent_60%)] pointer-events-none" />

      <div className="container-custom relative">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="secondary" className="mb-4 text-knust-cream border-knust-cream/30">
            Alumni
          </Badge>
          <KineticText as="h2" id="alumni-heading" variant="headline" className="font-display text-display-xl font-bold gradient-text mb-4">
            The Continental Network
          </KineticText>
          <p className="text-body-lg text-knust-cream/80 leading-relaxed">
            Once a Continental, always a Continental. Join 50+ years of excellence spanning every sector of Ghanaian and global society.
          </p>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display font-bold text-headline-lg gradient-text text-center mb-8">Notable Continentals</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notableAlumni.map((alumnus, index) => (
              <motion.div
                key={alumnus.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Magnetic strength={0.1}>
                  <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar size="xl" className="ring-2 ring-knust-lust/30">
                          <AvatarFallback className="bg-gradient-to-br from-knust-lust to-knust-gold text-white text-lg font-bold">
                            {alumnus.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-semibold text-headline-sm text-knust-cream truncate">{alumnus.name}</h4>
                          <p className="text-body-sm text-knust-cream/60">{alumnus.role}</p>
                          <Badge variant="default" className="mt-1 text-[10px]">{alumnus.era}</Badge>
                        </div>
                      </div>
                      <p className="text-body-sm text-knust-cream/70 italic leading-relaxed border-t border-white/10 pt-3">
                        &ldquo;{alumnus.quote}&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </Magnetic>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-8">
            <img src="/images/unity-hall-transnational-arch-group.jpg" alt="Old Continentals Association gathering" className="rounded-xl w-full max-w-3xl h-64 object-cover shadow-2xl" />
          </div>
          <div className="text-center mb-8">
            <h3 className="font-display font-bold text-headline-lg gradient-text">Old Continentals Association (OCA)</h3>
            <p className="text-body-md text-knust-cream/70 mt-2">The official alumni body uniting Continentals worldwide</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                <h4 className="font-display font-bold text-headline-md text-knust-cream mb-4">About OCA</h4>
                <p className="text-body-sm text-knust-cream/70 leading-relaxed mb-4">
                  The Old Continentals Association (OCA) is the official alumni organisation for all past residents of Unity Hall. Established in 1985, OCA has grown into a powerful network of professionals, executives, and leaders spanning every continent.
                </p>
                <p className="text-body-sm text-knust-cream/70 leading-relaxed mb-4">
                  OCA organises annual homecoming events, fundraising campaigns for hall development projects, mentorship programmes pairing alumni with current students, and regional chapters that keep Continentals connected no matter where they are in the world.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary" className="text-[10px]">50+ Years</Badge>
                  <Badge variant="secondary" className="text-[10px]">Global Network</Badge>
                  <Badge variant="default" className="text-[10px]">Mentorship</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                <h4 className="font-display font-bold text-headline-md text-knust-cream mb-4">National Executive Council</h4>
                <div className="space-y-3">
                  {ocaExecutives.map((exec) => (
                    <div key={exec.name} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                      <Avatar size="md">
                        <AvatarFallback className="bg-knust-lust/20 text-knust-lust text-sm font-bold">
                          {exec.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-display font-semibold text-headline-xs text-knust-cream">{exec.name}</div>
                        <div className="text-caption text-knust-cream/60">{exec.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          className="mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="font-display font-bold text-headline-lg gradient-text">Mentorship Programme</h3>
            <p className="text-body-md text-knust-cream/70 mt-2">Connecting Continental students with industry leaders</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-display font-semibold text-headline-sm text-knust-cream mb-2">Career Guidance</h4>
                <p className="text-body-sm text-knust-cream/70 leading-relaxed">
                  Alumni mentors provide one-on-one career counselling, resume reviews, and interview preparation to help current students launch successful careers.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">💼</div>
                <h4 className="font-display font-semibold text-headline-sm text-knust-cream mb-2">Internship Placements</h4>
                <p className="text-body-sm text-knust-cream/70 leading-relaxed">
                  OCA connects students with internship and job shadowing opportunities at leading organisations across Ghana and internationally.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">🌐</div>
                <h4 className="font-display font-semibold text-headline-sm text-knust-cream mb-2">Network Building</h4>
                <p className="text-body-sm text-knust-cream/70 leading-relaxed">
                  Regular networking events, industry talks, and social gatherings help students build professional relationships that last a lifetime.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          className="mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="font-display font-bold text-headline-lg gradient-text">Giving Campaign</h3>
            <p className="text-body-md text-knust-cream/70 mt-2">Support the next generation of Continentals</p>
          </div>
          <Card className="bg-gradient-to-br from-knust-lust/10 via-transparent to-knust-gold/10 border-knust-lust/20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--knust-lust)/6,transparent_70%)] pointer-events-none" />
            <CardContent className="p-8 relative">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="font-display font-bold text-headline-lg text-knust-cream mb-3">GHS 9M Expansion Fund</h4>
                  <p className="text-body-sm text-knust-cream/70 leading-relaxed mb-4">
                    Unity Hall is launching the most ambitious development project in its history — a GHS 9 million expansion fund to construct a new annex block that will address the critical overcrowding crisis. With over 500% occupancy rates, our current facilities can no longer accommodate the growing demand for Continental residency.
                  </p>
                  <p className="text-body-sm text-knust-cream/70 leading-relaxed mb-4">
                    The new block will feature modern accommodation for 500 additional students, a multipurpose hall, expanded dining facilities, and dedicated spaces for academic activities. Every contribution — no matter the size — brings us closer to giving more students the transformative Continental experience.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="primary" className="text-[10px]">GHS 9M Goal</Badge>
                    <Badge variant="secondary" className="text-[10px]">500 New Beds</Badge>
                    <Badge variant="default" className="text-[10px]">Modern Facilities</Badge>
                  </div>
                  <Button variant="default" size="lg">Donate Now</Button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className="text-5xl font-bold gradient-text mb-1">GHS 2.4M</div>
                    <div className="text-body-sm text-knust-cream/60">Raised So Far</div>
                    <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[27%] rounded-full bg-gradient-to-r from-knust-lust to-knust-gold" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-bold gradient-text">247</div>
                      <div className="text-caption text-knust-cream/60">Donors</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-2xl font-bold gradient-text">6</div>
                      <div className="text-caption text-knust-cream/60">Months Left</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mb-16 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display font-bold text-headline-lg gradient-text mb-4">Homecoming 2026</h3>
          <p className="text-body-md text-knust-cream/70 leading-relaxed max-w-2xl mx-auto mb-6">
            Mark your calendars! The annual Continental Homecoming returns on December 18–20, 2026. Three days of celebration, reflection, and reconnection. Reunite with old friends, tour the newly renovated facilities, and participate in the grand Jama night under the stars.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <Badge variant="primary" size="lg">December 18-20, 2026</Badge>
            <Badge variant="secondary" size="lg">KNUST Campus</Badge>
            <Badge variant="default" size="lg">All Continentals Welcome</Badge>
          </div>
          <Button variant="default" size="xl">Register for Homecoming</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <span className="text-4xl mb-3 block">🎓</span>
                <h3 className="font-display font-bold text-headline-lg gradient-text">Join the Alumni Network</h3>
                <p className="text-body-sm text-knust-cream/70 mt-2">
                  Stay connected with old friends, mentor current students, receive updates on hall developments, and support the GHS 9M expansion campaign.
                </p>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-knust-cream mb-1">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-knust-cream placeholder:text-knust-cream/40 focus:outline-none focus:ring-2 focus:ring-knust-lust/50 text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-knust-cream mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-knust-cream placeholder:text-knust-cream/40 focus:outline-none focus:ring-2 focus:ring-knust-lust/50 text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="gradYear" className="block text-sm font-medium text-knust-cream mb-1">Graduation Year</label>
                  <input
                    id="gradYear"
                    type="text"
                    placeholder="e.g. 2020"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-knust-cream placeholder:text-knust-cream/40 focus:outline-none focus:ring-2 focus:ring-knust-lust/50 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-knust-cream mb-1">Course of Study</label>
                  <input
                    id="course"
                    type="text"
                    placeholder="e.g. BSc. Civil Engineering"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-knust-cream placeholder:text-knust-cream/40 focus:outline-none focus:ring-2 focus:ring-knust-lust/50 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="chapter" className="block text-sm font-medium text-knust-cream mb-1">Regional Chapter</label>
                  <select
                    id="chapter"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-knust-cream focus:outline-none focus:ring-2 focus:ring-knust-lust/50 text-sm"
                  >
                    <option value="" className="bg-knust-charcoal">Select your chapter</option>
                    <option value="greater-accra" className="bg-knust-charcoal">Greater Accra</option>
                    <option value="ashanti" className="bg-knust-charcoal">Ashanti</option>
                    <option value="western" className="bg-knust-charcoal">Western</option>
                    <option value="eastern" className="bg-knust-charcoal">Eastern</option>
                    <option value="northern" className="bg-knust-charcoal">Northern</option>
                    <option value="international" className="bg-knust-charcoal">International</option>
                  </select>
                </div>
                <Button type="submit" variant="default" className="w-full" size="lg">
                  Register Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
