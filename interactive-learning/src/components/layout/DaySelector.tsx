import { SegmentedTabs } from '@/components/shared/learning/SegmentedTabs';
import { sectionOrder, type ModuleSection } from '@/data/modules';

interface DaySelectorProps {
  selectedDay: ModuleSection;
  onDayChange: (day: ModuleSection) => void;
  className?: string;
}

const dayTabs = sectionOrder.map((section) => {
  const num = section.match(/day(\d)/)?.[1];
  return { id: section, label: `Day ${num}` };
});

export function DaySelector({ selectedDay, onDayChange, className }: DaySelectorProps) {
  return (
    <SegmentedTabs
      tabs={dayTabs}
      active={selectedDay}
      onChange={onDayChange}
      className={className}
    />
  );
}
