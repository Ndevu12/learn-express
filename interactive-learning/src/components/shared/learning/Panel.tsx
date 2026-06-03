import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PanelVariant = 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'danger';

interface PanelProps {
  title?: string;
  children: ReactNode;
  variant?: PanelVariant;
  className?: string;
  padding?: 'sm' | 'md';
}

const variantClasses: Record<PanelVariant, string> = {
  default: 'panel',
  muted: 'panel panel-muted',
  accent: 'panel panel-accent',
  success: 'panel panel-success',
  warning: 'panel panel-warning',
  danger: 'panel panel-danger',
};

export function Panel({ title, children, variant = 'default', className, padding = 'md' }: PanelProps) {
  return (
    <div className={cn(variantClasses[variant], padding === 'sm' && 'panel-sm', className)}>
      {title && <h3 className="panel-title">{title}</h3>}
      {children}
    </div>
  );
}
