import type { ModuleId, ModuleSection } from '@/data/modules';
import { getFirstModuleInSection, modulesBySection, sectionOrder } from '@/data/modules';

const STORAGE_KEY_DAY = 'learn-express:selected-day';
const STORAGE_KEY_MODULE_PREFIX = 'learn-express:last-module:';

function isModuleSection(value: string): value is ModuleSection {
  return (sectionOrder as readonly string[]).includes(value);
}

function isValidModuleForDay(day: ModuleSection, id: ModuleId): boolean {
  return modulesBySection(day).some((m) => m.id === id);
}

export function loadSelectedDay(): ModuleSection {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY_DAY);
    if (stored && isModuleSection(stored)) return stored;
  } catch {
    /* private mode / blocked storage */
  }
  return 'day1';
}

export function saveSelectedDay(day: ModuleSection): void {
  try {
    sessionStorage.setItem(STORAGE_KEY_DAY, day);
  } catch {
    /* ignore */
  }
}

export function loadLastModuleForDay(day: ModuleSection): ModuleId | null {
  try {
    const stored = sessionStorage.getItem(`${STORAGE_KEY_MODULE_PREFIX}${day}`);
    if (stored && isValidModuleForDay(day, stored as ModuleId)) {
      return stored as ModuleId;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function saveLastModuleForDay(day: ModuleSection, moduleId: ModuleId): void {
  if (!isValidModuleForDay(day, moduleId)) return;
  try {
    sessionStorage.setItem(`${STORAGE_KEY_MODULE_PREFIX}${day}`, moduleId);
  } catch {
    /* ignore */
  }
}

export function resolveInitialModule(day: ModuleSection): ModuleId {
  return loadLastModuleForDay(day) ?? getFirstModuleInSection(day).id;
}
