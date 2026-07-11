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
  Users,
  Search,
  Loader2,
  RefreshCw,
  Mail,
  Calendar,
  Shield,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface AppUser {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  image: string | null;
  createdAt: string;
}

const roles = ['USER', 'RESIDENT', 'ALUMNI', 'ADMIN', 'SUPER_ADMIN'];

const roleColors: Record<string, 'default' | 'primary' | 'success' | 'destructive' | 'secondary'> = {
  USER: 'default',
  RESIDENT: 'primary',
  ALUMNI: 'secondary',
  ADMIN: 'success',
  SUPER_ADMIN: 'destructive',
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 });

  async function fetchUsers(page = 1) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterRole) params.set('role', filterRole);
      params.set('page', String(page));
      params.set('limit', '50');
      const res = await fetch(`/api/admin/users?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setUsers(data.users);
      setPagination(data.pagination);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [filterRole]);

  async function updateRole(id: string, role: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: updated.role } : u)));
      toast.success('User role updated');
    } catch {
      toast.error('Failed to update user');
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredUsers = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q))
    );
  });

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
            <h1 className="font-display text-2xl font-bold tracking-tight">User Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage users and their roles ({pagination.total} total)
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => fetchUsers()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </motion.div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                variant="search"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
              className="h-9 rounded-xl border bg-background px-3 text-sm">
              <option value="">All Roles</option>
              {roles.map((r) => (<option key={r} value={r}>{r}</option>))}
            </select>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-knust-lust" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Users className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-display text-lg font-semibold">No users found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {search ? 'Try a different search term' : 'No users match the selected filters'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name || 'Unnamed User'}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {user.email || 'No email'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(user.createdAt)}
                      </span>
                      <div className="flex items-center gap-2">
                        {updatingId === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin text-knust-lust" />
                        ) : (
                          <div className="flex items-center gap-2">
                            <Badge variant={roleColors[user.role] || 'default'} size="sm">
                              <Shield className="mr-1 h-3 w-3" />
                              {user.role}
                            </Badge>
                            <select
                              value={user.role}
                              onChange={(e) => updateRole(user.id, e.target.value)}
                              className="h-8 rounded-xl border bg-background px-2 text-xs"
                            >
                              {roles.map((r) => (<option key={r} value={r}>{r}</option>))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
