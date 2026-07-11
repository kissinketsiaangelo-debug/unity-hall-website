'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: 'earned' | 'spent';
}

interface ContiScoreCardProps {
  score: number;
  level: number;
  rank: string;
  transactions: Transaction[];
  className?: string;
}

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = React.useState(0);
  const prev = React.useRef(0);

  React.useEffect(() => {
    const start = prev.current;
    const diff = value - start;
    if (diff === 0) return;

    const duration = 1000;
    const steps = 30;
    const increment = diff / steps;
    let current = start;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplay(value);
        prev.current = value;
        clearInterval(timer);
      } else {
        setDisplay(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{display.toLocaleString()}</span>;
}

function getNextLevelScore(level: number): number {
  return level * 500;
}

export function ContiScoreCard({ score, level, rank, transactions, className }: ContiScoreCardProps) {
  const nextLevelScore = getNextLevelScore(level);
  const progress = Math.min((score / nextLevelScore) * 100, 100);

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-headline-sm text-knust-gold">Conti Score</CardTitle>
          <Badge variant="default" className="bg-knust-lust/10 text-knust-lust">
            Level {level}
          </Badge>
        </div>
        <CardDescription>Keep contributing to earn more points</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center"
        >
          <span className="font-display text-5xl font-bold text-knust-gold">
            <AnimatedCounter value={score} />
          </span>
          <p className="mt-1 text-sm text-muted-foreground">points</p>
        </motion.div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Rank: {rank}</span>
            <span>Next level: {nextLevelScore.toLocaleString()} pts</span>
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

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Recent Transactions</h4>
          {transactions.length === 0 ? (
            <p className="text-xs text-muted-foreground">No transactions yet.</p>
          ) : (
            <div className="space-y-1">
              {transactions.slice(0, 5).map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-foreground">{tx.description}</p>
                    <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                  </div>
                  <span
                    className={cn(
                      'ml-2 shrink-0 text-xs font-semibold',
                      tx.type === 'earned' ? 'text-knust-forest' : 'text-knust-lust'
                    )}
                  >
                    {tx.type === 'earned' ? '+' : '-'}{tx.amount}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
