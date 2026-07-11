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

type ItemType = 'LOST' | 'FOUND';
type ItemStatus = 'OPEN' | 'CLAIMED' | 'RESOLVED';

interface LostFoundItem {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  location: string;
  dateLost: string;
  images: string[];
  status: ItemStatus;
  createdAt: string;
}

const statusConfig: Record<ItemStatus, { label: string; variant: 'default' | 'success' | 'outline' }> = {
  OPEN: { label: 'Open', variant: 'default' },
  CLAIMED: { label: 'Claimed', variant: 'success' },
  RESOLVED: { label: 'Resolved', variant: 'outline' },
};

export default function LostAndFoundPage() {
  const [activeTab, setActiveTab] = React.useState<ItemType>('LOST');
  const [items, setItems] = React.useState<LostFoundItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [type, setType] = React.useState<ItemType>('LOST');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [dateLost, setDateLost] = React.useState('');

  const fetchItems = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/lost-and-found');
      if (!res.ok) throw new Error('Failed to fetch items');
      const data = await res.json();
      setItems(data);
    } catch {
      setError('Failed to load items. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = items.filter((item) => item.type === activeTab);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch('/api/lost-and-found', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, title, description, location, dateLost: dateLost || undefined }),
      });
      if (!res.ok) throw new Error('Failed to report item');
      const newItem = await res.json();
      setItems((prev) => [newItem, ...prev]);
      setTitle('');
      setDescription('');
      setLocation('');
      setDateLost('');
      toast.success('Item reported successfully');
    } catch {
      toast.error('Failed to report item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClaim = async (id: string) => {
    try {
      const res = await fetch(`/api/lost-and-found/${id}/claim`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to claim item');
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'CLAIMED' as ItemStatus } : item))
      );
      toast.success('Item claimed successfully');
    } catch {
      toast.error('Failed to claim item. Please try again.');
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
            <h1 className="font-display text-5xl font-bold text-white">Lost & Found</h1>
            <p className="text-white/70 mt-4">Report lost items or help others find what they lost</p>
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
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setType('LOST')}
                        className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all ${
                          type === 'LOST'
                            ? 'bg-knust-lust text-white shadow-glow'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        Lost Item
                      </button>
                      <button
                        onClick={() => setType('FOUND')}
                        className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all ${
                          type === 'FOUND'
                            ? 'bg-knust-gold text-knust-charcoal shadow-elevation-2'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        Found Item
                      </button>
                    </div>
                    <CardTitle className="font-display text-display-sm">
                      Report {type === 'LOST' ? 'Lost' : 'Found'} Item
                    </CardTitle>
                    <CardDescription>
                      {type === 'LOST'
                        ? 'Tell us what you lost and where'
                        : 'Help someone find their belonging'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="label-field" htmlFor="title">Title</label>
                        <Input
                          id="title"
                          placeholder={type === 'LOST' ? 'What did you lose?' : 'What did you find?'}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="description">Description</label>
                        <textarea
                          id="description"
                          rows={3}
                          className="input-field resize-none"
                          placeholder="Detailed description..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="location">Location</label>
                        <Input
                          id="location"
                          placeholder="Where was it lost/found?"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="dateLost">Date Lost/Found</label>
                        <Input
                          id="dateLost"
                          type="date"
                          value={dateLost}
                          onChange={(e) => setDateLost(e.target.value)}
                        />
                      </div>
                      <Button type="submit" disabled={submitting} className="w-full">
                        {submitting ? 'Reporting...' : `Report ${type === 'LOST' ? 'Lost' : 'Found'} Item`}
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
                <div className="flex items-center gap-2 mb-6">
                  <button
                    onClick={() => setActiveTab('LOST')}
                    className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all ${
                      activeTab === 'LOST'
                        ? 'bg-knust-lust text-white shadow-glow'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    🔍 Lost Items ({items.filter((i) => i.type === 'LOST').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('FOUND')}
                    className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all ${
                      activeTab === 'FOUND'
                        ? 'bg-knust-gold text-knust-charcoal shadow-elevation-2'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    📦 Found Items ({items.filter((i) => i.type === 'FOUND').length})
                  </button>
                </div>

                {loading && (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-28 rounded-2xl bg-muted animate-pulse" />
                    ))}
                  </div>
                )}

                {error && (
                  <Card className="p-8 text-center">
                    <div className="text-4xl mb-4">⚠️</div>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button variant="outline" onClick={fetchItems}>Try Again</Button>
                  </Card>
                )}

                {!loading && !error && filteredItems.length === 0 && (
                  <Card className="p-8 text-center">
                    <div className="text-4xl mb-4">{activeTab === 'LOST' ? '🔍' : '📦'}</div>
                    <h3 className="font-display font-bold text-headline-sm mb-2">
                      No {activeTab === 'LOST' ? 'Lost' : 'Found'} Items
                    </h3>
                    <p className="text-muted-foreground">
                      {activeTab === 'LOST'
                        ? 'No lost items reported yet'
                        : 'No found items reported yet'}
                    </p>
                  </Card>
                )}

                {!loading && !error && (
                  <AnimatePresence>
                    <div className="space-y-4">
                      {filteredItems.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Card className="p-5">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge
                                    variant={statusConfig[item.status].variant}
                                    size="sm"
                                  >
                                    {statusConfig[item.status].label}
                                  </Badge>
                                  <Badge variant={item.type === 'LOST' ? 'default' : 'secondary'} size="sm">
                                    {item.type === 'LOST' ? '🔍 Lost' : '📦 Found'}
                                  </Badge>
                                </div>
                                <h3 className="font-display font-semibold text-headline-sm">
                                  {item.title}
                                </h3>
                                <p className="text-body-sm text-muted-foreground mt-1 line-clamp-2">
                                  {item.description}
                                </p>
                                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                  <span>📍 {item.location}</span>
                                  {item.dateLost && <span>📅 {formatDate(item.dateLost)}</span>}
                                </div>
                              </div>
                              {item.type === 'FOUND' && item.status === 'OPEN' && (
                                <Button size="sm" onClick={() => handleClaim(item.id)}>
                                  Claim
                                </Button>
                              )}
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
