import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

/** @deprecated Prefer Panel from @/components/shared/learning */
export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div className={cn(hover ? 'card-hover' : 'card', className)}>
      {children}
    </div>
  );
};

export { Section } from './learning/Section';
