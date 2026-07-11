import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-knust-lust text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 focus-visible:ring-knust-lust',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive',
        outline: 'border-2 border-knust-lust bg-transparent text-knust-lust hover:bg-knust-lust hover:text-white focus-visible:ring-knust-lust',
        secondary: 'bg-knust-gold text-knust-charcoal shadow-elevation-2 hover:shadow-elevation-3 hover:-translate-y-0.5 focus-visible:ring-knust-gold',
        ghost: 'bg-transparent hover:bg-knust-cream dark:hover:bg-knust-black/50 focus-visible:ring-knust-lust',
        link: 'bg-transparent text-knust-lust underline-offset-4 hover:underline focus-visible:ring-knust-lust',
        glass: 'bg-white/70 dark:bg-knust-charcoal/70 backdrop-blur-xl border border-white/20 dark:border-knust-black/20 hover:bg-white/85 dark:hover:bg-knust-charcoal/85 focus-visible:ring-knust-lust',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-13 px-8 text-base',
        xl: 'h-15 px-10 text-lg',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

import { cva, type VariantProps } from 'class-variance-authority';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const commonProps = {
      className: cn(buttonVariants({ variant, size, className })),
      'aria-busy': loading,
      ...props,
    };
    if (asChild) {
      return (
        <Slot ref={ref} {...commonProps}>
          {children}
        </Slot>
      );
    }
    return (
      <button ref={ref} disabled={disabled || loading} {...commonProps}>
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };