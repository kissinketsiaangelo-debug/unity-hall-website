'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Filter,
  User,
  Calendar,
  Clock,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ComplaintUser {
  id: string;
  name: string | null;
  email: string | null;
}

interface Complaint {
  id: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  assignedTo: string | null;
  resolution: string | null;
  slaDeadline: string | null;
  createdAt: string;
  resolvedAt: string | null;
  user: ComplaintUser | null;
}

const statusColors: Record<string, 'default' | 'primary' | 'success' | 'destructive' | 'secondary'> = {
  OPEN: 'destructive',
  ACKNOWLEDGED: 'secondary',
  INVESTIGATING: 'secondary',
  RESOLVED: 'success',
  REJECTED: 'default',
  APPEALED: 'destructive',
};

const priorityColors: Record<string, 'default' | 'primary' | 'success' | 'destructive' | 'secondary'> = {
  LOW: 'default',
  MEDIUM: 'secondary',
  HIGH: 'primary',
  URGENT: 'destructive',
};

const complaintStatuses = ['OPEN', 'ACKNOWLEDGED', 'INVESTIGATING', 'RESOLVED', 'REJECTED', 'APPEALED'];
const complaintCategories = ['', 'MAINTENANCE', 'NOISE', 'CLEANLINESS', 'SECURITY', 'SERVICES', 'FACILITIES', 'OTHER'];
const priorities = ['', 'LOW', 'MEDIUM', 'HIGH', 'URGENT'];

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [resolutionText, setResolutionText] = useState('');

  async function fetchComplaints() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set('status', filterStatus);
      if (filterCategory) params.set('category', filterCategory);
      if (filterPriority) params.set('priority', filterPriority);
      const res = await fetch(`/api/admin/complaints?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setComplaints(data);
    } catch {
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComplaints();
  }, [filterStatus, filterCategory, filterPriority]);

  async function updateComplaint(id: string, updates: Record<string, string>) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/complaints?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
      toast.success('Complaint updated');
      setResolutionText('');
    } catch {
      toast.error('Failed to update complaint');
    } finally {
      setUpdatingId(null);
    }
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
            <h1 className="font-display text-2xl font-bold tracking-tight">Complaints</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage and resolve student complaints
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchComplaints}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </motion.div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="h-9 rounded-xl border bg-background px-3 text-sm">
              <option value="">All Statuses</option>
              {complaintStatuses.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
              className="h-9 rounded-xl border bg-background px-3 text-sm">
              <option value="">All Categories</option>
              {complaintCategories.filter(Boolean).map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}
              className="h-9 rounded-xl border bg-background px-3 text-sm">
              <option value="">All Priorities</option>
              {priorities.filter(Boolean).map((p) => (<option key={p} value={p}>{p}</option>))}
            </select>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-knust-lust" />
          </motion.div>
        ) : complaints.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-display text-lg font-semibold">No complaints found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {filterStatus || filterCategory || filterPriority ? 'Try adjusting your filters' : 'No complaints have been submitted yet'}
            </p>
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            {complaints.map((complaint, index) => (
              <motion.div
                key={complaint.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card variant="interactive" onClick={() => setExpandedId(expandedId === complaint.id ? null : complaint.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 items-center gap-3">
                        <Badge variant={priorityColors[complaint.priority]} size="sm">{complaint.priority}</Badge>
                        <Badge variant={statusColors[complaint.status]}>{complaint.status}</Badge>
                        <Badge variant="outline" size="sm">{complaint.category}</Badge>
                        <span className="hidden sm:block text-sm font-medium">{complaint.subject}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{formatDate(complaint.createdAt)}</span>
                        {expandedId === complaint.id ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedId === complaint.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <Separator className="my-4" />
                          <div className="space-y-4">
                            <p className="text-sm font-medium">{complaint.subject}</p>
                            <p className="text-sm text-muted-foreground">{complaint.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              {complaint.user && (
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {complaint.user.name || complaint.user.email}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {formatDate(complaint.createdAt)}
                              </span>
                              {complaint.slaDeadline && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> SLA: {formatDate(complaint.slaDeadline)}
                                </span>
                              )}
                            </div>

                            {complaint.resolution && (
                              <div className="rounded-xl bg-muted p-3">
                                <p className="text-xs font-medium text-muted-foreground">Resolution:</p>
                                <p className="mt-1 text-sm">{complaint.resolution}</p>
                              </div>
                            )}

                            <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Status:</span>
                                <select
                                  value={complaint.status}
                                  onChange={(e) => updateComplaint(complaint.id, { status: e.target.value })}
                                  disabled={updatingId === complaint.id}
                                  className="h-9 rounded-xl border bg-background px-3 text-sm"
                                >
                                  {complaintStatuses.map((s) => (<option key={s} value={s}>{s}</option>))}
                                </select>
                                {updatingId === complaint.id && <Loader2 className="h-4 w-4 animate-spin text-knust-lust" />}
                              </div>

                              <div className="flex gap-2">
                                <Input
                                  placeholder="Add resolution notes..."
                                  value={resolutionText}
                                  onChange={(e) => setResolutionText(e.target.value)}
                                />
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    if (resolutionText.trim()) {
                                      updateComplaint(complaint.id, { resolution: resolutionText.trim() });
                                    }
                                  }}
                                  disabled={!resolutionText.trim() || updatingId === complaint.id}
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
