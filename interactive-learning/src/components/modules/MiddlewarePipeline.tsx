import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { Section } from '@/components/shared/learning';
import { CodeBlock } from '../shared/CodeBlock';
import { middlewarePipelineSteps } from '@/data/examples';
import { middlewareContent } from '@/data/content/middleware';
import { getModuleSection } from '@/data/module-sections';

export const MiddlewarePipeline: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const section = getModuleSection('middleware');
  const content = middlewareContent;
  const step = middlewarePipelineSteps[selectedStep];

  return (
    <Section {...section}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pipeline Steps */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 p-4 sticky top-20">
            <h3 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide text-slate-600">
              {content.sidebar.pipelineOrderTitle}
            </h3>

            <div className="space-y-2">
              {middlewarePipelineSteps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedStep(idx)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                    selectedStep === idx
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-mono text-xs font-bold">{idx + 1}</span> {s.middleware}
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                {content.sidebar.executionOrderTitle}
              </p>
              <p className="text-sm text-blue-900">
                {content.sidebar.executionOrderBeforeNext}
                <code className="font-mono bg-white px-1 py-0.5">next()</code>
                {content.sidebar.executionOrderAfterNext}
              </p>
            </div>
          </div>
        </div>

        {/* Step Details */}
        <div className="lg:col-span-2">
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                {step.order}
              </span>
              <h2 className="text-2xl font-bold text-slate-900">{step.middleware}</h2>
            </div>

            <p className="text-slate-700 mb-6">{step.purpose}</p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">{content.stepDetails.codeLabel}</p>
                <CodeBlock code={step.code} language="javascript" />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">{content.stepDetails.effectLabel}</p>
                <div className="bg-white p-3 rounded border border-slate-200 text-sm text-slate-700">
                  {step.effect}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">{content.stepDetails.exampleLabel}</p>
                <div className="bg-white p-3 rounded border border-slate-200 text-sm text-slate-700">
                  {step.example}
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedStep(Math.max(0, selectedStep - 1))}
              disabled={selectedStep === 0}
              className={`btn ${
                selectedStep === 0 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'btn-secondary'
              }`}
            >
              {content.navigation.previous}
            </button>

            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-slate-600 font-mono">
                {selectedStep + 1} / {middlewarePipelineSteps.length}
              </p>
            </div>

            <button
              onClick={() => setSelectedStep(Math.min(middlewarePipelineSteps.length - 1, selectedStep + 1))}
              disabled={selectedStep === middlewarePipelineSteps.length - 1}
              className={`btn ${
                selectedStep === middlewarePipelineSteps.length - 1
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'btn-secondary'
              }`}
            >
              {content.navigation.next}
            </button>
          </div>
        </div>
      </div>

      {/* Full Pipeline Visualization */}
      <Card className="bg-slate-50 mb-8">
        <h3 className="font-semibold text-slate-900 mb-4">{content.fullPipeline.title}</h3>
        <p className="text-slate-700 text-sm mb-6">{content.fullPipeline.description}</p>
        <CodeBlock code={content.fullPipeline.code} language="javascript" />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-slate-900 mb-4">{content.nextFunction.title}</h3>
          <CodeBlock code={content.nextFunction.code} language="javascript" />
        </Card>

        <Card className="bg-slate-50">
          <h3 className="font-semibold text-slate-900 mb-4">{content.bestPractices.title}</h3>
          <ul className="space-y-3 text-sm text-slate-700">
            {content.bestPractices.items.map((item) => (
              <li key={item.title} className="flex gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="bg-slate-50">
        <h3 className="font-semibold text-slate-900 mb-3">{content.takeaway.title}</h3>
        <p className="text-slate-700 text-sm">
          {content.takeaway.beforeNext}
          <code className="bg-slate-100 px-1 py-0.5">next()</code>
          {content.takeaway.afterNext}
        </p>
      </Card>
    </Section>
  );
};
