'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Users,
  Ticket,
  Package,
  MessageSquare,
  Vote,
  AlertTriangle,
  Activity,
  TrendingUp,
  Clock,
} from 'lucide-react';

interface Stats {
  totalUsers: number;
  openTickets: number;
  totalAssets: number;
  activeComplaints: number;
  totalPolls: number;
  recentIncidents: number;
  totalDonations: number;
  totalEvents: number;
  activeMaintenance: number;
}

const statCards = [
  { key: 'totalUsers', label: 'Total Users', icon: Users, color: 'from-blue-500/20 to-blue-600/10 text-blue-600' },
  { key: 'openTickets', label: 'Open Tickets', icon: Ticket, color: 'from-amber-500/20 to-amber-600/10 text-amber-600' },
  { key: 'totalAssets', label: 'Active Assets', icon: Package, color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-600' },
  { key: 'activeComplaints', label: 'Pending Complaints', icon: MessageSquare, color: 'from-purple-500/20 to-purple-600/10 text-purple-600' },
  { key: 'totalPolls', label: 'Active Polls', icon: Vote, color: 'from-cyan-500/20 to-cyan-600/10 text-cyan-600' },
  { key: 'recentIncidents', label: 'Recent Incidents', icon: AlertTriangle, color: 'from-red-500/20 to-red-600/10 text-red-600' },
  { key: 'activeMaintenance', label: 'Maintenance', icon: Activity, color: 'from-orange-500/20 to-orange-600/10 text-orange-600' },
  { key: 'totalEvents', label: 'Upcoming Events', icon: TrendingUp, color: 'from-green-500/20 to-green-600/10 text-green-600' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="mb-8">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-muted" />
          <div className="mt-2 h-4 w-96 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="font-display text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your hall management system
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const value = stats ? (stats as any)[stat.key] ?? 0 : 0;
          return (
            <motion.div key={stat.key} variants={itemVariants}>
              <Card variant="glass" className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="mt-2 font-display text-3xl font-bold">{value}</p>
                    </div>
                    <div className={`rounded-xl bg-gradient-to-br p-3 ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-knust-lust" />
                System Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Donations</span>
                  <span className="font-display font-semibold">{stats?.totalDonations ?? 0}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Maintenance</span>
                  <span className="font-display font-semibold">{stats?.activeMaintenance ?? 0}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Upcoming Events</span>
                  <span className="font-display font-semibold">{stats?.totalEvents ?? 0}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Open Tickets</span>
                  <span className="font-display font-semibold">{stats?.openTickets ?? 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-knust-lust" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'View Incidents', href: '/admin/incidents', color: 'bg-red-500/10 text-red-600' },
                  { label: 'Manage Users', href: '/admin/users', color: 'bg-blue-500/10 text-blue-600' },
                  { label: 'Review Complaints', href: '/admin/complaints', color: 'bg-purple-500/10 text-purple-600' },
                  { label: 'Create Poll', href: '/admin/polls', color: 'bg-cyan-500/10 text-cyan-600' },
                ].map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className={`flex items-center gap-2 rounded-xl p-3 text-sm font-medium transition-all hover:scale-[1.02] ${action.color}`}
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
