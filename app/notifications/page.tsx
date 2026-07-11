'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Bell,
  BellOff,
  CheckCheck,
  Info,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  XCircle,
  Clock,
  Loader2,
} from 'lucide-react';

type NotificationType = 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR' | 'ALERT';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

const typeConfig: Record<NotificationType, { icon: typeof Info; variant: 'default' | 'primary' | 'secondary' | 'success' | 'destructive'; label: string }> = {
  INFO: { icon: Info, variant: 'default', label: 'INFO' },
  WARNING: { icon: AlertTriangle, variant: 'secondary', label: 'WARNING' },
  SUCCESS: { icon: CheckCircle2, variant: 'success', label: 'SUCCESS' },
  ERROR: { icon: XCircle, variant: 'destructive', label: 'ERROR' },
  ALERT: { icon: AlertOctagon, variant: 'primary', label: 'ALERT' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(Array.isArray(data) ? data : data.notifications ?? []);
      } else {
        setNotifications([]);
      }
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, { method: 'PUT' });
      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
      }
    } catch {
      toast.error('Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    setMarkingAll(true);
    try {
      const res = await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ readAll: true }),
      });
      if (res.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        toast.success('All notifications marked as read');
      } else {
        toast.error('Failed to mark all as read');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setMarkingAll(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-18">
        <section className="relative overflow-hidden bg-gradient-to-b from-knust-lust/5 via-background to-knust-gold/5">
          <div className="container-custom relative z-10 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-knust-lust/10 px-4 py-1.5 text-sm font-medium text-knust-lust border border-knust-lust/20 mb-6">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-knust-charcoal mb-4">
                Notifications
              </h1>
              <p className="text-muted-foreground text-lg">
                Stay updated with hall announcements and alerts
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container-custom pb-16">
          <div className="max-w-3xl mx-auto">
            {notifications.length > 0 && unreadCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end mb-6"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  disabled={markingAll}
                  loading={markingAll}
                >
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Mark all as read
                </Button>
              </motion.div>
            )}

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
              ) : notifications.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card variant="outlined" className="border-dashed">
                    <CardContent className="py-16 text-center">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6"
                      >
                        <BellOff className="h-8 w-8 text-muted-foreground" />
                      </motion.div>
                      <h2 className="font-display text-xl font-bold text-knust-charcoal mb-2">
                        No notifications yet
                      </h2>
                      <p className="text-muted-foreground">
                        You&apos;ll see hall announcements and alerts here
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <AnimatePresence>
                    {notifications.map((notification, index) => {
                      const config = typeConfig[notification.type];
                      const Icon = config.icon;

                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          layout
                        >
                          <Card
                            variant="interactive"
                            padding="md"
                            onClick={() => !notification.read && markAsRead(notification.id)}
                            className={`transition-all duration-200 ${
                              !notification.read
                                ? 'border-l-4 border-l-knust-lust bg-card shadow-md'
                                : 'opacity-70 hover:opacity-100'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${
                                !notification.read ? 'bg-knust-lust/10' : 'bg-muted'
                              }`}>
                                <Icon className={`h-5 w-5 ${
                                  !notification.read ? 'text-knust-lust' : 'text-muted-foreground'
                                }`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className={`font-display font-semibold ${
                                      !notification.read ? 'text-knust-charcoal' : 'text-muted-foreground'
                                    }`}>
                                      {notification.title}
                                    </h3>
                                    <Badge variant={config.variant} size="sm">
                                      {config.label}
                                    </Badge>
                                  </div>
                                  {!notification.read && (
                                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-knust-lust mt-2" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground/70">
                                  <Clock className="h-3 w-3" />
                                  {new Date(notification.createdAt).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
