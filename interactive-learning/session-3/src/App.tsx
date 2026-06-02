import React, { useState } from 'react';
import { Navigation } from './components/shared/Navigation';
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
              <h1 className="text-3xl font-bold text-slate-900">Session 3: Production-Ready Express APIs</h1>
              <p className="text-slate-600 mt-1">Interactive Learning Module</p>
            </div>
          </div>

          <p className="text-slate-700 mt-4">
            Welcome to an interactive exploration of production-oriented Express.js development. Learn about architecture, request
            lifecycle, CRUD operations, validation, error handling, and middleware through real code examples from the Task
            Management API.
          </p>
        </div>
      </header>

      {/* Navigation */}
      <Navigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderModule()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 text-lg">Learning Resources</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-50">
                    Express.js Documentation
                  </a>
                </li>
                <li>
                  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-50">
                    Node.js Documentation
                  </a>
                </li>
                <li>
                  <a href="https://restfulapi.net/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-50">
                    RESTful API Best Practices
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Key Concepts</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>✓ Separation of Concerns</li>
                <li>✓ Layered Architecture</li>
                <li>✓ Request/Response Cycle</li>
                <li>✓ Middleware Pipeline</li>
                <li>✓ Error Propagation</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">About This Module</h3>
              <p className="text-slate-400 text-sm mb-4">
                This interactive learning module teaches production-ready Express.js development through real code
                examples and visual explanations.
              </p>
              <p className="text-slate-500 text-xs">
                Part of the Learn Express repository. Never stop learning! 🚀
              </p>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 mt-8">
            <p className="text-slate-400 text-sm text-center">
              © 2024 Learn Express. Created for developers learning production-ready backend development.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
