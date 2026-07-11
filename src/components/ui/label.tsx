import * as React from 'react';
import { cn } from '@/lib/utils';

const labelVariants = cva(
  'mb-2 block text-sm font-medium text-foreground transition-colors duration-200 peer-focus:text-knust-lust',
  {
    variants: {
      variant: {
        default: '',
        floating: 'absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-knust-lust peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

import { cva, type VariantProps } from 'class-variance-authority';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <label className={cn(labelVariants({ variant, className }))} ref={ref} {...props} />
    );
  }
);
Label.displayName = 'Label';

export { Label };