'use client';

import * as React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ParallaxSection({ 
  children, 
  className, 
  speed = 0.5, 
  offset = 0,
  direction = 'up'
}: ParallaxSectionProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [offset, offset + 100 * speed]);
  const ySpring = useSpring(y, { stiffness: 100, damping: 30 });

  const transform = direction === 'up' || direction === 'down' ? ySpring : undefined;
  const transformX = direction === 'left' || direction === 'right' ? ySpring : undefined;

  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      style={{
        transform: transform !== undefined ? `translateY(${transform}px)` : 
                   transformX !== undefined ? `translateX(${transformX}px)` : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  variant?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate' | 'flip';
  stagger?: number;
}

const variantStyles = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  'slide-up': { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } },
  'slide-down': { initial: { opacity: 0, y: -60 }, animate: { opacity: 1, y: 0 } },
  'slide-left': { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 } },
  'slide-right': { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
  rotate: { initial: { opacity: 0, rotate: -180, scale: 0.5 }, animate: { opacity: 1, rotate: 0, scale: 1 } },
  flip: { initial: { opacity: 0, rotateY: 90, scale: 0.8 }, animate: { opacity: 1, rotateY: 0, scale: 1 } },
};

export function ScrollReveal({ 
  children, 
  className, 
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  delay = 0,
  variant = 'slide-up',
  stagger = 0,
}: ScrollRevealProps) {
  const variants = {
    hidden: variantStyles[variant].initial,
    visible: variantStyles[variant].animate,
  };

  const childArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: triggerOnce, margin: rootMargin }}
          transition={{
            duration: 0.7,
            delay: delay + index * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
  radius?: number;
}

export function Magnetic({ children, strength = 0.3, radius = 100 }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    
    if (distance <= radius) {
      setPosition({ x: deltaX, y: deltaY });
    } else {
      const ratio = radius / distance;
      setPosition({ x: deltaX * ratio, y: deltaY * ratio });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <motion.div
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface TiltProps {
  children: React.ReactElement;
  maxTilt?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}

export function Tilt({ 
  children, 
  maxTilt = 15, 
  scale = 1.02, 
  speed = 300,
  glare = false,
  maxGlare = 0.3
}: TiltProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    setTilt({ x: -deltaY * maxTilt, y: deltaX * maxTilt });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeaveWrap = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  const child = React.Children.only(children) as React.ReactElement;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveWrap}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? scale : 1})`,
          transformStyle: 'preserve-3d',
        }}
        transition={{ duration: speed / 1000, ease: 'easeOut' }}
      >
        {React.cloneElement(child, {
          style: {
            ...child.props.style,
            transformStyle: 'preserve-3d',
          },
        })}
        {glare && isHovering && (
          <div
            className="absolute inset-0 rounded-inherit"
            style={{
              background: `linear-gradient(135deg, transparent ${50 - Math.abs(tilt.y)}%, rgba(255,255,255,${maxGlare * Math.abs(tilt.y / maxTilt)}) ${50 + Math.abs(tilt.y)}%)`,
              pointerEvents: 'none',
              borderRadius: 'inherit',
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

interface FloatingProps {
  children: React.ReactNode;
  amplitude?: number;
  frequency?: number;
  delay?: number;
  axis?: 'x' | 'y' | 'both';
}

export function Floating({ 
  children, 
  amplitude = 10, 
  frequency = 1, 
  delay = 0,
  axis = 'y'
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: axis === 'y' || axis === 'both' ? [0, -amplitude, 0] : 0,
        x: axis === 'x' || axis === 'both' ? [0, amplitude, 0] : 0,
      }}
      transition={{
        duration: 2 / frequency,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface CursorFollowerProps {
  children: React.ReactNode;
  delay?: number;
  damping?: number;
  stiffness?: number;
}

export function CursorFollower({ 
  children, 
  delay = 0.1, 
  damping = 30, 
  stiffness = 100 
}: CursorFollowerProps) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {children}
      <motion.div
        className="fixed pointer-events-none z-[9999] h-8 w-8 rounded-full bg-knust-lust/30 mix-blend-difference transition-opacity"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </>
  );
}