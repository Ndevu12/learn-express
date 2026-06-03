import React from 'react';

interface FlowStep {
  title: string;
  color: 'blue' | 'slate' | 'green' | 'red';
  description?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  direction?: 'vertical' | 'horizontal';
}

const colorMap = {
  blue: 'bg-blue-600',
  slate: 'bg-slate-600',
  green: 'bg-emerald-600',
  red: 'bg-red-600',
};

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ steps, direction = 'vertical' }) => {
  if (direction === 'horizontal') {
    return (
      <div className="flex items-start gap-3 overflow-x-auto pb-2">
        {steps.map((step, idx) => (
          <React.Fragment key={step.title}>
            <div className="flex min-w-[140px] flex-col gap-2">
              <div className={`${colorMap[step.color]} flex items-center gap-2 rounded-lg px-3 py-2.5 text-white`}>
                <span className="flow-step-badge bg-white/20">{idx + 1}</span>
                <p className="text-sm font-semibold">{step.title}</p>
              </div>
              {step.description && (
                <p className="text-xs leading-snug text-slate-600">{step.description}</p>
              )}
            </div>
            {idx < steps.length - 1 && (
              <span className="mt-3 shrink-0 text-slate-300" aria-hidden="true">
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {steps.map((step, idx) => (
        <React.Fragment key={step.title}>
          <div className="flex items-start gap-4 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-3">
            <span className={`flow-step-badge ${colorMap[step.color]}`}>{idx + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-900">{step.title}</p>
              {step.description && (
                <p className="mt-1 text-sm text-slate-600">{step.description}</p>
              )}
            </div>
          </div>
          {idx < steps.length - 1 && <div className="flow-arrow h-6">↓</div>}
        </React.Fragment>
      ))}
    </div>
  );
};
