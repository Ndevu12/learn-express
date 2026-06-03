import React from 'react';
import { authMongoContent } from '@/data/content/auth-mongo';
import { authMongoFlowSnippet } from '@/data/examples';
import { getModuleSection } from '@/data/module-sections';
import { Callout, Panel, Section } from '@/components/shared/learning';
import { FlowDiagram } from '../shared/FlowDiagram';
import { CodeBlock } from '../shared/CodeBlock';

export const AuthMongoModule: React.FC = () => {
  const section = getModuleSection('authmongo');

  return (
    <Section {...section}>
      <p className="text-base text-slate-600">{authMongoContent.intro}</p>

      <Panel title={authMongoContent.flowTitle} variant="muted">
        <FlowDiagram steps={[...authMongoContent.flowSteps]} direction="horizontal" />
      </Panel>

      <CodeBlock code={authMongoFlowSnippet} title="Request flow (conceptual)" />

      <Panel title={authMongoContent.collectionsTitle} variant="muted">
        <div className="space-y-4">
          {authMongoContent.collections.map((col) => (
            <div key={col.name} className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="font-semibold text-slate-900">{col.name}</p>
              <p className="mt-1 text-sm text-slate-600">
                <span className="font-medium">Fields:</span> {col.fields}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                <span className="font-medium">Used by:</span> {col.access}
              </p>
            </div>
          ))}
        </div>
      </Panel>

      <Callout title={authMongoContent.dayBridge.title} variant="info">
        {authMongoContent.dayBridge.body}
      </Callout>

      <Callout title={authMongoContent.demoNote.title} variant="info">
        {authMongoContent.demoNote.body}
      </Callout>

      <Panel title={authMongoContent.runnable.title} variant="muted">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {authMongoContent.runnable.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-slate-600">
          Demo accounts: {authMongoContent.runnable.demoAccounts}
        </p>
        <p className="mt-3 text-sm text-slate-600">
          API: <code className="text-xs">{authMongoContent.paths.authApi}</code>
          <br />
          React UI: <code className="text-xs">{authMongoContent.paths.authUi}</code>
        </p>
      </Panel>

      <Panel title={authMongoContent.envOptional.title} variant="muted">
        <ul className="space-y-1 text-sm text-slate-700">
          {authMongoContent.envOptional.vars.map((v) => (
            <li key={v}>
              <code className="rounded bg-slate-100 px-1 text-xs">{v}</code>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Auth API: <code className="text-xs">{authMongoContent.paths.authApi}</code>
          <br />
          Task Mongo reference: <code className="text-xs">{authMongoContent.paths.taskMongo}</code>
        </p>
      </Panel>
    </Section>
  );
};
