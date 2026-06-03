import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { CheckList, FieldBlock, Panel, Section, StepNav } from '@/components/shared/learning';
import { Badge } from '../shared/Badge';
import { requestLifecycleStages } from '@/data/examples';
import { lifecycleContent } from '@/data/content/lifecycle';
import { getModuleSection } from '@/data/module-sections';

export const RequestLifecycleExplorer: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const section = getModuleSection('lifecycle');
  const { intro, timelineTitle, takeaway, fieldLabels } = lifecycleContent;

  const stage = requestLifecycleStages[currentStage];
  return (
    <Section {...section}>
      <p className="mb-6 text-base text-slate-600">{intro}</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Timeline */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide text-slate-600">
              {timelineTitle}
            </h3>

            <div className="space-y-2">
              {requestLifecycleStages.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStage(idx)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                    currentStage === idx
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-mono text-xs font-bold">{idx + 1}</span> {s.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stage Details */}
        <div className="lg:col-span-2">
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge label={`Stage ${stage.stage}`} color="blue" />
              <h2 className="text-2xl font-bold text-slate-900">{stage.title}</h2>
            </div>

            <p className="text-slate-700 mb-6">{stage.description}</p>

            <div className="space-y-4">
              {stage.data.in && (
                <FieldBlock label={fieldLabels.dataIn}>
                  <pre className="whitespace-pre-wrap">{stage.data.in}</pre>
                </FieldBlock>
              )}

              {stage.data.out && (
                <FieldBlock label={fieldLabels.dataOut}>
                  <pre className="whitespace-pre-wrap">{stage.data.out}</pre>
                </FieldBlock>
              )}

              {stage.data.example && (
                <FieldBlock label={fieldLabels.example}>
                  <pre className="whitespace-pre-wrap">{stage.data.example}</pre>
                </FieldBlock>
              )}

              {stage.data.logic && (
                <FieldBlock label={fieldLabels.logic} mono={false}>
                  {stage.data.logic}
                </FieldBlock>
              )}
            </div>
          </Card>

          <StepNav
            current={currentStage}
            total={requestLifecycleStages.length}
            onPrevious={() => setCurrentStage(Math.max(0, currentStage - 1))}
            onNext={() => setCurrentStage(Math.min(requestLifecycleStages.length - 1, currentStage + 1))}
          />
        </div>
      </div>

      {/* Key Takeaway */}
      <Panel title={takeaway.title} variant="muted">
        <p className="mb-4 text-sm text-slate-600">{takeaway.intro}</p>
        <CheckList items={takeaway.bullets} variant="arrow" />
      </Panel>
    </Section>
  );
};
