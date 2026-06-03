import { AuthVsAuthzPanel, CheckList, Panel, Section } from '@/components/shared/learning';
import { CodeBlock } from '@/components/shared/CodeBlock';
import { authConceptsModuleContent } from '@/data/content/auth-concepts';
import { getModuleSection } from '@/data/module-sections';
import type { ModuleId } from '@/data/modules';
import { cn } from '@/lib/utils';

interface AuthConceptsModuleProps {
  onNavigate?: (id: ModuleId) => void;
}

export function AuthConceptsModule({ onNavigate }: AuthConceptsModuleProps) {
  const section = getModuleSection('authconcepts');
  const content = authConceptsModuleContent;
  const { requestFlow, statusComparison, misconceptions, learningPath, keyTakeaways } = content;

  return (
    <Section {...section}>
      <AuthVsAuthzPanel focus="overview" />

      <Panel title={requestFlow.title} variant="muted">
        <ol className="space-y-4">
          {requestFlow.steps.map((step, idx) => (
            <li key={idx} className="flex gap-4">
              <span
                className={cn(
                  'flow-step-badge shrink-0',
                  step.phase === 'Authentication' ? 'bg-slate-800' : 'bg-amber-700'
                )}
              >
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {step.phase}
                </p>
                <p className="mt-0.5 font-medium text-slate-900">{step.action}</p>
                {step.failure && (
                  <p className="mt-1 text-sm text-red-700">On failure: {step.failure}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Panel>

      <div className="grid gap-6 md:grid-cols-2">
        <Panel title={statusComparison.unauthorized.title} variant="danger" padding="sm">
          <p className="mb-3 text-sm text-slate-600">{statusComparison.unauthorized.description}</p>
          <CodeBlock code={statusComparison.unauthorized.code} language="http" />
        </Panel>
        <Panel title={statusComparison.forbidden.title} variant="accent" padding="sm">
          <p className="mb-3 text-sm text-slate-600">{statusComparison.forbidden.description}</p>
          <CodeBlock code={statusComparison.forbidden.code} language="http" />
        </Panel>
      </div>

      <Panel title={misconceptions.title} variant="default">
        <CheckList items={misconceptions.items} variant="arrow" />
      </Panel>

      <Panel title={learningPath.title} variant="muted">
        <p className="mb-4 text-sm text-slate-600">{learningPath.description}</p>
        <ol className="space-y-3">
          {learningPath.steps.map((step, idx) => (
            <li key={step.moduleId}>
              {onNavigate ? (
                <button
                  type="button"
                  onClick={() => onNavigate(step.moduleId)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {idx + 1}. Next module
                  </span>
                  <p className="mt-1 font-semibold text-slate-900">{step.label}</p>
                  <p className="mt-0.5 text-sm text-slate-600">{step.focus}</p>
                </button>
              ) : (
                <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                  <p className="font-semibold text-slate-900">
                    {idx + 1}. {step.label}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-600">{step.focus}</p>
                </div>
              )}
            </li>
          ))}
        </ol>
      </Panel>

      <Panel title={keyTakeaways.title} variant="muted">
        <CheckList items={keyTakeaways.items} />
      </Panel>
    </Section>
  );
}
