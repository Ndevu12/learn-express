import React, { useState } from 'react';
import { mongoRepositoryContent } from '@/data/content/day3-mongo-repository';
import { day3InMemoryRepositorySnippet, day3MongoRepositorySnippet } from '@/data/examples';
import { getModuleSection } from '@/data/module-sections';
import { Callout, Panel, Section, SegmentedTabs } from '@/components/shared/learning';
import { CodeBlock } from '../shared/CodeBlock';

const repoTabs = [
  { id: 'memory' as const, label: 'Day 2 — in-memory' },
  { id: 'mongo' as const, label: 'Day 3 — MongoDB' },
];

export const MongoRepositoryModule: React.FC = () => {
  const [view, setView] = useState<'memory' | 'mongo'>('memory');
  const section = getModuleSection('mongorepo');

  return (
    <Section {...section}>
      <p className="text-base text-slate-600">{mongoRepositoryContent.intro}</p>

      <Panel title={mongoRepositoryContent.diffTitle} variant="muted">
        <ul className="flex flex-wrap gap-2">
          {mongoRepositoryContent.sharedFunctions.map((fn) => (
            <li
              key={fn}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 font-mono text-xs text-slate-800"
            >
              {fn}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-medium">In-memory:</span> {mongoRepositoryContent.inMemoryNote}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          <span className="font-medium">Mongo:</span> {mongoRepositoryContent.mongoNote}
        </p>
      </Panel>

      <SegmentedTabs
        tabs={repoTabs}
        active={view}
        onChange={setView}
      />

      {view === 'memory' ? (
        <CodeBlock code={day3InMemoryRepositorySnippet} title="task-api repository" />
      ) : (
        <CodeBlock code={day3MongoRepositorySnippet} title="task-mongo repository" />
      )}

      <Panel title={mongoRepositoryContent.mappingTitle} variant="muted">
        <p className="text-sm text-slate-700">{mongoRepositoryContent.mappingBody}</p>
      </Panel>

      <Callout title={mongoRepositoryContent.serviceImpact.title} variant="info">
        {mongoRepositoryContent.serviceImpact.body}
      </Callout>

      <Callout title={mongoRepositoryContent.tryIt.title} variant="info">
        {mongoRepositoryContent.tryIt.body}
      </Callout>
    </Section>
  );
};
