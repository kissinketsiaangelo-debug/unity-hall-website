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
import { formatDate } from '@/lib/utils';

const CATEGORIES = ['MAINTENANCE', 'ACADEMIC', 'ACCOMMODATION', 'SECURITY', 'DINING', 'OTHER'] as const;
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;

type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
type TicketCategory = (typeof CATEGORIES)[number];
type TicketPriority = (typeof PRIORITIES)[number];

interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
}

const statusConfig: Record<TicketStatus, { label: string; variant: 'default' | 'secondary' | 'success' | 'outline' }> = {
  OPEN: { label: 'Open', variant: 'default' },
  IN_PROGRESS: { label: 'In Progress', variant: 'secondary' },
  RESOLVED: { label: 'Resolved', variant: 'success' },
  CLOSED: { label: 'Closed', variant: 'outline' },
};

const priorityConfig: Record<TicketPriority, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  LOW: { label: 'Low', variant: 'outline' },
  MEDIUM: { label: 'Medium', variant: 'secondary' },
  HIGH: { label: 'High', variant: 'default' },
  URGENT: { label: 'Urgent', variant: 'destructive' },
};

export default function HelpdeskPage() {
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [subject, setSubject] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState<TicketCategory>('MAINTENANCE');
  const [priority, setPriority] = React.useState<TicketPriority>('MEDIUM');

  const fetchTickets = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/helpdesk');
      if (!res.ok) throw new Error('Failed to fetch tickets');
      const data = await res.json();
      setTickets(data);
    } catch {
      setError('Failed to load tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch('/api/helpdesk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, description, category, priority }),
      });
      if (!res.ok) throw new Error('Failed to submit ticket');
      const newTicket = await res.json();
      setTickets((prev) => [newTicket, ...prev]);
      setSubject('');
      setDescription('');
      setCategory('MAINTENANCE');
      setPriority('MEDIUM');
      toast.success('Ticket submitted successfully');
    } catch {
      toast.error('Failed to submit ticket. Please try again.');
    } finally {
      setSubmitting(false);
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
            <h1 className="font-display text-5xl font-bold text-white">Helpdesk</h1>
            <p className="text-white/70 mt-4">Submit and track support tickets for hall-related issues</p>
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
                className="lg:col-span-2"
              >
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="font-display text-display-sm">Submit a Ticket</CardTitle>
                    <CardDescription>Describe your issue and we&apos;ll get back to you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="label-field" htmlFor="subject">Subject</label>
                        <Input
                          id="subject"
                          placeholder="Brief summary of the issue"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="description">Description</label>
                        <textarea
                          id="description"
                          rows={4}
                          className="input-field resize-none"
                          placeholder="Detailed description of the issue..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="category">Category</label>
                        <select
                          id="category"
                          className="input-field"
                          value={category}
                          onChange={(e) => setCategory(e.target.value as TicketCategory)}
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label-field" htmlFor="priority">Priority</label>
                        <select
                          id="priority"
                          className="input-field"
                          value={priority}
                          onChange={(e) => setPriority(e.target.value as TicketPriority)}
                        >
                          {PRIORITIES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                      <Button type="submit" disabled={submitting} className="w-full">
                        {submitting ? 'Submitting...' : 'Submit Ticket'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-3"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-display-sm font-bold">Your Tickets</h2>
                  <Badge variant="default">{tickets.length} total</Badge>
                </div>

                {loading && (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse" />
                    ))}
                  </div>
                )}

                {error && (
                  <Card className="p-8 text-center">
                    <div className="text-4xl mb-4">⚠️</div>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button variant="outline" onClick={fetchTickets}>Try Again</Button>
                  </Card>
                )}

                {!loading && !error && tickets.length === 0 && (
                  <Card className="p-8 text-center">
                    <div className="text-4xl mb-4">🎫</div>
                    <h3 className="font-display font-bold text-headline-sm mb-2">No Tickets Yet</h3>
                    <p className="text-muted-foreground">Submit your first ticket above</p>
                  </Card>
                )}

                {!loading && !error && (
                  <AnimatePresence>
                    <div className="space-y-4">
                      {tickets.map((ticket, i) => (
                        <motion.div
                          key={ticket.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Card className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1 min-w-0 mr-4">
                                <h3 className="font-display font-semibold text-headline-sm truncate">
                                  {ticket.subject}
                                </h3>
                                <p className="text-body-sm text-muted-foreground mt-1 line-clamp-2">
                                  {ticket.description}
                                </p>
                              </div>
                              <Badge variant={statusConfig[ticket.status].variant}>
                                {statusConfig[ticket.status].label}
                              </Badge>
                            </div>
                            <Separator className="mb-3" />
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <Badge variant={priorityConfig[ticket.priority].variant} size="sm">
                                {priorityConfig[ticket.priority].label}
                              </Badge>
                              <span>{ticket.category}</span>
                              <span className="ml-auto">{formatDate(ticket.createdAt)}</span>
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
