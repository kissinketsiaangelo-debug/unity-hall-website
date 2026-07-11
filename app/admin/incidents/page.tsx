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
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Filter,
  MapPin,
  Calendar,
  User,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface IncidentUser {
  id: string;
  name: string | null;
  email: string | null;
}

interface Incident {
  id: string;
  type: string;
  description: string;
  location: string;
  status: 'REPORTED' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
  resolvedAt: string | null;
  resolution: string | null;
  user: IncidentUser | null;
}

const statusColors: Record<string, 'default' | 'primary' | 'success' | 'destructive' | 'secondary'> = {
  REPORTED: 'destructive',
  INVESTIGATING: 'secondary',
  RESOLVED: 'success',
  DISMISSED: 'default',
};

const incidentTypes = ['', 'THEFT', 'FIRE', 'FLOOD', 'FIGHT', 'NOISE', 'VANDALISM', 'MEDICAL', 'OTHER'];
const statuses = ['', 'REPORTED', 'INVESTIGATING', 'RESOLVED', 'DISMISSED'];

export default function AdminIncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function fetchIncidents() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterType) params.set('type', filterType);
      if (filterStatus) params.set('status', filterStatus);
      const res = await fetch(`/api/admin/incidents?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setIncidents(data);
    } catch {
      toast.error('Failed to load incidents');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIncidents();
  }, [filterType, filterStatus]);

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/incidents?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setIncidents((prev) => prev.map((i) => (i.id === id ? updated : i)));
      toast.success('Incident updated');
    } catch {
      toast.error('Failed to update incident');
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
            <h1 className="font-display text-2xl font-bold tracking-tight">Incidents</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage reported incidents across the hall
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchIncidents}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </motion.div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filters:</span>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-9 rounded-xl border bg-background px-3 text-sm"
            >
              <option value="">All Types</option>
              {incidentTypes.filter(Boolean).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-9 rounded-xl border bg-background px-3 text-sm"
            >
              <option value="">All Statuses</option>
              {statuses.filter(Boolean).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-20"
          >
            <Loader2 className="h-8 w-8 animate-spin text-knust-lust" />
          </motion.div>
        ) : incidents.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <AlertTriangle className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-display text-lg font-semibold">No incidents found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {filterType || filterStatus ? 'Try adjusting your filters' : 'No incidents have been reported yet'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {incidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card
                  variant="interactive"
                  onClick={() => setExpandedId(expandedId === incident.id ? null : incident.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 items-center gap-3">
                        <Badge variant={statusColors[incident.status]}>
                          {incident.status}
                        </Badge>
                        <Badge variant="outline" size="sm">{incident.type}</Badge>
                        <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {incident.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(incident.createdAt)}
                        </span>
                        {expandedId === incident.id ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedId === incident.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <Separator className="my-4" />
                          <div className="space-y-3">
                            <p className="text-sm">{incident.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {incident.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {formatDate(incident.createdAt)}
                              </span>
                              {incident.user && (
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" /> {incident.user.name || incident.user.email}
                                </span>
                              )}
                            </div>
                            {incident.resolution && (
                              <div className="rounded-xl bg-muted p-3">
                                <p className="text-xs font-medium text-muted-foreground">Resolution:</p>
                                <p className="mt-1 text-sm">{incident.resolution}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Update Status:</span>
                              <select
                                value={incident.status}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  updateStatus(incident.id, e.target.value);
                                }}
                                disabled={updatingId === incident.id}
                                className="h-9 rounded-xl border bg-background px-3 text-sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {statuses.filter(Boolean).map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                              {updatingId === incident.id && (
                                <Loader2 className="h-4 w-4 animate-spin text-knust-lust" />
                              )}
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
