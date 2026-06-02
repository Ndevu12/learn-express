import React from 'react';

interface FlowStep {
  title: string;
  icon: string;
  color: 'blue' | 'slate' | 'green' | 'red';
  description?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  direction?: 'vertical' | 'horizontal';
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ steps, direction = 'vertical' }) => {
  const colorMap = {
    blue: 'bg-blue-500',
    slate: 'bg-slate-500',
    green: 'bg-green-500',
    red: 'bg-red-500'
  };

  if (direction === 'horizontal') {
    return (
      <div className="flex items-center gap-2 overflow-x-auto pb-4">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center gap-2 min-w-max">
              <div className={`${colorMap[step.color]} text-white rounded-lg p-4 flex flex-col items-center gap-2`}>
                <span className="text-2xl">{step.icon}</span>
                <p className="font-semibold text-sm text-center">{step.title}</p>
              </div>
              {step.description && (
                <p className="text-xs text-slate-600 text-center max-w-[120px]">{step.description}</p>
              )}
            </div>

            {idx < steps.length - 1 && (
              <div className="flex items-center justify-center min-w-fit px-2">
                <span className="text-2xl text-slate-400">→</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <div className="flex items-start gap-4">
            <div className={`${colorMap[step.color]} text-white rounded-lg p-3 flex-shrink-0`}>
              <span className="text-2xl">{step.icon}</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">{step.title}</p>
              {step.description && (
                <p className="text-sm text-slate-600 mt-1">{step.description}</p>
              )}
            </div>
          </div>

          {idx < steps.length - 1 && (
            <div className="flow-arrow h-8 text-slate-400">
              ↓
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
