import * as React from 'react';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-2xl border bg-card text-card-foreground shadow-elevation-1 transition-all duration-500',
  {
    variants: {
      variant: {
        default: 'hover:shadow-elevation-3 hover:-translate-y-1',
        elevated: 'shadow-elevation-3 hover:shadow-elevation-4 hover:-translate-y-1',
        outlined: 'border-2 hover:border-knust-lust/50 hover:shadow-glow',
        glass: 'bg-white/70 dark:bg-knust-charcoal/70 backdrop-blur-xl border border-white/20 dark:border-knust-black/20 hover:bg-white/85 dark:hover:bg-knust-charcoal/85',
        interactive: 'cursor-pointer hover:shadow-elevation-4 hover:-translate-y-1 hover:border-knust-lust/30',
        gradient: 'bg-gradient-to-br from-knust-lust/5 via-background to-knust-gold/5 border-knust-lust/20 hover:shadow-glow',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

import { cva, type VariantProps } from 'class-variance-authority';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col space-y-1.5', className)} {...props} />
    );
  }
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('font-display font-semibold leading-none tracking-tight', className)}
        {...props}
      />
    );
  }
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
    );
  }
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('', className)} {...props} />;
  }
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center mt-auto', className)} {...props} />
    );
  }
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };