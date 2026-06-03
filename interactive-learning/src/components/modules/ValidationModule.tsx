import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { CheckList, Panel, Section } from '@/components/shared/learning';
import { CodeBlock } from '../shared/CodeBlock';
import { validationPatterns } from '@/data/examples';
import { validationContent } from '@/data/content/validation';
import { getModuleSection } from '@/data/module-sections';

export const ValidationModule: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState(0);
  const section = getModuleSection('validation');
  const pattern = validationPatterns[selectedPattern];
  const content = validationContent;

  return (
    <Section {...section}>
      <p className="mb-6 text-base text-slate-600">{content.intro}</p>
      {/* Pattern Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {validationPatterns.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPattern(idx)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedPattern === idx
                ? 'border-blue-600 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <p className="font-semibold text-slate-900">{p.title}</p>
            <p className="text-xs text-slate-600 mt-1">{p.description}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pattern Explanation */}
        <div>
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{pattern.title}</h2>
            <p className="text-slate-700 mb-6">{pattern.description}</p>

            <h3 className="font-semibold text-slate-900 mb-3">{content.purposeHeading}</h3>
            <p className="text-slate-700 mb-6 text-sm">{pattern.badRequest.why}</p>

            <h3 className="font-semibold text-slate-900 mb-2 text-sm">{content.implementationHeading}</h3>
            <CodeBlock code={pattern.code} language="javascript" />
          </Card>

          <Card className="bg-slate-50">
            <h3 className="font-semibold text-slate-900 mb-3">{content.whyValidationTitle}</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {content.whyValidationBullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Bad Request Scenario */}
        <div>
          <Card className="mb-6 bg-red-50 border-red-200">
            <h3 className="font-semibold text-slate-900 mb-4">{content.badRequestTitle}</h3>
            <p className="text-slate-700 mb-4 text-sm font-semibold">{pattern.badRequest.scenario}</p>

            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Request</p>
            <div className="bg-white p-3 rounded border border-slate-200 font-mono text-xs text-slate-700 overflow-x-auto mb-4">
              <pre>{pattern.badRequest.request}</pre>
            </div>

            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Response</p>
            <div className="bg-white p-3 rounded border border-slate-200 font-mono text-xs text-slate-700 overflow-x-auto">
              <pre>{pattern.badRequest.response}</pre>
            </div>
          </Card>

          {/* Good Request Scenario */}
          <Card className="bg-green-50 border-green-200">
            <h3 className="font-semibold text-slate-900 mb-4">{content.validRequestTitle}</h3>
            <p className="text-slate-700 mb-4 text-sm">{content.validRequestBody}</p>

            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
              {content.validRequestNextTitle}
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              {content.validRequestNextSteps.map((step, index) => (
                <li key={step} className="flex gap-2">
                  <span className="text-green-600 font-bold">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Best Practices */}
      <Panel title={content.bestPractices.title}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h4 className="mb-3 text-sm font-semibold text-emerald-800">{content.bestPractices.doTitle}</h4>
            <CheckList items={content.bestPractices.doItems} />
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-red-800">{content.bestPractices.avoidTitle}</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              {content.bestPractices.avoidItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-medium text-red-600" aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>
    </Section>
  );
};
