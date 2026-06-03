import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CalloutVariant = 'info' | 'success' | 'warning' | 'danger';

interface CalloutProps {
  title?: string;
  children: ReactNode;
  variant?: CalloutVariant;
  className?: string;
}

const variantClass: Record<CalloutVariant, string> = {
  info: 'callout callout-info',
  success: 'callout callout-success',
  warning: 'callout callout-warning',
  danger: 'callout callout-danger',
};

export function Callout({ title, children, variant = 'info', className }: CalloutProps) {
  return (
    <div className={cn(variantClass[variant], className)}>
      {title && <p className="callout-title">{title}</p>}
      <div className="callout-body">{children}</div>
    </div>
  );
}
