'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tilt, Floating } from '@/components/animations/ScrollAnimations';
import { KineticText } from '@/components/animations/KineticText';

const news = [
  {
    date: 'June 15, 2026',
    title: 'Unity Hall Alumni Association Launches GHS 9M Expansion Fund',
    desc: 'The Old Continentals Association (OCA) has officially launched a GHS 9 million fundraising campaign to construct a new annex block for Unity Hall. The project aims to add 500 bed spaces, a multipurpose hall, and modern dining facilities to address the critical overcrowding crisis that has seen occupancy rates exceed 500% in recent years.',
    category: 'Alumni',
    icon: '🏗️',
  },
  {
    date: 'May 20, 2026',
    title: 'Prof. Abaidoo Delivers 50th Jubilee Lecture',
    desc: 'Professor Samuel Abaidoo, a distinguished Continental and former Dean of the Faculty of Social Sciences, delivered the 50th anniversary lecture to a packed audience at the Great Hall. His lecture, titled "The Continental Legacy: Leadership, Unity, and the Path Forward," called for an end to unhealthy rivalry and a renewed focus on academic excellence and hall development.',
    category: 'Academic',
    icon: '🎓',
  },
  {
    date: 'April 10, 2026',
    title: 'Continental Radio Archives Digitised',
    desc: 'In a landmark preservation effort spanning 18 months, Continental Radio has completed the digitisation of over 50 years of broadcast history. The archive includes thousands of hours of news broadcasts, cultural programmes, musical performances, and historical recordings that document the evolution of Unity Hall and campus life since the 1970s.',
    category: 'Media',
    icon: '📻',
  },
  {
    date: 'March 5, 2026',
    title: 'Conti Week 2026 Breaks Attendance Records',
    desc: 'The annual Unity Hall Week celebration drew record crowds this year, with over 5,000 participants including students, alumni, and guests from across Ghana. Highlights included the grand Jama night featuring performances by renowned Ghanaian drummers, a health walk through Kumasi, and the awards dinner honouring distinguished Continentals.',
    category: 'Events',
    icon: '🎉',
  },
  {
    date: 'February 14, 2026',
    title: 'New Annex Block Construction Begins',
    desc: 'Construction has officially begun on the long-awaited Unity Hall Annex Block following the successful acquisition of building permits and initial funding from the alumni association. The four-storey structure will feature 120 rooms, modern sanitation facilities, a rooftop garden, and dedicated spaces for academic activities and student entrepreneurship.',
    category: 'Development',
    icon: '🏛️',
  },
  {
    date: 'January 8, 2026',
    title: 'Oldest Continental Celebrated at 95',
    desc: 'Unity Hall paid tribute to its oldest living alumnus, Mr. Joseph Asare-Bediako (Class of 1972), who celebrated his 95th birthday at his home in Kumasi. A delegation of current students and OCA executives presented him with a citation and a commemorative plaque honouring his lifetime of service to the Continental community and the nation.',
    category: 'Community',
    icon: '🎂',
  },
];

const events = [
  {
    date: 'Dec 18–20, 2026',
    title: 'Annual Homecoming',
    desc: 'The biggest Continental gathering of the year. Three days of reunion, celebration, and hall tours. Open to all past and present Continentals.',
    icon: '🏠',
    color: 'from-knust-lust/20 to-knust-gold/10',
  },
  {
    date: 'Nov 15, 2026',
    title: 'OCA Annual General Meeting',
    desc: 'The Old Continentals Association holds its yearly AGM to elect new executives, review financials, and set the agenda for the coming year. All paid-up members are eligible to vote.',
    icon: '🗳️',
    color: 'from-knust-gold/20 to-knust-lust/10',
  },
  {
    date: 'Oct 16, 2026',
    title: 'Founders Day Celebration',
    desc: 'Commemorating the founding of Unity Hall on October 16, 1968. A special ceremony at the Aboagyewaa grounds followed by a lecture and community dinner.',
    icon: '🕯️',
    color: 'from-knust-lust/20 to-knust-forest/10',
  },
  {
    date: 'Sep 25, 2026',
    title: 'Freshmen Orientation & Matriculation',
    desc: 'Welcoming the newest Continentals to the hall. A week of orientation activities, hall tours, tradition education, and the official matriculation ceremony for all freshers.',
    icon: '🎓',
    color: 'from-knust-forest/20 to-knust-gold/10',
  },
  {
    date: 'Aug 14, 2026',
    title: 'Inter-Hall Sports Competition',
    desc: 'Unity Hall hosts this year\'s inter-hall sports competition. Continental teams will compete in basketball, football, athletics, and table tennis against all other halls on campus.',
    icon: '⚽',
    color: 'from-knust-gold/20 to-knust-lust/10',
  },
  {
    date: 'Jul 10, 2026',
    title: 'Career Fair & Mentorship Summit',
    desc: 'A day of career exploration featuring panel discussions with Continental industry leaders, on-site internship recruitment, and the official launch of the 2026/2027 mentorship cohort.',
    icon: '💼',
    color: 'from-knust-lust/20 to-knust-gold/10',
  },
];

export function NewsEventsSection() {

  const [activeTab, setActiveTab] = React.useState<'news' | 'events'>('news');

  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={sectionRef}
      id="news"
      className="section-padding relative overflow-hidden"
      aria-labelledby="news-heading"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/conti-hall-week-2.jpg)', y: backgroundY }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--knust-lust)/4,transparent_70%)] pointer-events-none" />

      <div className="container-custom relative">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="primary" className="mb-4">
            News &amp; Events
          </Badge>
          <KineticText as="h2" id="news-heading" variant="headline" className="font-display text-display-xl font-bold gradient-text mb-4">
            Latest from Continental Community
          </KineticText>
          <p className="text-body-lg text-knust-cream/80 leading-relaxed">
            Stay informed with the latest developments, events, and stories from Unity Hall.
          </p>
        </motion.div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-white/10 border border-white/20 p-1.5">
            <button
              onClick={() => setActiveTab('news')}
              className={cn(
                'px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300',
                activeTab === 'news'
                  ? 'bg-gradient-to-r from-knust-lust to-knust-gold text-white shadow-glow'
                  : 'text-knust-cream/70 hover:text-knust-cream hover:bg-white/10'
              )}
            >
              News
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={cn(
                'px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300',
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-knust-lust to-knust-gold text-white shadow-glow'
                  : 'text-knust-cream/70 hover:text-knust-cream hover:bg-white/10'
              )}
            >
              Events
            </button>
          </div>
        </div>

        {activeTab === 'news' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {news.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Tilt maxTilt={4} scale={1.01}>
                  <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 group overflow-hidden">
                    <CardContent className="p-6 flex flex-col h-full">
                      <Floating amplitude={3} frequency={0.6} delay={index * 0.15}>
                        <div className="text-4xl mb-3">{article.icon}</div>
                      </Floating>
                      <div className="text-caption text-knust-lust font-mono mb-1">{article.date}</div>
                      <h3 className="font-display font-semibold text-headline-sm text-knust-cream mb-2 line-clamp-2 group-hover:text-knust-lust transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-body-sm text-knust-cream/70 leading-relaxed flex-1 mb-4">{article.desc}</p>
                      <Badge variant="secondary" className="self-start text-[10px]">{article.category}</Badge>
                    </CardContent>
                  </Card>
                </Tilt>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Tilt maxTilt={4} scale={1.01}>
                  <Card className={cn('h-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden', event.color)}>
                    <CardContent className="p-6 flex flex-col h-full">
                      <Floating amplitude={3} frequency={0.6} delay={index * 0.15}>
                        <div className="text-4xl mb-3">{event.icon}</div>
                      </Floating>
                      <div className="font-mono text-[10px] text-knust-gold uppercase tracking-wider mb-1">{event.date}</div>
                      <h3 className="font-display font-semibold text-headline-sm text-knust-cream mb-2">{event.title}</h3>
                      <p className="text-body-sm text-knust-cream/70 leading-relaxed flex-1">{event.desc}</p>
                    </CardContent>
                  </Card>
                </Tilt>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="flex justify-center mb-4">
                <img src="/images/unity-hall-knust-spring-gallery-1.jpg" alt="Unity Hall spring view" className="rounded-xl w-full h-48 object-cover shadow-lg" />
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl mb-3 block">📬</span>
                <h3 className="font-display font-bold text-headline-lg gradient-text">Stay Connected</h3>
                <p className="text-body-sm text-knust-cream/70 mt-2">
                  Subscribe to the Continental newsletter for monthly updates on hall news, events, alumni stories, and development projects.
                </p>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="newsletter-name" className="block text-sm font-medium text-knust-cream mb-1">Your Name</label>
                  <input
                    id="newsletter-name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-knust-cream placeholder:text-knust-cream/40 focus:outline-none focus:ring-2 focus:ring-knust-lust/50 text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newsletter-email" className="block text-sm font-medium text-knust-cream mb-1">Email Address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-knust-cream placeholder:text-knust-cream/40 focus:outline-none focus:ring-2 focus:ring-knust-lust/50 text-sm"
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="consent"
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/20 bg-white/10 text-knust-lust focus:ring-knust-lust"
                    required
                  />
                  <label htmlFor="consent" className="text-caption text-knust-cream/60">
                    I agree to receive email updates from Unity Hall Alumni Association
                  </label>
                </div>
                <Button type="submit" variant="default" className="w-full" size="lg">
                  Subscribe to Newsletter
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
