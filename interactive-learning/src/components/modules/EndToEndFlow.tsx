import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { Section } from '@/components/shared/learning';
import { endToEndFlow } from '@/data/examples';
import { endToEndContent } from '@/data/content/end-to-end';
import { getModuleSection } from '@/data/module-sections';

export const EndToEndFlow: React.FC = () => {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null);
  const section = getModuleSection('endtoend');
  const content = endToEndContent;

  return (
    <Section {...section}>
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">{content.intro}</p>
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
                  <span
                    className={`text-slate-400 transition-transform ${expandedLayer === idx ? 'rotate-90' : ''}`}
                    aria-hidden="true"
                  >
                    ›
                  </span>
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
                      <div className="text-xs text-slate-500">
                        {content.moreStepsLabel(layer.steps.length - 3)}
                      </div>
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
        <h3 className="font-bold text-slate-900 mb-4">{content.timeline.title}</h3>
        <div className="space-y-4">
          {content.timeline.steps.map((step, index) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex-shrink-0">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-bold ${
                    step.accent === 'green' ? 'bg-green-600' : 'bg-blue-600'
                  }`}
                >
                  {index + 1}
                </div>
              </div>
              <div>
                <p className="font-semibold text-slate-900">{step.title}</p>
                <p className="text-sm text-slate-700 mt-1">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Layers Explained */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <h3 className="font-bold text-slate-900 mb-3">{content.clientLayer.title}</h3>
          <p className="text-sm text-slate-700 mb-3">{content.clientLayer.intro}</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {content.clientLayer.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <h3 className="font-bold text-slate-900 mb-3">{content.serverLayer.title}</h3>
          <p className="text-sm text-slate-700 mb-3">{content.serverLayer.intro}</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {content.serverLayer.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="text-green-600">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Common Pitfalls */}
      <Card className="bg-red-50 border-red-200 mb-8">
        <h3 className="font-bold text-red-900 mb-4">{content.pitfalls.title}</h3>
        <div className="space-y-3 text-sm text-red-800">
          {content.pitfalls.items.map((item) => (
            <div key={item.title}>
              <p className="font-semibold">{item.title}</p>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-slate-50">
        <h3 className="font-bold text-slate-900 mb-4">{content.summary.title}</h3>
        <p className="text-slate-700 mb-4">{content.summary.body}</p>
        <div className="bg-blue-50 p-4 rounded border border-blue-200">
          <p className="text-sm text-blue-900 font-semibold mb-2">{content.summary.goldenRule.title}</p>
          <p className="text-sm text-blue-800">{content.summary.goldenRule.body}</p>
        </div>
      </Card>
    </Section>
  );
};
