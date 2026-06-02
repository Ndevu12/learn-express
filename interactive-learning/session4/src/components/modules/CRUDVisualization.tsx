import React, { useState } from 'react';
import { Section, Card } from '../shared/Card';
import { Badge } from '../shared/Badge';
import { FlowDiagram } from '../shared/FlowDiagram';
import { CodeBlock } from '@/components/ui/code-block';
import { crudOperations } from '../../data/examples';

export const CRUDVisualization: React.FC = () => {
  const [selectedOperation, setSelectedOperation] = useState(0);

  const operation = crudOperations[selectedOperation];

  const methodColor = {
    POST: 'green',
    GET: 'blue',
    PUT: 'blue',
    DELETE: 'red'
  } as Record<string, any>;

  return (
    <Section
      title="Advanced CRUD Visualization"
      description="Deep dive into Create, Read, Update, and Delete operations through all layers"
      icon="🔄"
    >
      {/* Operation Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {crudOperations.map((op, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedOperation(idx)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedOperation === idx
                ? `border-${methodColor[op.httpMethod]}-600 bg-${methodColor[op.httpMethod]}-50`
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <p className="font-semibold text-slate-900">{op.operation}</p>
            <p className="text-xs text-slate-600 font-mono mt-1">{op.httpMethod}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Operation Details */}
        <div>
          <Card className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge label={operation.httpMethod} color={methodColor[operation.httpMethod]} />
              <h2 className="text-2xl font-bold text-slate-900">{operation.operation}</h2>
            </div>

            <p className="text-slate-700 mb-6">{operation.description}</p>

            <h3 className="font-semibold text-slate-900 mb-3">Endpoint</h3>
            <code className="bg-slate-100 text-slate-900 px-3 py-2 rounded block font-mono text-sm mb-6">
              {operation.endpoint}
            </code>

            <h3 className="font-semibold text-slate-900 mb-3">Validation Rules</h3>
            <ul className="space-y-2 mb-6">
              {operation.validation.map((rule, idx) => (
                <li key={idx} className="flex gap-2 text-slate-700 text-sm">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Request/Response */}
          <div className="grid grid-cols-1 gap-3">
            <Card className="bg-green-50 border-green-200">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Request</p>
              <div className="bg-white p-3 rounded font-mono text-xs text-slate-700 overflow-x-auto">
                <pre>{operation.request}</pre>
              </div>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Success Response</p>
              <div className="bg-white p-3 rounded font-mono text-xs text-slate-700 overflow-x-auto">
                <pre>{operation.response}</pre>
              </div>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">Error Response</p>
              <div className="bg-white p-3 rounded font-mono text-xs text-slate-700 overflow-x-auto">
                <pre>{operation.error}</pre>
              </div>
            </Card>
          </div>
        </div>

        {/* Flow Through Layers */}
        <div>
          <Card className="mb-6">
            <h3 className="font-semibold text-slate-900 mb-4">📊 Flow Through Layers</h3>

            <div className="space-y-3">
              {operation.flow.map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex-shrink-0 w-24 font-mono text-xs font-semibold text-blue-600 bg-blue-50 p-2 rounded">
                    {step.layer}
                  </div>
                  <div className="flex-1 p-2 rounded bg-slate-50 text-sm text-slate-700">
                    {step.action}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Key Concepts */}
          <Card className="bg-slate-50">
            <h3 className="font-semibold text-slate-900 mb-3">🎯 Key Concept</h3>
            <p className="text-slate-700 text-sm mb-4">
              Every CRUD operation follows the same layer pattern. The specific implementation varies, but the
              architectural flow remains consistent. This predictability makes Express applications easier to understand,
              test, and maintain.
            </p>

            <div className="space-y-2 text-sm">
              <p className="text-slate-700">
                <span className="font-semibold text-blue-600">Why layers matter:</span>
              </p>
              <ul className="space-y-1 text-slate-700">
                <li className="flex gap-2">
                  <span>→</span>
                  <span>Tests can mock each layer independently</span>
                </li>
                <li className="flex gap-2">
                  <span>→</span>
                  <span>Database changes don't affect business logic</span>
                </li>
                <li className="flex gap-2">
                  <span>→</span>
                  <span>Validation logic stays in one place</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
};
