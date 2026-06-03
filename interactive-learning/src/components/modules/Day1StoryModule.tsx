import React from 'react';
import { day1StoryContent } from '@/data/content/day1-story';
import { getModuleSection } from '@/data/module-sections';
import { Callout, Panel, Section } from '@/components/shared/learning';
import { FlowDiagram } from '../shared/FlowDiagram';

export const Day1StoryModule: React.FC = () => {
  const section = getModuleSection('day1story');

  return (
    <Section {...section}>
      <p className="max-w-2xl text-base leading-relaxed text-slate-700">{day1StoryContent.opening}</p>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-700">{day1StoryContent.body}</p>

      <Panel title={day1StoryContent.flowTitle} variant="muted" className="mt-8">
        <FlowDiagram steps={[...day1StoryContent.flowSteps]} direction="vertical" />
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{day1StoryContent.flowTease}</p>
      </Panel>

      <blockquote className="my-8 border-l-4 border-amber-500 bg-amber-50/80 px-5 py-4">
        <p className="text-sm font-medium not-italic text-amber-900/80">
          Maya clicks &ldquo;{day1StoryContent.pullQuote}&rdquo;
        </p>
        <pre className="mt-3 overflow-x-auto text-sm leading-relaxed text-slate-800">
          {day1StoryContent.logLine}
        </pre>
      </blockquote>

      <Callout title="Next" variant="info">
        {day1StoryContent.closing}
      </Callout>
    </Section>
  );
};
