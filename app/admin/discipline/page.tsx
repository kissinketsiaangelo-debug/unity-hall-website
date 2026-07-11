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
  Scale,
  Plus,
  Loader2,
  Calendar,
  User,
  FileText,
  X,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface DisciplineStudent {
  id: string;
  name: string | null;
  email: string | null;
}

interface DisciplineCase {
  id: string;
  studentId: string;
  charges: string;
  status: 'PENDING' | 'HEARING' | 'RESOLVED' | 'DISMISSED';
  verdict: string | null;
  hearingDate: string | null;
  createdAt: string;
  student: DisciplineStudent | null;
}

const statusColors: Record<string, 'default' | 'primary' | 'success' | 'destructive' | 'secondary'> = {
  PENDING: 'destructive',
  HEARING: 'secondary',
  RESOLVED: 'success',
  DISMISSED: 'default',
};

const caseStatuses = ['PENDING', 'HEARING', 'RESOLVED', 'DISMISSED'];

export default function AdminDisciplinePage() {
  const [cases, setCases] = useState<DisciplineCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [charges, setCharges] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function fetchCases() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/discipline');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCases(data);
    } catch {
      toast.error('Failed to load discipline cases');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCases();
  }, []);

  async function createCase(e: React.FormEvent) {
    e.preventDefault();
    if (!studentId.trim() || !charges.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/discipline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: studentId.trim(), charges: charges.trim() }),
      });
      if (!res.ok) throw new Error('Failed to create');
      const newCase = await res.json();
      setCases((prev) => [newCase, ...prev]);
      setStudentId('');
      setCharges('');
      setShowForm(false);
      toast.success('Discipline case created');
    } catch {
      toast.error('Failed to create case');
    } finally {
      setSubmitting(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/discipline?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update');
      toast.success('Case updated');
      fetchCases();
    } catch {
      toast.error('Failed to update case');
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
            <h1 className="font-display text-2xl font-bold tracking-tight">Discipline Cases</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage student discipline cases
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-6"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-knust-lust" />
                    File New Case
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={createCase} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Student ID</label>
                    <Input
                      placeholder="Enter student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Charges</label>
                    <textarea
                      className="min-h-[120px] w-full rounded-xl border bg-background px-4 py-3 text-sm"
                      placeholder="Describe the charges in detail"
                      value={charges}
                      onChange={(e) => setCharges(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" loading={submitting}>
                      Create Case
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-knust-lust" />
        </div>
      ) : cases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Scale className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-display text-lg font-semibold">No discipline cases</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            No cases have been filed yet
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {cases.map((c, index) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant={statusColors[c.status]}>{c.status}</Badge>
                      <div>
                        <p className="font-medium">
                          {c.student?.name || 'Unknown Student'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {c.student?.email || c.studentId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(c.createdAt)}
                    </div>
                  </div>

                  <Separator className="my-3" />
                  <p className="text-sm text-muted-foreground line-clamp-2">{c.charges}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    <select
                      value={c.status}
                      onChange={(e) => updateStatus(c.id, e.target.value)}
                      disabled={updatingId === c.id}
                      className="h-9 rounded-xl border bg-background px-3 text-sm"
                    >
                      {caseStatuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {updatingId === c.id && (
                      <Loader2 className="h-4 w-4 animate-spin text-knust-lust" />
                    )}
                  </div>

                  {c.verdict && (
                    <div className="mt-3 rounded-xl bg-muted p-3">
                      <p className="text-xs font-medium text-muted-foreground">Verdict:</p>
                      <p className="mt-1 text-sm">{c.verdict}</p>
                    </div>
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
