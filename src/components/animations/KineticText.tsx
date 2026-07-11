'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface KineticTextProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'hero' | 'headline' | 'subheadline' | 'reveal' | 'shimmer' | 'typewriter' | 'scroll';
  delay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export function KineticText({
  children,
  className,
  id,
  variant = 'reveal',
  delay = 0,
  duration = 0.8,
  as: Component = 'div',
}: KineticTextProps) {
  const text = React.Children.toArray(children).map((child) => 
    typeof child === 'string' ? child : ''
  ).join('');

  const words = text.split(' ');
  const chars = text.split('');

  const variants = {
    hero: {
      initial: { opacity: 0, y: 60, rotateX: -15, filter: 'blur(20px)' },
      animate: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' },
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    headline: {
      initial: { opacity: 0, y: 40, filter: 'blur(10px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    subheadline: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    reveal: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    shimmer: {
      initial: { backgroundPosition: '200% center' },
      animate: { backgroundPosition: '-200% center' },
      transition: { duration: 3, ease: 'linear', repeat: Infinity },
    },
    typewriter: {
      initial: { width: 0 },
      animate: { width: '100%' },
      transition: { duration: 2, ease: 'easeInOut' },
    },
    scroll: {
      initial: { opacity: 0, y: 50, scale: 0.95 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      viewport: { once: true, margin: '-100px' },
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const v = variants[variant] as any;

  if (variant === 'shimmer') {
    return (
      <Component
        id={id}
        className={cn(
          'bg-clip-text text-transparent bg-gradient-to-r from-knust-lust via-knust-lust/60 to-knust-gold bg-[length:200%_100%]',
          className
        )}
        style={{ animation: 'text-shimmer 3s ease-in-out infinite' }}
      >
        {children}
      </Component>
    );
  }

  if (variant === 'typewriter') {
    return (
      <Component id={id} className={cn('overflow-hidden whitespace-nowrap', className)}>
        <motion.span
          initial={v.initial}
          animate={v.animate}
          transition={v.transition}
        >
          {children}
        </motion.span>
      </Component>
    );
  }

  if (['hero', 'headline', 'subheadline', 'reveal', 'scroll'].includes(variant)) {
    return (
      <Component id={id} className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={v.initial}
            animate={v.animate}
            transition={{
              ...v.transition,
              delay: delay + i * 0.05,
            }}
            style={{ display: 'inline-block', marginRight: i < words.length - 1 ? '0.25em' : 0 }}
          >
            {word}
          </motion.span>
        ))}
      </Component>
    );
  }

  return <Component id={id} className={className}>{children}</Component>;
}

interface ScrambleTextProps {
  children: string;
  className?: string;
  speed?: number;
  delay?: number;
  trigger?: 'hover' | 'mount' | 'scroll';
}

export function ScrambleText({ 
  children, 
  className, 
  speed = 30, 
  delay = 0,
  trigger = 'mount'
}: ScrambleTextProps) {
  const [text, setText] = React.useState('');
  const [isActive, setIsActive] = React.useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  
  React.useEffect(() => {
    if (trigger === 'mount') {
      setIsActive(true);
    }
  }, [trigger]);

  React.useEffect(() => {
    if (!isActive) return;
    
    const timer = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setText(
          children
            .split('')
            .map((char, i) => {
              if (i < iteration) return children[i];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        if (iteration >= children.length) {
          clearInterval(interval);
          setText(children);
        }
        iteration += 1 / 3;
      }, speed);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isActive, children, speed, delay, trigger]);

  return (
    <span className={cn('font-mono tracking-wide', className)}>
      {text || children.replace(/./g, '▉')}
    </span>
  );
}

interface MarqueeTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export function MarqueeText({ 
  children, 
  className, 
  speed = 20, 
  reverse = false,
  pauseOnHover = true
}: MarqueeTextProps) {
  const [hovered, setHovered] = React.useState(false);
  
  return (
    <div 
      className={cn('overflow-hidden whitespace-nowrap', className)}
      onMouseEnter={() => pauseOnHover && setHovered(true)}
      onMouseLeave={() => pauseOnHover && setHovered(false)}
    >
      <motion.div
        className="flex items-center gap-8"
        animate={{
          x: reverse ? '0%' : '-50%',
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ animationPlayState: hovered ? 'paused' : 'running' }}
      >
        {React.Children.toArray(children).flatMap((child, i) => [
          React.cloneElement(child as React.ReactElement, { key: `${i}-a` }),
          React.cloneElement(child as React.ReactElement, { key: `${i}-b` }),
        ])}
      </motion.div>
    </div>
  );
}

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'rainbow' | 'fire' | 'ocean' | 'sunset';
  animated?: boolean;
}

export function GradientText({ 
  children, 
  className, 
  variant = 'primary',
  animated = false
}: GradientTextProps) {
  const gradients = {
    primary: 'bg-gradient-to-r from-knust-lust via-knust-lust/80 to-knust-gold',
    secondary: 'bg-gradient-to-r from-knust-forest via-knust-forest/80 to-knust-gold',
    rainbow: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-[length:300%_100%]',
    fire: 'bg-gradient-to-r from-red-600 via-orange-500 via-yellow-400 to-red-600 bg-[length:200%_100%]',
    ocean: 'bg-gradient-to-r from-blue-600 via-cyan-500 via-blue-400 to-blue-600 bg-[length:200%_100%]',
    sunset: 'bg-gradient-to-r from-orange-500 via-pink-500 via-purple-600 to-orange-500 bg-[length:200%_100%]',
  };

  return (
    <span
      className={cn(
        'bg-clip-text text-transparent',
        gradients[variant],
        animated && 'animate-gradient-x',
        className
      )}
    >
      {children}
    </span>
  );
}

export function TextReveal({ 
  children, 
  className, 
  direction = 'up',
  delay = 0,
  duration = 0.8,
  stagger = 0.05
}: {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  stagger?: number;
}) {
  const lines = React.Children.toArray(children);
  
  const directions = {
    up: { initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -100 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -100 }, animate: { opacity: 1, x: 0 } },
  };

  return (
    <div className={cn('overflow-hidden', className)}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={directions[direction].initial}
          animate={directions[direction].animate}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: 'block' }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}