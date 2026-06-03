import React, { useState } from 'react';
import { httpRequestContent } from '@/data/content/day1-http-request';
import { getModuleSection } from '@/data/module-sections';
import { Callout, ContentGrid, Panel, Section } from '@/components/shared/learning';
import { CodeBlock } from '../shared/CodeBlock';
import { cn } from '@/lib/utils';

export const HttpRequestModule: React.FC = () => {
  const [activePart, setActivePart] = useState<string>(httpRequestContent.parts[0].id);
  const section = getModuleSection('httprequest');
  const selected = httpRequestContent.parts.find((p) => p.id === activePart);

  return (
    <Section {...section}>
      <p className="text-base text-slate-600">{httpRequestContent.intro}</p>

      <ContentGrid
        main={
          <div className="space-y-2">
            {httpRequestContent.parts.map((part) => (
              <button
                key={part.id}
                type="button"
                onClick={() => setActivePart(part.id)}
                className={cn(
                  'w-full rounded-lg border px-4 py-3 text-left transition-colors',
                  activePart === part.id
                    ? 'border-amber-600 bg-amber-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                )}
              >
                <p className="font-semibold text-slate-900">{part.name}</p>
                <p className="mt-1 text-sm text-slate-600">{part.description}</p>
              </button>
            ))}
          </div>
        }
        aside={
          selected && (
            <Panel title={selected.name} variant="muted">
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {selected.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            </Panel>
          )
        }
      />

      <CodeBlock
        code={httpRequestContent.sampleRequest.code}
        language="http"
        title={httpRequestContent.sampleRequest.title}
      />

      <Panel title={httpRequestContent.responseTitle} variant="muted">
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {httpRequestContent.responsePoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </Panel>

      <Callout title={httpRequestContent.principle.title} variant="info">
        {httpRequestContent.principle.body}
      </Callout>

      <Callout title={httpRequestContent.runnable.title} variant="info">
        {httpRequestContent.runnable.body}
      </Callout>
    </Section>
  );
};
