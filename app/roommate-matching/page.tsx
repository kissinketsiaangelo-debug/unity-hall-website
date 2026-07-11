'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const BLOCKS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
const INTERESTS = [
  'Sports', 'Music', 'Gaming', 'Reading', 'Movies',
  'Fitness', 'Photography', 'Cooking', 'Art', 'Technology',
] as const;

interface Profile {
  sleepSchedule: string;
  studyHabits: string;
  cleanliness: number;
  quietHours: boolean;
  bio: string;
  course: string;
  yearOfStudy: string;
  interests: string[];
  preferredBlock: string;
}

interface Match {
  id: string;
  name: string;
  compatibility: number;
  bio: string;
  course: string;
  yearOfStudy: string;
  interests: string[];
  cleanliness: number;
  sleepSchedule: string;
}

export default function RoommateMatchingPage() {
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [matching, setMatching] = React.useState(false);
  const [matches, setMatches] = React.useState<Match[]>([]);
  const [showMatches, setShowMatches] = React.useState(false);

  const [sleepSchedule, setSleepSchedule] = React.useState('');
  const [studyHabits, setStudyHabits] = React.useState('');
  const [cleanliness, setCleanliness] = React.useState(3);
  const [quietHours, setQuietHours] = React.useState(false);
  const [bio, setBio] = React.useState('');
  const [course, setCourse] = React.useState('');
  const [yearOfStudy, setYearOfStudy] = React.useState('');
  const [interests, setInterests] = React.useState<string[]>([]);
  const [preferredBlock, setPreferredBlock] = React.useState('');

  const fetchProfile = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/roommate-matching/profile');
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      if (data) {
        setProfile(data);
        setSleepSchedule(data.sleepSchedule || '');
        setStudyHabits(data.studyHabits || '');
        setCleanliness(data.cleanliness || 3);
        setQuietHours(data.quietHours || false);
        setBio(data.bio || '');
        setCourse(data.course || '');
        setYearOfStudy(data.yearOfStudy || '');
        setInterests(data.interests || []);
        setPreferredBlock(data.preferredBlock || '');
      }
    } catch {
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch('/api/roommate-matching/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sleepSchedule,
          studyHabits,
          cleanliness,
          quietHours,
          bio,
          course,
          yearOfStudy,
          interests,
          preferredBlock,
        }),
      });
      if (!res.ok) throw new Error('Failed to save profile');
      const savedProfile = await res.json();
      setProfile(savedProfile);
      toast.success('Profile saved successfully');
    } catch {
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleFindMatches = async () => {
    try {
      setMatching(true);
      setShowMatches(true);
      const res = await fetch('/api/roommate-matching/match', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to find matches');
      const data = await res.json();
      setMatches(data);
      if (data.length === 0) {
        toast.info('No matches found yet');
      } else {
        toast.success(`Found ${data.length} potential match${data.length > 1 ? 'es' : ''}`);
      }
    } catch {
      toast.error('Failed to find matches. Please try again.');
    } finally {
      setMatching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/conti-entrance-life.jpg" className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          </div>
          <div className="relative z-10 text-center">
            <h1 className="font-display text-5xl font-bold text-white">Roommate Matching</h1>
            <p className="text-white/70 mt-4">Find the perfect roommate based on compatibility</p>
          </div>
        </section>

        <section className="relative section-padding">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--knust-lust)/5,transparent_60%)] pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-5 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-3"
              >
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="font-display text-display-sm">
                      {profile ? 'Edit Your Profile' : 'Set Up Your Profile'}
                    </CardTitle>
                    <CardDescription>
                      Tell us about your preferences to find compatible roommates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-12 rounded-xl bg-muted animate-pulse" />
                        ))}
                      </div>
                    ) : error ? (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">⚠️</div>
                        <p className="text-muted-foreground mb-4">{error}</p>
                        <Button variant="outline" onClick={fetchProfile}>Try Again</Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSaveProfile} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="label-field" htmlFor="course">Course</label>
                            <Input
                              id="course"
                              placeholder="e.g. Computer Science"
                              value={course}
                              onChange={(e) => setCourse(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="label-field" htmlFor="yearOfStudy">Year of Study</label>
                            <Input
                              id="yearOfStudy"
                              placeholder="e.g. Year 2"
                              value={yearOfStudy}
                              onChange={(e) => setYearOfStudy(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="label-field" htmlFor="sleepSchedule">Sleep Schedule</label>
                          <Input
                            id="sleepSchedule"
                            placeholder="e.g. Early bird (10PM - 5AM)"
                            value={sleepSchedule}
                            onChange={(e) => setSleepSchedule(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="label-field" htmlFor="studyHabits">Study Habits</label>
                          <Input
                            id="studyHabits"
                            placeholder="e.g. Library every evening"
                            value={studyHabits}
                            onChange={(e) => setStudyHabits(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="label-field">
                            Cleanliness: {cleanliness}/5
                          </label>
                          <input
                            type="range"
                            min={1}
                            max={5}
                            value={cleanliness}
                            onChange={(e) => setCleanliness(Number(e.target.value))}
                            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-knust-lust"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Messy</span>
                            <span>Very Clean</span>
                          </div>
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={quietHours}
                            onChange={(e) => setQuietHours(e.target.checked)}
                            className="h-5 w-5 rounded border-muted text-knust-lust focus:ring-knust-lust"
                          />
                          <span className="text-sm font-medium">I prefer quiet hours</span>
                        </label>

                        <div>
                          <label className="label-field">Interests (select all that apply)</label>
                          <div className="flex flex-wrap gap-2">
                            {INTERESTS.map((interest) => (
                              <button
                                key={interest}
                                type="button"
                                onClick={() => toggleInterest(interest)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                  interests.includes(interest)
                                    ? 'bg-knust-lust text-white'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                              >
                                {interest}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="label-field" htmlFor="preferredBlock">Preferred Block</label>
                          <select
                            id="preferredBlock"
                            className="input-field"
                            value={preferredBlock}
                            onChange={(e) => setPreferredBlock(e.target.value)}
                          >
                            <option value="">Any Block</option>
                            {BLOCKS.map((block) => (
                              <option key={block} value={block}>Block {block}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="label-field" htmlFor="bio">Bio</label>
                          <textarea
                            id="bio"
                            rows={3}
                            className="input-field resize-none"
                            placeholder="Tell potential roommates about yourself..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                          />
                        </div>

                        <div className="flex gap-3">
                          <Button type="submit" disabled={saving} className="flex-1">
                            {saving ? 'Saving...' : 'Save Profile'}
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={handleFindMatches}
                            disabled={matching}
                          >
                            {matching ? 'Finding...' : 'Find Matches'}
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-display-sm font-bold">Matches</h2>
                  {matches.length > 0 && (
                    <Badge variant="default">{matches.length} found</Badge>
                  )}
                </div>

                {!showMatches && (
                  <Card className="p-8 text-center">
                    <div className="text-4xl mb-4">👥</div>
                    <h3 className="font-display font-bold text-headline-sm mb-2">Find Your Match</h3>
                    <p className="text-muted-foreground">
                      Set up your profile and click &quot;Find Matches&quot; to get started
                    </p>
                  </Card>
                )}

                {showMatches && matching && (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-44 rounded-2xl bg-muted animate-pulse" />
                    ))}
                  </div>
                )}

                {showMatches && !matching && matches.length === 0 && (
                  <Card className="p-8 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="font-display font-bold text-headline-sm mb-2">No Matches Yet</h3>
                    <p className="text-muted-foreground">
                      Try updating your profile with more details
                    </p>
                  </Card>
                )}

                {showMatches && !matching && (
                  <AnimatePresence>
                    <div className="space-y-4">
                      {matches.map((match, i) => (
                        <motion.div
                          key={match.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Card className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-knust-lust/10 flex items-center justify-center text-knust-lust font-bold text-sm">
                                  {match.name.charAt(0)}
                                </div>
                                <div>
                                  <h3 className="font-display font-semibold">{match.name}</h3>
                                  <p className="text-xs text-muted-foreground">{match.course} &middot; {match.yearOfStudy}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-knust-lust">{match.compatibility}%</div>
                                <p className="text-xs text-muted-foreground">Match</p>
                              </div>
                            </div>
                            <Separator className="mb-3" />
                            <p className="text-body-sm text-muted-foreground line-clamp-2 mb-3">
                              {match.bio}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" size="sm">🌙 {match.sleepSchedule}</Badge>
                              <Badge variant="secondary" size="sm">🧹 {match.cleanliness}/5</Badge>
                              {match.interests.slice(0, 3).map((interest) => (
                                <Badge key={interest} variant="outline" size="sm">{interest}</Badge>
                              ))}
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
