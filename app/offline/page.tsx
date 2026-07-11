"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GradientText, KineticText } from '@/components/animations/KineticText';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-knust-charcoal text-knust-cream flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-24 w-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-knust-lust to-knust-gold flex items-center justify-center">
          <span className="text-white text-4xl">📡</span>
        </div>
        
        <KineticText as="h1" variant="headline" className="font-display text-display-lg font-bold gradient-text mb-4">
          You're Offline
        </KineticText>
        
        <p className="text-body-md text-muted-foreground mb-8 leading-relaxed">
          No internet connection detected. Some features may be limited, 
          but you can still browse cached pages.
        </p>
        
        <div className="space-y-4">
          <Button 
            variant="default" 
            size="lg" 
            className="w-full"
            onClick={() => window.location.reload()}
          >
            🔄 Try Again
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full border-knust-gold text-knust-gold"
            onClick={() => window.history.back()}
          >
            ← Go Back
          </Button>
        </div>
        
        <div className="mt-12 pt-8 border-t border-knust-black/50">
          <p className="text-caption text-muted-foreground/70">
            Unity Hall KNUST works offline thanks to PWA technology.
            Content cached during your last visit is still available.
          </p>
        </div>
      </motion.div>
    </div>
  );
}