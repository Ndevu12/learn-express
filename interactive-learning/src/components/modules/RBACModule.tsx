import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { Section, SegmentedTabs } from '@/components/shared/learning';
import { CodeBlock } from '../shared/CodeBlock';
import { rbacConcepts, rbacImplementation, frontendVsBackendSecurity } from '@/data/examples';
import { rbacModuleContent } from '@/data/content/rbac';
import { getModuleSection } from '@/data/module-sections';

export const RBACModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roles' | 'implementation' | 'security'>('roles');
  const [selectedRole, setSelectedRole] = useState<number>(rbacModuleContent.defaultRoleIndex);
  const [selectedImpl, setSelectedImpl] = useState(0);
  const section = getModuleSection('rbac');
  const content = rbacModuleContent;
  const role = rbacConcepts.roles[selectedRole];

  return (
    <Section {...section}>
      <SegmentedTabs tabs={content.tabs} active={activeTab} onChange={setActiveTab} />

      {/* Roles & Permissions Tab */}
      {activeTab === 'roles' && (
        <>
          <div className="mb-8">
            <p className="text-slate-700 mb-4 font-semibold">{content.rolesTab.selectRolePrompt}</p>
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
                <h3 className="font-semibold text-slate-900 mb-4">{content.rolesTab.permissionsTitle}</h3>
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
                <h3 className="font-semibold text-slate-900 mb-4">{content.rolesTab.endpointsTitle}</h3>
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
                <h4 className="font-semibold text-slate-900 mb-4">{content.rolesTab.allRolesTitle}</h4>

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
                  <p className="text-xs font-semibold text-blue-700 uppercase mb-2">{content.roleHierarchy.title}</p>
                  <p className="text-sm text-blue-800">{content.roleHierarchy.hierarchy}</p>
                  <p className="text-xs text-blue-700 mt-2">{content.roleHierarchy.note}</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Permission Matrix */}
          <Card className="bg-slate-50">
            <h3 className="font-semibold text-slate-900 mb-4">{content.rolesTab.matrixTitle}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-300">
                    <th className="text-left py-3 px-3 font-semibold">{content.rolesTab.matrixEndpointHeader}</th>
                    {rbacConcepts.roles.map((r) => (
                      <th key={r.role} className="text-center py-3 px-3 font-semibold">{r.icon}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.permissionMatrixEndpoints.map((endpoint) => (
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
            <p className="text-slate-700 mb-4 font-semibold">{content.implementationTab.prompt}</p>
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
              {content.securityMistakes.title}
            </h3>
            <div className="space-y-4 text-sm text-red-800">
              {content.securityMistakes.items.map((item) => (
                <div key={item.title}>
                  <p className="font-semibold mb-1">{item.title}</p>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <h3 className="font-bold text-green-900 mb-4">{content.securityBestPractices.title}</h3>
            <div className="space-y-3 text-sm text-green-800">
              {content.securityBestPractices.items.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </Section>
  );
};
