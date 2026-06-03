import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { authenticationFlow } from '@/data/examples';
import { authenticationContent } from '@/data/content/authentication';
import { getModuleSection } from '@/data/module-sections';
import {
  Callout,
  CheckList,
  ContentGrid,
  FieldBlock,
  Panel,
  Section,
  StepNav,
} from '@/components/shared/learning';
import { cn } from '@/lib/utils';
import { inferSnippetLanguage, type ShikiLanguage } from '@/lib/shiki-highlighter';

function secondaryFieldLabel(data: (typeof authenticationFlow)[0]['data']): string | null {
  const { fieldLabels } = authenticationContent;
  if (data.out) return fieldLabels.output;
  if (data.action) return fieldLabels.action;
  if (data.compare) return fieldLabels.compare;
  if (data.payload) return fieldLabels.payload;
  if (data.response) return fieldLabels.response;
  return null;
}

function secondaryFieldCode(data: (typeof authenticationFlow)[0]['data']): string | null {
  return (
    data.out ||
    data.action ||
    data.compare ||
    (data.payload ? JSON.stringify(data.payload, null, 2) : null) ||
    data.response ||
    null
  );
}

function secondaryFieldLanguage(data: (typeof authenticationFlow)[0]['data']): ShikiLanguage {
  if (data.payload) return 'json';
  if (data.response) return 'http';
  const code = secondaryFieldCode(data);
  return code ? inferSnippetLanguage(code) : 'javascript';
}

export const AuthenticationFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = authenticationFlow[currentStep];
  const section = getModuleSection('authentication');
  const { intro, runnable, sidebarKeyPoint, stepsOverviewTitle, keyTakeaways, fieldLabels } =
    authenticationContent;
  const outputLabel = secondaryFieldLabel(step.data);

  return (
    <Section {...section}>
      <p className="mb-6 text-base text-slate-600">{intro}</p>
      <div className="flex flex-wrap gap-2">
        {authenticationFlow.map((s, idx) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setCurrentStep(idx)}
            className={cn(
              'rounded-lg border px-3 py-2 text-left text-sm transition-colors',
              currentStep === idx
                ? 'border-slate-900 bg-slate-900 text-white'
                : idx < currentStep
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            )}
            aria-label={`Step ${idx + 1}: ${s.title}`}
          >
            <span className="block text-[11px] font-semibold uppercase tracking-wider opacity-80">
              Step {s.step}
            </span>
            <span className="font-medium">{s.title}</span>
          </button>
        ))}
      </div>

      <ContentGrid
        main={
          <Panel variant="muted">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Step {step.step}
            </p>
            <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-3 text-slate-600">{step.description}</p>

            <div className="mt-6 space-y-4">
              {step.data.in && (
                <FieldBlock label={fieldLabels.input}>
                  <CodeBlock code={step.data.in} language={inferSnippetLanguage(step.data.in)} />
                </FieldBlock>
              )}

              {outputLabel && secondaryFieldCode(step.data) && (
                <FieldBlock label={outputLabel}>
                  <CodeBlock
                    code={secondaryFieldCode(step.data)!}
                    language={secondaryFieldLanguage(step.data)}
                  />
                </FieldBlock>
              )}

              {step.data.security && (
                <Callout title={fieldLabels.security} variant="warning">
                  {step.data.security}
                </Callout>
              )}

              <div>
                <p className="field-label mb-2">{fieldLabels.code}</p>
                <CodeBlock code={step.code} language="javascript" />
              </div>
            </div>
          </Panel>
        }
        aside={
          <Panel title={stepsOverviewTitle} variant="default" className="lg:sticky lg:top-20">
            <div className="space-y-1">
              {authenticationFlow.map((s, idx) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setCurrentStep(idx)}
                  className={cn(
                    'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    currentStep === idx
                      ? 'bg-slate-900 font-medium text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  {s.step}. {s.title}
                </button>
              ))}
            </div>
            <Callout title={sidebarKeyPoint.title} variant="info" className="mt-4">
              {sidebarKeyPoint.body}
            </Callout>
          </Panel>
        }
      />

      <StepNav
        current={currentStep}
        total={authenticationFlow.length}
        onPrevious={() => setCurrentStep(Math.max(0, currentStep - 1))}
        onNext={() => setCurrentStep(Math.min(authenticationFlow.length - 1, currentStep + 1))}
      />

      <Panel title={keyTakeaways.title} variant="muted">
        <CheckList items={keyTakeaways.items} />
      </Panel>

      <Callout title={runnable.title} variant="info" className="mt-6">
        <p>{runnable.body}</p>
        <p className="mt-2 text-sm">
          API: <code className="text-xs">{runnable.paths.api}</code>
          <br />
          React UI: <code className="text-xs">{runnable.paths.ui}</code>
        </p>
      </Callout>
    </Section>
  );
};
