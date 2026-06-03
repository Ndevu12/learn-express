import { cn } from '@/lib/utils';
import {
  getModuleIndex,
  learningModules,
  type ModuleId,
  type ModuleSection,
  modulesBySection,
  sectionMeta,
  sectionOrder,
} from '@/data/modules';

interface ModuleSidebarProps {
  activeModule: ModuleId;
  onSelect: (id: ModuleId) => void;
  onClose?: () => void;
  className?: string;
}

export function ModuleSidebar({ activeModule, onSelect, onClose, className }: ModuleSidebarProps) {
  const activeIndex = getModuleIndex(activeModule);
  const progress = ((activeIndex + 1) / learningModules.length) * 100;

  const handleSelect = (id: ModuleId) => {
    onSelect(id);
    onClose?.();
  };

  return (
    <aside
      className={cn('flex h-full flex-col border-r border-slate-200 bg-white', className)}
      aria-label="Module navigation"
    >
      <div className="border-b border-slate-100 px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Progress</p>
        <div className="mt-2 flex items-baseline justify-between gap-2">
          <span className="text-sm font-medium text-slate-900">
            {activeIndex + 1} / {learningModules.length}
          </span>
          <span className="text-xs tabular-nums text-slate-500">{Math.round(progress)}%</span>
        </div>
        <div
          className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={activeIndex + 1}
          aria-valuemin={1}
          aria-valuemax={learningModules.length}
        >
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {sectionOrder.map((section) => (
          <SectionGroup
            key={section}
            section={section}
            activeModule={activeModule}
            onSelect={handleSelect}
          />
        ))}
      </nav>
    </aside>
  );
}

function SectionGroup({
  section,
  activeModule,
  onSelect,
}: {
  section: ModuleSection;
  activeModule: ModuleId;
  onSelect: (id: ModuleId) => void;
}) {
  const meta = sectionMeta[section];
  const modules = modulesBySection(section);

  return (
    <div className="mb-5">
      <p className={cn('mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider', meta.color)}>
        {meta.label}
      </p>
      <ul className="space-y-0.5">
        {modules.map((module) => {
          const isActive = module.id === activeModule;
          const moduleIndex = getModuleIndex(module.id) + 1;
          return (
            <li key={module.id}>
              <button
                type="button"
                onClick={() => onSelect(module.id)}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors',
                  isActive
                    ? 'bg-slate-900 font-medium text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded text-[11px] font-semibold tabular-nums',
                    isActive ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
                  )}
                >
                  {moduleIndex}
                </span>
                <span className="min-w-0 flex-1 truncate">{module.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
