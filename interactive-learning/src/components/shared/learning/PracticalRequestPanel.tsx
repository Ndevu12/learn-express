import { useState } from 'react';
import type { PracticalSection } from '@/data/content/http-client-examples';
import { Callout, Panel, SegmentedTabs } from '@/components/shared/learning';
import { CodeBlock } from '@/components/shared/CodeBlock';

interface PracticalRequestPanelProps {
  section: PracticalSection;
  className?: string;
}

export function PracticalRequestPanel({ section, className }: PracticalRequestPanelProps) {
  const defaultTab = section.tabs[0]?.id ?? 'fetch';
  const [activeTab, setActiveTab] = useState<'fetch' | 'axios'>(defaultTab);
  const active = section.tabs.find((tab) => tab.id === activeTab) ?? section.tabs[0];

  return (
    <Panel title={section.title} variant="muted" className={className}>
      <p className="text-sm text-slate-700">{section.intro}</p>

      {section.prerequisites && (
        <Callout title="Prerequisite" variant="info" className="mt-4">
          {section.prerequisites}
        </Callout>
      )}

      {section.tabs.length > 1 && (
        <SegmentedTabs
          tabs={section.tabs.map(({ id, label }) => ({ id, label }))}
          active={activeTab}
          onChange={setActiveTab}
          className="mt-4"
        />
      )}

      {active && (
        <div className="mt-4 space-y-4">
          {active.note && (
            <p className="text-sm text-slate-600">{active.note}</p>
          )}
          {active.blocks.map((block) => (
            <CodeBlock
              key={block.title ?? block.code.slice(0, 40)}
              code={block.code}
              language={block.language ?? 'javascript'}
              title={block.title}
            />
          ))}
        </div>
      )}

      {section.footnote && (
        <Callout variant="info" className="mt-4">
          {section.footnote}
        </Callout>
      )}
    </Panel>
  );
}
