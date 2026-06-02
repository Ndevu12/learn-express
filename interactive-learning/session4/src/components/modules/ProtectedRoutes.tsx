import React, { useState } from 'react';
import { Section, Card } from '../shared/Card';
import { CodeBlock } from '../shared/CodeBlock';
import { protectedRoutes } from '../../data/examples';

export const ProtectedRoutes: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const scenario = protectedRoutes[selectedScenario];

  return (
    <Section
      title="Protected Routes & Access Control"
      description="See how different token scenarios result in access granted or denied"
      icon="🚪"
    >
      {/* Scenario Selector */}
      <div className="mb-8">
        <p className="text-slate-700 mb-4 font-semibold">Select a scenario:</p>
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
          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-900">{scenario.scenario}</h2>
              <span className="text-4xl">{scenario.outcome.includes('✓') ? '✅' : '❌'}</span>
            </div>
            <p className="text-slate-700">{scenario.why}</p>
          </Card>

          {/* Request */}
          <Card>
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              📤 HTTP Request
            </h3>
            <CodeBlock code={scenario.request} language="http" />
            <p className="text-xs text-slate-600 mt-3">
              <strong>Headers:</strong> {scenario.headers}
            </p>
          </Card>

          {/* Response */}
          <Card>
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              📥 Server Response
            </h3>
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
          </Card>
        </div>

        {/* Outcome & Explanation */}
        <div className="lg:col-span-1">
          <Card
            className={`sticky top-20 ${
              scenario.outcome.includes('✓')
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <h3 className="font-bold text-slate-900 mb-4 text-lg">
              {scenario.outcome}
            </h3>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-900 mb-2">🔍 Why</p>
                <p className="text-sm text-slate-700">{scenario.why}</p>
              </div>

              <div className="p-3 rounded bg-white/50 border">
                <p className="text-xs font-mono font-semibold text-slate-600 uppercase mb-2">
                  Endpoint
                </p>
                <p className="text-sm font-mono text-slate-700">{scenario.endpoint}</p>
              </div>

              <div className="p-3 rounded bg-white/50 border">
                <p className="text-xs font-mono font-semibold text-slate-600 uppercase mb-2">
                  Status Code
                </p>
                <p className="text-sm font-mono text-slate-700">{scenario.response.status.split(' ')[0]}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Access Control Rules */}
      <Card className="bg-slate-50 mb-8">
        <h3 className="font-semibold text-slate-900 mb-4">🔐 Access Control Decision Tree</h3>
        <div className="space-y-3 text-sm">
          <div className="border-l-4 border-blue-600 pl-4 py-2">
            <p className="font-semibold text-slate-900">Step 1: Is there a token?</p>
            <p className="text-slate-700 text-xs mt-1">❌ No → Return 401 Unauthorized</p>
            <p className="text-slate-700 text-xs">✓ Yes → Continue</p>
          </div>
          <div className="border-l-4 border-blue-600 pl-4 py-2">
            <p className="font-semibold text-slate-900">Step 2: Is the token valid?</p>
            <p className="text-slate-700 text-xs mt-1">❌ Invalid/Malformed → Return 401 Unauthorized</p>
            <p className="text-slate-700 text-xs">✓ Valid → Continue</p>
          </div>
          <div className="border-l-4 border-blue-600 pl-4 py-2">
            <p className="font-semibold text-slate-900">Step 3: Has the token expired?</p>
            <p className="text-slate-700 text-xs mt-1">❌ Expired → Return 401 Unauthorized</p>
            <p className="text-slate-700 text-xs">✓ Not expired → Continue</p>
          </div>
          <div className="border-l-4 border-blue-600 pl-4 py-2">
            <p className="font-semibold text-slate-900">Step 4: Does user have permission?</p>
            <p className="text-slate-700 text-xs mt-1">❌ Not authorized → Return 403 Forbidden</p>
            <p className="text-slate-700 text-xs">✓ Authorized → Process request ✓</p>
          </div>
        </div>
      </Card>

      {/* HTTP Status Codes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-red-50 border-red-200">
          <h3 className="font-semibold text-slate-900 mb-3">401 Unauthorized</h3>
          <p className="text-sm text-slate-700 mb-3">Request is not authenticated or token is invalid</p>
          <CodeBlock
            code={`// Missing token
POST /tasks
(no Authorization header)

// Response
401 Unauthorized
{ "message": "No token provided" }

// Or invalid token
POST /tasks
Authorization: Bearer invalid.token

// Response
401 Unauthorized
{ "message": "Invalid token" }`}
            language="http"
          />
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <h3 className="font-semibold text-slate-900 mb-3">403 Forbidden</h3>
          <p className="text-sm text-slate-700 mb-3">Authenticated but not authorized for this resource</p>
          <CodeBlock
            code={`// Valid token but insufficient permissions
DELETE /admin/users/123
Authorization: Bearer <valid_user_token>

// Response
403 Forbidden
{ "message": "You do not have permission" }

// User trying to delete another user's task
DELETE /tasks/999
Authorization: Bearer <user_token>

// Response
403 Forbidden
{ "message": "You can only delete your own tasks" }`}
            language="http"
          />
        </Card>
      </div>

      {/* Key Takeaway */}
      <Card className="bg-slate-50">
        <h3 className="font-semibold text-slate-900 mb-3">🎯 Key Points</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span><strong>Always verify the token</strong> - Never trust client-side authentication</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span><strong>Check expiration</strong> - Expired tokens are security risks</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span><strong>Verify authorization</strong> - Authentication ≠ Authorization</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span><strong>Use HTTPS</strong> - Tokens can be intercepted over HTTP</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span><strong>401 vs 403</strong> - 401 = "who are you?", 403 = "I know you but no"</span>
          </li>
        </ul>
      </Card>
    </Section>
  );
};
