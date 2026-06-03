import React from 'react';
import { expressRoutesContent } from '@/data/content/day1-express-routes';
import { day1ExpressRoutesSnippet } from '@/data/examples';
import { getModuleSection } from '@/data/module-sections';
import { Callout, ContentGrid, Panel, Section } from '@/components/shared/learning';
import { CodeBlock } from '../shared/CodeBlock';

export const ExpressRoutesModule: React.FC = () => {
  const section = getModuleSection('expressroutes');

  return (
    <Section {...section}>
      <p className="text-base text-slate-600">{expressRoutesContent.intro}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {expressRoutesContent.highlights.map((item) => (
          <Panel key={item.id} title={item.title} variant="muted">
            <p className="text-sm text-slate-700">{item.body}</p>
          </Panel>
        ))}
      </div>

      <CodeBlock code={day1ExpressRoutesSnippet} title="expressapp.js (minimal)" />

      <ContentGrid
        main={
          <Panel title="req — incoming" variant="muted">
            <ul className="space-y-1 text-sm text-slate-700">
              {expressRoutesContent.reqRes.req.map((item) => (
                <li key={item}>
                  <code className="rounded bg-slate-100 px-1">{item}</code>
                </li>
              ))}
            </ul>
          </Panel>
        }
        aside={
          <Panel title="res — outgoing" variant="muted">
            <ul className="space-y-1 text-sm text-slate-700">
              {expressRoutesContent.reqRes.res.map((item) => (
                <li key={item}>
                  <code className="rounded bg-slate-100 px-1">{item}</code>
                </li>
              ))}
            </ul>
          </Panel>
        }
      />

      <Panel title={expressRoutesContent.runnable.title} variant="muted">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
          {expressRoutesContent.runnable.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Panel>

      <Callout title={expressRoutesContent.nextSteps.title} variant="info">
        {expressRoutesContent.nextSteps.body}
      </Callout>
    </Section>
  );
};
