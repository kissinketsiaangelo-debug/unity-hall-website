'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-knust-charcoal text-knust-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="h-24 w-24 mx-auto mb-8 rounded-2xl bg-knust-lust/20 flex items-center justify-center">
          <span className="text-5xl">⚠️</span>
        </div>
        <h1 className="font-display text-display-lg font-bold gradient-text mb-4">
          Something went wrong
        </h1>
        <p className="text-body-md text-muted-foreground mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <Button variant="default" size="lg" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
