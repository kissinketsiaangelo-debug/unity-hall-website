'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StudyStreakProps {
  streak: number;
  longest: number;
  lastCheckIn: string;
  checkedDays?: string[];
  className?: string;
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function StudyStreak({ streak, longest, lastCheckIn, checkedDays = [], className }: StudyStreakProps) {
  const progress = longest > 0 ? (streak / longest) * 100 : 0;

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-headline-sm text-knust-gold">Study Streak</CardTitle>
          <Badge variant="default" className="bg-knust-lust/10 text-knust-lust">
            <span className="mr-1" role="img" aria-label="fire">
              🔥
            </span>
            {streak} day{streak !== 1 ? 's' : ''}
          </Badge>
        </div>
        <CardDescription>Last check-in: {lastCheckIn}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="text-5xl" role="img" aria-label="fire">
            🔥
          </span>
          <div className="text-center">
            <span className="font-display text-4xl font-bold text-knust-lust">{streak}</span>
            <p className="text-xs text-muted-foreground">day streak</p>
          </div>
        </motion.div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Current streak</span>
            <span>Best: {longest} days</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-knust-gold to-knust-lust"
            />
          </div>
        </div>

        <div className="flex justify-between gap-1">
          {DAY_LABELS.map((day, i) => {
            const isChecked = checkedDays.includes(day);
            return (
              <motion.div
                key={day}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-medium',
                  isChecked
                    ? 'bg-knust-lust text-white'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {isChecked ? '✓' : day.charAt(0)}
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
