import React, { useState } from 'react';
import { Section, Card } from '../shared/Card';
import { CodeBlock } from '../shared/CodeBlock';
import { jwtStructure, jwtLifecycle } from '../../data/examples';

export const JWTExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'structure' | 'lifecycle'>('structure');
  const [selectedPart, setSelectedPart] = useState(0);

  const part = jwtStructure.parts[selectedPart];

  return (
    <Section
      title="JWT Deep Dive"
      description="Understand the structure, lifecycle, and security of JSON Web Tokens"
      icon="🎫"
    >
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('structure')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'structure'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          aria-selected={activeTab === 'structure'}
        >
          🔍 Structure
        </button>
        <button
          onClick={() => setActiveTab('lifecycle')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'lifecycle'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          aria-selected={activeTab === 'lifecycle'}
        >
          ⏱️ Lifecycle
        </button>
      </div>

      {/* Structure Tab */}
      {activeTab === 'structure' && (
        <>
          {/* Overview */}
          <Card className="bg-blue-50 border-blue-200 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">JWT Structure</h2>
            <p className="text-slate-700 mb-6">{jwtStructure.overview}</p>

            <div className="bg-slate-900 text-green-300 p-4 rounded-lg font-mono text-sm mb-6 overflow-x-auto">
              <div className="break-all">{jwtStructure.fullExample}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              {['Header', 'Payload', 'Signature'].map((label, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPart(idx)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedPart === idx
                      ? 'bg-blue-600 text-white scale-105'
                      : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-400'
                  }`}
                >
                  <p className="font-semibold">{label}</p>
                  <p className="text-xs mt-1">Part {idx + 1}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Part Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card className="bg-slate-50">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{part.part}</h3>
                <p className="text-slate-600 mb-4">{part.purpose}</p>

                <div className="bg-white p-4 rounded-lg border border-slate-200 mb-6">
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Decoded Content</p>
                  <div className="font-mono text-sm text-slate-700 overflow-x-auto">
                    <pre>{JSON.stringify(part.decoded, null, 2)}</pre>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Code</p>
                  <CodeBlock code={part.code} language="javascript" />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-blue-900">💡 Explanation:</span> {part.explanation}
                  </p>
                </div>
              </Card>
            </div>

            {/* Legend */}
            <div className="lg:col-span-1">
              <Card className="bg-slate-50 sticky top-20">
                <h4 className="font-semibold text-slate-900 mb-4">📚 JWT Parts</h4>

                {jwtStructure.parts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPart(idx)}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-all ${
                      selectedPart === idx
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-400'
                    }`}
                  >
                    <p className="font-semibold">{p.part}</p>
                    <p className="text-xs mt-1 opacity-75">{p.purpose}</p>
                  </button>
                ))}

                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs font-semibold text-amber-700 uppercase mb-2">⚠️ Important</p>
                  <p className="text-sm text-amber-800">
                    JWT is <strong>signed</strong> but not <strong>encrypted</strong>. Anyone can decode it, but only the server can verify the signature.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Signature Security */}
          <Card className="bg-yellow-50 border-yellow-200 mb-8">
            <h3 className="font-bold text-slate-900 mb-4">🔒 Signature Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold text-slate-900 mb-2">✓ Valid Token</p>
                <p className="text-sm text-slate-700">Server has secret key. Signature matches. ✓ Access Granted</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-2">❌ Modified Token</p>
                <p className="text-sm text-slate-700">Payload changed but signature not recalculated. ❌ Access Denied</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-2">❌ Wrong Secret</p>
                <p className="text-sm text-slate-700">Attacker signs with different secret. ❌ Verification fails</p>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Lifecycle Tab */}
      {activeTab === 'lifecycle' && (
        <>
          <div className="space-y-6 mb-8">
            {jwtLifecycle.map((stage, idx) => (
              <Card
                key={idx}
                className={`border-l-4 ${
                  idx % 2 === 0 ? 'bg-blue-50 border-blue-500' : 'bg-slate-50 border-slate-400'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">
                      {stage.stage}
                    </span>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-slate-900">{stage.title}</h3>
                      <span className="text-2xl">{stage.icon}</span>
                    </div>

                    <p className="text-slate-700 mb-4">{stage.description}</p>

                    {stage.statusCode && (
                      <div className="bg-green-50 p-2 rounded inline-block mb-4 text-sm font-mono text-green-800">
                        {stage.statusCode}
                      </div>
                    )}

                    {stage.checks && (
                      <div className="mb-4">
                        <p className="font-semibold text-slate-900 mb-2">Verification Checks:</p>
                        <ul className="space-y-1 text-sm text-slate-700">
                          {stage.checks.map((check, cidx) => (
                            <li key={cidx} className="flex gap-2">
                              <span className="text-blue-600">✓</span>
                              <span>{check}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {stage.codeExample && (
                      <CodeBlock code={stage.codeExample} language="javascript" />
                    )}

                    {stage.retrieval && (
                      <p className="text-sm text-slate-700 mt-3">
                        <strong>Usage:</strong> {stage.retrieval}
                      </p>
                    )}

                    {stage.middleware && (
                      <p className="text-sm text-slate-700 mt-3">
                        <strong>Middleware:</strong> {stage.middleware}
                      </p>
                    )}

                    {stage.extraction && (
                      <p className="text-sm text-slate-700 mt-3">
                        <strong>Extraction:</strong> {stage.extraction}
                      </p>
                    )}

                    {stage.data && (
                      <p className="text-sm text-slate-700 mt-3">
                        <strong>Data Available:</strong> {stage.data}
                      </p>
                    )}

                    {stage.usage && (
                      <p className="text-sm text-slate-700 mt-3">
                        <strong>Usage:</strong> {stage.usage}
                      </p>
                    )}

                    {stage.check && (
                      <p className="text-sm text-slate-700 mt-3">
                        <strong>Check:</strong> {stage.check}
                      </p>
                    )}

                    {stage.behavior && (
                      <p className="text-sm text-slate-700 mt-3">
                        <strong>Behavior:</strong> {stage.behavior}
                      </p>
                    )}

                    {stage.action && (
                      <p className="text-sm text-slate-700 mt-3">
                        <strong>Action:</strong> {stage.action}
                      </p>
                    )}

                    {stage.response && (
                      <p className="text-sm text-slate-700 mt-3">
                        <strong>Response:</strong> {stage.response}
                      </p>
                    )}

                    {stage.when && (
                      <p className="text-sm text-slate-700 mt-3">
                        <strong>When:</strong> {stage.when}
                      </p>
                    )}
                  </div>
                </div>

                {idx < jwtLifecycle.length - 1 && (
                  <div className="mt-4 text-center text-2xl text-slate-400">↓</div>
                )}
              </Card>
            ))}
          </div>

          {/* Key Points */}
          <Card className="bg-slate-50">
            <h3 className="font-semibold text-slate-900 mb-4">🎯 Lifecycle Summary</h3>
            <ol className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <span>User logs in → JWT generated with user ID and role</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">2.</span>
                <span>Client receives token and stores it</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">3.</span>
                <span>Client sends token in Authorization header with each request</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">4.</span>
                <span>Server verifies signature and expiration</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">5.</span>
                <span>If valid, user information extracted and request processed</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-600">6.</span>
                <span>If expired or invalid, request rejected (401/403)</span>
              </li>
            </ol>
          </Card>
        </>
      )}
    </Section>
  );
};
