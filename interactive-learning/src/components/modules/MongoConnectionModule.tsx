import React from 'react';
import { mongodbContent } from '@/data/content/day3-mongodb';
import {
  day3MongoConnectionSnippet,
  day3TaskSchemaSnippet,
} from '@/data/examples';
import { getModuleSection } from '@/data/module-sections';
import { Callout, Panel, Section } from '@/components/shared/learning';
import { CodeBlock } from '../shared/CodeBlock';

export const MongoConnectionModule: React.FC = () => {
  const section = getModuleSection('mongodb');

  return (
    <Section {...section}>
      <p className="text-base text-slate-600">{mongodbContent.intro}</p>

      <div className="grid gap-4 md:grid-cols-3">
        {mongodbContent.setupSteps.map((step) => (
          <Panel key={step.id} title={step.title} variant="muted">
            <p className="text-sm text-slate-700">{step.body}</p>
          </Panel>
        ))}
      </div>

      <CodeBlock code={day3MongoConnectionSnippet} title="config/db.js" />
      <CodeBlock code={day3TaskSchemaSnippet} title="src/models/Task.js" />

      <Panel title={mongodbContent.collectionsTitle} variant="muted">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2 pr-4 font-semibold">Collection</th>
                <th className="py-2 pr-4 font-semibold">Curriculum day</th>
                <th className="py-2 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {mongodbContent.collections.map((row) => (
                <tr key={row.name} className="border-b border-slate-100">
                  <td className="py-2 pr-4 font-mono text-slate-900">{row.name}</td>
                  <td className="py-2 pr-4 text-slate-600">{row.day}</td>
                  <td className="py-2 text-slate-600">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title={mongodbContent.runnable.title} variant="muted">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
          {mongodbContent.runnable.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Panel>

      <Callout title={mongodbContent.principle.title} variant="info">
        {mongodbContent.principle.body}
      </Callout>
    </Section>
  );
};
