import React, { useState } from 'react';
import { Section, Card } from '../shared/Card';
import { CodeBlock } from '../shared/CodeBlock';
import { validationPatterns } from '../../data/examples';

export const ValidationModule: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState(0);

  const pattern = validationPatterns[selectedPattern];

  return (
    <Section
      title="Validation Learning Module"
      description="Understand how production applications validate requests before processing"
      icon="✔️"
    >
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

            <h3 className="font-semibold text-slate-900 mb-3">🎯 Purpose</h3>
            <p className="text-slate-700 mb-6 text-sm">{pattern.badRequest.why}</p>

            <h3 className="font-semibold text-slate-900 mb-2 text-sm">Implementation</h3>
            <CodeBlock code={pattern.code} language="javascript" />
          </Card>

          <Card className="bg-slate-50">
            <h3 className="font-semibold text-slate-900 mb-3">💡 Why Validation Matters</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Prevents invalid data from entering your system</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Provides clear error messages to API consumers</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Reduces bugs and security vulnerabilities</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Improves user experience with immediate feedback</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Bad Request Scenario */}
        <div>
          <Card className="mb-6 bg-red-50 border-red-200">
            <h3 className="font-semibold text-slate-900 mb-4">❌ Bad Request Scenario</h3>
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
            <h3 className="font-semibold text-slate-900 mb-4">✅ Valid Request</h3>
            <p className="text-slate-700 mb-4 text-sm">
              When data passes validation, it continues to the service and repository layers where business logic and
              data persistence happen.
            </p>

            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">What Happens Next</p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">1</span>
                <span>Service layer processes the validated data</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">2</span>
                <span>Repository layer persists to database</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">3</span>
                <span>Response sent back with 201 Created or 200 OK</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Best Practices */}
      <Card className="bg-slate-50">
        <h3 className="font-semibold text-slate-900 mb-4">🏆 Validation Best Practices</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">✓ Do This</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Validate early, at controller level</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Return appropriate HTTP status codes (400, 409, etc.)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Provide descriptive error messages</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Centralize validation logic in middleware</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-2">✗ Avoid This</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Assuming input is valid</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Validating in service layer</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Generic error messages like "Error"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Duplicating validation across layers</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </Section>
  );
};
