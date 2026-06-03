import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { jwtStructure, jwtLifecycle } from '@/data/examples';
import { jwtExplorerContent } from '@/data/content/jwt';
import { getModuleSection } from '@/data/module-sections';
import {
  Callout,
  ContentGrid,
  Panel,
  Section,
  SegmentedTabs,
} from '@/components/shared/learning';
import { cn } from '@/lib/utils';

export const JWTExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'structure' | 'lifecycle'>('structure');
  const [selectedPart, setSelectedPart] = useState(0);
  const section = getModuleSection('jwt');
  const content = jwtExplorerContent;
  const part = jwtStructure.parts[selectedPart];

  return (
    <Section {...section}>
      <SegmentedTabs tabs={content.tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'structure' && (
        <>
          <Panel title={content.structureTitle} variant="muted">
            <p className="text-slate-600">{jwtStructure.overview}</p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-emerald-400/90">
              {jwtStructure.fullExample}
            </pre>
            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {jwtStructure.parts.map((jwtPart, idx) => (
                <button
                  key={jwtPart.part}
                  type="button"
                  onClick={() => setSelectedPart(idx)}
                  className={cn(
                    'rounded-lg border px-4 py-3 text-left transition-colors',
                    selectedPart === idx
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  )}
                >
                  <p className="font-semibold">{jwtPart.part}</p>
                  <p className="mt-0.5 text-xs opacity-80">Part {idx + 1}</p>
                </button>
              ))}
            </div>
          </Panel>

          <ContentGrid
            main={
              <Panel>
                <h3 className="text-lg font-semibold text-slate-900">{part.part}</h3>
                <p className="mt-1 text-sm text-slate-600">{part.purpose}</p>
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="field-label mb-2">Decoded content</p>
                    <pre className="field-value field-value-mono overflow-x-auto">
                      {JSON.stringify(part.decoded, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <p className="field-label mb-2">Code</p>
                    <CodeBlock code={part.code} language="javascript" />
                  </div>
                  <Callout variant="info">{part.explanation}</Callout>
                </div>
              </Panel>
            }
            aside={
              <Panel title={content.partsLegendTitle} className="lg:sticky lg:top-20">
                <div className="space-y-1">
                  {jwtStructure.parts.map((p, idx) => (
                    <button
                      key={p.part}
                      type="button"
                      onClick={() => setSelectedPart(idx)}
                      className={cn(
                        'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                        selectedPart === idx
                          ? 'bg-slate-900 font-medium text-white'
                          : 'text-slate-600 hover:bg-slate-50'
                      )}
                    >
                      <span className="font-medium">{p.part}</span>
                      <span className="mt-0.5 block text-xs opacity-75">{p.purpose}</span>
                    </button>
                  ))}
                </div>
                <Callout title={content.importantNote.title} variant="warning" className="mt-4">
                  {content.importantNote.body}
                </Callout>
              </Panel>
            }
          />

          <Panel title={content.signatureSecurity.title}>
            <div className="grid gap-4 sm:grid-cols-3">
              {content.signatureSecurity.scenarios.map((scenario) => (
                <div key={scenario.title} className="rounded-lg border border-slate-100 bg-slate-50/80 p-4">
                  <p className="font-medium text-slate-900">{scenario.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{scenario.body}</p>
                </div>
              ))}
            </div>
          </Panel>
        </>
      )}

      {activeTab === 'lifecycle' && (
        <>
          <div className="space-y-4">
            {jwtLifecycle.map((stage, idx) => (
              <Panel key={stage.title} variant={idx % 2 === 0 ? 'muted' : 'default'}>
                <div className="flex gap-4">
                  <span className="flow-step-badge bg-slate-900">{stage.stage}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900">{stage.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{stage.description}</p>
                    {stage.checks && (
                      <ul className="mt-4 space-y-1 text-sm text-slate-700">
                        {stage.checks.map((check) => (
                          <li key={check}>{check}</li>
                        ))}
                      </ul>
                    )}
                    {stage.codeExample && (
                      <div className="mt-4">
                        <CodeBlock code={stage.codeExample} language="javascript" />
                      </div>
                    )}
                  </div>
                </div>
              </Panel>
            ))}
          </div>
          <Panel title={content.lifecycleSummary.title} variant="muted">
            <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
              {content.lifecycleSummary.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </Panel>

          {content.practical && (
            <Callout title={content.practical.title} variant="info">
              {content.practical.body}
            </Callout>
          )}

        </>
      )}
    </Section>
  );
};
