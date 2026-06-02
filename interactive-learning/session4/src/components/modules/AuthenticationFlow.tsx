import React, { useState } from 'react';
import { Section, Card } from '../shared/Card';
import { CodeBlock } from '../shared/CodeBlock';
import { authenticationFlow } from '../../data/examples';

export const AuthenticationFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = authenticationFlow[currentStep];

  return (
    <Section
      title="Authentication Flow"
      description="Follow the complete journey from registration to secure token generation"
      icon="🔐"
    >
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {authenticationFlow.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`flex-1 mx-1 p-3 rounded-lg text-sm font-semibold transition-all ${
                currentStep === idx
                  ? 'bg-blue-600 text-white scale-105'
                  : idx < currentStep
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
              aria-label={`Step ${idx + 1}: ${s.title}`}
            >
              <span className="text-lg">{s.icon}</span>
              <span className="hidden sm:inline ml-2">{s.step}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Step Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Step Content */}
        <div className="lg:col-span-2">
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{step.icon}</span>
              <div>
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Step {step.step}</p>
                <h2 className="text-2xl font-bold text-slate-900">{step.title}</h2>
              </div>
            </div>

            <p className="text-slate-700 mb-6">{step.description}</p>

            {/* Data Flow */}
            <div className="space-y-4 mb-6">
              {step.data.in && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">📥 Input</p>
                  <div className="bg-white p-3 rounded border border-slate-200 text-sm text-slate-700 font-mono">
                    {step.data.in}
                  </div>
                </div>
              )}

              {(step.data.out || step.data.action || step.data.compare || step.data.payload || step.data.response) && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                    {step.data.out ? '📤 Output' : step.data.action ? '⚡ Action' : step.data.compare ? '✓ Compare' : step.data.payload ? '📦 Payload' : '✓ Response'}
                  </p>
                  <div className="bg-white p-3 rounded border border-slate-200 text-sm text-slate-700 font-mono">
                    {step.data.out || step.data.action || step.data.compare || JSON.stringify(step.data.payload, null, 2) || step.data.response}
                  </div>
                </div>
              )}

              {step.data.security && (
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wide mb-1">🔒 Security Note</p>
                  <p className="text-sm text-yellow-800">{step.data.security}</p>
                </div>
              )}
            </div>

            {/* Code Example */}
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">💻 Code</p>
              <CodeBlock code={step.code} language="javascript" />
            </div>
          </Card>
        </div>

        {/* Step Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-50 sticky top-20">
            <h3 className="font-semibold text-slate-900 mb-4">📋 Steps Overview</h3>

            <div className="space-y-2 mb-6">
              {authenticationFlow.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    currentStep === idx
                      ? 'bg-blue-600 text-white font-semibold'
                      : idx < currentStep
                      ? 'bg-green-100 text-green-800'
                      : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <p className="font-semibold">{s.step}. {s.title}</p>
                  <p className="text-xs mt-1 opacity-75">{s.icon}</p>
                </button>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">💡 Key Point</p>
              <p className="text-sm text-blue-800">
                Each step passes data to the next. Security is maintained by hashing passwords and signing tokens.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 justify-center mb-8">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            currentStep === 0
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-slate-600 text-white hover:bg-slate-700'
          }`}
        >
          ← Previous
        </button>

        <div className="flex items-center px-4 py-2 bg-slate-100 rounded-lg text-sm font-mono text-slate-700">
          {currentStep + 1} / {authenticationFlow.length}
        </div>

        <button
          onClick={() => setCurrentStep(Math.min(authenticationFlow.length - 1, currentStep + 1))}
          disabled={currentStep === authenticationFlow.length - 1}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            currentStep === authenticationFlow.length - 1
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-slate-600 text-white hover:bg-slate-700'
          }`}
        >
          Next →
        </button>
      </div>

      {/* Key Takeaways */}
      <Card className="bg-slate-50">
        <h3 className="font-semibold text-slate-900 mb-4">🎯 Key Takeaways</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Passwords are never stored plain-text; they're hashed with bcrypt</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>JWT tokens contain user information but are not encrypted</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Tokens are signed with a secret key to prevent tampering</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Each step validates data before passing to the next layer</span>
          </li>
        </ul>
      </Card>
    </Section>
  );
};
