import React, { useState } from 'react';

interface LayerCardProps {
  name: string;
  icon: string;
  description: string;
  examples: string[];
  color: 'blue' | 'slate';
  codeExample?: string;
  isClickable?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export const LayerCard: React.FC<LayerCardProps> = ({
  name,
  icon,
  description,
  examples,
  color,
  codeExample,
  isClickable = false,
  isActive = false,
  onClick
}) => {
  const [showCode, setShowCode] = useState(false);

  const bgColor = color === 'blue' ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200';
  const hoverClass = isClickable ? 'card-hover' : 'card';
  const borderClass = isActive ? `border-2 ${color === 'blue' ? 'border-blue-600' : 'border-slate-600'}` : '';

  return (
    <div
      className={`${hoverClass} ${bgColor} ${borderClass}`}
      onClick={onClick}
      role={isClickable ? 'button' : 'article'}
      tabIndex={isClickable ? 0 : -1}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-900 mb-2">Examples:</p>
        <ul className="space-y-1">
          {examples.map((example, idx) => (
            <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>{example}</span>
            </li>
          ))}
        </ul>
      </div>

      {codeExample && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCode(!showCode);
            }}
            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {showCode ? '▼ Hide Code' : '▶ Show Code Example'}
          </button>

          {showCode && (
            <div className="mt-3 bg-slate-900 text-slate-50 p-3 rounded font-mono text-xs overflow-x-auto">
              <pre>{codeExample}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};
