'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  ClipboardList,
  Filter,
  User,
  Globe,
  Clock,
  Loader2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface AuditUser {
  id: string;
  name: string | null;
  email: string | null;
}

interface AuditEntry {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  details: string | null;
  ip: string | null;
  createdAt: string;
  user: AuditUser | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const actionColors: Record<string, 'default' | 'primary' | 'success' | 'destructive' | 'secondary'> = {
  CREATE: 'success',
  UPDATE: 'primary',
  DELETE: 'destructive',
  LOGIN: 'secondary',
  LOGOUT: 'default',
};

const entities = ['', 'USER', 'INCIDENT', 'COMPLAINT', 'POLL', 'ASSET', 'DISCIPLINE', 'SETTINGS'];
const actions = ['', 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT'];

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState('');
  const [filterEntity, setFilterEntity] = useState('');
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 50, total: 0, totalPages: 0 });

  async function fetchLogs(page = 1) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterAction) params.set('action', filterAction);
      if (filterEntity) params.set('entity', filterEntity);
      params.set('page', String(page));
      params.set('limit', '50');
      const res = await fetch(`/api/admin/audit-logs?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setLogs(data.logs);
      setPagination(data.pagination);
    } catch {
      toast.error('Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLogs();
  }, [filterAction, filterEntity]);

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
            <h1 className="font-display text-2xl font-bold tracking-tight">Audit Log</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track all administrative actions ({pagination.total} entries)
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => fetchLogs()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </motion.div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)}
              className="h-9 rounded-xl border bg-background px-3 text-sm">
              <option value="">All Actions</option>
              {actions.filter(Boolean).map((a) => (<option key={a} value={a}>{a}</option>))}
            </select>
            <select value={filterEntity} onChange={(e) => setFilterEntity(e.target.value)}
              className="h-9 rounded-xl border bg-background px-3 text-sm">
              <option value="">All Entities</option>
              {entities.filter(Boolean).map((e) => (<option key={e} value={e}>{e}</option>))}
            </select>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-knust-lust" />
        </div>
      ) : logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ClipboardList className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-display text-lg font-semibold">No audit entries found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {filterAction || filterEntity ? 'Try adjusting your filters' : 'No audit logs recorded yet'}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {logs.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                <Card variant="glass">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant={actionColors[entry.action] || 'default'} size="sm">
                          {entry.action}
                        </Badge>
                        <Badge variant="outline" size="sm">{entry.entity}</Badge>
                        <span className="text-sm font-medium truncate max-w-[200px]">
                          {entry.details || `${entry.entity} #${entry.entityId?.slice(0, 8) || 'N/A'}`}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {entry.user?.name || entry.user?.email || 'System'}
                        </span>
                        {entry.ip && (
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {entry.ip}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(entry.createdAt)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() => fetchLogs(pagination.page - 1)}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchLogs(pagination.page + 1)}
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
