import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArchitectureExplorer } from './components/modules/ArchitectureExplorer';
import { RequestLifecycleExplorer } from './components/modules/RequestLifecycleExplorer';
import { CRUDVisualization } from './components/modules/CRUDVisualization';
import { ValidationModule } from './components/modules/ValidationModule';
import { ErrorHandlingModule } from './components/modules/ErrorHandlingModule';
import { MiddlewarePipeline } from './components/modules/MiddlewarePipeline';
import { AuthenticationFlow } from './components/modules/AuthenticationFlow';
import { JWTExplorer } from './components/modules/JWTExplorer';
import { ProtectedRoutes } from './components/modules/ProtectedRoutes';
import { RBACModule } from './components/modules/RBACModule';
import { EndToEndFlow } from './components/modules/EndToEndFlow';

type Tab = 'architecture' | 'lifecycle' | 'authentication' | 'jwt' | 'protected' | 'rbac' | 'endtoend' | 'crud' | 'validation' | 'errors' | 'middleware';

const tabs: Array<{ id: Tab; label: string; icon: string; section: 'fundamentals' | 'auth' | 'advanced' }> = [
  // Fundamentals
  { id: 'architecture', label: 'Architecture', icon: '🏗️', section: 'fundamentals' },
  { id: 'lifecycle', label: 'Request Lifecycle', icon: '🔄', section: 'fundamentals' },
  // Authentication & Security
  { id: 'authentication', label: 'Authentication', icon: '🔐', section: 'auth' },
  { id: 'jwt', label: 'JWT Tokens', icon: '🎫', section: 'auth' },
  { id: 'protected', label: 'Protected Routes', icon: '🚪', section: 'auth' },
  { id: 'rbac', label: 'RBAC', icon: '👑', section: 'auth' },
  { id: 'endtoend', label: 'End-to-End', icon: '🔗', section: 'auth' },
  // Advanced Topics
  { id: 'crud', label: 'CRUD Operations', icon: '📊', section: 'advanced' },
  { id: 'validation', label: 'Validation', icon: '✔️', section: 'advanced' },
  { id: 'errors', label: 'Error Handling', icon: '⚠️', section: 'advanced' },
  { id: 'middleware', label: 'Middleware', icon: '⚙️', section: 'advanced' }
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('architecture');

  const renderModule = () => {
    switch (activeTab) {
      case 'architecture':
        return <ArchitectureExplorer />;
      case 'lifecycle':
        return <RequestLifecycleExplorer />;
      case 'authentication':
        return <AuthenticationFlow />;
      case 'jwt':
        return <JWTExplorer />;
      case 'protected':
        return <ProtectedRoutes />;
      case 'rbac':
        return <RBACModule />;
      case 'endtoend':
        return <EndToEndFlow />;
      case 'crud':
        return <CRUDVisualization />;
      case 'validation':
        return <ValidationModule />;
      case 'errors':
        return <ErrorHandlingModule />;
      case 'middleware':
        return <MiddlewarePipeline />;
      default:
        return <ArchitectureExplorer />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl" aria-hidden="true">📚</span>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Session 4: Authentication & Security</h1>
              <p className="text-slate-600 mt-1">Interactive Learning Module</p>
            </div>
          </div>
          <p className="text-slate-700 mt-4">
            Master authentication, JWT tokens, authorization, and RBAC through interactive visualizations and real code examples.
            Learn how to build secure, production-ready Express applications.
          </p>
        </div>
      </header>

      {/* Navigation with Sections */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Learning Path Indicator */}
          <div className="pt-4 pb-2 border-b border-slate-100">
            <div className="flex gap-4 items-center text-xs font-semibold text-slate-600 uppercase tracking-wide">
              <span>Learning Path:</span>
              <span className="flex gap-2">
                <span className="text-blue-600">Fundamentals</span>
                <span>→</span>
                <span className="text-purple-600">Authentication</span>
                <span>→</span>
                <span className="text-green-600">Advanced</span>
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as Tab)}
            className="w-full"
          >
            <TabsList
              className="w-full justify-start rounded-none bg-transparent border-b border-slate-200 p-0 h-auto"
              role="tablist"
            >
              {/* Fundamentals Section */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 ml-4">FUNDAMENTALS</span>
                {tabs
                  .filter(tab => tab.section === 'fundamentals')
                  .map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="rounded-none border-b-2 border-transparent px-4 py-4 font-medium text-sm data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                    >
                      <span className="mr-2" aria-hidden="true">{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
              </div>

              {/* Auth Section */}
              <div className="flex items-center gap-2 border-l border-slate-200">
                <span className="text-xs font-bold text-purple-600 ml-4">AUTHENTICATION & SECURITY</span>
                {tabs
                  .filter(tab => tab.section === 'auth')
                  .map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="rounded-none border-b-2 border-transparent px-4 py-4 font-medium text-sm data-[state=active]:border-purple-600 data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                    >
                      <span className="mr-2" aria-hidden="true">{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
              </div>

              {/* Advanced Section */}
              <div className="flex items-center gap-2 border-l border-slate-200">
                <span className="text-xs font-bold text-green-600 ml-4">ADVANCED</span>
                {tabs
                  .filter(tab => tab.section === 'advanced')
                  .map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="rounded-none border-b-2 border-transparent px-4 py-4 font-medium text-sm data-[state=active]:border-green-600 data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                    >
                      <span className="mr-2" aria-hidden="true">{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
              </div>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" role="main">
        {renderModule()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-50 mt-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-50">Learning Concepts</CardTitle>
              </CardHeader>
              <div className="px-6 pb-6 space-y-2">
                <Badge variant="secondary" className="block w-fit">✓ JWT Tokens</Badge>
                <Badge variant="secondary" className="block w-fit">✓ Password Hashing</Badge>
                <Badge variant="secondary" className="block w-fit">✓ Authentication</Badge>
                <Badge variant="secondary" className="block w-fit">✓ Authorization (RBAC)</Badge>
                <Badge variant="secondary" className="block w-fit">✓ Protected Routes</Badge>
                <Badge variant="secondary" className="block w-fit">✓ Security Best Practices</Badge>
              </div>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-50">Documentation</CardTitle>
              </CardHeader>
              <div className="px-6 pb-6 space-y-2 text-slate-400">
                <div>
                  <a
                    href="https://expressjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-50 transition-colors text-sm"
                  >
                    Express.js Documentation
                  </a>
                </div>
                <div>
                  <a
                    href="https://jwt.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-50 transition-colors text-sm"
                  >
                    JWT.io - JWT Debugger
                  </a>
                </div>
                <div>
                  <a
                    href="https://nodejs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-50 transition-colors text-sm"
                  >
                    Node.js Documentation
                  </a>
                </div>
                <div>
                  <a
                    href="https://owasp.org/www-community/attacks/csrf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-50 transition-colors text-sm"
                  >
                    OWASP Security Resources
                  </a>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-50">About This Module</CardTitle>
                <CardDescription className="text-slate-400">
                  Comprehensive authentication and authorization learning experience
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <p className="text-slate-500 text-sm">
                  This interactive module teaches you to build secure, production-ready Express applications with proper authentication,
                  JWT tokens, and role-based access control. Learn from real code examples and visual explanations.
                </p>
              </div>
            </Card>
          </div>

          <div className="border-t border-slate-700 pt-8 mt-8">
            <p className="text-slate-400 text-sm text-center">
              © 2026 Learn Express. Creating developers who build secure, production-ready applications. 🚀
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
