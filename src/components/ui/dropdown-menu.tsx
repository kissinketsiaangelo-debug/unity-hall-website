'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: Array<{
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    variant?: 'default' | 'destructive';
  }>;
  align?: 'start' | 'end' | 'center';
  sideOffset?: number;
}

export function DropdownMenu({ trigger, items, align = 'end', sideOffset = 8 }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={triggerRef}>
      <div>{trigger}</div>
      {open && (
        <div
          ref={contentRef}
          className={cn(
            'fixed z-50 mt-2 min-w-[180px] rounded-xl bg-card border border-border shadow-elevation-4 p-1 animate-in fade-in-0 zoom-in-95 duration-200',
            align === 'end' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'
          )}
          style={{ '--side-offset': `${sideOffset}px` } as React.CSSProperties}
          role="menu"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              disabled={item.disabled}
              className={cn(
                'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground',
                item.variant === 'destructive' && 'text-destructive focus:text-destructive'
              )}
              role="menuitem"
            >
              {item.icon && <span className="h-4 w-4">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}