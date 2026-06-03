import React from 'react';
import { practicalHttpContent, day4PracticalHttpSection } from '@/data/content/day4-practical-http';
import { getModuleSection } from '@/data/module-sections';
import { Callout, Panel, PracticalRequestPanel, Section } from '@/components/shared/learning';

export const PracticalHttpModule: React.FC = () => {
  const section = getModuleSection('practicalhttp');

  return (
    <Section {...section}>
      <p className="text-base text-slate-600">{practicalHttpContent.intro}</p>

      <Panel title={practicalHttpContent.workflowTitle} variant="muted">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {practicalHttpContent.workflowSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Panel>

      <Callout title={practicalHttpContent.compareTitle} variant="info">
        {practicalHttpContent.compareBody}
      </Callout>

      <PracticalRequestPanel section={day4PracticalHttpSection} className="mt-6" />

      <Callout title={practicalHttpContent.runnable.title} variant="info" className="mt-6">
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
          {practicalHttpContent.runnable.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-3 text-sm">
          Demo accounts: {practicalHttpContent.runnable.demoAccounts}
        </p>
        <p className="mt-3 text-sm">
          API: <code className="text-xs">{practicalHttpContent.runnable.apiPath}</code>
          <br />
          React UI: <code className="text-xs">{practicalHttpContent.runnable.uiPath}</code>
        </p>
      </Callout>
    </Section>
  );
};
