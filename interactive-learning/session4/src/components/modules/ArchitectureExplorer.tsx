import React, { useState } from 'react';
import { LayerCard } from '../shared/LayerCard';
import { Section, Card } from '../shared/Card';
import { architectureLayers } from '../../data/examples';

export const ArchitectureExplorer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('routes');

  const selectedLayer = architectureLayers.find(layer => layer.id === activeLayer);

  return (
    <Section
      title="Production Architecture Overview"
      description="Understanding the layered architecture of production-ready Express applications"
      icon="🏗️"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <p className="text-slate-600 mb-6">
            Click on any layer to learn about its role, responsibilities, and how it connects with adjacent layers.
            This architecture enables scalable, maintainable production applications.
          </p>

          <div className="space-y-3">
            {architectureLayers.map((layer) => (
              <LayerCard
                key={layer.id}
                {...layer}
                isClickable={true}
                isActive={activeLayer === layer.id}
                onClick={() => setActiveLayer(layer.id)}
              />
            ))}
          </div>
        </div>

        {selectedLayer && (
          <div className="lg:col-span-1">
            <Card className="bg-blue-50 border-blue-200 sticky top-20">
              <h3 className="text-lg font-bold text-slate-900 mb-4">📌 Quick Info: {selectedLayer.name}</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Purpose</p>
                  <p className="text-sm text-slate-700">{selectedLayer.description}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Key Points</p>
                  <ul className="text-sm space-y-1">
                    {selectedLayer.examples.map((example, idx) => (
                      <li key={idx} className="flex gap-2 text-slate-700">
                        <span className="text-blue-600 font-bold">→</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedLayer.codeExample && (
                  <div>
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Code Example</p>
                    <div className="bg-slate-900 text-slate-50 p-3 rounded font-mono text-xs overflow-x-auto">
                      <pre>{selectedLayer.codeExample}</pre>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>

      <Card className="bg-slate-50">
        <h3 className="font-semibold text-slate-900 mb-3">💡 Key Principle: Separation of Concerns</h3>
        <p className="text-slate-700 text-sm">
          Each layer has a single, well-defined responsibility. Routes handle URL matching. Middleware processes requests.
          Controllers handle HTTP logic. Services contain business logic. Repositories manage data access. This separation
          makes code easier to test, maintain, and scale. Changes to the database don't require changing controllers.
          Business logic changes don't require changing routes.
        </p>
      </Card>
    </Section>
  );
};
