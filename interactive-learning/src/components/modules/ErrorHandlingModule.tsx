import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { FlowDiagram } from '../shared/FlowDiagram';
import { errorHandlingContent } from '@/data/content/error-handling';
import { getModuleSection } from '@/data/module-sections';
import { CheckList, ContentGrid, Panel, Section } from '@/components/shared/learning';

export const ErrorHandlingModule: React.FC = () => {
  const section = getModuleSection('errors');
  const content = errorHandlingContent;

  return (
    <Section {...section}>
      <p className="mb-6 text-base text-slate-600">{content.intro}</p>
      <Panel title={content.propagation.title}>
        <p className="mb-6 text-slate-600">{content.propagation.description}</p>
        <FlowDiagram steps={content.propagation.steps} direction="vertical" />
      </Panel>

      <div className="grid gap-6 md:grid-cols-2">
        <Panel title={content.serviceLayer.title} variant="danger" padding="sm">
          <p className="mb-3 text-sm text-slate-600">{content.serviceLayer.description}</p>
          <CodeBlock code={content.serviceLayer.code} language="javascript" />
        </Panel>
        <Panel title={content.repositoryLayer.title} variant="danger" padding="sm">
          <p className="mb-3 text-sm text-slate-600">{content.repositoryLayer.description}</p>
          <CodeBlock code={content.repositoryLayer.code} language="javascript" />
        </Panel>
      </div>

      <ContentGrid
        main={
          <Panel title={content.tryCatch.title} variant="accent">
            <p className="mb-4 text-sm text-slate-600">{content.tryCatch.description}</p>
            <CodeBlock code={content.tryCatch.code} language="javascript" />
          </Panel>
        }
        aside={
          <div className="space-y-4">
            <Panel title={content.statusCodes.title}>
              <dl className="space-y-3 text-sm">
                {content.statusCodes.items.map((item) => (
                  <div key={item.code}>
                    <dt className={`font-mono font-semibold ${item.codeClass}`}>{item.code}</dt>
                    <dd className="mt-0.5 text-slate-600">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
            <Panel title={content.keyPoints.title} variant="muted">
              <CheckList items={content.keyPoints.items} variant="arrow" />
            </Panel>
          </div>
        }
      />

      <Panel title={content.globalHandler.title} variant="muted">
        <p className="mb-4 text-sm text-slate-600">{content.globalHandler.description}</p>
        <CodeBlock code={content.globalHandler.code} language="javascript" />
      </Panel>

      <Panel title={content.bestPractices.title}>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="mb-3 text-sm font-semibold text-emerald-800">{content.bestPractices.doTitle}</h4>
            <CheckList items={content.bestPractices.doItems} />
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-red-800">{content.bestPractices.avoidTitle}</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              {content.bestPractices.avoidItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-medium text-red-600" aria-hidden="true">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>
    </Section>
  );
};
