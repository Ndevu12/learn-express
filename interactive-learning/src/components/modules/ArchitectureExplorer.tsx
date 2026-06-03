import React, { useState } from 'react';
import { LayerCard } from '../shared/LayerCard';
import { architectureLayers } from '@/data/examples';
import { architectureContent } from '@/data/content/architecture';
import { getModuleSection } from '@/data/module-sections';
import { Callout, ContentGrid, Panel, Section } from '@/components/shared/learning';

export const ArchitectureExplorer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('routes');
  const section = getModuleSection('architecture');
  const selectedLayer = architectureLayers.find((layer) => layer.id === activeLayer);
  return (
    <Section {...section}>
      <p className="text-base text-slate-600">{architectureContent.intro}</p>

      <ContentGrid
        main={
          <div className="space-y-3">
            {architectureLayers.map((layer, index) => (
              <LayerCard
                key={layer.id}
                index={index}
                name={layer.name}
                description={layer.description}
                examples={layer.examples}
                color={layer.color as 'blue' | 'slate'}
                codeExample={layer.codeExample}
                isClickable
                isActive={activeLayer === layer.id}
                onClick={() => setActiveLayer(layer.id)}
              />
            ))}
          </div>
        }
        aside={
          selectedLayer && (
            <Panel title={`${selectedLayer.name}`} variant="muted">
              <div className="space-y-4 text-sm">
                <div>
                  <p className="field-label">{architectureContent.quickInfoLabel}</p>
                  <p className="mt-1 text-slate-700">{selectedLayer.description}</p>
                </div>
                <div>
                  <p className="field-label">{architectureContent.keyPointsLabel}</p>
                  <ul className="mt-2 space-y-1.5 text-slate-700">
                    {selectedLayer.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </div>
                {selectedLayer.codeExample && (
                  <div>
                    <p className="field-label">{architectureContent.codeExampleLabel}</p>
                    <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-50">
                      {selectedLayer.codeExample}
                    </pre>
                  </div>
                )}
              </div>
            </Panel>
          )
        }
      />

      <Callout title={architectureContent.separationPrinciple.title} variant="info">
        {architectureContent.separationPrinciple.body}
      </Callout>
    </Section>
  );
};
