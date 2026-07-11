import * as React from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-knust-lust/10 text-knust-lust border border-knust-lust/20',
        primary: 'bg-knust-lust/15 text-knust-lust border border-knust-lust/30 shadow-sm',
        secondary: 'bg-knust-gold/10 text-knust-gold/80 border border-knust-gold/20',
        success: 'bg-knust-forest/10 text-knust-forest border border-knust-forest/20',
        destructive: 'bg-destructive/10 text-destructive border border-destructive/20',
        outline: 'bg-transparent border-2 border-current',
        glass: 'bg-white/70 dark:bg-knust-charcoal/70 backdrop-blur-xl border border-white/20 dark:border-knust-black/20',
      },
      size: {
        default: 'px-3 py-0.5 text-xs',
        sm: 'px-2 py-0 text-[10px]',
        lg: 'px-4 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

import { cva, type VariantProps } from 'class-variance-authority';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size, className }))} {...props} />;
}

export { Badge, badgeVariants };