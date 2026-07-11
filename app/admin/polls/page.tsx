'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Vote,
  Plus,
  Loader2,
  Calendar,
  Users,
  Trash2,
  X,
  BarChart3,
  Eye,
  EyeOff,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface PollOption {
  id?: string;
  text: string;
  votes?: number;
  _count?: { votes: number };
}

interface PollUser {
  id: string;
  name: string | null;
  email: string | null;
}

interface Poll {
  id: string;
  title: string;
  description: string | null;
  options: PollOption[];
  category: string;
  isActive: boolean;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  createdBy: PollUser | null;
  _count: { votes: number };
}

const pollCategories = ['GENERAL', 'ELECTION', 'EVENT', 'DINING', 'FACILITIES'];

export default function AdminPollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [viewResults, setViewResults] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'GENERAL',
    startsAt: '',
    endsAt: '',
    options: ['', ''],
  });

  async function fetchPolls() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/polls');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPolls(data);
    } catch {
      toast.error('Failed to load polls');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPolls();
  }, []);

  function addOption() {
    setFormData({ ...formData, options: [...formData.options, ''] });
  }

  function removeOption(index: number) {
    if (formData.options.length <= 2) return;
    setFormData({ ...formData, options: formData.options.filter((_, i) => i !== index) });
  }

  function updateOption(index: number, value: string) {
    const options = [...formData.options];
    options[index] = value;
    setFormData({ ...formData, options });
  }

  async function createPoll(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim() || !formData.startsAt || !formData.endsAt) {
      toast.error('Title, start date, and end date are required');
      return;
    }
    const validOptions = formData.options.filter((o) => o.trim());
    if (validOptions.length < 2) {
      toast.error('At least 2 options are required');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim() || undefined,
          options: validOptions,
          category: formData.category,
          startsAt: formData.startsAt,
          endsAt: formData.endsAt,
        }),
      });
      if (!res.ok) throw new Error('Failed to create');
      toast.success('Poll created');
      setShowForm(false);
      setFormData({ title: '', description: '', category: 'GENERAL', startsAt: '', endsAt: '', options: ['', ''] });
      fetchPolls();
    } catch {
      toast.error('Failed to create poll');
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(id: string, isActive: boolean) {
    try {
      const res = await fetch(`/api/admin/polls/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });
      if (!res.ok) throw new Error('Failed to update');
      toast.success(`Poll ${isActive ? 'deactivated' : 'activated'}`);
      fetchPolls();
    } catch {
      toast.error('Failed to update poll');
    }
  }

  function getTotalVotes(poll: Poll): number {
    if (poll._count?.votes) return poll._count.votes;
    return 0;
  }

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Polls</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create and manage hall polls
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Poll
          </Button>
        </div>
      </motion.div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden mb-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5 text-knust-lust" />
                  Create New Poll
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={createPoll} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Title</label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[80px] w-full rounded-xl border bg-background px-4 py-3 text-sm" />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="h-11 w-full rounded-xl border bg-background px-4 text-sm">
                      {pollCategories.map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Start Date</label>
                    <Input type="datetime-local" value={formData.startsAt} onChange={(e) => setFormData({ ...formData, startsAt: e.target.value })} required />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">End Date</label>
                    <Input type="datetime-local" value={formData.endsAt} onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })} required />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Options</label>
                  <div className="space-y-2">
                    {formData.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                        />
                        {formData.options.length > 2 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addOption}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Option
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" loading={submitting}>Create Poll</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-knust-lust" />
        </div>
      ) : polls.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Vote className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-display text-lg font-semibold">No polls yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">Create your first poll to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {polls.map((poll, index) => (
            <motion.div
              key={poll.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold">{poll.title}</h3>
                        <Badge variant={poll.isActive ? 'success' : 'default'} size="sm">
                          {poll.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="secondary" size="sm">{poll.category}</Badge>
                      </div>
                      {poll.description && (
                        <p className="mt-1 text-sm text-muted-foreground">{poll.description}</p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(poll.startsAt)} - {formatDate(poll.endsAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {getTotalVotes(poll)} votes
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewResults(viewResults === poll.id ? null : poll.id)}
                      >
                        {viewResults === poll.id ? (
                          <><EyeOff className="mr-2 h-4 w-4" /> Hide</>
                        ) : (
                          <><BarChart3 className="mr-2 h-4 w-4" /> Results</>
                        )}
                      </Button>
                      <Button
                        variant={poll.isActive ? 'secondary' : 'default'}
                        size="sm"
                        onClick={() => toggleActive(poll.id, poll.isActive)}
                      >
                        {poll.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>

                  {viewResults === poll.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <Separator className="my-3" />
                      <div className="space-y-2">
                        {poll.options.map((option, i) => {
                          const total = getTotalVotes(poll);
                          const votes = option._count?.votes ?? 0;
                          const pct = total > 0 ? (votes / total) * 100 : 0;
                          return (
                            <div key={i}>
                              <div className="flex items-center justify-between text-sm">
                                <span>{option.text}</span>
                                <span className="text-muted-foreground">{votes} votes ({pct.toFixed(0)}%)</span>
                              </div>
                              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-knust-lust transition-all duration-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
