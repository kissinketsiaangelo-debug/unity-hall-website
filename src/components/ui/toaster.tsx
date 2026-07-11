'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ToasterProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  toastOptions?: {
    classNames?: {
      toast?: string;
      description?: string;
      actionButton?: string;
      cancelButton?: string;
    };
  };
}

export function Toaster({ position = 'bottom-right', toastOptions }: ToasterProps) {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div
      className={cn(
        'fixed z-[100] flex flex-col gap-2 pointer-events-none',
        positionClasses[position]
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Toast notifications will be rendered here by sonner */}
    </div>
  );
}