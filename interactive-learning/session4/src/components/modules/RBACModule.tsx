import React, { useState } from 'react';
import { Section, Card } from '../shared/Card';
import { CodeBlock } from '../shared/CodeBlock';
import { rbacConcepts, rbacImplementation, frontendVsBackendSecurity } from '../../data/examples';

export const RBACModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roles' | 'implementation' | 'security'>('roles');
  const [selectedRole, setSelectedRole] = useState(1); // Default to 'User' role
  const [selectedImpl, setSelectedImpl] = useState(0);

  const role = rbacConcepts.roles[selectedRole];

  return (
    <Section
      title="Role-Based Access Control (RBAC)"
      description="Learn how roles and permissions control what users can access and modify"
      icon="👑"
    >
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'roles'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          aria-selected={activeTab === 'roles'}
        >
          🎭 Roles & Permissions
        </button>
        <button
          onClick={() => setActiveTab('implementation')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'implementation'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          aria-selected={activeTab === 'implementation'}
        >
          ⚙️ Implementation
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'security'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          aria-selected={activeTab === 'security'}
        >
          🔒 Frontend vs Backend
        </button>
      </div>

      {/* Roles & Permissions Tab */}
      {activeTab === 'roles' && (
        <>
          <div className="mb-8">
            <p className="text-slate-700 mb-4 font-semibold">Select a role to view permissions:</p>
            <div className="flex gap-3 flex-wrap">
              {rbacConcepts.roles.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRole(idx)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedRole === idx
                      ? 'bg-blue-600 text-white scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  aria-selected={selectedRole === idx}
                >
                  {r.icon} {r.role}
                </button>
              ))}
            </div>
          </div>

          {/* Role Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Role Info */}
            <div className="lg:col-span-2">
              <Card className="bg-blue-50 border-blue-200 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{role.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">{role.role}</h2>
                    <p className="text-slate-600 mt-1">{role.description}</p>
                  </div>
                </div>
              </Card>

              {/* Permissions */}
              <Card className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-4">✓ Permissions</h3>
                <div className="space-y-2">
                  {role.permissions.map((perm, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-slate-50 rounded">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-slate-700">{perm}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Accessible Endpoints */}
              <Card>
                <h3 className="font-semibold text-slate-900 mb-4">🔑 Accessible Endpoints</h3>
                <div className="space-y-2">
                  {role.endpoints.map((endpoint, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-green-50 rounded border border-green-200">
                      <span className="font-mono text-xs font-bold text-green-700 bg-white px-2 py-1 rounded">
                        {endpoint.split(' ')[0]}
                      </span>
                      <span className="font-mono text-sm text-green-800">{endpoint.split(' ')[1]}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Role Comparison Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-slate-50 sticky top-20">
                <h4 className="font-semibold text-slate-900 mb-4">🎭 All Roles</h4>

                <div className="space-y-2">
                  {rbacConcepts.roles.map((r, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedRole(idx)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedRole === idx
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-400'
                      }`}
                    >
                      <p className="font-semibold">{r.icon} {r.role}</p>
                      <p className="text-xs mt-1 opacity-75">{r.permissions.length} permissions</p>
                    </button>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
                  <p className="text-xs font-semibold text-blue-700 uppercase mb-2">💡 Role Hierarchy</p>
                  <p className="text-sm text-blue-800">Admin {`>`} User {`>`} Guest</p>
                  <p className="text-xs text-blue-700 mt-2">Higher roles have more permissions</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Permission Matrix */}
          <Card className="bg-slate-50">
            <h3 className="font-semibold text-slate-900 mb-4">📊 Permission Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="text-left py-3 px-3 font-semibold">Endpoint</th>
                    {rbacConcepts.roles.map((r) => (
                      <th key={r.role} className="text-center py-3 px-3 font-semibold">{r.icon}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {['POST /auth/register', 'POST /auth/login', 'GET /tasks', 'POST /tasks', 'DELETE /tasks/:id', 'GET /admin/users', 'DELETE /admin/users/:id'].map((endpoint) => (
                    <tr key={endpoint} className="border-b border-slate-200 hover:bg-white">
                      <td className="py-3 px-3 font-mono text-xs text-slate-700">{endpoint}</td>
                      {rbacConcepts.roles.map((r) => (
                        <td key={`${r.role}-${endpoint}`} className="text-center py-3 px-3">
                          {r.endpoints.includes(endpoint) ? (
                            <span className="text-green-600 font-bold">✓</span>
                          ) : (
                            <span className="text-red-600 font-bold">✗</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* Implementation Tab */}
      {activeTab === 'implementation' && (
        <>
          <div className="mb-8">
            <p className="text-slate-700 mb-4 font-semibold">How to implement RBAC:</p>
            <div className="flex gap-3 flex-wrap">
              {rbacImplementation.map((impl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImpl(idx)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                    selectedImpl === idx
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {impl.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Implementation Detail */}
          <Card className="bg-blue-50 border-blue-200 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{rbacImplementation[selectedImpl].title}</h2>
            <p className="text-slate-700 mb-6">{rbacImplementation[selectedImpl].description}</p>

            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">💻 Code</p>
              <CodeBlock code={rbacImplementation[selectedImpl].code} language="javascript" />
            </div>

            {rbacImplementation[selectedImpl].usage && (
              <div className="bg-white p-4 rounded border border-blue-200">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">📍 Usage</p>
                <CodeBlock code={rbacImplementation[selectedImpl].usage} language="javascript" />
              </div>
            )}

            {rbacImplementation[selectedImpl].critical && (
              <div className="mt-6 p-4 bg-red-50 rounded border border-red-200">
                <p className="text-sm font-semibold text-red-900">⚠️ Critical</p>
                <p className="text-sm text-red-800 mt-2">{rbacImplementation[selectedImpl].critical}</p>
              </div>
            )}
          </Card>
        </>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {frontendVsBackendSecurity.map((item, idx) => (
              <Card
                key={idx}
                className={idx === 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.layer}</h3>
                <p className="text-slate-700 mb-4 font-semibold">{item.purpose}</p>

                <div className="mb-6">
                  <p className="font-semibold text-slate-900 mb-2">Methods:</p>
                  <ul className="space-y-2">
                    {item.methods.map((method, midx) => (
                      <li key={midx} className="flex gap-2 text-sm text-slate-700">
                        <span className="text-slate-500">•</span>
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 bg-white p-3 rounded">
                  <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Example Code</p>
                  <CodeBlock code={item.code} language="javascript" />
                </div>

                <div className={idx === 0 ? 'bg-yellow-100 p-3 rounded' : 'bg-green-100 p-3 rounded'}>
                  <p className="font-semibold text-sm mb-1">{item.security}</p>
                  <p className="text-sm text-slate-700">{item.lesson}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Critical Warning */}
          <Card className="bg-red-50 border-red-200 mb-8">
            <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
              ⚠️ Common Security Mistakes
            </h3>
            <div className="space-y-4 text-sm text-red-800">
              <div>
                <p className="font-semibold mb-1">❌ Frontend-Only Authorization</p>
                <p>Hiding a button doesn't protect the API. Always verify on backend.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">❌ Storing Sensitive Data in JWT</p>
                <p>JWT can be decoded by anyone. Don't store passwords, credit cards, etc.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">❌ Hardcoding Secret Keys</p>
                <p>Use environment variables for JWT_SECRET. Never commit to git.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">❌ Skipping Token Expiration</p>
                <p>Set reasonable expiry times (e.g., 7 days). Implement token refresh.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">❌ Not Using HTTPS</p>
                <p>Tokens in Authorization header can be intercepted over HTTP.</p>
              </div>
            </div>
          </Card>

          {/* Best Practices */}
          <Card className="bg-green-50 border-green-200">
            <h3 className="font-bold text-green-900 mb-4">✓ Security Best Practices</h3>
            <div className="space-y-3 text-sm text-green-800">
              <div className="flex gap-3">
                <span className="font-bold">✓</span>
                <span>Always validate authorization on the server, every request</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">✓</span>
                <span>Use HttpOnly cookies or secure localStorage for tokens</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">✓</span>
                <span>Implement token refresh mechanism for better security</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">✓</span>
                <span>Audit log sensitive operations (deletes, role changes, etc.)</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">✓</span>
                <span>Use strong, random JWT secret keys (minimum 32 characters)</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">✓</span>
                <span>Implement rate limiting on auth endpoints</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">✓</span>
                <span>Always use HTTPS in production</span>
              </div>
            </div>
          </Card>
        </>
      )}
    </Section>
  );
};
