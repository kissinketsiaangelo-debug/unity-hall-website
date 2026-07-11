import * as React from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-knust-lust focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  {
    variants: {
      variant: {
        default: '',
        search: 'pl-10 bg-knust-cream/50 dark:bg-knust-black/30 border-transparent focus:border-knust-lust/50',
        floating: 'bg-transparent border-2 peer-focus:border-knust-lust peer-focus:shadow-glow',
      },
      size: {
        default: 'h-11 px-4 text-sm',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-13 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

import { cva, type VariantProps } from 'class-variance-authority';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        type="text"
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };