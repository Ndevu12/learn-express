import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { CheckList, Panel, Section } from '@/components/shared/learning';
import { CodeBlock } from '../shared/CodeBlock';
import { protectedRoutes } from '@/data/examples';
import { protectedRoutesContent } from '@/data/content/protected-routes';
import { getModuleSection } from '@/data/module-sections';

export const ProtectedRoutes: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const section = getModuleSection('protected');
  const content = protectedRoutesContent;
  const scenario = protectedRoutes[selectedScenario];
  const isGranted = /granted/i.test(scenario.outcome);

  const { authenticationPhase, authorizationPhase } = content.decisionTree;

  return (
    <Section {...section}>
      <div className="mb-8">
        <p className="text-slate-700 mb-4 font-semibold">{content.selectScenarioPrompt}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {protectedRoutes.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedScenario(idx)}
              className={`p-4 rounded-lg text-left transition-all border-2 ${
                selectedScenario === idx
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
              aria-selected={selectedScenario === idx}
            >
              <p className="font-semibold text-slate-900">{s.scenario}</p>
              <p className="text-xs text-slate-600 mt-1">{s.endpoint}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Current Scenario */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Request/Response */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scenario Title */}
          <Panel variant="accent">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">{scenario.scenario}</h2>
              <span
                className={`rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
                  isGranted ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {isGranted ? 'Granted' : 'Denied'}
              </span>
            </div>
            <p className="mt-3 text-slate-600">{scenario.why}</p>
          </Panel>

          <Panel title={content.labels.request}>
            <CodeBlock code={scenario.request} language="http" />
            <p className="text-xs text-slate-600 mt-3">
              <strong>Headers:</strong> {scenario.headers}
            </p>
          </Panel>

          <Panel title={content.labels.response}>
            <div className="mb-4">
              <div className={`inline-block px-3 py-1 rounded font-mono text-sm font-bold ${
                scenario.response.status.includes('200')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {scenario.response.status}
              </div>
            </div>
            <CodeBlock
              code={JSON.stringify(scenario.response.body, null, 2)}
              language="json"
            />
          </Panel>
        </div>

        <div className="lg:col-span-1">
          <Panel
            title={scenario.outcome}
            variant={isGranted ? 'success' : 'danger'}
            className="lg:sticky lg:top-20"
          >
            <div className="space-y-4 text-sm">
              <div>
                <p className="field-label">{content.labels.why}</p>
                <p className="mt-1 text-slate-700">{scenario.why}</p>
              </div>
              <div>
                <p className="field-label">{content.labels.endpoint}</p>
                <p className="mt-1 font-mono text-slate-800">{scenario.endpoint}</p>
              </div>
              <div>
                <p className="field-label">{content.labels.statusCode}</p>
                <p className="mt-1 font-mono text-slate-800">{scenario.response.status.split(' ')[0]}</p>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <Panel title={content.decisionTree.title} variant="muted" className="mb-8">
        <div className="space-y-8">
          <div>
            <p className="text-sm font-semibold text-slate-900">{authenticationPhase.label}</p>
            <p className="mt-1 text-sm text-slate-600">{authenticationPhase.description}</p>
            <div className="mt-4 space-y-3">
              {authenticationPhase.steps.map((step) => (
                <div key={step.title} className="border-l-4 border-slate-700 pl-4 py-2">
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  {step.outcomes.map((outcome) => (
                    <p key={outcome} className="mt-1 text-xs text-slate-700">
                      {outcome}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{authorizationPhase.label}</p>
            <p className="mt-1 text-sm text-slate-600">{authorizationPhase.description}</p>
            <div className="mt-4 space-y-3">
              {authorizationPhase.steps.map((step) => (
                <div key={step.title} className="border-l-4 border-amber-600 pl-4 py-2">
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  {step.outcomes.map((outcome) => (
                    <p key={outcome} className="mt-1 text-xs text-slate-700">
                      {outcome}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>

      {/* HTTP Status Codes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-red-50 border-red-200">
          <h3 className="font-semibold text-slate-900 mb-3">{content.unauthorized.title}</h3>
          <p className="text-sm text-slate-700 mb-3">{content.unauthorized.description}</p>
          <CodeBlock code={content.unauthorized.code} language="http" />
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <h3 className="font-semibold text-slate-900 mb-3">{content.forbidden.title}</h3>
          <p className="text-sm text-slate-700 mb-3">{content.forbidden.description}</p>
          <CodeBlock code={content.forbidden.code} language="http" />
        </Card>
      </div>

      <Panel title={content.keyPoints.title} variant="muted">
        <CheckList items={content.keyPoints.items} />
      </Panel>
    </Section>
  );
};
