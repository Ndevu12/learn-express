import { useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ModuleSidebar } from '@/components/layout/ModuleSidebar';
import { ModulePagination } from '@/components/layout/ModulePagination';
import { ModuleToolbar } from '@/components/layout/ModuleToolbar';
import { appShell } from '@/data/app-shell';
import type { ModuleId } from '@/data/modules';
import { learningModules } from '@/data/modules';
import { ArchitectureExplorer } from './components/modules/ArchitectureExplorer';
import { RequestLifecycleExplorer } from './components/modules/RequestLifecycleExplorer';
import { CRUDVisualization } from './components/modules/CRUDVisualization';
import { ValidationModule } from './components/modules/ValidationModule';
import { ErrorHandlingModule } from './components/modules/ErrorHandlingModule';
import { MiddlewarePipeline } from './components/modules/MiddlewarePipeline';
import { AuthConceptsModule } from './components/modules/AuthConceptsModule';
import { AuthenticationFlow } from './components/modules/AuthenticationFlow';
import { JWTExplorer } from './components/modules/JWTExplorer';
import { ProtectedRoutes } from './components/modules/ProtectedRoutes';
import { RBACModule } from './components/modules/RBACModule';
import { EndToEndFlow } from './components/modules/EndToEndFlow';

function renderModule(id: ModuleId, onNavigate: (id: ModuleId) => void) {
  switch (id) {
    case 'architecture':
      return <ArchitectureExplorer />;
    case 'lifecycle':
      return <RequestLifecycleExplorer />;
    case 'authconcepts':
      return <AuthConceptsModule onNavigate={onNavigate} />;
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
}

function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('architecture');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { header, hero, footer } = appShell;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeModule]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const current = learningModules.find((m) => m.id === activeModule);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-expanded={sidebarOpen}
            aria-controls="module-sidebar"
          >
            {header.menuButtonLabel}
          </Button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">{header.sessionTitle}</p>
            <p className="truncate text-xs text-slate-500">
              {current ? current.label : header.fallbackSubtitle}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[90rem]">
        <div className="hidden w-72 shrink-0 lg:sticky lg:top-14 lg:block lg:h-[calc(100vh-3.5rem)]">
          <ModuleSidebar activeModule={activeModule} onSelect={setActiveModule} />
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" role="presentation">
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/40"
              aria-label={header.closeMenuLabel}
              onClick={() => setSidebarOpen(false)}
            />
            <div
              id="module-sidebar"
              className="absolute inset-y-0 left-0 w-[min(100%,20rem)] shadow-xl"
            >
              <ModuleSidebar
                activeModule={activeModule}
                onSelect={setActiveModule}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="border-b border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-10">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{hero.badge}</p>
            <h1 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {hero.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
              {hero.description}
            </p>
          </div>

          <main
            id="module-content"
            className="scroll-mt-14 px-4 py-8 sm:px-6 lg:px-10 lg:py-10"
            role="main"
          >
            <ModuleToolbar activeModule={activeModule} onNavigate={setActiveModule} />
            <div key={activeModule} className="animate-fade-in">
              {renderModule(activeModule, setActiveModule)}
            </div>
            <ModulePagination activeModule={activeModule} onNavigate={setActiveModule} />
          </main>

          <footer className="border-t border-slate-200 bg-slate-900 text-slate-50" role="contentinfo">
            <div className="px-4 py-10 sm:px-6 lg:px-10">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="border-slate-700 bg-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-slate-50">{footer.conceptsTitle}</CardTitle>
                  </CardHeader>
                  <div className="flex flex-wrap gap-2 px-6 pb-6">
                    {footer.concepts.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>

                <Card className="border-slate-700 bg-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-slate-50">{footer.resourcesTitle}</CardTitle>
                  </CardHeader>
                  <ul className="space-y-2 px-6 pb-6 text-sm text-slate-400">
                    {footer.resources.map((resource) => (
                      <li key={resource.href}>
                        <a
                          href={resource.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-white"
                        >
                          {resource.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="border-slate-700 bg-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-slate-50">{footer.aboutTitle}</CardTitle>
                    <CardDescription className="text-slate-400">{footer.aboutDescription}</CardDescription>
                  </CardHeader>
                  <p className="px-6 pb-6 text-sm text-slate-500">{footer.aboutBody}</p>
                </Card>
              </div>
              <p className="mt-8 text-center text-xs text-slate-500">{footer.copyright}</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
