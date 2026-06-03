import type { ModuleId, ModuleSection } from '@/data/modules';
import {
  getFirstModuleInSection,
  learningModules,
  modulesBySection,
  sectionOrder,
} from '@/data/modules';
import { loadSelectedDay, resolveInitialModule } from '@/data/day-session';

export type HttpClientTab = 'fetch' | 'axios';

export function isModuleSection(value: string): value is ModuleSection {
  return (sectionOrder as readonly string[]).includes(value);
}

export function isModuleId(value: string): value is ModuleId {
  return learningModules.some((module) => module.id === value);
}

export function isHttpClientTab(value: string | null): value is HttpClientTab {
  return value === 'fetch' || value === 'axios';
}

export function isValidModuleForDay(day: ModuleSection, moduleId: ModuleId): boolean {
  return modulesBySection(day).some((module) => module.id === moduleId);
}

export function getModulePath(
  day: ModuleSection,
  moduleId: ModuleId,
  options?: { client?: HttpClientTab }
): string {
  const base = `/day/${day}/module/${moduleId}`;
  if (options?.client && moduleId === 'practicalhttp') {
    return `${base}?client=${options.client}`;
  }
  return base;
}

export function getDefaultPath(): string {
  const day = loadSelectedDay();
  const moduleId = resolveInitialModule(day);
  return getModulePath(day, moduleId);
}

export function resolveRouteParams(
  dayId: string | undefined,
  moduleId: string | undefined
): { day: ModuleSection; moduleId: ModuleId; redirectTo: string | null } {
  const day = dayId && isModuleSection(dayId) ? dayId : 'day1';
  const firstModule = getFirstModuleInSection(day);
  const resolvedModuleId =
    moduleId && isModuleId(moduleId) && isValidModuleForDay(day, moduleId)
      ? moduleId
      : firstModule.id;

  const isCanonical =
    dayId === day && moduleId === resolvedModuleId && isModuleId(moduleId ?? '');

  return {
    day,
    moduleId: resolvedModuleId,
    redirectTo: isCanonical ? null : getModulePath(day, resolvedModuleId),
  };
}
