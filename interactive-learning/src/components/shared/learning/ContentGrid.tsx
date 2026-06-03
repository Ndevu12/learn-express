import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContentGridProps {
  main: ReactNode;
  aside?: ReactNode;
  className?: string;
}

export function ContentGrid({ main, aside, className }: ContentGridProps) {
  if (!aside) {
    return <div className={cn('learning-stack', className)}>{main}</div>;
  }

  return (
    <div className={cn('learning-grid', className)}>
      <div className="learning-grid-main">{main}</div>
      <aside className="learning-grid-aside">{aside}</aside>
    </div>
  );
}
