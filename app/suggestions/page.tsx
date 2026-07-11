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
import { formatRelativeTime } from '@/lib/utils';

const CATEGORIES = ['FACILITIES', 'PROGRAMS', 'DINING', 'SECURITY', 'WELFARE', 'OTHER'] as const;

type SuggestionStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'IMPLEMENTED' | 'DECLINED';
type SuggestionCategory = (typeof CATEGORIES)[number];

interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: SuggestionCategory;
  status: SuggestionStatus;
  votes: number;
  createdAt: string;
  userVoted?: boolean;
}

const statusConfig: Record<SuggestionStatus, { label: string; variant: 'default' | 'secondary' | 'success' | 'outline' | 'destructive' }> = {
  PENDING: { label: 'Pending', variant: 'outline' },
  UNDER_REVIEW: { label: 'Under Review', variant: 'secondary' },
  APPROVED: { label: 'Approved', variant: 'default' },
  IMPLEMENTED: { label: 'Implemented', variant: 'success' },
  DECLINED: { label: 'Declined', variant: 'destructive' },
};

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState<SuggestionCategory>('FACILITIES');

  const fetchSuggestions = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/suggestions');
      if (!res.ok) throw new Error('Failed to fetch suggestions');
      const data = await res.json();
      setSuggestions(data);
    } catch {
      setError('Failed to load suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, category }),
      });
      if (!res.ok) throw new Error('Failed to submit suggestion');
      const newSuggestion = await res.json();
      setSuggestions((prev) => [newSuggestion, ...prev]);
      setTitle('');
      setDescription('');
      setCategory('FACILITIES');
      toast.success('Suggestion submitted successfully');
    } catch {
      toast.error('Failed to submit suggestion. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (id: string) => {
    try {
      const res = await fetch(`/api/suggestions/${id}/vote`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to vote');
      setSuggestions((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, votes: s.userVoted ? s.votes - 1 : s.votes + 1, userVoted: !s.userVoted }
            : s
        )
      );
    } catch {
      toast.error('Failed to vote. Please try again.');
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
            <h1 className="font-display text-5xl font-bold text-white">Suggestions</h1>
            <p className="text-white/70 mt-4">Share your ideas to improve hall life at Unity Hall</p>
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
                    <CardTitle className="font-display text-display-sm">Make a Suggestion</CardTitle>
                    <CardDescription>Your ideas help make Unity Hall better</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="label-field" htmlFor="title">Title</label>
                        <Input
                          id="title"
                          placeholder="Give your suggestion a title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="description">Description</label>
                        <textarea
                          id="description"
                          rows={4}
                          className="input-field resize-none"
                          placeholder="Describe your suggestion in detail..."
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
                          onChange={(e) => setCategory(e.target.value as SuggestionCategory)}
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <Button type="submit" disabled={submitting} className="w-full">
                        {submitting ? 'Submitting...' : 'Submit Suggestion'}
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
                  <h2 className="font-display text-display-sm font-bold">All Suggestions</h2>
                  <Badge variant="default">{suggestions.length} total</Badge>
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
                    <Button variant="outline" onClick={fetchSuggestions}>Try Again</Button>
                  </Card>
                )}

                {!loading && !error && suggestions.length === 0 && (
                  <Card className="p-8 text-center">
                    <div className="text-4xl mb-4">💡</div>
                    <h3 className="font-display font-bold text-headline-sm mb-2">No Suggestions Yet</h3>
                    <p className="text-muted-foreground">Be the first to share an idea!</p>
                  </Card>
                )}

                {!loading && !error && (
                  <AnimatePresence>
                    <div className="space-y-4">
                      {suggestions.map((suggestion, i) => (
                        <motion.div
                          key={suggestion.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Card className="p-5">
                            <div className="flex items-start gap-4">
                              <button
                                onClick={() => handleVote(suggestion.id)}
                                className={`flex flex-col items-center gap-1 min-w-[48px] p-2 rounded-xl transition-colors ${
                                  suggestion.userVoted
                                    ? 'bg-knust-lust/10 text-knust-lust'
                                    : 'bg-muted hover:bg-knust-lust/5 text-muted-foreground'
                                }`}
                              >
                                <span className="text-lg">▲</span>
                                <span className="text-xs font-bold">{suggestion.votes}</span>
                              </button>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h3 className="font-display font-semibold text-headline-sm">
                                    {suggestion.title}
                                  </h3>
                                  <Badge variant={statusConfig[suggestion.status].variant} size="sm" className="shrink-0">
                                    {statusConfig[suggestion.status].label}
                                  </Badge>
                                </div>
                                <p className="text-body-sm text-muted-foreground mt-1 line-clamp-2">
                                  {suggestion.description}
                                </p>
                                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                                  <Badge variant="secondary" size="sm">{suggestion.category}</Badge>
                                  <span>{formatRelativeTime(suggestion.createdAt)}</span>
                                </div>
                              </div>
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
