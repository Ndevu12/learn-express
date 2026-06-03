import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getModulePath } from '@/lib/routes';
import {
  getModuleIndexInSection,
  modulesBySection,
  type ModuleId,
  type ModuleSection,
} from '@/data/modules';

interface ModuleSidebarProps {
  selectedDay: ModuleSection;
  activeModule: ModuleId;
  onSelect: (id: ModuleId) => void;
  onClose?: () => void;
  className?: string;
}

export function ModuleSidebar({
  selectedDay,
  activeModule,
  onClose,
  className,
}: ModuleSidebarProps) {
  const dayModules = modulesBySection(selectedDay);
  const activeIndex = getModuleIndexInSection(activeModule);
  const progress =
    activeIndex >= 0 && dayModules.length > 0
      ? ((activeIndex + 1) / dayModules.length) * 100
      : 0;

  const linkClassName = (isActive: boolean) =>
    cn(
      'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors',
      isActive
        ? 'bg-slate-900 font-medium text-white'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    );

  return (
    <aside
      className={cn('flex h-full flex-col border-r border-slate-200 bg-white', className)}
      aria-label="Module navigation"
    >
      <div className="border-b border-slate-100 px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Day progress</p>
        <div className="mt-2 flex items-baseline justify-between gap-2">
          <span className="text-sm font-medium text-slate-900">
            {activeIndex >= 0 ? activeIndex + 1 : 0} / {dayModules.length}
          </span>
          <span className="text-xs tabular-nums text-slate-500">{Math.round(progress)}%</span>
        </div>
        <div
          className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={activeIndex >= 0 ? activeIndex + 1 : 0}
          aria-valuemin={1}
          aria-valuemax={dayModules.length}
        >
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-0.5">
          {dayModules.map((module, index) => {
            const isActive = module.id === activeModule;
            return (
              <li key={module.id}>
                <Link
                  to={getModulePath(selectedDay, module.id)}
                  onClick={() => onClose?.()}
                  className={linkClassName(isActive)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded text-[11px] font-semibold tabular-nums',
                      isActive ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{module.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
