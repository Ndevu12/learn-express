import React from 'react';
import { persistenceContent } from '@/data/content/day3-persistence';
import { getModuleSection } from '@/data/module-sections';
import { Callout, CheckList, ContentGrid, Panel, Section } from '@/components/shared/learning';

export const PersistenceModule: React.FC = () => {
  const section = getModuleSection('persistence');

  return (
    <Section {...section}>
      <p className="text-base text-slate-600">{persistenceContent.intro}</p>

      <ContentGrid
        main={
          <Panel title={persistenceContent.inMemory.label} variant="muted">
            <CheckList items={persistenceContent.inMemory.points} />
          </Panel>
        }
        aside={
          <Panel title={persistenceContent.persistent.label} variant="muted">
            <CheckList items={persistenceContent.persistent.points} />
          </Panel>
        }
      />

      <Callout title={persistenceContent.sameStack.title} variant="info">
        {persistenceContent.sameStack.body}
      </Callout>

      <Panel title={persistenceContent.whenToPersist.title} variant="muted">
        <CheckList items={persistenceContent.whenToPersist.items} />
      </Panel>

      <Callout title={persistenceContent.runnable.title} variant="info">
        {persistenceContent.runnable.body}
      </Callout>
    </Section>
  );
};
