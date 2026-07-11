'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

type CheckInStatus = 'IN_HALL' | 'OUT_HALL' | 'ON_LEAVE';

interface CheckIn {
  id: string;
  semester: string;
  academicYear: string;
  status: CheckInStatus;
  checkInAt: string;
  checkOutAt: string | null;
  location?: { building?: string; room?: string } | null;
}

export default function SemesterCheckInPage() {
  const { data: session } = useSession();
  const [checkIn, setCheckIn] = React.useState<CheckIn | null>(null);
  const [history, setHistory] = React.useState<CheckIn[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [checkingIn, setCheckingIn] = React.useState(false);
  const [checkingOut, setCheckingOut] = React.useState(false);
  const [semester, setSemester] = React.useState('');
  const [academicYear, setAcademicYear] = React.useState('');

  const fetchCheckIn = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/semester-checkin');
      if (!res.ok) throw new Error('Failed to fetch check-in status');
      const data = await res.json();
      setCheckIn(data.checkIn);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchCheckIn();
  }, [fetchCheckIn]);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!semester.trim() || !academicYear.trim()) {
      toast.error('Semester and academic year are required');
      return;
    }
    try {
      setCheckingIn(true);
      const res = await fetch('/api/semester-checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ semester, academicYear }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to check in');
      }
      toast.success('Checked in successfully');
      setSemester('');
      setAcademicYear('');
      fetchCheckIn();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to check in');
    } finally {
      setCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setCheckingOut(true);
      const res = await fetch('/api/semester-checkin', {
        method: 'PATCH',
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to check out');
      }
      toast.success('Checked out successfully');
      fetchCheckIn();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to check out');
    } finally {
      setCheckingOut(false);
    }
  };

  const statusConfig: Record<CheckInStatus, { label: string; color: string; icon: string }> = {
    IN_HALL: { label: 'In Hall', color: 'bg-green-500/10 text-green-600 border-green-500/20', icon: '🏠' },
    OUT_HALL: { label: 'Out of Hall', color: 'bg-red-500/10 text-red-600 border-red-500/20', icon: '🚪' },
    ON_LEAVE: { label: 'On Leave', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: '✈️' },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/unity-hall-drone.jpg" className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          </div>
          <div className="relative z-10 text-center">
            <motion.h1
              className="font-display text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Semester Check-in/out
            </motion.h1>
            <motion.p
              className="text-white/70 mt-4 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Manage your hall residence status
            </motion.p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {loading && (
              <Card className="animate-pulse">
                <CardContent className="p-8">
                  <div className="h-6 bg-muted rounded w-48 mb-4" />
                  <div className="h-4 bg-muted rounded w-32" />
                </CardContent>
              </Card>
            )}

            {error && (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-destructive mb-4">{error}</p>
                  <Button variant="outline" onClick={fetchCheckIn}>Try Again</Button>
                </CardContent>
              </Card>
            )}

            {!loading && !error && (
              <div className="grid lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Status</CardTitle>
                      <CardDescription>Your hall residence status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {checkIn ? (
                        <>
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                            <span className="text-3xl">{statusConfig[checkIn.status]?.icon || '📋'}</span>
                            <div>
                              <Badge className={cn('text-sm px-4 py-1', statusConfig[checkIn.status]?.color)}>
                                {statusConfig[checkIn.status]?.label || checkIn.status}
                              </Badge>
                              <p className="text-sm text-muted-foreground mt-1">
                                Checked in: {formatDate(checkIn.checkInAt)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {checkIn.semester} - {checkIn.academicYear}
                              </p>
                            </div>
                          </div>

                          {checkIn.status === 'IN_HALL' && (
                            <Button
                              variant="destructive"
                              className="w-full"
                              onClick={handleCheckOut}
                              loading={checkingOut}
                            >
                              Check Out
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="text-center py-8">
                            <span className="text-4xl mb-3 block">📋</span>
                            <p className="text-muted-foreground">No active check-in</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Check in to begin the semester
                            </p>
                          </div>

                          <form onSubmit={handleCheckIn} className="space-y-4">
                            <div>
                              <label className="label-field">Semester</label>
                              <Input
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                placeholder="e.g. First Semester"
                                required
                              />
                            </div>
                            <div>
                              <label className="label-field">Academic Year</label>
                              <Input
                                value={academicYear}
                                onChange={(e) => setAcademicYear(e.target.value)}
                                placeholder="e.g. 2025/2026"
                                required
                              />
                            </div>
                            <Button type="submit" className="w-full" loading={checkingIn}>
                              Check In
                            </Button>
                          </form>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>History</CardTitle>
                      <CardDescription>Your semester check-in records</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!checkIn && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No history yet</p>
                        </div>
                      )}
                      {checkIn && (
                        <div className="space-y-3">
                          {[checkIn].map((entry) => (
                            <motion.div
                              key={entry.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 rounded-lg bg-muted/50 flex items-center justify-between"
                            >
                              <div>
                                <p className="font-medium text-sm">{entry.semester}</p>
                                <p className="text-caption text-muted-foreground">{entry.academicYear}</p>
                                <p className="text-caption text-muted-foreground">
                                  In: {formatDate(entry.checkInAt)}
                                </p>
                                {entry.checkOutAt && (
                                  <p className="text-caption text-muted-foreground">
                                    Out: {formatDate(entry.checkOutAt)}
                                  </p>
                                )}
                              </div>
                              <Badge className={cn('text-[10px]', statusConfig[entry.status]?.color)}>
                                {statusConfig[entry.status]?.label}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
