import { Button } from '@/components/ui/button';
import { getAdjacentModuleInSection, type ModuleId } from '@/data/modules';

interface ModulePaginationProps {
  activeModule: ModuleId;
  onNavigate: (id: ModuleId) => void;
}

export function ModulePagination({ activeModule, onNavigate }: ModulePaginationProps) {
  const prev = getAdjacentModuleInSection(activeModule, 'prev');
  const next = getAdjacentModuleInSection(activeModule, 'next');

  if (!prev && !next) return null;

  return (
    <nav
      className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:justify-between"
      aria-label="Module pagination"
    >
      {prev ? (
        <Button
          type="button"
          variant="outline"
          className="justify-start sm:max-w-xs"
          onClick={() => onNavigate(prev.id)}
        >
          <span className="text-left">
            <span className="block text-xs text-slate-500">Previous</span>
            <span className="block font-medium">{prev.label}</span>
          </span>
        </Button>
      ) : (
        <div />
      )}
      {next ? (
        <Button
          type="button"
          className="justify-end sm:max-w-xs sm:ml-auto"
          onClick={() => onNavigate(next.id)}
        >
          <span className="text-right">
            <span className="block text-xs text-blue-100">Next</span>
            <span className="block font-medium">{next.label}</span>
          </span>
        </Button>
      ) : null}
    </nav>
  );
}
