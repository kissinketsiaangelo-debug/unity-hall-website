'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, ShieldCheck, Heart, Users, Clock, Activity } from 'lucide-react';

interface HeadcountStats {
  active: boolean;
  totalResponded: number;
  safe: number;
  inDanger: number;
  totalStudents?: number;
  startedAt?: string;
}

export default function EmergencyPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<HeadcountStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);
  const [triggering, setTriggering] = useState(false);

  const fetchHeadcount = useCallback(async () => {
    try {
      const res = await fetch('/api/emergency');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        setStats(null);
      }
    } catch {
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeadcount();
  }, [fetchHeadcount]);

  const triggerHeadcount = async () => {
    setTriggering(true);
    try {
      const res = await fetch('/api/emergency', { method: 'POST' });
      if (res.ok) {
        toast.success('Emergency headcount triggered');
        fetchHeadcount();
      } else {
        toast.error('Failed to trigger headcount');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setTriggering(false);
    }
  };

  const respond = async (status: 'safe' | 'danger') => {
    setResponding(true);
    try {
      const res = await fetch('/api/emergency', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success(`Marked as ${status === 'safe' ? 'Safe' : 'In Danger'}`);
        fetchHeadcount();
      } else {
        toast.error('Failed to submit response');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setResponding(false);
    }
  };

  const isAdmin = session?.user?.role === 'admin';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative overflow-hidden bg-gradient-to-b from-red-950 via-red-900 to-red-800">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
          <div className="container-custom relative z-10 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-1.5 text-sm font-medium text-red-200 border border-red-400/30 mb-6"
              >
                <AlertTriangle className="h-4 w-4" />
                Emergency Response System
              </motion.div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Emergency Headcount
              </h1>
              <p className="text-red-200/80 text-lg max-w-2xl mx-auto">
                Real-time safety status for all Unity Hall residents
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container-custom py-12">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-20"
              >
                <Activity className="h-8 w-8 animate-spin text-knust-lust" />
              </motion.div>
            ) : stats?.active ? (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid gap-6 sm:grid-cols-3">
                  <Card variant="elevated" className="border-red-200 bg-red-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-red-700">
                        <Users className="h-5 w-5" />
                        Responded
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-display text-4xl font-bold text-red-700">
                        {stats.totalResponded}
                      </p>
                      <p className="text-sm text-red-600/70 mt-1">
                        {stats.totalStudents
                          ? `${Math.round((stats.totalResponded / stats.totalStudents) * 100)}% of residents`
                          : 'residents'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card variant="elevated" className="border-green-200 bg-green-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-green-700">
                        <ShieldCheck className="h-5 w-5" />
                        Safe
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-display text-4xl font-bold text-green-700">
                        {stats.safe}
                      </p>
                      <p className="text-sm text-green-600/70 mt-1">
                        {stats.totalResponded > 0
                          ? `${Math.round((stats.safe / stats.totalResponded) * 100)}% of responded`
                          : 'no responses yet'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card variant="elevated" className="border-amber-200 bg-amber-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-amber-700">
                        <Heart className="h-5 w-5" />
                        In Danger
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-display text-4xl font-bold text-amber-700">
                        {stats.inDanger}
                      </p>
                      <p className="text-sm text-amber-600/70 mt-1">
                        {stats.totalResponded > 0
                          ? `${Math.round((stats.inDanger / stats.totalResponded) * 100)}% of responded`
                          : 'no responses yet'}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {stats.startedAt && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Started {new Date(stats.startedAt).toLocaleString()}
                  </div>
                )}

                <Separator />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Button
                    size="xl"
                    variant="default"
                    onClick={() => respond('safe')}
                    disabled={responding}
                    loading={responding}
                    className="w-full sm:w-auto min-w-[200px] bg-green-600 hover:bg-green-700 shadow-glow"
                  >
                    <ShieldCheck className="h-6 w-6" />
                    I&apos;m Safe
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    onClick={() => respond('danger')}
                    disabled={responding}
                    className="w-full sm:w-auto min-w-[200px] border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white"
                  >
                    <Heart className="h-6 w-6" />
                    Need Help
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="inactive"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-lg mx-auto text-center"
              >
                <Card variant="outlined" className="border-red-200">
                  <CardContent className="py-12">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6"
                    >
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </motion.div>
                    <h2 className="font-display text-2xl font-bold text-knust-charcoal mb-2">
                      No Active Emergency
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      There is no active headcount at the moment. If you&apos;re an admin, you can trigger one.
                    </p>
                    {isAdmin && (
                      <Button
                        size="lg"
                        variant="default"
                        onClick={triggerHeadcount}
                        disabled={triggering}
                        loading={triggering}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <AlertTriangle className="h-5 w-5" />
                        Trigger Headcount
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="container-custom pb-16">
          <Card variant="gradient" padding="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-knust-lust" />
                Emergency Procedures
              </CardTitle>
              <CardDescription>
                Follow these steps during an emergency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { step: '1', title: 'Remain Calm', desc: 'Stay composed and assess your situation carefully' },
                  { step: '2', title: 'Respond', desc: 'Use the buttons above to indicate your safety status' },
                  { step: '3', title: 'Follow Instructions', desc: 'Wait for further instructions from hall authorities' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-knust-lust/10 text-knust-lust font-bold text-sm">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-knust-charcoal">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
