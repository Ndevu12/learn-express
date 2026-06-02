import React, { useState } from 'react';
import { Section, Card } from '../shared/Card';
import { endToEndFlow } from '../../data/examples';

export const EndToEndFlow: React.FC = () => {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null);

  return (
    <Section
      title="Complete End-to-End Authentication & Authorization Flow"
      description="The complete journey from login through authenticated API request with role-based access control"
      icon="🔄"
    >
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          This comprehensive visualization shows how all the concepts you've learned come together in a production system. 
          Follow the flow from a user logging in through to retrieving protected resources.
        </p>
      </div>

      {/* Flow Visualization */}
      <div className="relative mb-8">
        {endToEndFlow.map((layer, idx) => (
          <div key={idx}>
            {/* Layer Card */}
            <div
              className={`mb-1 rounded-lg border-2 transition-all cursor-pointer ${
                layer.color === 'blue'
                  ? 'bg-blue-50 border-blue-300 hover:border-blue-500'
                  : 'bg-slate-50 border-slate-300 hover:border-slate-500'
              }`}
              onClick={() => setExpandedLayer(expandedLayer === idx ? null : idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setExpandedLayer(expandedLayer === idx ? null : idx)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-slate-900">{layer.layer}</h3>
                  <span className="text-xl">{expandedLayer === idx ? '▼' : '▶'}</span>
                </div>

                {/* Collapsed Summary */}
                {expandedLayer !== idx && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {layer.steps.slice(0, 3).map((step, sidx) => (
                      <div key={sidx} className="text-sm text-slate-600 flex items-center gap-1">
                        <span>{step.icon}</span>
                        <span className="truncate text-xs">{step.action}</span>
                      </div>
                    ))}
                    {layer.steps.length > 3 && (
                      <div className="text-xs text-slate-500">+{layer.steps.length - 3} more</div>
                    )}
                  </div>
                )}
              </div>

              {/* Expanded Details */}
              {expandedLayer === idx && (
                <div className="border-t-2 border-inherit p-4 bg-white/50">
                  <div className="space-y-3">
                    {layer.steps.map((step, sidx) => (
                      <div key={sidx} className="flex gap-3 items-start p-3 rounded bg-white border border-slate-200">
                        <span className="text-2xl flex-shrink-0">{step.icon}</span>
                        <div className="flex-grow">
                          <p className="font-semibold text-slate-900 text-sm">{step.action}</p>
                        </div>
                        {sidx < layer.steps.length - 1 && (
                          <div className="text-center text-slate-400 text-xs absolute left-1/2 -translate-x-1/2 -bottom-4">
                            ↓
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Layer Connector */}
            {idx < endToEndFlow.length - 1 && (
              <div className="py-2 text-center text-2xl text-slate-400">↓</div>
            )}
          </div>
        ))}
      </div>

      {/* Timeline Explanation */}
      <Card className="bg-slate-50 mb-8">
        <h3 className="font-bold text-slate-900 mb-4">⏱️ Flow Timeline</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                1
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-900">User Authentication (Login)</p>
              <p className="text-sm text-slate-700 mt-1">
                User submits credentials. Server hashes password, verifies it matches stored hash, generates JWT token with user ID and role.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                2
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Token Storage (Client-side)</p>
              <p className="text-sm text-slate-700 mt-1">
                Client receives token and stores it (localStorage, sessionStorage, or cookie). Token is now available for all future requests.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                3
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Protected API Request</p>
              <p className="text-sm text-slate-700 mt-1">
                Client makes request to protected endpoint with token in Authorization header: "Authorization: Bearer &lt;token&gt;"
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                4
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Request Processing</p>
              <p className="text-sm text-slate-700 mt-1">
                Middleware extracts token from header, verifies signature and expiration. If valid, user info attached to request object.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-bold">
                5
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Authorization Check (RBAC)</p>
              <p className="text-sm text-slate-700 mt-1">
                Authorization middleware checks if user's role has permission for this endpoint. For resource-based access, also verify user owns the resource.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-bold">
                6
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Controller & Service Execution</p>
              <p className="text-sm text-slate-700 mt-1">
                Controller logic executes with user context available. Services can filter data based on user role or ownership. Database returns user-appropriate data.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-bold">
                7
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Response Returned</p>
              <p className="text-sm text-slate-700 mt-1">
                Server responds with status 200 OK and user-appropriate data. Client receives and displays data. Flow complete.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Layers Explained */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <h3 className="font-bold text-slate-900 mb-3">🌐 Client Layer</h3>
          <p className="text-sm text-slate-700 mb-3">
            The user's browser or application. Responsible for:
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Collecting user credentials (email, password)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Storing token securely (localStorage, sessionStorage, HTTP-only cookie)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Including token in Authorization header</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Handling 401/403 responses (redirect to login, show error)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>UX improvements (hide buttons, disable forms) based on role</span>
            </li>
          </ul>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <h3 className="font-bold text-slate-900 mb-3">⚡ Server Layer</h3>
          <p className="text-sm text-slate-700 mb-3">
            The Express.js application. Responsible for:
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Verifying token signature with secret key</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Checking token expiration</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Extracting user ID and role from token</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Enforcing RBAC on every protected endpoint</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Returning 401/403 for unauthorized requests</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600">•</span>
              <span>Filtering database results based on user role/ownership</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Common Pitfalls */}
      <Card className="bg-red-50 border-red-200 mb-8">
        <h3 className="font-bold text-red-900 mb-4">⚠️ Common Pitfalls to Avoid</h3>
        <div className="space-y-3 text-sm text-red-800">
          <div>
            <p className="font-semibold">❌ Only securing the frontend</p>
            <p>Browser developer tools can bypass frontend security. Always verify on the server.</p>
          </div>
          <div>
            <p className="font-semibold">❌ Storing sensitive data in JWT</p>
            <p>JWTs are not encrypted; anyone can decode them. Only store user ID and role.</p>
          </div>
          <div>
            <p className="font-semibold">❌ Forgetting to check token expiration</p>
            <p>Verify both signature AND expiration. Expired tokens should be rejected.</p>
          </div>
          <div>
            <p className="font-semibold">❌ Assuming authentication means authorization</p>
            <p>Knowing who the user is (auth) doesn't mean they can do everything (authz).</p>
          </div>
          <div>
            <p className="font-semibold">❌ Using HTTP instead of HTTPS</p>
            <p>Tokens in HTTP headers can be intercepted. Always use HTTPS in production.</p>
          </div>
        </div>
      </Card>

      {/* Summary */}
      <Card className="bg-slate-50">
        <h3 className="font-bold text-slate-900 mb-4">🎯 Key Takeaway</h3>
        <p className="text-slate-700 mb-4">
          Complete authentication and authorization is a multi-step process requiring both client and server cooperation. 
          The server is the ultimate authority for security decisions. Frontend improvements are UX enhancements, not security mechanisms.
        </p>
        <div className="bg-blue-50 p-4 rounded border border-blue-200">
          <p className="text-sm text-blue-900 font-semibold mb-2">The Golden Rule:</p>
          <p className="text-sm text-blue-800">
            Every request to a protected endpoint must verify the token's validity and check the user's authorization, regardless of what 
            the frontend did or didn't do.
          </p>
        </div>
      </Card>
    </Section>
  );
};
