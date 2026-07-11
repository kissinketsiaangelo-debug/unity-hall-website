'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Trophy,
  Star,
  Zap,
  Medal,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Users,
  Crown,
  Activity,
  Loader2,
} from 'lucide-react';

interface ScoreEntry {
  id: string;
  amount: number;
  reason: string;
  type: 'earned' | 'spent' | 'lost';
  createdAt: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  level: number;
  badge: string | null;
}

interface ContiScoreData {
  score: number;
  level: number;
  rank: number;
  nextLevelAt: number;
  history: ScoreEntry[];
  leaderboard: LeaderboardEntry[];
}

const MOCK_DATA: ContiScoreData = {
  score: 2840,
  level: 7,
  rank: 12,
  nextLevelAt: 3200,
  history: [
    { id: '1', amount: 150, reason: 'Hall event participation', type: 'earned', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '2', amount: 50, reason: 'Library hours (5hrs)', type: 'earned', createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: '3', amount: 200, reason: 'Community service', type: 'earned', createdAt: new Date(Date.now() - 259200000).toISOString() },
    { id: '4', amount: 75, reason: 'Noise violation fine', type: 'lost', createdAt: new Date(Date.now() - 345600000).toISOString() },
    { id: '5', amount: 100, reason: 'Sports team win bonus', type: 'earned', createdAt: new Date(Date.now() - 432000000).toISOString() },
    { id: '6', amount: 30, reason: 'Room inspection deduction', type: 'lost', createdAt: new Date(Date.now() - 518400000).toISOString() },
  ],
  leaderboard: [
    { rank: 1, name: 'Kwame A.', score: 5200, level: 12, badge: '🏆' },
    { rank: 2, name: 'Akua M.', score: 4850, level: 11, badge: '🥇' },
    { rank: 3, name: 'Yaw P.', score: 4320, level: 10, badge: '🥈' },
    { rank: 4, name: 'Esi B.', score: 3980, level: 9, badge: '🥉' },
    { rank: 5, name: 'Kofi D.', score: 3650, level: 9, badge: null },
    { rank: 6, name: 'Ama K.', score: 3410, level: 8, badge: null },
    { rank: 7, name: 'Nana O.', score: 3200, level: 8, badge: null },
    { rank: 8, name: 'Adwoa S.', score: 2980, level: 7, badge: null },
    { rank: 9, name: 'Kojo E.', score: 2750, level: 7, badge: null },
    { rank: 10, name: 'Abena F.', score: 2500, level: 6, badge: null },
  ],
};

const WAYS_TO_EARN = [
  { icon: Trophy, label: 'Hall Event Participation', points: '+100-300' },
  { icon: Star, label: 'Community Service', points: '+200' },
  { icon: Target, label: 'Academic Excellence', points: '+500' },
  { icon: Medal, label: 'Sports & Competitions', points: '+100-1000' },
  { icon: Users, label: 'Peer Mentoring', points: '+150' },
  { icon: Zap, label: 'Quick Tasks & Help', points: '+10-50' },
];

const levelColors = ['bg-gray-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-pink-500'];

function getLevelColor(level: number): string {
  return levelColors[level % levelColors.length]!;
}

export default function ContiScorePage() {
  const [data, setData] = useState<ContiScoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(false);

  const fetchScore = useCallback(async () => {
    try {
      const res = await fetch('/api/conti-score');
      if (res.ok) {
        const d = await res.json();
        setData(d);
        setIsMock(false);
      } else if (res.status === 404) {
        setData(MOCK_DATA);
        setIsMock(true);
        toast.info('Showing sample data');
      } else {
        setData(MOCK_DATA);
        setIsMock(true);
      }
    } catch {
      setData(MOCK_DATA);
      setIsMock(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-18 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-knust-lust" />
        </main>
        <Footer />
      </div>
    );
  }

  const progress = data ? Math.min((data.score / data.nextLevelAt) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative overflow-hidden bg-gradient-to-br from-knust-lust via-knust-lust/90 to-knust-gold/80">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
          <div className="container-custom relative z-10 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white border border-white/30 mb-6"
              >
                <Award className="h-4 w-4" />
                Gamification System
              </motion.div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Conti Score
              </h1>
              <p className="text-white/80 text-lg">
                Earn points, level up, and compete with fellow Continentals
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container-custom py-12">
          {data && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid gap-6 sm:grid-cols-3 mb-10"
              >
                <Card variant="gradient" padding="lg" className="text-center">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-center gap-2 text-knust-gold">
                      <Trophy className="h-5 w-5" />
                      Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-display text-5xl font-bold text-knust-gold">
                      {data.score.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>

                <Card variant="gradient" padding="lg" className="text-center">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-center gap-2 text-knust-lust">
                      <Zap className="h-5 w-5" />
                      Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center gap-3">
                      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg ${getLevelColor(data.level)}`}>
                        {data.level}
                      </span>
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-full rounded-full ${getLevelColor(data.level)}`}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {data.score} / {data.nextLevelAt} to next level
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="gradient" padding="lg" className="text-center">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-center gap-2 text-knust-charcoal">
                      <Crown className="h-5 w-5" />
                      Rank
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-display text-5xl font-bold text-knust-charcoal">
                      #{data.rank}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">on leaderboard</p>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid gap-8 lg:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2 space-y-6"
                >
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-knust-lust" />
                        Score History
                      </CardTitle>
                      <CardDescription>Recent point transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AnimatePresence>
                        {data.history.length === 0 ? (
                          <p className="text-center text-muted-foreground py-8">No transactions yet</p>
                        ) : (
                          <div className="space-y-3">
                            {data.history.map((entry, i) => (
                              <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`flex items-center justify-center w-9 h-9 rounded-full ${
                                    entry.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                                  }`}>
                                    {entry.type === 'earned' ? (
                                      <TrendingUp className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <TrendingDown className="h-4 w-4 text-red-500" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-knust-charcoal">{entry.reason}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(entry.createdAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <span className={`font-display font-bold text-sm ${
                                  entry.type === 'earned' ? 'text-green-600' : 'text-red-500'
                                }`}>
                                  {entry.type === 'earned' ? '+' : '-'}{entry.amount}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-knust-gold" />
                        Ways to Earn
                      </CardTitle>
                      <CardDescription>Boost your Conti Score</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {WAYS_TO_EARN.map((way, i) => (
                          <motion.div
                            key={way.label}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-knust-gold/10">
                              <way.icon className="h-4 w-4 text-knust-gold" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-knust-charcoal truncate">{way.label}</p>
                            </div>
                            <Badge variant="secondary" size="sm">{way.points}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-knust-lust" />
                        Leaderboard
                      </CardTitle>
                      <CardDescription>Top Continentals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {data.leaderboard.map((entry, i) => (
                          <motion.div
                            key={entry.rank}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
                              entry.rank === data.rank ? 'bg-knust-lust/5 border border-knust-lust/20' : 'hover:bg-muted/50'
                            }`}
                          >
                            <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              entry.rank <= 3 ? 'bg-knust-gold/20 text-knust-gold' : 'bg-muted text-muted-foreground'
                            }`}>
                              {entry.rank}
                            </span>
                            <span className="flex-shrink-0 text-lg">{entry.badge || ''}</span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${
                                entry.rank === data.rank ? 'text-knust-lust' : 'text-knust-charcoal'
                              }`}>
                                {entry.name}
                                {entry.rank === data.rank && ' (You)'}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-knust-charcoal">{entry.score.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">Lvl {entry.level}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {isMock && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-xs text-muted-foreground mt-8"
                >
                  Showing sample data. Sign in to see your actual Conti Score.
                </motion.p>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
