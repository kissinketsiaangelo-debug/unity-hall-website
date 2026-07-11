import * as React from 'react';

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 border-4 border-knust-lust/30 border-t-knust-lust rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground text-body-sm">Loading...</p>
      </div>
    </div>
  );
}
