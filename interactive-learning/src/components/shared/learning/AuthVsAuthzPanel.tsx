import { authVsAuthzConcept, type AuthConceptFocus } from '@/data/content/auth-concepts';
import { cn } from '@/lib/utils';
import { Panel } from './Panel';

interface AuthVsAuthzPanelProps {
  focus?: AuthConceptFocus;
  className?: string;
}

export function AuthVsAuthzPanel({ focus = 'overview', className }: AuthVsAuthzPanelProps) {
  const { title, summary, authentication, authorization, orderNote, analogy } = authVsAuthzConcept;

  return (
    <Panel title={title} variant="muted" className={className}>
      <p className="mb-4 text-sm text-slate-600">{summary}</p>

      <div className="grid gap-4 md:grid-cols-2">
        <ConceptCard
          {...authentication}
          highlighted={focus === 'overview' || focus === 'authentication'}
        />
        <ConceptCard
          {...authorization}
          highlighted={focus === 'overview' || focus === 'authorization'}
        />
      </div>

      <p className="mt-4 text-sm font-medium text-slate-800">{orderNote}</p>
      <p className="mt-2 text-sm text-slate-600">{analogy}</p>
    </Panel>
  );
}

function ConceptCard({
  label,
  question,
  definition,
  examples,
  statusCode,
  statusHint,
  modules,
  highlighted,
}: {
  label: string;
  question: string;
  definition: string;
  examples: readonly string[];
  statusCode: string;
  statusHint: string;
  modules: string;
  highlighted: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        highlighted ? 'border-slate-300 bg-white shadow-sm' : 'border-slate-200/80 bg-slate-50/50'
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{question}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{definition}</p>
      <ul className="mt-3 space-y-1 text-sm text-slate-700">
        {examples.map((example) => (
          <li key={example} className="flex gap-2">
            <span className="text-slate-300" aria-hidden="true">
              —
            </span>
            <span>{example}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs font-semibold text-slate-800">
        Typical response: {statusCode}
      </p>
      <p className="mt-1 text-xs text-slate-500">{statusHint}</p>
      <p className="mt-3 text-xs text-slate-500">Covered in: {modules}</p>
    </div>
  );
}
