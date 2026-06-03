import React from 'react';
import { nodeServerContent } from '@/data/content/day1-node-server';
import { day1NodeServerSnippet } from '@/data/examples';
import { getModuleSection } from '@/data/module-sections';
import { Callout, CheckList, Panel, Section } from '@/components/shared/learning';
import { CodeBlock } from '../shared/CodeBlock';

export const NodeServerModule: React.FC = () => {
  const section = getModuleSection('nodeserver');

  return (
    <Section {...section}>
      <p className="text-base text-slate-600">{nodeServerContent.intro}</p>

      <div className="grid gap-4 md:grid-cols-2">
        {nodeServerContent.concepts.map((concept) => (
          <Panel key={concept.id} title={concept.title} variant="muted">
            <p className="text-sm text-slate-700">{concept.body}</p>
          </Panel>
        ))}
      </div>

      <CodeBlock code={day1NodeServerSnippet} title="nodeserver.js (simplified)" />

      <Panel title={nodeServerContent.painPointsTitle} variant="muted">
        <CheckList items={nodeServerContent.painPoints} />
      </Panel>

      <Panel title={nodeServerContent.runnable.title} variant="muted">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
          {nodeServerContent.runnable.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Panel>

      <Callout title={nodeServerContent.contrast.title} variant="info">
        {nodeServerContent.contrast.body}
      </Callout>
    </Section>
  );
};
