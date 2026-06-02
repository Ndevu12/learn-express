import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArchitectureExplorer } from './components/modules/ArchitectureExplorer';
import { RequestLifecycleExplorer } from './components/modules/RequestLifecycleExplorer';
import { CRUDVisualization } from './components/modules/CRUDVisualization';
import { ValidationModule } from './components/modules/ValidationModule';
import { ErrorHandlingModule } from './components/modules/ErrorHandlingModule';
import { MiddlewarePipeline } from './components/modules/MiddlewarePipeline';

type Tab = 'architecture' | 'lifecycle' | 'crud' | 'validation' | 'errors' | 'middleware';

const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: 'architecture', label: 'Architecture', icon: '🏗️' },
  { id: 'lifecycle', label: 'Request Lifecycle', icon: '🔄' },
  { id: 'crud', label: 'CRUD Operations', icon: '📊' },
  { id: 'validation', label: 'Validation', icon: '✔️' },
  { id: 'errors', label: 'Error Handling', icon: '⚠️' },
  { id: 'middleware', label: 'Middleware', icon: '⚙️' }
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('architecture');

  const renderModule = () => {
    switch (activeTab) {
      case 'architecture':
        return <ArchitectureExplorer />;
      case 'lifecycle':
        return <RequestLifecycleExplorer />;
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
            <span className="text-4xl">📚</span>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Session 4: Authentication & Security</h1>
              <p className="text-slate-600 mt-1">Interactive Learning Module</p>
            </div>
          </div>
          <p className="text-slate-700 mt-4">
            Welcome to an interactive exploration of authentication and security in Express.js. Learn about JWT, password hashing, CORS, rate limiting, and secure API design through real code examples.
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Tab)} className="w-full">
            <TabsList className="w-full justify-start rounded-none bg-transparent border-b border-slate-200 p-0 h-auto">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-none border-b-2 border-transparent px-4 py-4 font-medium text-sm data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent"
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderModule()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-50">Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-50 transition-colors">
                      Express.js Documentation
                    </a>
                  </li>
                  <li>
                    <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-50 transition-colors">
                      Node.js Documentation
                    </a>
                  </li>
                  <li>
                    <a href="https://restfulapi.net/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-50 transition-colors">
                      RESTful API Best Practices
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-50">Key Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary" className="block w-fit">✓ JWT Tokens</Badge>
                  <Badge variant="secondary" className="block w-fit">✓ Password Hashing</Badge>
                  <Badge variant="secondary" className="block w-fit">✓ CORS Security</Badge>
                  <Badge variant="secondary" className="block w-fit">✓ Rate Limiting</Badge>
                  <Badge variant="secondary" className="block w-fit">✓ Authorization</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-50">About This Module</CardTitle>
                <CardDescription className="text-slate-400">
                  This interactive learning module teaches authentication and security in Express.js through real code examples and visual explanations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 text-sm">
                  Part of the Learn Express repository. Never stop learning! 🚀
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="border-t border-slate-700 pt-8 mt-8">
            <p className="text-slate-400 text-sm text-center">
              © 2026 Learn Express. Created for developers learning production-ready backend development.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
