import { Button } from '@/components/ui/button';
import {
  getAdjacentModuleInSection,
  getModuleIndexInSection,
  learningModules,
  modulesBySection,
  sectionMeta,
  type ModuleId,
} from '@/data/modules';
import { cn } from '@/lib/utils';

interface ModuleToolbarProps {
  activeModule: ModuleId;
  onNavigate: (id: ModuleId) => void;
}

export function ModuleToolbar({ activeModule, onNavigate }: ModuleToolbarProps) {
  const current = learningModules.find((m) => m.id === activeModule);
  const prev = getAdjacentModuleInSection(activeModule, 'prev');
  const next = getAdjacentModuleInSection(activeModule, 'next');
  const section = current ? sectionMeta[current.section] : null;
  const dayModules = current ? modulesBySection(current.section) : [];
  const moduleNumber = getModuleIndexInSection(activeModule) + 1;

  if (!current) return null;

  return (
    <div className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0 space-y-1">
        {section && (
          <p className={cn('text-[11px] font-semibold uppercase tracking-wider', section.color)}>
            {section.label}
          </p>
        )}
        <p className="text-xs font-medium tabular-nums text-slate-500">
          Module {moduleNumber} of {dayModules.length}
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{current.label}</h2>
        <p className="max-w-xl text-sm text-slate-600">{current.description}</p>
      </div>

      <div className="flex shrink-0 gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!prev}
          onClick={() => prev && onNavigate(prev.id)}
        >
          Previous
        </Button>
        <Button type="button" size="sm" disabled={!next} onClick={() => next && onNavigate(next.id)}>
          Next
        </Button>
      </div>
    </div>
  );
}
