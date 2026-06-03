import { cn } from '@/lib/utils';

interface Tab<T extends string> {
  id: T;
  label: string;
}

interface SegmentedTabsProps<T extends string> {
  tabs: Tab<T>[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
}

export function SegmentedTabs<T extends string>({ tabs, active, onChange, className }: SegmentedTabsProps<T>) {
  return (
    <div className={cn('segmented-tabs', className)} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn('segmented-tab', active === tab.id && 'segmented-tab-active')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
