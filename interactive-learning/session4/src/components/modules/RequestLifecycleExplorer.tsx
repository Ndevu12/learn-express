import React, { useState } from 'react';
import { Section, Card } from '../shared/Card';
import { Badge } from '../shared/Badge';
import { requestLifecycleStages } from '../../data/examples';

export const RequestLifecycleExplorer: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);

  const stage = requestLifecycleStages[currentStage];
  const isFirst = currentStage === 0;
  const isLast = currentStage === requestLifecycleStages.length - 1;

  return (
    <Section
      title="Request Lifecycle Explorer"
      description="Step through a complete request/response cycle and understand what happens at each stage"
      icon="🔄"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Timeline */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide text-slate-600">
              Timeline
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
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">📥 Data In</p>
                  <div className="bg-white p-3 rounded border border-slate-200 font-mono text-xs text-slate-700 overflow-x-auto">
                    <pre>{stage.data.in}</pre>
                  </div>
                </div>
              )}

              {stage.data.out && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">📤 Data Out</p>
                  <div className="bg-white p-3 rounded border border-slate-200 font-mono text-xs text-slate-700 overflow-x-auto">
                    <pre>{stage.data.out}</pre>
                  </div>
                </div>
              )}

              {stage.data.example && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">💡 Example</p>
                  <div className="bg-white p-3 rounded border border-slate-200 font-mono text-xs text-slate-700 overflow-x-auto">
                    <pre>{stage.data.example}</pre>
                  </div>
                </div>
              )}

              {stage.data.logic && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">⚙️ Logic</p>
                  <div className="bg-white p-3 rounded border border-slate-200 text-sm text-slate-700">
                    {stage.data.logic}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}
              disabled={isFirst}
              className={`btn ${
                isFirst ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'btn-secondary'
              }`}
            >
              ← Previous
            </button>

            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-slate-600 font-mono">
                {currentStage + 1} / {requestLifecycleStages.length}
              </p>
            </div>

            <button
              onClick={() => setCurrentStage(Math.min(requestLifecycleStages.length - 1, currentStage + 1))}
              disabled={isLast}
              className={`btn ${
                isLast ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'btn-secondary'
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <Card className="bg-slate-50">
        <h3 className="font-semibold text-slate-900 mb-3">🎯 Key Takeaway</h3>
        <p className="text-slate-700 text-sm mb-3">
          Request/response cycles follow a predictable pattern: Request arrives, gets routed, passes through middleware,
          hits controllers, uses services, accesses data, and returns a response. Understanding this flow helps you:
        </p>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">→</span>
            <span>Debug issues by knowing where to look in the stack</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">→</span>
            <span>Add middleware strategically for logging, validation, or authentication</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">→</span>
            <span>Optimize performance by recognizing bottlenecks at each stage</span>
          </li>
        </ul>
      </Card>
    </Section>
  );
};
